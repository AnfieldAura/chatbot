import os
import json
import faiss
import time
import numpy as np
import google.generativeai as genai
from sentence_transformers import SentenceTransformer
from langchain.document_loaders import PyMuPDFLoader, Docx2txtLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import FAISS as LangFAISS
from langchain.embeddings import HuggingFaceEmbeddings

# 🔑 Gemini API Key
GOOGLE_API_KEY = "AIzaSyDZHrVTWD8gfh_OtShy-cmhWYuNu4DoRO8"
genai.configure(api_key=GOOGLE_API_KEY)

# ✅ Load JSON
json_path = r"C:\Users\vaish\Downloads\CHATBOT\chatbot\scrape123.json"
with open(json_path, "r", encoding="utf-8") as f:
    data = json.load(f)
print(f"✅ Loaded {len(data)} entries from JSON.")

titles = [entry["title"] for entry in data]
text_chunks = [entry["text"] for entry in data]
combined_inputs = [f"{titles[i]}: {text_chunks[i]}" for i in range(len(data))]

embedding_model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
json_embeddings = embedding_model.encode(combined_inputs, convert_to_numpy=True).astype("float32")

faiss_index = faiss.IndexFlatL2(json_embeddings.shape[1])
faiss_index.add(json_embeddings)
print("✅ FAISS index created and embeddings added (JSON).")

# ✅ Predefined answers
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

# ✅ Normalize query
def normalize_query(query):
    return query.lower().strip().replace("?", "")

# ✅ Load PDFs and DOCX using LangChain
def load_documents(folder_path):
    all_docs = []
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)

    for file in os.listdir(folder_path):
        path = os.path.join(folder_path, file)
        if file.endswith(".pdf"):
            loader = PyMuPDFLoader(path)
        elif file.endswith(".docx"):
            loader = Docx2txtLoader(path)
        else:
            continue
        documents = loader.load()
        all_docs.extend(splitter.split_documents(documents))

    embedding = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    vectorstore = LangFAISS.from_documents(all_docs, embedding)
    print(f"✅ Loaded and indexed {len(all_docs)} chunks from files in: {folder_path}")
    return vectorstore

# 📂 Change this to your folder path that contains both PDFs and DOCX
doc_folder_path = r"C:\Users\vaish\Downloads\CHATBOT\chatbot\documents"
vectorstore = load_documents(doc_folder_path)

# ✅ Retrieval from JSON
def retrieve_from_json(query, top_k=5):
    query_embedding = embedding_model.encode([query], convert_to_numpy=True).astype("float32")
    distances, indices = faiss_index.search(query_embedding, top_k)
    return [combined_inputs[i] for i in indices[0] if i < len(combined_inputs)]

# ✅ Retrieval from LangChain vector store
def retrieve_from_docs(query, top_k=5):
    results = vectorstore.similarity_search(query, k=top_k)
    return [doc.page_content for doc in results]

# ✅ Merge and trim context
def get_combined_context(query):
    json_chunks = retrieve_from_json(query)
    doc_chunks = retrieve_from_docs(query)

    combined = json_chunks + doc_chunks
    seen = set()
    unique_chunks = []
    for chunk in combined:
        cleaned = chunk.strip()
        if cleaned not in seen:
            unique_chunks.append(cleaned)
            seen.add(cleaned)

    context = ""
    for chunk in unique_chunks:
        if len(context) + len(chunk) > 4000:
            break
        context += "\n\n" + chunk

    return context.strip()

# ✅ Gemini Response Generator
def generate_response(query):
    normalized = normalize_query(query)
    if normalized in predefined_answers:
        return predefined_answers[normalized]

    context = get_combined_context(query)

    prompt = (
        "You are a helpful assistant. Use the context below to answer the question. "
        f"Context:\n{context}\n\n"
        f"Question: {query}\nAnswer:"
    )

    model = genai.GenerativeModel("gemini-1.5-flash")
    config = genai.types.GenerationConfig(
        temperature=0.7,
        top_p=0.9,
        top_k=40,
        max_output_tokens=512
    )

    try:
        response = model.generate_content(prompt, generation_config=config)
        return response.text.strip()
    except Exception as e:
        return f"❌ Error: {str(e)}"

# 🟢 Start chat
print("🤖 Gemini Hybrid Chatbot is ready! Type '/exit' to quit.")
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
