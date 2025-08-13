import os
import streamlit as st
import pandas as pd
from utils.config import DOCS_DIR

def run():
    st.title("Document Manager")
    files = sorted(os.listdir(DOCS_DIR)) if os.path.exists(DOCS_DIR) else []
    st.write(f"**{len(files)} documents** in repository.")
    if files:
        st.dataframe(pd.DataFrame({"filename": files}), use_container_width=True)
    else:
        st.info("No documents found. Please upload some.")
