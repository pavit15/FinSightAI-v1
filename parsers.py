import pandas as pd
from io import BytesIO
import fitz

def parse_file(uploaded_file):
    filename = uploaded_file.name
    data = uploaded_file.read()
    if filename.lower().endswith(".pdf"):
        doc = fitz.open(stream=BytesIO(data), filetype="pdf")
        chunks = [page.get_text() for page in doc]
        meta = [{"filename": filename, "page": i+1} for i in range(len(chunks))]
        return chunks, meta
    return [], []
