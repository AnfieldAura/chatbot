import os
import json
import faiss
import time
import re
import numpy as np
import google.generativeai as genai
from sentence_transformers import SentenceTransformer
from difflib import get_close_matches
from sklearn.metrics.pairwise import cosine_similarity

# Set your Gemini API key
GOOGLE_API_KEY = "AIzaSyDZHrVTWD8gfh_OtShy-cmhWYuNu4DoRO8"
genai.configure(api_key=GOOGLE_API_KEY)

# Load JSON Data
json_path = r"C:\Users\vaish\Downloads\CHATBOT\chatbot\scrape123.json"
with open(json_path, "r", encoding="utf-8") as f:
    data = json.load(f)

print(f"Loaded {len(data)} entries from JSON.")

# Prepare text chunks and compute embeddings
titles = [entry["title"] for entry in data]
text_chunks = [entry["text"] for entry in data]
combined_inputs = [f"{titles[i]}: {text_chunks[i]}" for i in range(len(data))]

embedding_model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
embeddings = embedding_model.encode(combined_inputs, convert_to_numpy=True).astype("float32")

index = faiss.IndexFlatL2(embeddings.shape[1])
index.add(embeddings)
print("✅ FAISS index created and embeddings added.")

# Normalize query
def normalize_query(query):
    return query.lower().strip().replace("?", "")

# Predefined answer store
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

# Embed predefined questions
def embed_predefined_questions():
    questions = list(predefined_answers.keys())
    embeddings = embedding_model.encode(questions, convert_to_numpy=True).astype("float32")
    return questions, embeddings

predefined_questions, predefined_embeddings = embed_predefined_questions()

# Smart match from predefined answers
def get_predefined_answer_semantic(query):
    query_embedding = embedding_model.encode([query], convert_to_numpy=True)
    sims = cosine_similarity(query_embedding, predefined_embeddings)[0]
    best_idx = np.argmax(sims)
    if sims[best_idx] > 0.80:
        return predefined_answers[predefined_questions[best_idx]]
    return None

# Fuzzy fallback
def get_predefined_answer_fuzzy(query):
    matches = get_close_matches(query, predefined_answers.keys(), n=1, cutoff=0.8)
    if matches:
        return predefined_answers[matches[0]]
    return None

# Combine both methods
def get_predefined_answer(query):
    normalized = normalize_query(query)
    return get_predefined_answer_semantic(normalized) or get_predefined_answer_fuzzy(normalized)

# Retrieve documents from JSON using hybrid search
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

# Generate answer with Gemini
def generate_response(query):
    answer = get_predefined_answer(query)
    if answer:
        return answer

    context = retrieve_relevant_docs(query)

    prompt = (
        "You are a helpful assistant. Use the context to answer the question below. "
        f"Context:\n{context}\n\n"
        f"Question: {query}\nAnswer:"
    )

    model = genai.GenerativeModel("gemini-1.5-flash")
    config = genai.types.GenerationConfig(
        temperature=0.9,
        top_p=0.9,
        top_k=40,
        max_output_tokens=512
    )

    try:
        response = model.generate_content(prompt, generation_config=config)
        return response.text.strip()
    except Exception as e:
        return f"❌ Error generating response: {str(e)}"

# Admin mode for editing/adding predefined answers
def enter_admin_mode():
    admin_password = "admin123"
    while True:
        print("\nEntered Admin Mode.")
        print("Type '/exitadmin' to leave Admin Mode.")
        password = input("Enter admin password to modify answers: ")
        if password != admin_password:
            print("❌ Incorrect password.")
            continue

        while True:
            print("\nType '/exitadmin' to exit admin mode.")
            query = input("Enter the question you want to modify answer for: ").lower().strip()
            if query == "/exitadmin":
                print("Exiting admin mode...")
                return

            if query not in predefined_answers:
                print(f"⚠️ No predefined answer for '{query}'. A new entry will be created.")
            else:
                print(f"✏️ Editing existing answer for '{query}'")

            new_answer = input(f"Enter the new answer for '{query}': ").strip()
            predefined_answers[query] = new_answer

            # Refresh predefined embeddings
            global predefined_questions, predefined_embeddings
            predefined_questions, predefined_embeddings = embed_predefined_questions()

            print(f"✅ Answer for '{query}' updated and saved.")

# Main loop
def chatbot():
    print("Gemini Flash Chatbot is ready! Type '/admin' to enter admin mode or '/exit' to quit.")
    while True:
        try:
            query = input("You: ")
            if query.lower() in ["/exit", "/quit"]:
                print("Chatbot: Goodbye! 👋")
                break
            elif query.lower() == "/admin":
                enter_admin_mode()
            else:
                start = time.time()
                response = generate_response(query)
                end = time.time()
                print(f"Chatbot ({round(end - start, 2)}s):", response)
        except KeyboardInterrupt:
            print("\nChatbot: Interrupted. Goodbye! 👋")
            break

if __name__ == "__main__":
    chatbot()