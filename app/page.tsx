"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Activity, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface Quote {
  c: number;  // Current price
  d: number;  // Change
  dp: number; // Percent change
  h: number;  // High
  l: number;  // Low
  o: number;  // Open
  pc: number; // Previous close
}

interface MarketStatus {
  exchange: string;
  holiday: string | null;
  isOpen: boolean;
  session: string;
  t: number;
  timezone: string;
}

interface IndexData {
  symbol: string;
  name: string;
  quote: Quote | null;
  loading: boolean;
}

const INDICES = [
  { symbol: "SPY", name: "S&P 500" },
  { symbol: "QQQ", name: "NASDAQ" },
  { symbol: "DIA", name: "DOW" },
];

export default function Home() {
  const [indices, setIndices] = useState<IndexData[]>(
    INDICES.map((i) => ({ ...i, quote: null, loading: true }))
  );
  const [marketStatus, setMarketStatus] = useState<MarketStatus | null>(null);

  // Fetch market status
  useEffect(() => {
    async function fetchMarketStatus() {
      try {
        const res = await fetch("/api/market-status");
        if (res.ok) {
          const data = await res.json();
          setMarketStatus(data);
        }
      } catch (error) {
        console.error("Failed to fetch market status:", error);
      }
    }
    fetchMarketStatus();
  }, []);

  // Fetch quotes for indices
  useEffect(() => {
    async function fetchQuotes() {
      const updated = await Promise.all(
        INDICES.map(async (index) => {
          try {
            const res = await fetch(`/api/quote?symbol=${index.symbol}`);
            if (res.ok) {
              const quote = await res.json();
              return { ...index, quote, loading: false };
            }
          } catch (error) {
            console.error(`Failed to fetch ${index.symbol}:`, error);
          }
          return { ...index, quote: null, loading: false };
        })
      );
      setIndices(updated);
    }
    fetchQuotes();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Market Overview</h1>

      {/* Market Status */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          <span className="font-medium">Market Status:</span>
          {marketStatus ? (
            <span
              className={cn(
                "px-2 py-1 rounded-full text-sm font-medium",
                marketStatus.isOpen
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {marketStatus.isOpen ? "Open" : "Closed"}
              {marketStatus.holiday && ` (${marketStatus.holiday})`}
            </span>
          ) : (
            <span className="text-muted-foreground">Loading...</span>
          )}
        </div>
        <a
          href="https://www.nyse.com/markets/hours-calendars"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <span>Market Hours</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      {/* Major Indices */}
      <h2 className="text-xl font-semibold mb-4">Major Indices</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {indices.map((index) => (
          <div
            key={index.symbol}
            className="p-6 rounded-xl border border-border bg-card"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{index.name}</span>
              <span className="text-xs text-muted-foreground/70">
                {index.symbol}
              </span>
            </div>

            {index.loading ? (
              <div className="h-16 flex items-center">
                <span className="text-muted-foreground">Loading...</span>
              </div>
            ) : index.quote ? (
              <>
                <div className="text-2xl font-bold mb-1">
                  ${index.quote.c.toFixed(2)}
                </div>
                <div
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium",
                    index.quote.d >= 0 ? "text-primary" : "text-destructive"
                  )}
                >
                  {index.quote.d >= 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span>
                    {index.quote.d >= 0 ? "+" : ""}
                    {index.quote.d.toFixed(2)} ({index.quote.dp >= 0 ? "+" : ""}
                    {index.quote.dp.toFixed(2)}%)
                  </span>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Today vs prev close (${index.quote.pc.toFixed(2)})
                </div>
              </>
            ) : (
              <div className="h-16 flex items-center">
                <span className="text-muted-foreground">Failed to load</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Why This Exists */}
      <div className="mt-16 pt-8 border-t border-border">
        <h2 className="text-lg font-semibold mb-4">Why This Exists</h2>
        <div className="flex flex-col gap-4 text-base text-muted-foreground leading-relaxed">
          {[
            "This isn't here to sell you on the idea that the stock market is your ticket to wealth.",
            "This site is about education. Financial literacy matters regardless of your economic philosophy or personal goals. Understanding how markets work, what the terminology means, and how to read financial data is valuable knowledge. Whether you choose to participate in the market or simply want to understand the system you live within.",
            "Your reasons for wanting this knowledge are your own. This site just explains how it actually works.",
          ].map((text, i) => (
            <p key={i}>
              {text}
            </p>
          ))}
        </div>
      </div>

      {/* Personal Philosophy */}
      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-lg font-semibold mb-4">Personal Philosophy</h2>
        <div className="flex flex-col gap-4 text-base text-muted-foreground leading-relaxed">
          <p>
            The stock market is largely a wealth transfer mechanism. Those with capital grow it exponentially while wages stagnate. The &quot;just invest early&quot; narrative ignores that most people don&apos;t have spare capital.
          </p>
          <p>
            Studies consistently show that{" "}
            <a href="https://vettedpropfirms.com/day-trading-statistics/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              90% of day traders lose money
            </a>
            . Research from Brazil found 97% lost money after 300 days. In Taiwan, only 1% were consistently profitable over multiple years. For most people, trading is gambling.
          </p>
          <p>
            Some argue you can beat the market with an &quot;edge&quot; through research and knowing what to buy. But if you&apos;re trading on information that moves prices, someone with better access already traded on it. When news breaks, institutional traders have already positioned themselves. They have direct lines to executives, armies of analysts, and technology that processes information in microseconds. By the time you react, the price has moved.
          </p>
          <p>
            HFT firms extract roughly{" "}
            <a href="https://www.fca.org.uk/publications/occasional-papers/occasional-paper-no-50-quantifying-high-frequency-trading-arms-race-new-methodology" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              $5 billion annually
            </a>
            {" "}through speed advantages alone. They can see your order coming and trade ahead of it. The playing field isn&apos;t level.
          </p>
        </div>
      </div>

      {/* When Retail Fought Back */}
      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-lg font-semibold mb-4">When Retail Fought Back</h2>
        <div className="flex flex-col gap-4 text-base text-muted-foreground leading-relaxed">
          <p>
            In January 2021, retail traders on Reddit&apos;s r/wallstreetbets noticed something: hedge funds had{" "}
            <a href="https://en.wikipedia.org/wiki/GameStop_short_squeeze" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              shorted over 140% of GameStop&apos;s available shares
            </a>
            . They were so confident the company would fail that they borrowed more shares than actually existed. It was supposed to be free money for Wall Street.
          </p>
          <p>
            Retail investors started buying. The stock surged 1,600% in weeks, reaching over $480 per share.{" "}
            <a href="https://www.nytimes.com/2022/05/18/business/melvin-capital-gamestop-short.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Melvin Capital
            </a>
            , one of the hedge funds betting against GameStop, lost 53% of its value in a single month and needed a $2.75 billion emergency bailout from Citadel and Point72. They shut down entirely in 2022.
          </p>
          <p>
            For a brief moment, regular people used the same tactics Wall Street uses every day: coordinated buying, understanding market mechanics, and exploiting over-leveraged positions. The difference? When hedge funds do it, it&apos;s called &quot;smart investing.&quot; When retail does it, the system intervenes.
          </p>
        </div>
      </div>

      {/* The System Protects Itself */}
      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-lg font-semibold mb-4">The System Protects Itself</h2>
        <div className="flex flex-col gap-4 text-base text-muted-foreground leading-relaxed">
          <p>
            At the height of the GameStop surge, Robinhood and other brokers blocked retail investors from buying more shares. You could only sell. The stock price immediately collapsed. Robinhood claimed it was due to &quot;clearinghouse requirements,&quot; but the timing was suspicious: restrictions kicked in exactly when hedge funds were facing catastrophic losses.
          </p>
          <p>
            <a href="https://www.cnbc.com/2021/02/17/robinhood-faces-lawsuits-after-gamestop-trading-halt.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Over 50 federal lawsuits were filed
            </a>
            . Investors alleged Robinhood colluded with Citadel Securities to protect hedge fund positions. The cases were dismissed. The court ruled that Robinhood&apos;s customer agreement permitted the restrictions. The fine print protected them.
          </p>
          <p>
            Here&apos;s what most people don&apos;t know: Robinhood makes about 75% of its revenue from{" "}
            <a href="https://www.reuters.com/markets/us/sec-eyes-pfof-reforms-stock-market-what-is-pfof-2022-06-08/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              &quot;payment for order flow&quot; (PFOF)
            </a>
            . They sell your trades to market makers like Citadel before executing them. Citadel sees what you&apos;re buying, and can trade ahead of you. This practice is banned in Canada, the UK, and Australia. In the US, it&apos;s the business model.
          </p>
          <p>
            The SEC{" "}
            <a href="https://www.sec.gov/news/press-release/2022-221" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              charged eight social media influencers
            </a>
            {" "}in 2022 for a $100 million pump-and-dump scheme. They promoted stocks to followers, then secretly sold while recommending others buy. The little guys got prosecuted. The big players who do this at scale? They call it market making.
          </p>
        </div>
      </div>

      {/* Global Manipulation */}
      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-lg font-semibold mb-4">Global Manipulation</h2>
        <div className="flex flex-col gap-4 text-base text-muted-foreground leading-relaxed">
          <p>
            In July 2025, India&apos;s securities regulator (SEBI){" "}
            <a href="https://www.reuters.com/sustainability/boards-policy-regulation/india-regulator-bars-jane-street-accessing-its-securities-market-2025-07-04/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              banned Jane Street
            </a>
            , one of the world&apos;s largest trading firms, from their market. SEBI called it &quot;an intentional, well-planned and sinister scheme&quot; and{" "}
            <a href="https://www.business-standard.com/markets/news/sebi-cracks-down-on-jane-street-halts-india-trading-over-manipulation-125070700659_1.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              seized $567 million
            </a>
            {" "}in alleged illegal profits.
          </p>
          <p>
            The scheme: Jane Street would buy large amounts of index stocks in the morning to artificially push prices up, while simultaneously building short positions in options that would profit when prices fell later. They made over $4 billion from India in just two years.{" "}
            <a href="https://www.reuters.com/sustainability/boards-policy-regulation/how-india-struggled-regulate-jane-streets-money-spinning-machine-2025-08-14/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Retail investors in India lost $21 billion over three years
            </a>
            .
          </p>
          <p>
            Jane Street claims it was just &quot;basic arbitrage.&quot; SEBI disagreed. The difference between the US and India? India actually investigated and took action.
          </p>
          <p>
            This isn&apos;t unique to Jane Street. The pattern repeats globally: sophisticated firms extract billions from markets where retail participation is high, using strategies that are technically legal or exist in regulatory gray zones. When caught, they pay fines that amount to a fraction of their profits. The game continues.
          </p>
        </div>
      </div>
    </div>
  );
}
