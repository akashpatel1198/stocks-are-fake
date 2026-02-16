"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Clock, Activity } from "lucide-react";
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

interface Holiday {
  atDate: string;
  tradingHour: string;
}

interface HolidayData {
  data: Holiday[];
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

// Helper to format date as YYYY-MM-DD
function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

// Check if a date is a holiday (market closed all day)
function isHoliday(date: Date, holidays: Holiday[]): boolean {
  const dateStr = formatDate(date);
  return holidays.some((h) => h.atDate === dateStr && h.tradingHour === "");
}

// Check if a date is a weekend
function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

// Find next trading day (skip weekends and holidays)
function getNextTradingDay(fromDate: Date, holidays: Holiday[]): Date {
  const next = new Date(fromDate);
  next.setDate(next.getDate() + 1);
  next.setHours(9, 30, 0, 0); // 9:30 AM

  // Skip weekends and holidays (max 10 days to prevent infinite loop)
  for (let i = 0; i < 10; i++) {
    if (!isWeekend(next) && !isHoliday(next, holidays)) {
      return next;
    }
    next.setDate(next.getDate() + 1);
  }
  return next;
}

export default function Home() {
  const [indices, setIndices] = useState<IndexData[]>(
    INDICES.map((i) => ({ ...i, quote: null, loading: true }))
  );
  const [marketStatus, setMarketStatus] = useState<MarketStatus | null>(null);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [countdown, setCountdown] = useState<string>("");

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

  // Fetch holidays
  useEffect(() => {
    async function fetchHolidays() {
      try {
        const res = await fetch("/api/market-holidays");
        if (res.ok) {
          const data: HolidayData = await res.json();
          setHolidays(data.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch holidays:", error);
      }
    }
    fetchHolidays();
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

  // Countdown timer
  useEffect(() => {
    function updateCountdown() {
      const now = new Date();
      const nyTime = new Date(
        now.toLocaleString("en-US", { timeZone: "America/New_York" })
      );
      const hours = nyTime.getHours();
      const minutes = nyTime.getMinutes();

      const marketOpen = 9 * 60 + 30; // 9:30 AM in minutes
      const marketClose = 16 * 60; // 4:00 PM in minutes
      const currentMinutes = hours * 60 + minutes;

      const todayIsWeekend = isWeekend(nyTime);
      const todayIsHoliday = isHoliday(nyTime, holidays);
      const marketClosed = todayIsWeekend || todayIsHoliday;

      if (marketClosed || currentMinutes >= marketClose || currentMinutes < marketOpen) {
        // Market is closed - find next trading day
        let baseDate = new Date(nyTime);
        
        // If it's before market open today and today is a trading day, market opens today
        if (!marketClosed && currentMinutes < marketOpen) {
          const minsUntilOpen = marketOpen - currentMinutes;
          const h = Math.floor(minsUntilOpen / 60);
          const m = minsUntilOpen % 60;
          setCountdown(`${h}h ${m}m until market opens`);
          return;
        }

        const nextTradingDay = getNextTradingDay(baseDate, holidays);
        const msUntilOpen = nextTradingDay.getTime() - nyTime.getTime();
        const totalMins = Math.floor(msUntilOpen / (1000 * 60));
        const h = Math.floor(totalMins / 60);
        const m = totalMins % 60;
        setCountdown(`${h}h ${m}m until market opens`);
      } else {
        // Market is open
        const minsUntilClose = marketClose - currentMinutes;
        const h = Math.floor(minsUntilClose / 60);
        const m = minsUntilClose % 60;
        setCountdown(`${h}h ${m}m until market closes`);
      }
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, [holidays]);

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
            </span>
          ) : (
            <span className="text-muted-foreground">Loading...</span>
          )}
        </div>
        {countdown && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-sm">{countdown}</span>
          </div>
        )}
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
    </div>
  );
}
