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
  - [ ] **Chart** — ⚠️ *Blocked: requires premium API (historical candles)*
  - [x] **News** — Company-specific news
  - [x] **Insider** — Insider transactions table
  - [x] **Filings** — SEC filings list
- [x] Add to watchlist button (placeholder, functional in Phase 4)

---

### Phase 4: Watchlist ✅
- [x] Watchlist page (`/watchlist`)
- [x] Add/remove stocks to watchlist
- [x] Persist watchlist (Zustand + localStorage)
- [ ] **Mini sparkline charts** — ⚠️ *Blocked: requires premium API (historical candles)*
- [x] Price change indicators (up/down/neutral)
- [x] Quick stats (price, change %)

---

### Phase 5: Charts & Quotes ⏸️ SKIPPED
> ⚠️ **Blocked by Finnhub free tier** — Historical candle data (`/stock/candle`) returns empty on free plan.
> Could revisit with alternative data source (Yahoo Finance, Alpha Vantage, etc.)

- [ ] Real-time/delayed stock quotes
- [ ] Historical price charts (1D, 1W, 1M, 3M, 1Y, ALL)
- [ ] Candlestick vs line chart toggle
- [ ] Volume overlay

---

### Phase 6: News ✅
- [x] News page (`/news`)
- [x] Market-wide news feed
- [x] Company-specific news (on stock detail page)
- [ ] Sentiment indicators — ⚠️ *Blocked: Finnhub news sentiment requires premium*
- [x] News filtering/search

---

### Phase 7: Insider Trading & SEC Filings ✅
- [x] Insider page (`/insider`)
- [x] Insider transactions feed (buys/sells by executives)
- [x] SEC filings list (10-K, 10-Q, 8-K, etc.)
- [x] Filter by company (search-based)
- [x] "Notable insider activity" highlights (>$1M transactions)
- [x] Link to full filing documents
- [x] Insider sentiment API (`/api/insider-sentiment`)
- [x] Insider sentiment summary card (MSPR, buy/sell months, net change)
- [x] Beginner-friendly tooltips explaining finance jargon

*Inspiration: [QuiverQuant](https://www.quiverquant.com/)*

---

### Phase 8: 📚 Learn Section (Documentation/Reference) ✅
> Static educational content for **true beginners** — organized as a learning path.
> Goal: Someone new to finance wants to start investing (mainly stocks).

- [x] Learn page (`/learn`)
- [x] **Fuzzy search across all docs**
- [x] Sidebar table of contents
- [x] Previous/next navigation between topics

**Topics (in learning order):**

- [x] **1. Getting Ready to Invest**
  - Are you ready? (emergency fund, high-interest debt first)
  - Setting financial goals
  - Understanding your risk tolerance
  - Time horizon: when do you need this money?

- [x] **2. Why Investing Matters**
  - Inflation: why cash loses value over time
  - Compound interest: the 8th wonder of the world
  - Time in market vs timing the market
  - The power of starting early (with examples)

- [x] **3. How the Stock Market Works**
  - What is a stock? (ownership in a company)
  - Stock exchanges (NYSE, NASDAQ)
  - Market hours & holidays
  - Bull vs bear markets
  - How prices are determined (supply & demand)

- [x] **4. Types of Investments**
  - Stocks (individual company ownership)
  - ETFs & Index Funds ⭐ (recommended for beginners)
  - Mutual Funds (brief comparison)
  - Bonds (brief overview)
  - Why ETFs are great for starting out

- [x] **5. Your First Investment**
  - Choosing a brokerage (what to look for)
  - Types of accounts (taxable vs retirement)
  - Placing your first order
  - Dollar-cost averaging (invest regularly, reduce stress)
  - Fractional shares (start with any amount)

- [x] **6. Retirement Accounts**
  - 401(k) basics & employer match ("free money")
  - Traditional vs Roth IRA
  - Why to prioritize tax-advantaged accounts

- [x] **7. Reading Stock Data**
  - Stock quotes & tickers
  - Key metrics (P/E ratio, market cap, EPS, dividend yield)
  - What the numbers on this site mean
  - How to research a company

- [x] **8. Common Mistakes to Avoid**
  - Emotional investing (fear & greed)
  - Trying to time the market
  - Chasing hot tips / FOMO
  - Not diversifying
  - Panic selling during downturns
  - Ignoring fees

- [x] **9. Glossary**
  - A-Z financial terms reference

---

### Phase 8.5: Expand Tooltips Site-wide
> After Learn section is complete, add beginner-friendly tooltips to other pages.

- [ ] Home page (indices, market status terminology)
- [ ] Stock detail page (P/E, market cap, EPS, etc.)
- [ ] Watchlist page (price change, volume)
- [ ] News page (sentiment, if added later)
- [ ] Link tooltips to relevant Learn pages where helpful

---

### Phase 9: 📈 Advanced Topics (Future)
> Content for users who've mastered the basics. Lower priority.

- [ ] **Options 101**
  - What are options?
  - Calls vs puts
  - Strike price & expiration
  - Basic strategies (covered call, protective put)

- [ ] **Trading Concepts**
  - Order types deep dive (market, limit, stop-loss, stop-limit)
  - Bid/ask spread & slippage
  - Volume & liquidity
  - Short selling

- [ ] **Bonds & Fixed Income (Deep Dive)**
  - Bond pricing & yields
  - Duration & interest rate risk
  - Government vs corporate vs municipal

- [ ] **Technical Analysis Basics**
  - Reading candlestick charts
  - Support & resistance
  - Common indicators (moving averages, RSI)

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

| Feature | Endpoint | Free Tier |
|---------|----------|-----------|
| Stock symbols | `/stock/symbol?exchange=US` | ✅ |
| Quote | `/quote?symbol=AAPL` | ✅ |
| Company profile | `/stock/profile2?symbol=AAPL` | ✅ |
| Company news | `/company-news?symbol=AAPL` | ✅ |
| Market news | `/news?category=general` | ✅ |
| Insider transactions | `/stock/insider-transactions?symbol=AAPL` | ✅ |
| Insider sentiment | `/stock/insider-sentiment?symbol=AAPL` | ✅ |
| SEC filings | `/stock/filings?symbol=AAPL` | ✅ |
| Candles (historical) | `/stock/candle?symbol=AAPL&resolution=D&from=...&to=...` | ❌ Premium |
| Market status | `/stock/market-status?exchange=US` | ✅ |

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

---

## ⚠️ Premium API Limitations

The following features are **blocked by Finnhub's free tier**:

| Feature | Reason | Workaround |
|---------|--------|------------|
| Historical price charts | `/stock/candle` returns empty array | Use alternative API (Yahoo Finance, Alpha Vantage) |
| Watchlist sparklines | Requires candle data | Same as above |
| News sentiment scores | Premium-only field | Could use external NLP service |
| Real-time quotes | WebSocket requires premium | Polling with `/quote` works but is delayed |

**Alternative data sources to consider:**
- [Yahoo Finance](https://www.yahoofinanceapi.com/) — Free historical data
- [Alpha Vantage](https://www.alphavantage.co/) — Free tier with historical data
- [Polygon.io](https://polygon.io/) — Free tier available

---

## 📝 Notes

- Free Finnhub tier = 60 API calls/min — use caching!
- Symbol list is large (~10k) — fetch once, search client-side
- No auth needed for personal use (single user)

---

*Last updated: Feb 15, 2026*

---

## 📊 Progress Summary

| Phase | Status |
|-------|--------|
| Phase 1: Foundation | ✅ Complete |
| Phase 2: Home & Market Overview | ✅ Complete |
| Phase 3: Stock Detail Page | ✅ Complete (chart blocked) |
| Phase 4: Watchlist | ✅ Complete (sparklines blocked) |
| Phase 5: Charts & Quotes | ⏸️ Skipped (premium API) |
| Phase 6: News | ✅ Complete |
| Phase 7: Insider Trading | ✅ Complete |
| Phase 8: Learn Section | ✅ Complete |
| Phase 8.5: Expand Tooltips | 🔄 **Up Next** |
| Phase 9: Advanced Topics | ⏳ Future |
