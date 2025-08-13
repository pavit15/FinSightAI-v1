import os

DATA_DIR = "data"
DOCS_DIR = os.path.join(DATA_DIR, "docs")
INDEX_PATH = os.path.join(DATA_DIR, "faiss.index")
META_PATH = os.path.join(DATA_DIR, "meta.parquet")

def ensure_dirs():
    os.makedirs(DOCS_DIR, exist_ok=True)

def load_settings():
    return {"stats": {"docs_indexed": 0, "companies_tracked": 0, "alerts_today": 0}}
