import logging
import os
import json
import faiss
import time
import re
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from sentence_transformers import SentenceTransformer
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager


# Flask app setup
app = Flask(__name__)
CORS(app)

# ✅ Set your Gemini API key
GOOGLE_API_KEY = "AIzaSyDZHrVTWD8gfh_OtShy-cmhWYuNu4DoRO8"
genai.configure(api_key=GOOGLE_API_KEY)

# ✅ Load JSON Data
json_path = r"C:\Users\addan\OneDrive\Documents\GitHub\chatbot\PROJECT\Backend\scrape1233.json"
with open(json_path, "r", encoding="utf-8") as f:
    data = json.load(f)

print(f"✅ Loaded {len(data)} entries from JSON.")

# ✅ Prepare text chunks and compute embeddings
titles = [entry["title"] for entry in data]
text_chunks = [entry["text"] for entry in data]
combined_inputs = [f"{titles[i]}: {text_chunks[i]}" for i in range(len(data))]

embedding_model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
embeddings = embedding_model.encode(combined_inputs, convert_to_numpy=True).astype("float32")

index = faiss.IndexFlatL2(embeddings.shape[1])
index.add(embeddings)
print("✅ FAISS index created and embeddings added.")

# ✅ Normalize the query
def normalize_query(query):
    return query.lower().strip().replace("?", "")

# ✅ Hardcoded responses for frequently asked or critical questions
predefined_answers = {
    "hi": "Hello! How can I assist you today?",
    "hello": "Hi there! What can I help you with?",
    "who is the principal of kmit": "The principal of KMIT is Dr. B L Malleswari.",
    "what is the minimum attendance": "The minimum attendance required at KMIT is 75%.",
    "where is kmit located": "KMIT is located in Narayanguda, Hyderabad.",
    "who is the director of kmit": "The Director of KMIT is Mr. Neil Gogte.",
    "who is the founder of kmit": "The Founder of KMIT is also Mr. Neil Gogte.",
    "what are the college timings": "College timings are generally from 9:00 AM to 4:30 PM.",
    "what is the attendance percentage required": "You must maintain at least 75% attendance to be eligible for exams.",
    "what are the departments in kmit": "KMIT has H&S department, AI&ML department, CSE department, CSD department, and IT department.",
    "What are the academic regulations for 2024?": "The KMIT B.Tech Academic Regulations (KR24) outline a 4-year (8-semester) undergraduate program requiring the completion of 160 credits with a minimum CGPA of 5.0 for graduation. Attendance is mandatory with at least 75% required; students with 65–74% may apply for condonation with a fee, while those below 65% will be detained. Each subject is assessed through 40 marks for Continuous Internal Evaluation (CIE) and 60 marks for Semester End Exams (SEE), with a passing requirement of at least 14/40 in CIE, 21/60 in SEE, and 40/100 overall. Grading follows UGC norms from O (≥90%) to F (<40%), and SGPA/CGPA are calculated accordingly. Promotion rules mandate 20 credits for 2nd year, 48 for 3rd year, and 72 for 4th year. Projects occur in two stages during the final year and require a minimum of 40 marks to pass. An optional exit with a diploma certificate is available after 2 years upon completing 80 credits. Lateral Entry Students (LES) begin in the 2nd year and must earn 120 credits within 3–6 years. Malpractice is dealt with severely, including subject cancellation and possible expulsion. The degree must be completed within 8 years, with all academic and credit requirements fulfilled.",
    "How can I access the syllabus for my course?":"You can access the syllabus for your B.Tech course by:\t1. Visiting the official KMIT website at https://kmit.in and checking the 'Academics' or your department section.\t2. Contacting your department office or faculty advisor for the latest syllabus copy.\t3. Logging into the college LMS or ERP portal, where course materials including the syllabus may be uploaded.\t4. Asking your class representative or senior students,\tIf the syllabus isn't available online yet, your department will provide it at the start of the semester.",
    "What is the schedule for the next semester exams?":"The detailed schedule for the upcoming semester exams will be released by the examination branch and shared on the official notice board and college website. Please stay tuned for updates.",
    "How do I apply for a leave of absence?":"To apply for a leave of absence, submit a written request or an online application (if available) to your class mentor or HOD, mentioning the reason and duration of your leave. Approval is subject to attendance policy and academic rules.",
    "Who is the head of the CSE department?":"",
    "What are the library timings?":"The library is typically open from 9:30 AM to 4:30 PM on all working days. During exams, extended hours may be announced. Please check the latest timings on the library notice board or college website.",
    "How can I contact the placement cell?":"You can contact the placement cell via the official email or visit the Placement Officer in the admin block. Details are available on the KMIT website under the 'Placements' section."
}

# 🔍 Hybrid Retrieval: Semantic + keyword match, better context collection
def retrieve_relevant_docs(query, top_k=10):
    query = normalize_query(query)
    query_embedding = embedding_model.encode([query], convert_to_numpy=True).astype("float32")
    distances, indices = index.search(query_embedding, top_k)

    semantic_results = [f"{titles[i]}: {text_chunks[i]}" for i in indices[0] if i < len(text_chunks)]

    query_words = set(query.split())
    keyword_matches = []
    for i in range(len(data)):
        full_text = f"{titles[i]} {text_chunks[i]}".lower()
        if any(word in full_text for word in query_words):
            keyword_matches.append(f"{titles[i]}: {text_chunks[i]}")

    combined_results = list(dict.fromkeys(semantic_results + keyword_matches))

    context = ""
    for chunk in combined_results:
        if len(context) + len(chunk) > 4000:
            break
        context += "\n\n" + chunk

    return context.strip() if context else "No relevant documents found."

# 🤖 Generate response using Gemini Flash
def generate_response(query):
    normalized = normalize_query(query)

    # ✅ Check for predefined/hardcoded answer first
    if query in predefined_answers:
        return predefined_answers[query]  # Return predefined answer directly

    # If not found in predefined answers, proceed with model-based response
    context = retrieve_relevant_docs(query)

    prompt = (
        "You are a helpful assistant. Use the context to answer the question below. "
        "If the answer is not in the context, say 'I don't know.'\n\n"
        f"Context:\n{context}\n\n"
        f"Question: {query}\nAnswer:"
    )

    model = genai.GenerativeModel("gemini-1.5-flash")

    generation_config = genai.types.GenerationConfig(
        temperature=0.9,
        top_p=0.9,
        top_k=40,
        max_output_tokens=512
    )

    try:
        response = model.generate_content(prompt, generation_config=generation_config)
        return response.text.strip()
    except Exception as e:
        return f"❌ Error generating response: {str(e)}"
    


#attendance
def get_attendance(roll_number):
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")

    driver = webdriver.Chrome(
        service=Service(ChromeDriverManager().install()),
        options=chrome_options
    )

    try:
        logging.info("Opening Spectra portal...")
        driver.get("https://spectra-beta.vercel.app/search")

        search_box = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "input"))
        )
        logging.info(f"Entering roll number: {roll_number}")
        search_box.send_keys(roll_number)
        search_box.send_keys(Keys.RETURN)

        roll_element = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, f"//p[contains(text(), '{roll_number}')]"))
        )
        roll_element.click()

        attendance_element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//span[contains(@class, 'text-blue-600')]"))
        )
        attendance = attendance_element.text

        logging.info(f"Attendance for {roll_number}: {attendance}")
        return {"roll_number": roll_number, "attendance": attendance}

    except Exception as e:
        logging.error(f"Error fetching attendance: {e}")
        return {"error": f"Could not fetch attendance for {roll_number}"}
    finally:
        driver.quit()
        logging.info("WebDriver closed.")




#flask route for chatbot

@app.route('/chat', methods=['POST'])
def chatbot_api():
    data = request.get_json()
    query = data.get('query', '')

    if not query:
        return jsonify({"error": "Query is required"}), 400

    try:
        # Generate the response
        response = generate_response(query)
        return jsonify({"response": response}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/attendance', methods=['POST'])
def attendance_api():
    data = request.get_json()
    roll_number = data.get('roll_number', '')

    if not roll_number:
        return jsonify({"error": "Roll number is required"}), 400

    try:
        # Fetch the attendance
        attendance_data = get_attendance(roll_number)
        return jsonify(attendance_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)