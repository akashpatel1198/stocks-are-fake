"use client";

import { useEffect, useState, useMemo } from "react";
import { Loader2, Search, ExternalLink, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsItem {
  id: number;
  headline: string;
  summary: string;
  source: string;
  url: string;
  datetime: number;
  image: string;
  category: string;
  related: string;
}

const CATEGORIES = [
  { id: "general", label: "General" },
  { id: "forex", label: "Forex" },
  { id: "crypto", label: "Crypto" },
  { id: "merger", label: "Mergers" },
];

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch news
  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      try {
        const res = await fetch(`/api/market-news?category=${category}`);
        if (res.ok) {
          const data = await res.json();
          setNews(data);
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, [category]);

  // Filter news by search query
  const filteredNews = useMemo(() => {
    if (!searchQuery.trim()) return news;
    const query = searchQuery.toLowerCase();
    return news.filter(
      (item) =>
        item.headline.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.source.toLowerCase().includes(query)
    );
  }, [news, searchQuery]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Market News</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Category tabs */}
        <div className="flex gap-1 p-1 bg-muted rounded-lg">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                category === cat.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Filter news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* News list */}
      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading news...</span>
        </div>
      ) : filteredNews.length === 0 ? (
        <div className="text-center py-16">
          <Newspaper className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">
            {searchQuery ? "No news matching your search." : "No news available."}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredNews.slice(0, 30).map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-4 p-4 rounded-xl border border-border bg-card hover:bg-accent transition-colors group"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt=""
                  className="w-32 h-20 object-cover rounded-lg flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                  {item.headline}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                  {item.summary}
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="font-medium">{item.source}</span>
                  <span>•</span>
                  <span>{formatTimeAgo(item.datetime)}</span>
                  {item.related && (
                    <>
                      <span>•</span>
                      <span className="text-primary">{item.related}</span>
                    </>
                  )}
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function formatTimeAgo(timestamp: number): string {
  const seconds = Math.floor(Date.now() / 1000 - timestamp);
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return new Date(timestamp * 1000).toLocaleDateString();
}
