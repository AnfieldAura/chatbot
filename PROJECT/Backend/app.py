from flask import Flask, request, jsonify
import json
import numpy as np
import faiss
import os
import torch
from sklearn.feature_extraction.text import TfidfVectorizer
from transformers import AutoTokenizer, AutoModel, AutoModelForCausalLM
from flask_cors import CORS


# Flask setup
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:8080"}}, methods=["GET", "POST", "OPTIONS"], allow_headers=["Content-Type", "Authorization"])  # Allow Vite frontend

# Load data (with question + answer)
data_file_path = os.path.join(os.path.dirname(__file__), "ccleaned_data.json")
with open(data_file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

# Load embedding model
tokenizer = AutoTokenizer.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")
model = AutoModel.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")

def get_embedding(text):
    tokens = tokenizer(text, padding=True, truncation=True, return_tensors="pt")
    with torch.no_grad():
        output = model(**tokens)
    return output.last_hidden_state.mean(dim=1).numpy()

# Build FAISS index
questions = [item["question"] for item in data]
question_embeddings = np.array([get_embedding(q)[0] for q in questions], dtype="float32")

embedding_size = question_embeddings.shape[1]
index = faiss.IndexFlatL2(embedding_size)
index.add(question_embeddings)

# Load generative model
gen_tokenizer = AutoTokenizer.from_pretrained("gpt2")
gen_model = AutoModelForCausalLM.from_pretrained("gpt2")

def generate_response(context, query):
    """
    Generate a response using the generative model.
    :param context: Retrieved documents as context.
    :param query: User's query.
    :return: Generated response.
    """
    input_text = f"Context: {context}\n\nQuery: {query}\n\nResponse:"
    tokens = gen_tokenizer(input_text, return_tensors="pt", truncation=True, max_length=512)
    output = gen_model.generate(**tokens, max_length=150, num_return_sequences=1, no_repeat_ngram_size=2)
    return gen_tokenizer.decode(output[0], skip_special_tokens=True)

@app.route("/search", methods=["POST"])
def search():
    data_json = request.get_json()
    query = data_json.get('query', '')

    if not query:
        return jsonify({"error": "Query is required"}), 400

    try:
        # Embed the user query
        query_embedding = get_embedding(query)[0].astype("float32")

        # Search in the FAISS index
        _, indices = index.search(np.array([query_embedding]), k=1)

        # Retrieve top result
        top_result = None
        for idx in indices[0]:
            if idx != -1:
                top_result = data[int(idx)]
                break

        if not top_result:
            return jsonify({
                "generated_response": "Sorry, I couldn't find any relevant information for your query.",
                "answer": None
            })

        # Return only the answer of the top result
        return jsonify({
            "generated_response": None,
            "answer": top_result["answer"]
        })

    except Exception as e:
        print("Error during search:", e)
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
