import streamlit as st
from utils.parsers import parse_file
from utils.rag_utils import add_to_index

def run():
    st.title("Upload Documents")
    files = st.file_uploader("Upload PDF/XLSX/CSV/TXT", accept_multiple_files=True)
    if files:
        for f in files:
            chunks, meta = parse_file(f)
            add_to_index(chunks, meta)
        st.success("Files uploaded & processed successfully")
