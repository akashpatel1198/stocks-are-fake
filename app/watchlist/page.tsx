"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  Loader2,
  Star,
  Trash2,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useWatchlistStore } from "@/stores/useWatchlistStore";

interface Quote {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
}

interface WatchlistItem {
  symbol: string;
  quote: Quote | null;
  loading: boolean;
}

export default function WatchlistPage() {
  const { symbols, removeSymbol } = useWatchlistStore();
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch quotes for all watchlist symbols
  useEffect(() => {
    async function fetchQuotes() {
      if (symbols.length === 0) {
        setItems([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      const updated = await Promise.all(
        symbols.map(async (symbol) => {
          try {
            const res = await fetch(`/api/quote?symbol=${symbol}`);
            if (res.ok) {
              const quote = await res.json();
              if (quote.c !== 0) {
                return { symbol, quote, loading: false };
              }
            }
          } catch (error) {
            console.error(`Failed to fetch ${symbol}:`, error);
          }
          return { symbol, quote: null, loading: false };
        })
      );

      setItems(updated);
      setLoading(false);
    }

    fetchQuotes();
  }, [symbols]);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Watchlist</h1>
        {symbols.length > 0 && (
          <span className="text-sm text-muted-foreground">
            {symbols.length} stock{symbols.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {loading && symbols.length > 0 ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading quotes...</span>
        </div>
      ) : symbols.length === 0 ? (
        <div className="text-center py-16">
          <Eye className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
          <h2 className="text-xl font-semibold mb-2">No stocks in watchlist</h2>
          <p className="text-muted-foreground mb-6">
            Search for stocks and click "Watch" to add them here.
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Star className="h-4 w-4" />
            Find stocks to watch
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.symbol}
              className="flex items-center justify-between p-4 rounded-xl border border-border bg-card group"
            >
              <Link
                href={`/stock/${item.symbol}`}
                className="flex-1 flex items-center gap-6"
              >
                <div className="w-20">
                  <span className="font-bold text-lg">{item.symbol}</span>
                </div>

                {item.quote ? (
                  <>
                    <div className="w-28">
                      <span className="text-xl font-semibold">
                        ${item.quote.c.toFixed(2)}
                      </span>
                    </div>

                    <div
                      className={cn(
                        "flex items-center gap-1 font-medium",
                        item.quote.d >= 0 ? "text-primary" : "text-destructive"
                      )}
                    >
                      {item.quote.d >= 0 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      <span>
                        {item.quote.d >= 0 ? "+" : ""}
                        {item.quote.d.toFixed(2)}
                      </span>
                      <span className="text-muted-foreground">
                        ({item.quote.dp >= 0 ? "+" : ""}
                        {item.quote.dp.toFixed(2)}%)
                      </span>
                    </div>
                  </>
                ) : (
                  <span className="text-muted-foreground">
                    Failed to load quote
                  </span>
                )}
              </Link>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  removeSymbol(item.symbol);
                }}
                className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
                title="Remove from watchlist"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
