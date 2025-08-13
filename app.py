import streamlit as st
from utils.config import ensure_dirs

st.set_page_config(page_title="FinSight AI", layout="wide")
ensure_dirs()

st.sidebar.title("FinSight AI")
page = st.sidebar.radio("Navigate", [
    "Home", "Upload Documents", "Document Manager",
    "Live Market Data", "KPI Dashboards", "Chart Lab",
    "RAG Chatbot", "Scenario & Alerts"
])

if page == "Home":
    from pages import home; home.run()
elif page == "Upload Documents":
    from pages import upload; upload.run()
elif page == "Document Manager":
    from pages import docs_manager; docs_manager.run()
elif page == "Live Market Data":
    from pages import market_data; market_data.run()
elif page == "KPI Dashboards":
    from pages import kpi_dashboards; kpi_dashboards.run()
elif page == "Chart Lab":
    from pages import chart_lab; chart_lab.run()
elif page == "RAG Chatbot":
    from pages import rag_chatbot; rag_chatbot.run()
elif page == "Scenario & Alerts":
    from pages import scenario_alerts; scenario_alerts.run()
