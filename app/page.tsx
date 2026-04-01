"use client";

import { useEffect, useState, useRef } from "react";
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
  const [periodSwinging, setPeriodSwinging] = useState(false);
  const periodRef = useRef<HTMLSpanElement>(null);

  // Intersection observer for pendulum period
  useEffect(() => {
    const el = periodRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setPeriodSwinging(true), 2000);
          observer.disconnect();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
      <h1 className="text-6xl font-bold tracking-tight leading-none mb-10">Market Overview</h1>

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
      <h2 className="text-xl font-semibold mb-6 text-primary">Major Indices</h2>
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
                <div className="text-4xl font-bold tabular-nums mb-1">
                  ${index.quote.c.toFixed(2)}
                </div>
                <div
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium tabular-nums",
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
      <div className="mt-16 pt-8 border-t-2 border-primary/40">
        <h2 className="text-xl font-semibold tracking-tight mb-6 text-primary">Why This Exists</h2>
        <div className="editorial-text flex flex-col gap-6 text-base text-muted-foreground">
          <p>
            This site is about education. Financial literacy matters, regardless of your personal goals, because money affects everything. Understanding how markets work, what the terminology means, and how to read financial data is valuable knowledge. Whether you choose to participate in the market or simply want to understand the system you live within.
          </p>
          <p className="italic text-[#7a8a80] dark:text-[#9faa9f]">
            Disclaimer: I am a finance noob; I am learning myself. I am building this site to explain how it all actually works as I learn it myself. Eventually I might add some tooling to inform investments, but I would have to make that private due to API restrictions.
          </p>
        </div>
      </div>

      {/* Personal Philosophy */}
      <div className="mt-12 pt-8 border-t-2 border-primary/40">
        <h2 className="text-xl font-semibold tracking-tight mb-6 text-primary">Personal Philosophy</h2>
        <div className="editorial-text flex flex-col gap-6 text-base text-muted-foreground">
          <p>
            The stock market is largely a wealth transfer mechanism. Those with capital grow it exponentially while wages stagnate. The &quot;just invest early&quot; narrative ignores that most people don&apos;t have spare capital. The &quot;do your research and make smart trades&quot; advice assumes a level playing field that doesn&apos;t exist. Without insider access, it&apos;s gambling against professionals who see your cards.
          </p>
          <p>
            This critique applies to active trading, not long-term passive investing. Buying and holding index funds doesn&apos;t require beating anyone or having inside information. You&apos;re just riding overall market growth. Historically, holding an S&amp;P 500 index fund for 20+ years has returned around 7-10% annually, beating inflation and savings accounts. That&apos;s genuinely accessible and doesn&apos;t require an edge.
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
          <p className="mb-8">
            HFT firms extract roughly{" "}
            <a href="https://www.fca.org.uk/publications/occasional-papers/occasional-paper-no-50-quantifying-high-frequency-trading-arms-race-new-methodology" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              $5 billion annually
            </a>
            {" "}through speed advantages alone. They can see your order coming and trade ahead of it.{" "}
            <span 
              ref={periodRef}
              className={`pendulum-period ${periodSwinging ? 'swing' : ''}`}
            >The playing field isn&apos;t level.</span>
          </p>
        </div>
      </div>

      {/* When Retail Fought Back */}
      <div className="mt-12 pt-8 border-t-2 border-primary/40">
        <h2 className="text-xl font-semibold tracking-tight mb-6 text-primary">When Retail Fought Back</h2>
        <div className="editorial-text flex flex-col gap-6 text-base text-muted-foreground">
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
            For a brief moment, regular people used the same tactics Wall Street uses every day: coordinated buying, understanding market mechanics, and exploiting over-leveraged positions. When hedge funds do it, it&apos;s called &quot;smart investing.&quot; When retail does it, the system intervenes.
          </p>
        </div>
      </div>

      {/* The System Protects Itself */}
      <div className="mt-12 pt-8 border-t-2 border-primary/40">
        <h2 className="text-xl font-semibold tracking-tight mb-6 text-primary">The System Protects Itself</h2>
        <div className="editorial-text flex flex-col gap-6 text-base text-muted-foreground">
          <p>
            At the height of the GameStop surge, Robinhood and other brokers blocked retail investors from buying more shares. You could only sell. The stock price immediately collapsed. Robinhood claimed it was due to &quot;clearinghouse requirements,&quot; but the timing was suspicious: restrictions kicked in exactly when hedge funds were facing catastrophic losses.
          </p>
          <p>
            <a href="https://www.cnbc.com/2021/02/17/robinhood-faces-lawsuits-after-gamestop-trading-halt.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Over 50 federal lawsuits were filed
            </a>
            . Investors alleged Robinhood colluded with Citadel Securities to protect hedge fund positions. The cases were dismissed because the courts ruled that Robinhood&apos;s customer agreement permitted the restrictions. Essentially, their fine print was used to protect them and their rich friends at the expense of their users.
          </p>
          <p>
            Robinhood makes about 75% of its revenue from{" "}
            <a href="https://www.reuters.com/markets/us/sec-eyes-pfof-reforms-stock-market-what-is-pfof-2022-06-08/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              &quot;payment for order flow&quot; (PFOF)
            </a>
            . They sell informatoin about your trades to market makers like Citadel before executing them. Citadel sees what you&apos;re buying, and can trade ahead of you. This practice is banned in Canada, the UK, and Australia.{" "}
            <span 
              style={{
                background: 'linear-gradient(90deg, #9ca3af 0%, #b08080 15%, #c97070 25%, #d4d4d4 35%, #7090c0 45%, #9ca3af 60%, #9ca3af 100%)',
                backgroundSize: '300% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                animation: 'usa-sweep 8s linear infinite',
              }}
            >
              But here in the land of the free, it&apos;s just business.
            </span>
          </p>
          <p>
            In 2022, the SEC{" "}
            <a href="https://www.sec.gov/news/press-release/2022-221" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              charged eight social media influencers
            </a>
            {" "} for a $100 million pump-and-dump scheme. They promoted stocks to followers, then secretly sold while recommending others buy. These guys got prosecuted and made an example of. This practice is even more rampant in other financial systems such as crypto. But big players such as Citadel who do this at scale are called Market Makers. 
          </p>
        </div>
      </div>

      {/* Global Manipulation */}
      <div className="mt-12 pt-8 border-t-2 border-primary/40">
        <h2 className="text-xl font-semibold tracking-tight mb-6 text-primary">Global Manipulation</h2>
        <div className="editorial-text flex flex-col gap-6 text-base text-muted-foreground">
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
            This was possible because India became the{" "}
            <a href="https://www.moneycontrol.com/news/business/markets/rbi-sebi-closely-monitoring-high-f-india-account-for-nearly-81-of-global-turnover-12751676.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              world&apos;s largest derivatives market
            </a>
            {" "}(don't get me started on how I think this market was caused by the culture there that measures people by their net worth), accounting for 81% of global options turnover. But this massive volume was driven by retail traders using low margin requirements and leverage, not actual capital. Only 7.2% of individual traders made a profit. Jane Street, with real capital, could buy enough of the underlying stocks to move prices that millions of leveraged retail positions depended on.
          </p>
          <p>
            The scheme: Jane Street would buy large amounts of index stocks in the morning to artificially push prices up, while simultaneously building short positions in options that would profit when prices fell later. They made over $4 billion from India in just two years.{" "}
            <a href="https://www.reuters.com/sustainability/boards-policy-regulation/how-india-struggled-regulate-jane-streets-money-spinning-machine-2025-08-14/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Retail investors in India lost $21 billion over three years
            </a>
            .
          </p>
          <p>
            Jane Street claims it was just &quot;basic arbitrage.&quot; SEBI called it a sinister scheme and actually did something about it. A US firm extracting billions from foreign retail traders got banned and had half a billion seized. In America, that&apos;s called a successful quarter.
          </p>
          <p>
            There&apos;s an unwritten rule in finance: extract wealth from regular people and you&apos;re a genius, a &quot;market maker,&quot; an innovator. But steal from the wealthy? That&apos;s fraud. Bernie Madoff learned this the hard way. His scheme ran for decades until he made the mistake of losing rich people&apos;s money. Then suddenly the SEC cared.
          </p>
          <p>
            This pattern repeats globally: sophisticated firms extract billions from markets where retail participation is high, using strategies that exist in regulatory gray zones. When caught, they pay fines that amount to a fraction of their profits. The game continues.
          </p>
        </div>
      </div>

      {/* Congressional Trading */}
      <div className="mt-12 pt-8 border-t-2 border-primary/40">
        <h2 className="text-xl font-semibold tracking-tight mb-6 text-primary">The People Who Write the Rules</h2>
        <div className="editorial-text flex flex-col gap-6 text-base text-muted-foreground">
          <p>
            Members of Congress trade stocks while having access to non-public information and the power to pass laws that directly affect those companies. Nearly{" "}
            <a href="https://campaignlegal.org/document/congressional-stock-trading-numbers-119th-congress" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              half of Congress owns individual stocks
            </a>
            . They sit on committees overseeing industries they&apos;re invested in. They get briefed on policy changes before the public knows. Then they trade.
          </p>
          <p>
            The STOCK Act was supposed to fix this. It requires disclosure of trades within 45 days and technically bans insider trading by lawmakers. In practice,{" "}
            <a href="https://www.rawstory.com/congress-members-stock-act-rawstory/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              at least 62 members violated it recently
            </a>
            , with some disclosures coming years late. One representative failed to report over 100 transactions worth up to $1.6 million. The penalty for your first violation? $200.
          </p>
          <p>
            Paul Pelosi bought millions in Nvidia shares while his wife had access to semiconductor legislation intel. Senators accumulate crypto ETFs while chairing committees on crypto regulation. When asked about it, they say their spouses make independent decisions. The trades just happen to be suspiciously well-timed.
          </p>
          <p>
            Bipartisan bills to ban congressional stock trading have been introduced repeatedly. They never pass. The people who would have to vote for it are the same people profiting from the current system. Funny how that works.
          </p>
        </div>
      </div>
    </div>
  );
}
