import os
import faiss
import torch
import time
import numpy as np
import logging
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
from sentence_transformers import SentenceTransformer

# Enable logging to debug model loading
logging.basicConfig(level=logging.INFO)

# ✅ Model Info
model_name = "microsoft/phi-2"
tokenizer = AutoTokenizer.from_pretrained(model_name)

# ✅ GPU Check and Explicit Selection
if torch.cuda.is_available():
    nvidia_device_id = None
    for i in range(torch.cuda.device_count()):
        device_name = torch.cuda.get_device_name(i)
        if "NVIDIA" in device_name.upper():
            nvidia_device_id = i
            break

    if nvidia_device_id is not None:
        torch.cuda.set_device(nvidia_device_id)
        print(f"✅ Using NVIDIA GPU: {torch.cuda.get_device_name(nvidia_device_id)}")
    else:
        print("⚠️ No NVIDIA GPU detected. Using default GPU.")
else:
    print("⚠️ No GPU detected. Will use CPU fallback.")

# ✅ 4-bit Quantization Config for BitsAndBytes
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_compute_dtype=torch.float16,
    bnb_4bit_use_double_quant=True,
    bnb_4bit_quant_type="nf4"
)

# ✅ Load Model (quantized)
try:
    print("🔄 Loading Phi-2 model with 4-bit quantization...")
    model = AutoModelForCausalLM.from_pretrained(
        model_name,
        device_map="auto",               # Automatically use available GPU
        quantization_config=bnb_config,
        trust_remote_code=True
    )
    print("✅ Phi-2 model loaded in 4-bit on GPU.")
except Exception as e:
    print(f"❌ Failed to load model with 4-bit quantization: {e}")
    raise

# ✅ Load and Chunk Text File
def load_text_chunks_from_file(filepath, chunk_size=300):
    with open(filepath, "r", encoding="utf-8") as f:
        full_text = f.read()
    return [full_text[i:i+chunk_size] for i in range(0, len(full_text), chunk_size)]

text_file_path = "scrape11.txt"
text_chunks = load_text_chunks_from_file(text_file_path)
print(f"✅ Loaded {len(text_chunks)} text chunks from file.")

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

    start = time.time()
    with torch.no_grad():
        output = model.generate(
            **inputs,
            max_new_tokens=200,
            temperature=0.8,
            do_sample=True,
            pad_token_id=tokenizer.eos_token_id
        )
    end = time.time()
    print(f"⏱ Response generated in {end - start:.2f} seconds")

    return tokenizer.decode(output[0], skip_special_tokens=True)

# 💬 Chat Loop
print("🤖 Chatbot (Phi-2 4-bit + FAISS) is running! Type 'exit' to quit.")
while True:
    query = input("You: ")
    if query.lower() in ["exit", "quit"]:
        print("Chatbot: Goodbye! 👋")
        break
    response = generate_response(query)
    print("Chatbot:", response)
