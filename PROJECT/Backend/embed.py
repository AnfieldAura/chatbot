# embeddings.py
import torch
import numpy as np
from transformers import AutoTokenizer, AutoModel

# Load model once
tokenizer = AutoTokenizer.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")
model = AutoModel.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")

def get_embedding(text):
    """Convert text into an embedding"""
    tokens = tokenizer(text, padding=True, truncation=True, return_tensors="pt")
    with torch.no_grad():
        output = model(**tokens)
    return output.last_hidden_state.mean(dim=1).numpy()
