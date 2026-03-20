"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import {
  Search,
  Loader2,
  ArrowUpDown,
  Shuffle,
  ChevronDown,
  X,
  HelpCircle,
} from "lucide-react";
import { useSymbolStore, Symbol } from "@/stores/useSymbolStore";
import { cn } from "@/lib/utils";

type SortOption = "best-match" | "symbol-asc" | "symbol-desc" | "name-asc" | "name-desc" | "type";

const ITEMS_PER_PAGE = 36;

const TYPE_COLORS: Record<string, string> = {
  "Common Stock": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "ETP": "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  "ADR": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Preferred Stock": "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  "Warrant": "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  "Unit": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "Right": "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  "Structured Product": "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  "NYRS": "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  "PUBLIC": "bg-lime-500/10 text-lime-600 dark:text-lime-400",
  "Ltd Part": "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400",
  "REIT": "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  "MLP": "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  "Closed-End Fund": "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  "Open-End Fund": "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  "": "bg-gray-500/10 text-gray-600 dark:text-gray-400",
};

const TYPE_LABELS: Record<string, string> = {
  "Common Stock": "Stock",
  "ETP": "ETF",
  "Preferred Stock": "Pref",
  "Structured Product": "Struct",
  "Ltd Part": "LP",
  "Closed-End Fund": "CEF",
  "Open-End Fund": "Fund",
  "": "Other",
};

const TYPE_DESCRIPTIONS: { type: string; label: string; description: string }[] = [
  {
    type: "Common Stock",
    label: "Stock",
    description: "Regular shares of ownership in a company. When you buy stock, you own a small piece of that company and may receive dividends.",
  },
  {
    type: "ETP",
    label: "ETF",
    description: "Exchange-Traded Fund. A basket of securities (stocks, bonds, etc.) that trades like a single stock. Great for diversification.",
  },
  {
    type: "ADR",
    label: "ADR",
    description: "American Depositary Receipt. Allows you to buy shares of foreign companies on US exchanges without dealing with foreign currencies.",
  },
  {
    type: "Preferred Stock",
    label: "Pref",
    description: "A type of stock with fixed dividends paid before common stockholders. Less voting rights but more predictable income.",
  },
  {
    type: "REIT",
    label: "REIT",
    description: "Real Estate Investment Trust. A company that owns income-producing real estate. Required to pay 90% of taxable income as dividends.",
  },
  {
    type: "Closed-End Fund",
    label: "CEF",
    description: "A fund with a fixed number of shares that trades on exchanges. Price can differ from the underlying asset value.",
  },
  {
    type: "Open-End Fund",
    label: "Fund",
    description: "A mutual fund that trades on exchanges. Creates new shares when investors buy and redeems shares when they sell.",
  },
  {
    type: "Warrant",
    label: "Warrant",
    description: "A contract giving the right to buy stock at a specific price before expiration. Similar to options but issued by the company.",
  },
  {
    type: "Unit",
    label: "Unit",
    description: "A bundled security combining common stock with warrants or other securities. Often seen with SPACs.",
  },
  {
    type: "Right",
    label: "Right",
    description: "A short-term privilege to buy additional shares at a discount, usually offered to existing shareholders.",
  },
  {
    type: "MLP",
    label: "MLP",
    description: "Master Limited Partnership. A publicly traded partnership, often in energy. Offers tax advantages but complex reporting.",
  },
  {
    type: "Ltd Part",
    label: "LP",
    description: "Limited Partnership units. Similar to MLPs, representing ownership in a partnership structure.",
  },
  {
    type: "Structured Product",
    label: "Struct",
    description: "Complex financial instruments with returns linked to underlying assets. Often includes derivatives.",
  },
];

export default function SearchPage() {
  const { symbols, loading, error, fetchSymbols } = useSymbolStore();
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("symbol-asc");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [randomSeed, setRandomSeed] = useState<number | null>(null);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showTypesModal, setShowTypesModal] = useState(false);
  const [surpriseClicked, setSurpriseClicked] = useState(false);

  useEffect(() => {
    fetchSymbols();
  }, [fetchSymbols]);

  const fuse = useMemo(() => {
    return new Fuse(symbols, {
      keys: ["symbol", "description"],
      threshold: 0.3,
    });
  }, [symbols]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return null;
    return fuse.search(query, { limit: 500 }).map((result) => result.item);
  }, [fuse, query]);

  const applySorting = useCallback((items: Symbol[], isSearchResult: boolean = false) => {
    if (randomSeed !== null) {
      const shuffled = [...items];
      let seed = randomSeed;
      for (let i = shuffled.length - 1; i > 0; i--) {
        seed = (seed * 9301 + 49297) % 233280;
        const j = Math.floor((seed / 233280) * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }

    if (sortBy === "best-match") {
      if (isSearchResult) {
        return items;
      }
      return [...items].sort((a, b) => a.symbol.localeCompare(b.symbol));
    }

    const sorted = [...items];
    switch (sortBy) {
      case "symbol-asc":
        return sorted.sort((a, b) => a.symbol.localeCompare(b.symbol));
      case "symbol-desc":
        return sorted.sort((a, b) => b.symbol.localeCompare(a.symbol));
      case "name-asc":
        return sorted.sort((a, b) => a.description.localeCompare(b.description));
      case "name-desc":
        return sorted.sort((a, b) => b.description.localeCompare(a.description));
      case "type":
        return sorted.sort((a, b) => {
          const typeOrder = { "Common Stock": 0, "ETP": 1, "ADR": 2 };
          const aOrder = typeOrder[a.type as keyof typeof typeOrder] ?? 3;
          const bOrder = typeOrder[b.type as keyof typeof typeOrder] ?? 3;
          if (aOrder !== bOrder) return aOrder - bOrder;
          return a.symbol.localeCompare(b.symbol);
        });
      default:
        return sorted;
    }
  }, [sortBy, randomSeed]);

  const sortedSymbols = useMemo(() => {
    return applySorting(symbols);
  }, [symbols, applySorting]);

  const sortedSearchResults = useMemo(() => {
    if (!searchResults) return null;
    return applySorting(searchResults, true);
  }, [searchResults, applySorting]);

  const displayedSymbols = useMemo(() => {
    const source = sortedSearchResults ?? sortedSymbols;
    return source.slice(0, visibleCount);
  }, [sortedSearchResults, sortedSymbols, visibleCount]);

  const totalCount = sortedSearchResults ? sortedSearchResults.length : sortedSymbols.length;
  const hasMore = visibleCount < totalCount;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, totalCount));
  };

  const handleRandomize = () => {
    if (randomSeed) {
      setRandomSeed(null);
    } else {
      setRandomSeed(Date.now());
      setQuery("");
    }
    setVisibleCount(ITEMS_PER_PAGE);
    setSurpriseClicked(true);
  };

  const handleSort = (option: SortOption) => {
    setSortBy(option);
    setRandomSeed(null);
    setVisibleCount(ITEMS_PER_PAGE);
    setShowSortMenu(false);
  };

  const clearSearch = () => {
    setQuery("");
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const sortLabels: Record<SortOption, string> = {
    "best-match": "Best Match",
    "symbol-asc": "Symbol A → Z",
    "symbol-desc": "Symbol Z → A",
    "name-asc": "Name A → Z",
    "name-desc": "Name Z → A",
    "type": "By Type",
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Explore Stocks</h1>
        <p className="text-muted-foreground">
          Browse {symbols.length.toLocaleString()} stocks, ETFs, and ADRs
        </p>
      </div>

      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Search Input */}
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by symbol or company name..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisibleCount(ITEMS_PER_PAGE);
              if (e.target.value.trim()) {
                setSortBy("best-match");
                setRandomSeed(null);
              }
            }}
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl border border-input bg-background hover:bg-accent transition-colors w-[180px]"
          >
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{randomSeed ? "Randomized" : sortLabels[sortBy]}</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground ml-auto" />
          </button>
          {showSortMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowSortMenu(false)}
              />
              <div className="absolute right-0 top-full mt-2 z-20 w-48 py-2 rounded-xl border border-border bg-popover shadow-lg">
                {(Object.keys(sortLabels) as SortOption[]).map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSort(option)}
                    className={cn(
                      "w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors",
                      sortBy === option && !randomSeed && "text-primary font-medium"
                    )}
                  >
                    {sortLabels[option]}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Randomize Button */}
        <button
          onClick={handleRandomize}
          className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-xl transition-colors",
            randomSeed
              ? "border border-primary bg-primary/10 text-primary"
              : surpriseClicked
                ? "border border-input bg-background hover:bg-accent"
                : "surprise-me-idle bg-background"
          )}
        >
          <Shuffle className="h-4 w-4" />
          <span className="text-sm font-medium">Surprise Me</span>
        </button>

        {/* Types Help Button */}
        <button
          onClick={() => setShowTypesModal(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-xl border border-input bg-background hover:bg-accent transition-colors"
          title="Learn about security types"
        >
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium hidden sm:inline">Types Guide</span>
        </button>
      </div>

      {/* Types Modal */}
      {showTypesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowTypesModal(false)}
          />
          <div className="relative w-full max-w-2xl max-h-[80vh] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h2 className="text-xl font-bold">Security Types Guide</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Learn what each badge means on stock cards
                </p>
              </div>
              <button
                onClick={() => setShowTypesModal(false)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
              <div className="space-y-4">
                {TYPE_DESCRIPTIONS.map(({ type, label, description }) => {
                  const colorClass = TYPE_COLORS[type] || TYPE_COLORS[""];
                  return (
                    <div
                      key={type}
                      className="flex gap-4 p-4 rounded-xl bg-muted/30 border border-border/50"
                    >
                      <div
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-sm font-semibold flex-shrink-0 h-fit",
                          colorClass
                        )}
                      >
                        {label}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground mb-1">{type}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Tip:</strong> As a beginner, focus on{" "}
                  <span className={cn("px-1.5 py-0.5 rounded text-xs font-medium", TYPE_COLORS["Common Stock"])}>
                    Stock
                  </span>{" "}
                  and{" "}
                  <span className={cn("px-1.5 py-0.5 rounded text-xs font-medium", TYPE_COLORS["ETP"])}>
                    ETF
                  </span>{" "}
                  securities. They&apos;re the most straightforward to understand and trade.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center gap-3 py-20">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-muted-foreground">Loading stocks...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-20">
          <p className="text-destructive mb-4">{error}</p>
          <button
            onClick={() => fetchSymbols()}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Results Info */}
      {!loading && !error && (
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {searchResults
              ? `Found ${searchResults.length.toLocaleString()} results for "${query}"`
              : `Showing ${displayedSymbols.length.toLocaleString()} of ${totalCount.toLocaleString()}`}
          </p>
        </div>
      )}

      {/* Stock Cards Grid */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displayedSymbols.map((stock) => (
              <StockCard key={stock.symbol} stock={stock} />
            ))}
          </div>

          {/* Empty State */}
          {displayedSymbols.length === 0 && query && (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-2">
                No stocks found for &quot;{query}&quot;
              </p>
              <button
                onClick={clearSearch}
                className="text-primary hover:underline"
              >
                Clear search
              </button>
            </div>
          )}

          {/* Load More */}
          {hasMore && displayedSymbols.length > 0 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                className="px-6 py-3 rounded-xl border border-border bg-card hover:bg-accent transition-colors font-medium"
              >
                Load More ({Math.min(ITEMS_PER_PAGE, totalCount - visibleCount)} more)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function StockCard({ stock }: { stock: Symbol }) {
  const typeColor = TYPE_COLORS[stock.type] || "bg-gray-500/10 text-gray-600 dark:text-gray-400";
  const typeLabel = TYPE_LABELS[stock.type] || stock.type;

  return (
    <Link
      href={`/stock/${stock.symbol}`}
      className="group block p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
            {stock.symbol}
          </h3>
          <p className="text-sm text-muted-foreground truncate" title={stock.description}>
            {stock.description}
          </p>
        </div>
        <div
          className={cn(
            "px-2 py-1 rounded-md text-xs font-medium ml-2 flex-shrink-0",
            typeColor
          )}
        >
          {typeLabel}
        </div>
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Click to view details</span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary">
          View →
        </span>
      </div>
    </Link>
  );
}
