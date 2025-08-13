from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
import uvicorn
import os
import shutil
import pandas as pd
import fitz  # PyMuPDF
from sentence_transformers import SentenceTransformer
import faiss
import yfinance as yf

app = FastAPI()

# Serve frontend files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Initialize FAISS
embedder = SentenceTransformer("all-MiniLM-L6-v2")
dimension = 384
index = faiss.IndexFlatL2(dimension)

DOCS_DIR = "uploads"
os.makedirs(DOCS_DIR, exist_ok=True)


@app.get("/")
async def root():
    return FileResponse("index.html")


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_path = os.path.join(DOCS_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Example parsing: PDFs
    if file.filename.endswith(".pdf"):
        doc = fitz.open(file_path)
        text_chunks = []
        for page in doc:
            text = page.get_text()
            if text.strip():
                text_chunks.append(text)
        embeddings = embedder.encode(text_chunks)
        index.add(embeddings)

    return {"status": "success", "filename": file.filename}


@app.get("/search")
async def search_docs(query: str):
    q_vec = embedder.encode([query])
    D, I = index.search(q_vec, k=5)
    return {"results": [int(i) for i in I[0]], "distances": [float(d) for d in D[0]]}


@app.get("/market")
async def market_data(ticker: str):
    stock = yf.Ticker(ticker)
    hist = stock.history(period="1mo")
    if hist.empty:
        return JSONResponse({"error": "No data found"}, status_code=404)
    return hist.reset_index().to_dict(orient="records")


if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
