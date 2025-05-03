import os
import json
import faiss
import time
import re
import numpy as np
import google.generativeai as genai
from sentence_transformers import SentenceTransformer

# ✅ Set your Gemini API key
GOOGLE_API_KEY = "AIzaSyDZHrVTWD8gfh_OtShy-cmhWYuNu4DoRO8"
genai.configure(api_key=GOOGLE_API_KEY)

# ✅ Load JSON Data
json_path = r"C:\Users\vaish\Downloads\CHATBOT\chatbot\scrape123.json"
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
    "what are the departments in kmit": "KMIT has H&S department, AI&ML department, CSE department, CSD department, and IT department."
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
    if normalized in predefined_answers:
        return predefined_answers[normalized]

    context = retrieve_relevant_docs(query)

    prompt = (
        "You are a helpful assistant. Use the context to answer the question below. "
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

# 💬 Chat loop
print("🤖 Gemini Flash Chatbot is ready! Type 'exit' to quit.")
while True:
    try:
        query = input("You: ")
        if query.lower() in ["/exit", "/quit"]:
            print("Chatbot: Goodbye! 👋")
            break
        start = time.time()
        response = generate_response(query)
        end = time.time()
        print(f"Chatbot ({round(end - start, 2)}s):", response)
    except KeyboardInterrupt:
        print("\nChatbot: Interrupted. Goodbye! 👋")
        break