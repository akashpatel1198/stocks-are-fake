# stocks-are-fake

A personal stock market research and education site. Look up stocks, track a watchlist, read market news, browse insider trades, and learn how the market works.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **State:** Zustand (with localStorage persistence)
- **Search:** Fuse.js (client-side fuzzy search)
- **Charts:** Recharts
- **Icons:** Lucide React
- **Theming:** next-themes (dark/light mode)
- **Data:** Finnhub API (free tier, 60 req/min)

## Live Version

> **[https://stocks-are-fake.vercel.app/](https://stocks-are-fake.vercel.app/)**

Browse stocks, add them to your watchlist, read market news, check insider trading activity, or go through the Learn section for stock market fundamentals. No account required.

## Local Development

### Prerequisites

- Node.js 18+
- npm
- A free [Finnhub](https://finnhub.io/) API key

### Setup

```bash
git clone https://github.com/your-username/stocks-are-fake.git
cd stocks-are-fake
npm install
```

Create a `.env` file in the root:

```env
FINNHUB_API_KEY=your_finnhub_api_key_here
```

| Variable | Description | Where to get it |
|----------|-------------|-----------------|
| `FINNHUB_API_KEY` | API key for all stock data (quotes, news, filings, etc.) | Sign up free at [finnhub.io](https://finnhub.io/) |

Then start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
app/
├── api/                # API routes that proxy requests to Finnhub
│   ├── quote/          # Stock quotes
│   ├── company/        # Company profiles
│   ├── company-news/   # Company-specific news
│   ├── market-news/    # General market news
│   ├── insider/        # Insider transactions
│   ├── filings/        # SEC filings
│   ├── symbols/        # All US stock symbols (~10k)
│   └── ...             # market-status, health, etc.
├── stock/[symbol]/     # Stock detail page (overview, news, insider, filings tabs)
├── search/             # Stock search with fuzzy matching
├── watchlist/          # Saved stocks with price tracking
├── news/               # Market news feed
├── insider/            # Browse insider trades across the market
├── learn/              # Educational content (7 topics + glossary)
│   └── [slug]/         # Individual learn topic pages
├── layout.tsx          # Root layout with sidebar nav
└── page.tsx            # Home page (indices, market status)

components/             # Shared UI components (sidebar, theme toggle, tooltips)
stores/                 # Zustand stores (symbols cache, watchlist)
lib/                    # Axios client config, utilities, learn content data
```

## Notes

- The Finnhub free tier limits you to 60 API calls per minute. The app caches the full symbol list (~10k stocks) client-side to avoid burning through that.
- Historical price charts are not available on the free tier (the `/stock/candle` endpoint returns empty). See `ROADMAP.md` for details on what's blocked and potential alternative data sources.
- This is a single-user app. No auth, no database. Watchlist data lives in localStorage.
