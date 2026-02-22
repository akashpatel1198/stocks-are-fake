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

      {/* Philosophy */}
      <div className="mt-16 pt-8 border-t border-border max-w-3xl">
        <h2 className="text-lg font-semibold mb-4">Why This Exists</h2>
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            This isn&apos;t a site about getting rich quick. It&apos;s not here to sell you on the idea that
            the stock market is your ticket to wealth, or that you just need to &quot;start early&quot; and
            &quot;let compound interest work its magic.&quot; That narrative ignores the reality that the
            market is largely a wealth transfer mechanism that benefits those who already have capital.
          </p>
          <p>
            The stock market has historically been a tool for the wealthy to grow their wealth
            exponentially while wages stagnate and the middle class shrinks.
          </p>
          <p>
            This site is about education. Financial literacy matters regardless of your
            economic philosophy or personal goals. Understanding how markets work, what the terminology
            means, and how to read financial data is valuable knowledge — whether you choose to
            participate in the market or simply want to understand the system you live within.
          </p>
          <p>
            Your reasons for wanting this knowledge are your own. This site just explains
            how it actually works.
          </p>
        </div>
      </div>
    </div>
  );
}
