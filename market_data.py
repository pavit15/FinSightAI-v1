import streamlit as st
from utils.market_utils import get_quote, get_history

def run():
    st.title("Live Market Data")
    ticker = st.text_input("Enter NSE/BSE ticker", value="RELIANCE.NS")
    if st.button("Fetch Data"):
        quote = get_quote(ticker)
        if quote:
            st.metric("Price", f"{quote['price']:.2f}")
            st.metric("Change", f"{quote['change']:.2f}")
            st.metric("Change %", f"{quote['change_pct']:.2f}%")
            hist = get_history(ticker)
            st.line_chart(hist["Close"])
        else:
            st.error("Could not fetch data")
