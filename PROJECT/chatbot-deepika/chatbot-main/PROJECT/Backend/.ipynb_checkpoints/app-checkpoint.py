from flask import Flask, request, jsonify
from flask_cors import CORS
import faiss, json, numpy as np
from embeddings import get_embedding

app = Flask(__name__)
CORS(app)

# Load data and index
with open("cleaned_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)
text_chunks = [entry["text"] for entry in data]
index = faiss.read_index("index.faiss")

@app.route('/search', methods=['POST'])
def search():
    query = request.json.get("query")
    if not query:
        return jsonify({"error": "Missing query"}), 400

    query_embedding = get_embedding(query).astype("float32")
    k = 5
    distances, indices = index.search(query_embedding, k)
    results = [text_chunks[i] for i in indices[0]]

    return jsonify({"results": results})

if __name__ == "__main__":
    app.run(debug=True)
