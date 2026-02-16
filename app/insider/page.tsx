"use client";

import { useState } from "react";
import {
  Search,
  Loader2,
  UserSearch,
  TrendingUp,
  TrendingDown,
  FileText,
  Activity,
  ArrowUpCircle,
  ArrowDownCircle,
  MinusCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { InfoTooltip } from "@/components/info-tooltip";

interface InsiderTransaction {
  name: string;
  share: number;
  change: number;
  transactionDate: string;
  transactionCode: string;
  transactionPrice: number;
  filingDate: string;
}

interface InsiderData {
  data: InsiderTransaction[];
  symbol: string;
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

interface SentimentMonth {
  symbol: string;
  year: number;
  month: number;
  change: number;
  mspr: number; // Monthly Share Purchase Ratio: positive = buying, negative = selling
}

interface SentimentData {
  symbol: string;
  data: SentimentMonth[];
}

type TabId = "insider" | "filings";

export default function InsiderPage() {
  const [activeTab, setActiveTab] = useState<TabId>("insider");
  const [searchQuery, setSearchQuery] = useState("");
  const [symbol, setSymbol] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<InsiderTransaction[]>([]);
  const [filings, setFilings] = useState<Filing[]>([]);
  const [sentiment, setSentiment] = useState<SentimentData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const upperSymbol = searchQuery.toUpperCase().trim();
    setSymbol(upperSymbol);
    setLoading(true);
    setError(null);

    try {
      if (activeTab === "insider") {
        // Fetch both transactions and sentiment in parallel
        const [transRes, sentRes] = await Promise.all([
          fetch(`/api/insider?symbol=${upperSymbol}`),
          fetch(`/api/insider-sentiment?symbol=${upperSymbol}`),
        ]);

        if (transRes.ok) {
          const data: InsiderData = await transRes.json();
          if (data.data && data.data.length > 0) {
            setTransactions(data.data);
          } else {
            setTransactions([]);
            setError(`No insider transactions found for ${upperSymbol}`);
          }
        } else {
          setError("Failed to fetch insider data");
        }

        // Sentiment is optional - don't error if it fails
        if (sentRes.ok) {
          const sentData: SentimentData = await sentRes.json();
          setSentiment(sentData);
        } else {
          setSentiment(null);
        }
      } else {
        const res = await fetch(`/api/filings?symbol=${upperSymbol}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setFilings(data);
          } else {
            setFilings([]);
            setError(`No SEC filings found for ${upperSymbol}`);
          }
        } else {
          setError("Failed to fetch filings");
        }
      }
    } catch (err) {
      setError("Something went wrong");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    setTransactions([]);
    setFilings([]);
    setSentiment(null);
    setError(null);
    if (symbol) {
      // Re-fetch for new tab
      setSearchQuery(symbol);
      setTimeout(() => {
        const form = document.querySelector("form");
        form?.requestSubmit();
      }, 0);
    }
  };

  // Calculate sentiment summary from recent months
  const getSentimentSummary = () => {
    if (!sentiment?.data || sentiment.data.length === 0) return null;

    // Get last 6 months of data
    const recentData = sentiment.data.slice(-6);
    const avgMspr = recentData.reduce((sum, m) => sum + m.mspr, 0) / recentData.length;
    const totalChange = recentData.reduce((sum, m) => sum + m.change, 0);
    const buyMonths = recentData.filter((m) => m.mspr > 0).length;
    const sellMonths = recentData.filter((m) => m.mspr < 0).length;

    let signal: "bullish" | "bearish" | "neutral";
    if (avgMspr > 0.1) signal = "bullish";
    else if (avgMspr < -0.1) signal = "bearish";
    else signal = "neutral";

    return { avgMspr, totalChange, buyMonths, sellMonths, signal, months: recentData.length };
  };

  const sentimentSummary = getSentimentSummary();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-2">Insider Activity & Filings</h1>
      <p className="text-muted-foreground mb-8 flex items-center gap-1.5">
        Search for insider transactions and SEC filings by stock symbol.
        <InfoTooltip
          content="Insiders are company executives, directors, and large shareholders. They must report their stock trades to the SEC. Tracking these can reveal if those closest to the company are buying or selling."
        />
      </p>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-muted rounded-lg w-fit mb-6">
        <button
          onClick={() => handleTabChange("insider")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors",
            activeTab === "insider"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <UserSearch className="h-4 w-4" />
          Insider Transactions
          <InfoTooltip
            content="Stock trades made by company executives, directors, and major shareholders. By law, they must report these within 2 business days."
            iconClassName="h-3 w-3"
          />
        </button>
        <button
          onClick={() => handleTabChange("filings")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors",
            activeTab === "filings"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <FileText className="h-4 w-4" />
          SEC Filings
          <InfoTooltip
            content="SEC filings are official documents companies must submit to the Securities and Exchange Commission. They include financial reports, insider trades, and material events."
            iconClassName="h-3 w-3"
          />
        </button>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-8 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Enter stock symbol (e.g., AAPL)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-input bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !searchQuery.trim()}
          className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
        </button>
      </form>

      {/* Results */}
      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading...</span>
        </div>
      ) : error ? (
        <p className="text-muted-foreground">{error}</p>
      ) : activeTab === "insider" && transactions.length > 0 ? (
        <div>
          {/* Sentiment Summary Card */}
          {sentimentSummary && (
            <div className="mb-6 p-4 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                  Insider Sentiment (Last {sentimentSummary.months} Months)
                  <InfoTooltip
                    content="Insider sentiment shows whether company executives and directors have been mostly buying or selling their own stock recently. Heavy buying can signal confidence; heavy selling might indicate concerns."
                  />
                </h3>
              </div>
              <div className="flex items-center gap-6">
                {/* Signal Badge */}
                <div className="flex items-center gap-2">
                  {sentimentSummary.signal === "bullish" ? (
                    <ArrowUpCircle className="h-8 w-8 text-primary" />
                  ) : sentimentSummary.signal === "bearish" ? (
                    <ArrowDownCircle className="h-8 w-8 text-destructive" />
                  ) : (
                    <MinusCircle className="h-8 w-8 text-muted-foreground" />
                  )}
                  <div>
                    <p
                      className={cn(
                        "text-lg font-semibold capitalize",
                        sentimentSummary.signal === "bullish" && "text-primary",
                        sentimentSummary.signal === "bearish" && "text-destructive",
                        sentimentSummary.signal === "neutral" && "text-muted-foreground"
                      )}
                    >
                      {sentimentSummary.signal}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      Overall Signal
                      <InfoTooltip
                        content="Based on recent insider activity: Bullish means insiders are net buyers (confident), Bearish means net sellers (cautious), Neutral means mixed signals."
                      />
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-12 w-px bg-border" />

                {/* MSPR Score */}
                <div>
                  <p className="text-lg font-semibold">
                    {sentimentSummary.avgMspr > 0 ? "+" : ""}
                    {(sentimentSummary.avgMspr * 100).toFixed(1)}%
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                  Avg MSPR
                  <InfoTooltip
                    content="MSPR (Monthly Share Purchase Ratio) measures buying vs selling pressure. Positive % = more buying, negative % = more selling. Higher absolute values mean stronger conviction."
                  />
                </p>
                </div>

                {/* Buy/Sell Months */}
                <div className="flex gap-4">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-primary">
                      {sentimentSummary.buyMonths}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      Buy Months
                      <InfoTooltip
                        content="Number of months where insiders bought more shares than they sold. More buy months = sustained confidence over time."
                      />
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-destructive">
                      {sentimentSummary.sellMonths}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      Sell Months
                      <InfoTooltip
                        content="Number of months where insiders sold more shares than they bought. Note: selling isn't always negative—insiders often sell for personal reasons (taxes, diversification)."
                      />
                    </p>
                  </div>
                </div>

                {/* Net Change */}
                <div>
                  <p
                    className={cn(
                      "text-lg font-semibold",
                      sentimentSummary.totalChange > 0
                        ? "text-primary"
                        : sentimentSummary.totalChange < 0
                        ? "text-destructive"
                        : "text-muted-foreground"
                    )}
                  >
                    {sentimentSummary.totalChange > 0 ? "+" : ""}
                    {formatShareChange(sentimentSummary.totalChange)}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                  Net Change
                  <InfoTooltip
                    content="Total shares bought minus shares sold by all insiders. Positive = insiders accumulated shares. Negative = insiders reduced their holdings."
                  />
                </p>
                </div>
              </div>

              {/* MSPR Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Selling</span>
                  <span>Neutral</span>
                  <span>Buying</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden relative">
                  {/* Center marker */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border z-10" />
                  {/* Sentiment indicator */}
                  <div
                    className={cn(
                      "absolute top-0 bottom-0 transition-all",
                      sentimentSummary.avgMspr >= 0 ? "bg-primary" : "bg-destructive"
                    )}
                    style={{
                      left: sentimentSummary.avgMspr >= 0 ? "50%" : undefined,
                      right: sentimentSummary.avgMspr < 0 ? "50%" : undefined,
                      width: `${Math.min(Math.abs(sentimentSummary.avgMspr) * 50, 50)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              Insider Transactions for{" "}
              <Link href={`/stock/${symbol}`} className="text-primary hover:underline">
                {symbol}
              </Link>
            </h2>
            <span className="text-sm text-muted-foreground">
              {transactions.length} transactions
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    <span className="flex items-center gap-1">
                      Name
                      <InfoTooltip content="The insider's name—typically executives (CEO, CFO), directors, or shareholders owning 10%+ of the company." />
                    </span>
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    <span className="flex items-center gap-1">
                      Type
                      <InfoTooltip content="Buy = insider purchased shares (often seen as bullish). Sell = insider sold shares (not always bearish—could be for taxes or diversification)." />
                    </span>
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    Shares
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    Price
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    <span className="flex items-center justify-end gap-1">
                      Value
                      <InfoTooltip content="Total dollar value of the transaction (shares × price). Transactions over $1M are highlighted as 'Notable' since larger trades often carry more signal." />
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(0, 50).map((tx, i) => {
                  const value = Math.abs(tx.change) * (tx.transactionPrice || 0);
                  const isLarge = value > 1000000;
                  return (
                    <tr
                      key={i}
                      className={cn(
                        "border-b border-border/50",
                        isLarge && "bg-primary/5"
                      )}
                    >
                      <td className="py-3 px-4 text-sm">
                        {tx.name}
                        {isLarge && (
                          <span className="ml-2 text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded">
                            Notable
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {tx.transactionDate}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={cn(
                            "text-xs font-medium px-2 py-0.5 rounded inline-flex items-center gap-1",
                            tx.change > 0
                              ? "bg-primary/20 text-primary"
                              : "bg-destructive/20 text-destructive"
                          )}
                        >
                          {tx.change > 0 ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          {tx.change > 0 ? "Buy" : "Sell"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-right">
                        {Math.abs(tx.change).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-sm text-right text-muted-foreground">
                        {tx.transactionPrice
                          ? `$${tx.transactionPrice.toFixed(2)}`
                          : "—"}
                      </td>
                      <td className="py-3 px-4 text-sm text-right font-medium">
                        {value > 0 ? formatValue(value) : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeTab === "filings" && filings.length > 0 ? (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              SEC Filings for{" "}
              <Link href={`/stock/${symbol}`} className="text-primary hover:underline">
                {symbol}
              </Link>
            </h2>
            <span className="text-sm text-muted-foreground">
              {filings.length} filings
            </span>
          </div>
          <div className="space-y-2">
            {filings.slice(0, 50).map((filing) => (
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
                    <p className="text-sm font-medium">
                      {getFilingDescription(filing.form)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Filed: {filing.filedDate}
                    </p>
                  </div>
                </div>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </a>
            ))}
          </div>
        </div>
      ) : !symbol ? (
        <div className="text-center py-16">
          <UserSearch className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">
            Enter a stock symbol above to view insider activity or SEC filings.
          </p>
        </div>
      ) : null}
    </div>
  );
}

function formatValue(value: number): string {
  if (value >= 1000000000) return `$${(value / 1000000000).toFixed(1)}B`;
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value.toFixed(0)}`;
}

function formatShareChange(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1000000) return `${(value / 1000000).toFixed(1)}M shares`;
  if (abs >= 1000) return `${(value / 1000).toFixed(0)}K shares`;
  return `${value.toLocaleString()} shares`;
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
