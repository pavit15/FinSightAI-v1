from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

model = SentenceTransformer("all-MiniLM-L6-v2")
dim = 384
index = faiss.IndexFlatL2(dim)
docs = []

def add_to_index(chunks, metadata):
    embeddings = model.encode(chunks)
    index.add(np.array(embeddings))
    docs.extend(metadata)

def query_rag(question, k=5):
    q_emb = model.encode([question])
    _, idxs = index.search(np.array(q_emb), k)
    return [docs[i] for i in idxs[0]]
