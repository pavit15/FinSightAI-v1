# **FinSight AI**

A document analyzer + RAG Chatbot for the **stock markets**  

**Production ready**, **open source**, **free AI powered** analysis suite for **all** financial professionals.  

## **Overview**
It enables **analysts** to **upload**, **parse**, **analyze**, and **interact** with **financial documents** such as **Annual reports**, **Balance sheets**, **Profit and loss sheets**, **Cash flow statements**, and many more!  

It uses:

1. **AI powered RAG Chatbot** with **page level citations**  
2. **FAISS Vector Store** for **embeddings search**  
3. **Advanced Financial Intelligence** (**Ratios**, **Peer Benchmarking**, **Alerts**, **Forecast Models**)  
4. **Interactive Dashboards** for **KPIs**, **YoY Growth**, and **Scenario Testing**
   
<img width="1280" height="696" alt="image" src="https://github.com/user-attachments/assets/73d98d90-7294-4bbe-9164-7b4de9649158" />

## Features

**1. Intelligent Document Processing**
- Upload and process PDF, XLSX, CSV, TXT  
- Auto extract structured tables & unstructured text  
- Indian currency normalization (₹, lakh, crore to float)  
- Metadata tracking (source filename, page no.)  
- Cross document semantic search & insights synthesis  

<img width="817" height="818" alt="image" src="https://github.com/user-attachments/assets/93e38580-6182-4de9-b0f6-f7d4fca7a95d" />
<img width="1280" height="273" alt="image" src="https://github.com/user-attachments/assets/a5c1e0d2-ee0a-44ad-b1c3-8ff0a54ee8cb" />

**2. Advanced RAG Chatbot**
- Multi step reasoning with numeric calculations  
- Grounded answers with source citations  
- Understands Indian financial terms & ratios  
- 4 Expert Personas: Senior Analyst, Investment Advisor, Risk Manager, CFO Advisor  
- Chatbot driven decision workflows (export/email)  
<img width="1280" height="704" alt="image" src="https://github.com/user-attachments/assets/1502f510-4671-4539-827a-f3582823006e" />

**3. Financial Dashboards & KPI Analytics**
- Auto generated KPI dashboards by company  
- Custom KPI builder  
- YoY trend analysis, CAGR, margins, ROE, liquidity, leverage  
- Interactive ratio & chart lab (drag/drop metrics)  
- Smart company selector dropdown  

<img width="1280" height="606" alt="image" src="https://github.com/user-attachments/assets/8eacb320-6151-431f-aaf6-fa5a29774904" />

**4. Market & Forecast Intelligence**
- Live NSE/BSE data integration  
- Automated peer comparison & benchmarking  
- Scenario & forecast modeling   
- Investor profile personalization  
- Smart alerts & recommendation engine
  
<img width="1280" height="610" alt="image" src="https://github.com/user-attachments/assets/076e4849-21a3-492f-9a45-c467d8e2c86b" />

**5. Data Provenance & Compliance**
- Sentence level provenance tracking  
- Full transparency on data sources & calculations  
- Supports audit ready documentation

<img width="1280" height="619" alt="image" src="https://github.com/user-attachments/assets/1fc66455-81ba-4c3f-994b-b72893fe1fd4" />

<img width="1280" height="626" alt="image" src="https://github.com/user-attachments/assets/0b1ad603-4e37-4c06-a6cc-0efbe41c24e5" />


## Tech Stack

- **Data Handling:** Pandas, NumPy, OpenPyXL, PyMuPDF  
- **NLP & Embeddings:** SentenceTransformers 
- **Vector DB:** FAISS  
- **Visualizations:** Plotly, Altair  
- **Forecasting:** Facebook Prophet, scikit-learn  
- **Testing:** pytest
- **Frontend & Pages:** HTML, CSS, JavaScript   

## Installation

#### 1. Clone & setup
```bash
git clone https://github.com/pavit15/FinSightAI-v1.git
cd FinSightAI-v1
cp .env.example .env    # Add your API keys
```

#### 2️. Local python install
```bash
pip install -r requirements.txt
streamlit run main.py
```
#### 3. Docker
```bash
docker-compose up --build
```

App will be available at: http://localhost:8501

## Usage Guide

1. Go to **Upload Documents** page → drag & drop reports  
2. View parsed documents in **Document List**  
3. Check **Dashboards** for auto-analysis  
4. Chat in **RAG Chatbot** → get answers with citations  
5. Build your own **Ratios** and **KPIs**  
6. Use **Scenario Lab** to test assumptions  
7. Get **Smart Alerts** for anomalies and events  

## Security & sAfety

- Input validation on all uploads  
- File size & type restrictions  
- Temporary file cleanup after processing  
- Error logging & resilience  
- API keys stored only in `.env`  
