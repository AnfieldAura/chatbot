import os
import json
import faiss
import time
import re
import numpy as np
import openai
from difflib import get_close_matches
from flask import Flask, request, jsonify
from flask_cors import CORS
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from pymongo import MongoClient
import logging

# Set your OpenAI API key
openai.api_key = "YOUR_OPENAI_API_KEY"

# Paths
PREDEFINED_QA_PATH = os.path.join(os.path.dirname(__file__), "predefined_qa.json")
json_path = r"C:\\Users\\addan\\OneDrive\\Documents\\GitHub\\chatbot\\Backend\\json\\scrape123.json"

# Load JSON data
with open(json_path, "r", encoding="utf-8") as f:
    data = json.load(f)

# Predefined answers
predefined_answers = {
    "hi": "Hello! How can I assist you today?",
    "hello": "Hi there! What can I help you with?",
    "who is the principal of kmit": "The principal of KMIT is Dr. B L Malleswari.",
    "what is the minimum attendance": "The minimum attendance required at KMIT is 75%.",
    "where is kmit located": "KMIT is located in Narayanguda, Hyderabad.",
    "What are the academic regulations for 2024?": "The academic regulations for KR23 include maintaining a minimum of 75% attendance, passing all subjects with a minimum of 40% marks, and completing all assignments on time.",
    "who is the director of kmit": "The Director of KMIT is Mr. Neil Gogte.",
    "who is the founder of kmit": "The Founder of KMIT is also Mr. Neil Gogte.",
    "what are the college timings": "College timings are generally from 9:00 AM to 4:30 PM.",
    "what is the attendance percentage required": "You must maintain at least 75% attendance to be eligible for exams.",
    "what are the departments in kmit": "KMIT has H&S department, AI&ML department, CSE department, CSD department, and IT department."
}

# Load and save functions for predefined Q&A
def load_predefined_qa():
    if os.path.exists(PREDEFINED_QA_PATH):
        with open(PREDEFINED_QA_PATH, "r", encoding="utf-8") as f:
            qa_list = json.load(f)
        return {item["question"]: item["answer"] for item in qa_list}
    return {}

def save_predefined_qa(predefined):
    qa_list = [{"question": q, "answer": a} for q, a in predefined.items()]
    with open(PREDEFINED_QA_PATH, "w", encoding="utf-8") as f:
        json.dump(qa_list, f, indent=2)

predefined_answers.update(load_predefined_qa())

# Embedding via OpenAI
EMBEDDING_MODEL = "text-embedding-3-small"

def get_openai_embedding(text):
    response = openai.Embedding.create(input=text, model=EMBEDDING_MODEL)
    return response["data"][0]["embedding"]

# Prepare data
def load_combined_data():
    combined = data.copy()
    for q, a in predefined_answers.items():
        combined.append({"title": q, "text": a})
    return combined

def rebuild_faiss_index():
    global titles, text_chunks, combined_inputs, embeddings, index
    combined_data = load_combined_data()
    titles = [entry["title"] for entry in combined_data]
    text_chunks = [entry["text"] for entry in combined_data]
    combined_inputs = [f"{titles[i]}: {text_chunks[i]}" for i in range(len(combined_data))]
    embeddings = np.array([get_openai_embedding(text) for text in combined_inputs], dtype="float32")
    index = faiss.IndexFlatL2(embeddings.shape[1])
    index.add(embeddings)

rebuild_faiss_index()

predefined_questions = list(predefined_answers.keys())
predefined_embeddings = np.array([get_openai_embedding(q) for q in predefined_questions], dtype="float32")

# Query handlers
def normalize_query(query):
    return query.lower().strip().replace("?", "")

def get_predefined_answer_semantic(query):
    query_embedding = np.array([get_openai_embedding(query)], dtype="float32")
    sims = np.dot(predefined_embeddings, query_embedding[0])
    best_idx = np.argmax(sims)
    if sims[best_idx] > 0.80:
        return predefined_answers[predefined_questions[best_idx]]
    return None

def get_predefined_answer_fuzzy(query):
    matches = get_close_matches(query, predefined_answers.keys(), n=1, cutoff=0.8)
    if matches:
        return predefined_answers[matches[0]]
    return None

def get_predefined_answer(query):
    normalized = normalize_query(query)
    return get_predefined_answer_semantic(normalized) or get_predefined_answer_fuzzy(normalized)

def retrieve_relevant_docs(query, top_k=10):
    query = normalize_query(query)
    query_embedding = np.array([get_openai_embedding(query)], dtype="float32")
    distances, indices = index.search(query_embedding, top_k)
    semantic_results = [f"{titles[i]}: {text_chunks[i]}" for i in indices[0] if i < len(text_chunks)]
    return "\n\n".join(semantic_results[:top_k]) if semantic_results else "No relevant documents found."

def generate_response(query):
    answer = get_predefined_answer(query)
    if answer:
        return answer
    context = retrieve_relevant_docs(query)
    prompt = (
        "You are a helpful assistant. Use the context to answer the question below. "
        f"Context:\n{context}\n\nQuestion: {query}\nAnswer:"
    )
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7
        )
        return response["choices"][0]["message"]["content"].strip()
    except Exception as e:
        return f"❌ Error generating response: {str(e)}"

# Flask setup
app = Flask(__name__)
CORS(app)

mongo_uri = "mongodb+srv://admin:admin123@studentdb.cc5j39j.mongodb.net/"
client = MongoClient(mongo_uri)
db = client["Student"]
students_collection = db["Student"]

@app.route("/api/login", methods=["POST"])
def api_login():
    data = request.get_json()
    roll_number = data.get("rollNumber", "").strip().upper()
    password = data.get("password", "")

    if not roll_number or not password:
        return jsonify({"error": "Roll number and password are required"}), 400

    student = students_collection.find_one({"rollNumber": roll_number})
    if not student:
        return jsonify({"error": "Roll number not found"}), 404
    if student.get("password") != password:
        return jsonify({"error": "Invalid password"}), 401

    student.pop("password", None)
    student["_id"] = str(student["_id"])
    return jsonify({"message": "Login successful", "student": student}), 200

@app.route("/api/students", methods=["GET"])
def api_students():
    students = list(students_collection.find({}, {"name": 1, "rollNumber": 1, "_id": 0}))
    return jsonify(students), 200

@app.route('/search', methods=['POST'])
def search():
    try:
        data = request.get_json()
        query = data.get('query', '').strip()
        if not query:
            return jsonify({"error": "Query is required"}), 400
        response = generate_response(query)
        return jsonify({"generated_response": response}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get-attendance', methods=['POST'])
def get_attendance():
    try:
        data = request.get_json()
        roll_number = data.get('rollNumber', '').strip()
        if not roll_number:
            return jsonify({"error": "Roll number is required"}), 400

        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_argument("--headless=new")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")

        driver = webdriver.Chrome(
            service=Service(ChromeDriverManager().install()),
            options=chrome_options
        )

        try:
            driver.get("https://spectra-beta.vercel.app/search")

            search_box = WebDriverWait(driver, 15).until(
                EC.presence_of_element_located((By.TAG_NAME, "input"))
            )
            search_box.send_keys(roll_number)
            search_box.send_keys(Keys.RETURN)

            roll_element = WebDriverWait(driver, 15).until(
                EC.visibility_of_element_located((By.XPATH, f"//p[contains(text(), '{roll_number}')]"))
            )
            roll_element.click()

            attendance_element = WebDriverWait(driver, 15).until(
                EC.presence_of_element_located((By.XPATH, "//span[contains(@class, 'text-blue-600')]")
            ))
            attendance = attendance_element.text

            if attendance.endswith("%%"):
                attendance = attendance[:-1]

            return jsonify({"roll_number": roll_number, "attendance": attendance}), 200

        except Exception as e:
            driver.save_screenshot("error.png")
            return jsonify({"error": f"Could not fetch attendance for {roll_number}"}), 500
        finally:
            driver.quit()

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
