from flask import Flask, request, jsonify
from flask_cors import CORS
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import logging
import time
import os
import faiss
import torch
import numpy as np
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
from sentence_transformers import SentenceTransformer

# Configure logging
logging.basicConfig(level=logging.INFO, format='[%(levelname)s] %(message)s')

# Flask app setup
app = Flask(__name__)
CORS(app)

# ✅ Chatbot Setup
model_name = "microsoft/phi-2"
tokenizer = AutoTokenizer.from_pretrained(model_name)

# ✅ GPU Check
if torch.cuda.is_available():
    logging.info(f"✅ GPU detected: {torch.cuda.get_device_name(0)}")
else:
    logging.warning("⚠️ No GPU detected. Using CPU fallback.")

# ✅ 4-bit Quantization Config for BitsAndBytes
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_compute_dtype=torch.float16,
    bnb_4bit_use_double_quant=True,
    bnb_4bit_quant_type="nf4"
)

# ✅ Load Model (quantized)
try:
    logging.info("🔄 Loading Phi-2 model with 4-bit quantization...")
    model = AutoModelForCausalLM.from_pretrained(
        model_name,
        device_map="auto",
        quantization_config=bnb_config,
        trust_remote_code=True
    )
    logging.info("✅ Phi-2 model loaded in 4-bit on GPU.")
except Exception as e:
    logging.error(f"❌ Failed to load model with 4-bit quantization: {e}")
    raise

# ✅ Load and Chunk Text File
def load_text_chunks_from_file(filepath, chunk_size=300):
    with open(filepath, "r", encoding="utf-8") as f:
        full_text = f.read()
    return [full_text[i:i+chunk_size] for i in range(0, len(full_text), chunk_size)]

text_file_path = r"C:\Users\addan\OneDrive\Documents\GitHub\chatbot\PROJECT\Backend\scrape11.txt"
text_chunks = load_text_chunks_from_file(text_file_path)
logging.info(f"✅ Loaded {len(text_chunks)} text chunks from file.")

# ✅ Embedding Model + FAISS Index
embedding_model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
embeddings = embedding_model.encode(text_chunks, convert_to_numpy=True).astype("float32")

index = faiss.IndexFlatL2(embeddings.shape[1])
index.add(embeddings)

# 🔍 Retrieve Relevant Chunks
def retrieve_relevant_docs(query, top_k=4):
    query_embedding = np.array(embedding_model.encode([query]), dtype="float32")
    distances, indices = index.search(query_embedding, top_k)
    results = [text_chunks[i] for i in indices[0] if i < len(text_chunks)]
    return "\n".join(results[:3]) if results else "No relevant documents found."

# 🧠 Generate Response
def generate_response(query):
    context = retrieve_relevant_docs(query)[:1000]  # limit for speed
    prompt = (
        f"You are a helpful assistant. Use the context to answer.\n\n"
        f"Context:\n{context}\n\n"
        f"Question: {query}\nAnswer:"
    )

    device = "cuda" if torch.cuda.is_available() else "cpu"
    inputs = tokenizer(prompt, return_tensors="pt").to(device)

    with torch.no_grad():
        output = model.generate(
            **inputs,
            max_new_tokens=200,
            temperature=0.8,
            do_sample=True,
            pad_token_id=tokenizer.eos_token_id
        )

    return tokenizer.decode(output[0], skip_special_tokens=True)

# Flask route for chatbot
@app.route('/search', methods=['POST'])
def chatbot_api():
    data = request.get_json()
    query = data.get('query', '')

    if not query:
        return jsonify({"error": "Query is required"}), 400

    try:
        # Generate the response
        full_response = generate_response(query)

        # Log the full response (context and other details)
        logging.info(f"Full Response: {full_response}")

        # Extract and return only the answer
        return jsonify({"generated_response": full_response.split("Answer:")[-1].strip()}), 200
    except Exception as e:
        logging.error(f"Error generating response: {e}")
        return jsonify({"error": "Failed to generate response"}), 500

# ✅ Attendance Fetching Logic
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
driver = webdriver.Chrome(
        service=Service(ChromeDriverManager().install()),
        options=chrome_options

)
logging.info("Opening Spectra portal...")
driver.get("https://spectra-beta.vercel.app/search")
def get_attendance(roll_number):

    try:
        

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

# Flask route for attendance
@app.route('/get-attendance', methods=['POST'])
def attendance_api():
    data = request.get_json()
    roll_number = data.get('roll_number')

    if not roll_number:
        return jsonify({"error": "Roll number is required"}), 400

    result = get_attendance(roll_number)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=False)