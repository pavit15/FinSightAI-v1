import streamlit as st
from utils.rag_utils import query_rag

def run():
    st.title("RAG Chatbot")
    q = st.text_input("Ask your question:")
    if st.button("Get Answer") and q:
        hits = query_rag(q)
        st.write("### Top citations:")
        for hit in hits:
            st.write(f"- {hit['filename']} (page {hit['page']})")
