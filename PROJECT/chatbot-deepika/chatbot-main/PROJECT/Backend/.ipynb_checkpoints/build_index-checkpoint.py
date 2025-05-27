# build_index.py
import os, json, re
import faiss
import numpy as np
from embeddings import get_embedding

input_file = "scrape11.txt"
output_json = "cleaned_data.json"
faiss_index_file = "index.faiss"

if not os.path.exists(input_file):
    raise FileNotFoundError(f"{input_file} not found.")

# Cleaning
def clean_text(text):
    text = re.sub(r"\s+", " ", text).strip()
    return text

with open(input_file, "r", encoding="utf-8") as file:
    lines = file.readlines()

cleaned = list(set([clean_text(line) for line in lines if line.strip()]))
text_chunks = []
chunk = ""
for line in cleaned:
    if len(chunk) + len(line) <= 200:
        chunk += " " + line
    else:
        text_chunks.append(chunk.strip())
        chunk = line
if chunk:
    text_chunks.append(chunk.strip())

with open(output_json, "w", encoding="utf-8") as f:
    json.dump([{"id": i, "text": chunk} for i, chunk in enumerate(text_chunks)], f, indent=4)

embeddings = np.array([get_embedding(text)[0] for text in text_chunks], dtype="float32")
index = faiss.IndexFlatL2(embeddings.shape[1])
index.add(embeddings)
faiss.write_index(index, faiss_index_file)

print("✅ FAISS index built and saved.")
