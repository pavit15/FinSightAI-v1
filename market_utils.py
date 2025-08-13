import yfinance as yf

def get_quote(ticker):
    try:
        stock = yf.Ticker(ticker)
        hist = stock.history(period="1d")
        if not hist.empty:
            price = hist["Close"].iloc[-1]
            prev_close = hist["Close"].iloc[-2] if len(hist) > 1 else price
            return {
                "price": price,
                "change": price - prev_close,
                "change_pct": ((price - prev_close) / prev_close) * 100 if prev_close else 0
            }
    except:
        return None

def get_history(ticker, period="1y"):
    stock = yf.Ticker(ticker)
    return stock.history(period=period)
