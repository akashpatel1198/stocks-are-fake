# 📈 stocks-are-fake — Product Roadmap

> Personal stock market site for learning, research, and tracking. Built with Next.js + Finnhub API.

---

## 🎯 Project Goals

- **Beginner-friendly** — clean UI, not overwhelming
- **Learning-first** — understand the market, not just view data
- **No account linking** — no portfolio sync, just watchlists
- **Personal use** — optimized for one user, not scale

---

## 🗺️ Site Structure

### Layout: Sidebar Navigation

```
┌──────────┬──────────────────────────────┐
│ 🏠 Home  │                              │
│ 🔍 Search│       [Page Content]         │
│ 👁 Watch │                              │
│ 📰 News  │                              │
│ 🕵️ Insider│                             │
│ 📚 Learn │                              │
└──────────┴──────────────────────────────┘
```

### Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Market overview, indices, market status |
| `/search` | Search/Explore | Find stocks with fuzzy search |
| `/watchlist` | Watchlist | Your saved stocks with sparklines |
| `/news` | News | Market-wide news feed |
| `/insider` | Insider Activity | Browse insider trades across market |
| `/learn` | Learn | Documentation & education |
| `/learn/[topic]` | Learn Topic | Individual topic pages |
| `/stock/[symbol]` | Stock Detail | Tabbed view: Chart / News / Insider / Filings |

---

## 🚀 Phases

### Phase 1: Foundation ✅
- [x] Project setup (Next.js, Tailwind)
- [x] Finnhub API integration
- [x] Basic API routes (`/api/symbols`, `/api/health`)
- [x] Sidebar navigation layout
- [x] Stock symbol search (fuzzy search with Fuse.js)
- [x] Search page (`/search`)
- [x] Zustand store for symbols (with in-memory caching)
- [x] Dark/light theme toggle (next-themes)
- [x] Green money theme

---

### Phase 2: Home & Market Overview ✅
- [x] Home page (`/`)
- [x] Major indices display (S&P 500, NASDAQ, DOW)
- [x] Market status indicator (Open/Closed)
- [x] Link to NYSE market hours calendar

---

### Phase 3: Stock Detail Page ✅
- [x] Stock detail page (`/stock/[symbol]`)
- [x] **Tabbed interface:**
  - [x] **Overview** — Price, change %, key stats, company info
  - [ ] **Chart** — Historical price chart (requires premium/alternative data)
  - [x] **News** — Company-specific news
  - [x] **Insider** — Insider transactions table
  - [x] **Filings** — SEC filings list
- [x] Add to watchlist button (placeholder, functional in Phase 4)

---

### Phase 4: Watchlist ✅
- [x] Watchlist page (`/watchlist`)
- [x] Add/remove stocks to watchlist
- [x] Persist watchlist (Zustand + localStorage)
- [ ] **Mini sparkline charts** next to each stock (requires premium data)
- [x] Price change indicators (up/down/neutral)
- [x] Quick stats (price, change %)

---

### Phase 5: Charts & Quotes (Skipped - requires premium)
- [ ] Real-time/delayed stock quotes
- [ ] Historical price charts (1D, 1W, 1M, 3M, 1Y, ALL)
- [ ] Candlestick vs line chart toggle
- [ ] Volume overlay

---

### Phase 6: News ✅
- [x] News page (`/news`)
- [x] Market-wide news feed
- [x] Company-specific news (on stock detail page)
- [ ] Sentiment indicators (if available via Finnhub)
- [x] News filtering/search

---

### Phase 7: Insider Trading & SEC Filings ✅
- [x] Insider page (`/insider`)
- [x] Insider transactions feed (buys/sells by executives)
- [x] SEC filings list (10-K, 10-Q, 8-K, etc.)
- [x] Filter by company (search-based)
- [x] "Notable insider activity" highlights (>$1M transactions)
- [x] Link to full filing documents
- [x] Insider sentiment API route (created, not yet displayed)

*Inspiration: [QuiverQuant](https://www.quiverquant.com/)*

---

### Phase 8: 📚 Learn Section (Documentation/Reference)
> Static educational content — no API, just well-organized text.

- [ ] Learn page (`/learn`)
- [ ] **Fuzzy search across all docs**
- [ ] Sidebar table of contents

**Topics:**

- [ ] **Market Basics**
  - What is the stock market?
  - How do stocks work?
  - Market hours & exchanges (NYSE, NASDAQ)
  - Bull vs bear markets

- [ ] **Trading Concepts**
  - Order types (market, limit, stop-loss)
  - Bid/ask spread
  - Volume & liquidity
  - Short selling

- [ ] **Options 101**
  - What are options?
  - Calls vs puts
  - Strike price & expiration
  - Basic strategies (covered call, protective put)

- [ ] **Bonds & Fixed Income**
  - What are bonds?
  - Yield & interest rates
  - Government vs corporate bonds

- [ ] **Reading Financial Data**
  - How to read a stock chart
  - Key metrics (P/E, market cap, EPS)
  - Understanding SEC filings

- [ ] **Glossary**
  - A-Z financial terms reference

---

## 🛠 Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS 4 |
| API | Finnhub (free tier, 60 req/min) |
| Search | Fuse.js (client-side fuzzy search) |
| Charts | TBD (Recharts installed, Lightweight Charts, or Tremor) |
| State | Zustand (symbols store) |
| Theming | next-themes (dark/light mode) |
| Storage | localStorage via Zustand persist (for watchlist) |

---

## 📋 API Endpoints (Finnhub)

Reference: [finnhub.io/docs/api](https://finnhub.io/docs/api)

| Feature | Endpoint |
|---------|----------|
| Stock symbols | `/stock/symbol?exchange=US` |
| Quote | `/quote?symbol=AAPL` |
| Company profile | `/stock/profile2?symbol=AAPL` |
| Company news | `/company-news?symbol=AAPL` |
| Market news | `/news?category=general` |
| Insider transactions | `/stock/insider-transactions?symbol=AAPL` |
| SEC filings | `/stock/filings?symbol=AAPL` |
| Candles (historical) | `/stock/candle?symbol=AAPL&resolution=D&from=...&to=...` |
| Market status | `/stock/market-status?exchange=US` |

---

## 🎨 Design Principles

1. **Clean, not empty** — show useful data, but don't overwhelm
2. **Beginner-friendly** — tooltips, explanations where needed
3. **Fast** — minimize API calls, cache aggressively
4. **Dark mode friendly** — finance apps look better dark

---

## 💡 Future Ideas (Backlog)

- [ ] Price alerts (browser notifications)
- [ ] Earnings calendar
- [ ] Dividend tracker
- [ ] Compare stocks side-by-side
- [ ] Export watchlist to CSV
- [ ] Mobile PWA
- [ ] Watchlist groups/tags
- [ ] Personal notes on stocks
- [ ] Top movers (gainers/losers)
- [ ] "Explain this" tooltips linking to Learn

---

## 📝 Notes

- Free Finnhub tier = 60 API calls/min — use caching!
- Symbol list is large (~10k) — fetch once, search client-side
- No auth needed for personal use (single user)

---

*Last updated: Feb 15, 2026*
