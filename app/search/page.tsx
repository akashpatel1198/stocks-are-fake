"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { Search, Loader2, ArrowRight } from "lucide-react";
import { useSymbolStore } from "@/stores/useSymbolStore";

export default function SearchPage() {
  const { symbols, loading, error, fetchSymbols } = useSymbolStore();
  const [query, setQuery] = useState("");

  // Fetch symbols on mount (skips if already fetched)
  useEffect(() => {
    fetchSymbols();
  }, [fetchSymbols]);

  // Initialize Fuse.js
  const fuse = useMemo(() => {
    return new Fuse(symbols, {
      keys: ["symbol", "description"],
      threshold: 0.3,
    });
  }, [symbols]);

  // Search results
  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query, { limit: 20 }).map((result) => result.item);
  }, [fuse, query]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Search Stocks</h1>

      {/* Search Input */}
      <div className="relative max-w-xl mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by symbol or company name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          autoFocus
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading symbols...</span>
        </div>
      )}

      {/* Error State */}
      {error && <p className="text-destructive">{error}</p>}

      {/* Results */}
      {!loading && !error && query.trim() && (
        <div className="space-y-2">
          {results.length === 0 ? (
            <p className="text-muted-foreground">
              No results found for "{query}"
            </p>
          ) : (
            results.map((item) => (
              <Link
                key={item.symbol}
                href={`/stock/${item.symbol}`}
                className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-accent transition-colors group"
              >
                <div>
                  <span className="font-semibold text-foreground">
                    {item.symbol}
                  </span>
                  <span className="ml-3 text-muted-foreground">
                    {item.description}
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))
          )}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && !query.trim() && (
        <p className="text-muted-foreground">
          Start typing to search {symbols.length.toLocaleString()} stocks
        </p>
      )}
    </div>
  );
}
