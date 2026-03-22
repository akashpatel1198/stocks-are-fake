"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  TrendingUp,
  TrendingDown,
  Building2,
  Globe,
  Users,
  DollarSign,
  BarChart3,
  Newspaper,
  UserSearch,
  FileText,
  Loader2,
  Star,
  StarOff,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
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

interface CompanyProfile {
  country: string;
  currency: string;
  exchange: string;
  finnhubIndustry: string;
  ipo: string;
  logo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
}

type TabId = "overview" | "chart" | "news" | "insider" | "filings";

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "chart", label: "Chart", icon: BarChart3 },
  { id: "news", label: "News", icon: Newspaper },
  { id: "insider", label: "Insider", icon: UserSearch },
  { id: "filings", label: "Filings", icon: FileText },
];

export default function StockDetailPage() {
  const params = useParams();
  const symbol = (params.symbol as string)?.toUpperCase();

  const { addSymbol, removeSymbol, isWatching } = useWatchlistStore();
  const watching = isWatching(symbol);

  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [quote, setQuote] = useState<Quote | null>(null);
  const [company, setCompany] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!symbol) return;

      setLoading(true);
      setError(null);

      try {
        const [quoteRes, companyRes] = await Promise.all([
          fetch(`/api/quote?symbol=${symbol}`),
          fetch(`/api/company?symbol=${symbol}`),
        ]);

        if (quoteRes.ok) {
          const quoteData = await quoteRes.json();
          // Check if we got valid data (c = 0 means no data)
          if (quoteData.c !== 0) {
            setQuote(quoteData);
          }
        }

        if (companyRes.ok) {
          const companyData = await companyRes.json();
          // Check if we got valid data
          if (companyData.name) {
            setCompany(companyData);
          }
        }

        // If neither returned valid data, show error
        if (!quote && !company) {
          setError("Could not find data for this symbol");
        }
      } catch (err) {
        console.error("Failed to fetch stock data:", err);
        setError("Failed to load stock data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [symbol]);

  if (!symbol) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Invalid symbol</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Back button */}
      <Link
        href="/search"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        Explore Stocks
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          {company?.logo && (
            <img
              src={company.logo}
              alt={company.name}
              className="w-12 h-12 rounded-lg bg-card"
            />
          )}
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{symbol}</h1>
              {company?.exchange && (
                <span className="text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded">
                  {company.exchange}
                </span>
              )}
            </div>
            {company?.name && (
              <p className="text-muted-foreground">{company.name}</p>
            )}
          </div>
        </div>

        {/* Add to Watchlist button */}
        <button
          onClick={() => (watching ? removeSymbol(symbol) : addSymbol(symbol))}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors cursor-pointer",
            watching
              ? "border-primary bg-primary/10 text-primary hover:bg-primary/20"
              : "border-border hover:bg-accent"
          )}
        >
          {watching ? (
            <>
              <StarOff className="h-4 w-4" />
              <span>Unwatch</span>
            </>
          ) : (
            <>
              <Star className="h-4 w-4" />
              <span>Watch</span>
            </>
          )}
        </button>
      </div>

      {/* Price Section */}
      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground mb-8">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading...</span>
        </div>
      ) : quote ? (
        <div className="mb-8">
          <div className="flex items-baseline gap-4">
            <span className="text-4xl font-bold">${quote.c.toFixed(2)}</span>
            <div
              className={cn(
                "flex items-center gap-1 text-lg font-medium",
                quote.d >= 0 ? "text-primary" : "text-destructive"
              )}
            >
              {quote.d >= 0 ? (
                <TrendingUp className="h-5 w-5" />
              ) : (
                <TrendingDown className="h-5 w-5" />
              )}
              <span>
                {quote.d >= 0 ? "+" : ""}
                {quote.d.toFixed(2)} ({quote.dp >= 0 ? "+" : ""}
                {quote.dp.toFixed(2)}%)
              </span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Today vs prev close (${quote.pc.toFixed(2)})
          </p>
        </div>
      ) : error ? (
        <p className="text-destructive mb-8">{error}</p>
      ) : null}

      {/* Tabs */}
      <div className="border-b border-border mb-6">
        <nav className="flex gap-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                  activeTab === tab.id
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "overview" && (
          <OverviewTab quote={quote} company={company} loading={loading} />
        )}
        {activeTab === "chart" && <ChartTab />}
        {activeTab === "news" && <NewsTab symbol={symbol} />}
        {activeTab === "insider" && <InsiderTab symbol={symbol} />}
        {activeTab === "filings" && <FilingsTab symbol={symbol} />}
      </div>
    </div>
  );
}

function OverviewTab({
  quote,
  company,
  loading,
}: {
  quote: Quote | null;
  company: CompanyProfile | null;
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Key Stats */}
      {quote && (
        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="text-lg font-semibold mb-4">Today&apos;s Trading</h3>
          <div className="grid grid-cols-2 gap-4">
            <StatItem label="Open" value={`$${quote.o.toFixed(2)}`} />
            <StatItem label="Previous Close" value={`$${quote.pc.toFixed(2)}`} />
            <StatItem label="Day High" value={`$${quote.h.toFixed(2)}`} />
            <StatItem label="Day Low" value={`$${quote.l.toFixed(2)}`} />
          </div>
        </div>
      )}

      {/* Company Info */}
      {company && (
        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="text-lg font-semibold mb-4">Company Info</h3>
          <div className="space-y-3">
            {company.finnhubIndustry && (
              <InfoItem
                icon={Building2}
                label="Industry"
                value={company.finnhubIndustry}
              />
            )}
            {company.marketCapitalization && (
              <InfoItem
                icon={DollarSign}
                label="Market Cap"
                value={formatMarketCap(company.marketCapitalization)}
              />
            )}
            {company.shareOutstanding && (
              <InfoItem
                icon={Users}
                label="Shares Outstanding"
                value={formatShares(company.shareOutstanding)}
              />
            )}
            {company.weburl && (
              <InfoItem
                icon={Globe}
                label="Website"
                value={
                  <a
                    href={company.weburl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {company.weburl.replace(/^https?:\/\//, "")}
                  </a>
                }
              />
            )}
            {company.ipo && (
              <InfoItem icon={BarChart3} label="IPO Date" value={company.ipo} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm text-muted-foreground w-32">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}

function ChartTab() {
  return (
    <div className="p-8 text-center text-muted-foreground border border-dashed border-border rounded-lg">
      <p className="mb-2">Historical charts require Finnhub Premium.</p>
      <p className="text-sm">Coming in Phase 5 with alternative data source.</p>
    </div>
  );
}

interface NewsItem {
  id: number;
  headline: string;
  summary: string;
  source: string;
  url: string;
  datetime: number;
  image: string;
}

function NewsTab({ symbol }: { symbol: string }) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(`/api/company-news?symbol=${symbol}`);
        if (res.ok) {
          const data = await res.json();
          setNews(data.slice(0, 10)); // Limit to 10 articles
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, [symbol]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Loading news...</span>
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <p className="text-muted-foreground">No recent news found for {symbol}.</p>
    );
  }

  return (
    <div className="space-y-4">
      {news.map((item) => (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
        >
          <div className="flex gap-4">
            {item.image && (
              <img
                src={item.image}
                alt=""
                className="w-24 h-16 object-cover rounded-md flex-shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground line-clamp-2 mb-1">
                {item.headline}
              </h4>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {item.summary}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{item.source}</span>
                <span>•</span>
                <span>{formatTimeAgo(item.datetime)}</span>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

interface InsiderTransaction {
  name: string;
  share: number;
  change: number;
  transactionDate: string;
  transactionCode: string;
  transactionPrice: number;
}

interface InsiderData {
  data: InsiderTransaction[];
}

function InsiderTab({ symbol }: { symbol: string }) {
  const [transactions, setTransactions] = useState<InsiderTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInsider() {
      try {
        const res = await fetch(`/api/insider?symbol=${symbol}`);
        if (res.ok) {
          const data: InsiderData = await res.json();
          setTransactions(data.data?.slice(0, 15) || []); // Limit to 15
        }
      } catch (error) {
        console.error("Failed to fetch insider data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchInsider();
  }, [symbol]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Loading insider transactions...</span>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <p className="text-muted-foreground">No recent insider transactions found.</p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
            <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Shares</th>
            <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Price</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, i) => (
            <tr key={i} className="border-b border-border/50">
              <td className="py-3 px-4 text-sm">{tx.name}</td>
              <td className="py-3 px-4 text-sm text-muted-foreground">{tx.transactionDate}</td>
              <td className="py-3 px-4">
                <span
                  className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded",
                    tx.change > 0
                      ? "bg-primary/20 text-primary"
                      : "bg-destructive/20 text-destructive"
                  )}
                >
                  {getTransactionType(tx.transactionCode, tx.change)}
                </span>
              </td>
              <td className="py-3 px-4 text-sm text-right">
                {Math.abs(tx.change).toLocaleString()}
              </td>
              <td className="py-3 px-4 text-sm text-right text-muted-foreground">
                {tx.transactionPrice ? `$${tx.transactionPrice.toFixed(2)}` : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface Filing {
  accessNumber: string;
  symbol: string;
  form: string;
  filedDate: string;
  acceptedDate: string;
  reportUrl: string;
  filingUrl: string;
}

function FilingsTab({ symbol }: { symbol: string }) {
  const [filings, setFilings] = useState<Filing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFilings() {
      try {
        const res = await fetch(`/api/filings?symbol=${symbol}`);
        if (res.ok) {
          const data = await res.json();
          setFilings(data.slice(0, 20)); // Limit to 20
        }
      } catch (error) {
        console.error("Failed to fetch filings:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFilings();
  }, [symbol]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Loading SEC filings...</span>
      </div>
    );
  }

  if (filings.length === 0) {
    return (
      <p className="text-muted-foreground">No SEC filings found.</p>
    );
  }

  return (
    <div className="space-y-2">
      {filings.map((filing) => (
        <a
          key={filing.accessNumber}
          href={filing.reportUrl || filing.filingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
        >
          <div className="flex items-center gap-4">
            <span
              className={cn(
                "text-xs font-bold px-2 py-1 rounded",
                getFilingColor(filing.form)
              )}
            >
              {filing.form}
            </span>
            <div>
              <p className="text-sm font-medium">{getFilingDescription(filing.form)}</p>
              <p className="text-xs text-muted-foreground">Filed: {filing.filedDate}</p>
            </div>
          </div>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </a>
      ))}
    </div>
  );
}

function formatTimeAgo(timestamp: number): string {
  const seconds = Math.floor(Date.now() / 1000 - timestamp);
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return new Date(timestamp * 1000).toLocaleDateString();
}

function getTransactionType(code: string, change: number): string {
  if (change > 0) return "Buy";
  if (change < 0) return "Sell";
  if (code === "M") return "Exercise";
  if (code === "G") return "Gift";
  return code;
}

function getFilingColor(form: string): string {
  if (form.includes("10-K")) return "bg-primary/20 text-primary";
  if (form.includes("10-Q")) return "bg-blue-500/20 text-blue-400";
  if (form.includes("8-K")) return "bg-yellow-500/20 text-yellow-400";
  if (form.includes("4")) return "bg-purple-500/20 text-purple-400";
  return "bg-muted text-muted-foreground";
}

function getFilingDescription(form: string): string {
  if (form.includes("10-K")) return "Annual Report";
  if (form.includes("10-Q")) return "Quarterly Report";
  if (form.includes("8-K")) return "Current Report";
  if (form === "4") return "Insider Transaction";
  if (form === "SC 13G") return "Beneficial Ownership";
  if (form === "SC 13D") return "Beneficial Ownership (Active)";
  if (form.includes("DEF 14A")) return "Proxy Statement";
  return form;
}

function formatMarketCap(cap: number): string {
  // Finnhub returns market cap in millions
  if (cap >= 1000000) {
    return `$${(cap / 1000000).toFixed(2)}T`;
  } else if (cap >= 1000) {
    return `$${(cap / 1000).toFixed(2)}B`;
  } else {
    return `$${cap.toFixed(2)}M`;
  }
}

function formatShares(shares: number): string {
  // Finnhub returns shares in millions
  if (shares >= 1000) {
    return `${(shares / 1000).toFixed(2)}B`;
  } else {
    return `${shares.toFixed(2)}M`;
  }
}
