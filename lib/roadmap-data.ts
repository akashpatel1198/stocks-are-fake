export type Priority = "critical" | "normal" | "low";

export interface RoadmapItem {
  text: string;
  resource: string;
  priority: Priority;
}

export interface Track {
  name: string;
  items: RoadmapItem[];
}

export interface Phase {
  id: number;
  title: string;
  duration: string;
  subtitle: string;
  icon: string;
  why: string;
  tracks: Track[];
  milestone: string;
  weeklyHours: string;
}

export interface Book {
  title: string;
  author: string;
  phase: string;
  tier: "essential" | "recommended" | "fun";
}

export interface RealityCheck {
  icon: string;
  text: string;
}

export interface JobCategory {
  name: string;
  description: string;
}

export const PHASES: Phase[] = [
  {
    id: 1,
    title: "Foundation Reset",
    duration: "Months 1–3",
    subtitle: "Math, Stats & Python for Finance",
    icon: "◆",
    why: "You can code, but quant work demands fluency in the mathematical language underneath. This phase fills the gaps without wasting time on what you already know.",
    tracks: [
      {
        name: "Mathematics",
        items: [
          {
            text: "Linear algebra — vectors, matrices, eigenvalues, PCA intuition",
            resource: "3Blue1Brown \"Essence of Linear Algebra\" (YouTube, free)",
            priority: "critical",
          },
          {
            text: "Calculus refresher — multivariable, partial derivatives, gradient, chain rule",
            resource: "Khan Academy or Paul's Online Math Notes",
            priority: "critical",
          },
          {
            text: "Probability theory — Bayes, distributions (normal, log-normal, Poisson), expectation, variance, conditional probability",
            resource: "\"Introduction to Probability\" by Blitzstein & Hwang (free online)",
            priority: "critical",
          },
          {
            text: "Statistics — hypothesis testing, confidence intervals, regression, maximum likelihood estimation",
            resource: "Same book + StatQuest YouTube channel",
            priority: "critical",
          },
        ],
      },
      {
        name: "Python for Quant Finance",
        items: [
          {
            text: "NumPy & Pandas mastery — vectorized ops, groupby, rolling windows, multi-index",
            resource: "\"Python for Data Analysis\" by Wes McKinney",
            priority: "critical",
          },
          {
            text: "Visualization — matplotlib, seaborn, plotly for financial charts",
            resource: "Official docs + practice",
            priority: "normal",
          },
          {
            text: "Fetching market data — yfinance, FRED API, Alpha Vantage",
            resource: "yfinance docs, Kaggle datasets",
            priority: "critical",
          },
          {
            text: "Jupyter workflow — notebooks for research, .py for production",
            resource: "Your IDE of choice + nbconvert",
            priority: "normal",
          },
        ],
      },
      {
        name: "Finance Fundamentals",
        items: [
          {
            text: "Market microstructure — what is a bid/ask, order book, market vs limit orders, slippage",
            resource: "Investopedia + \"Trading and Exchanges\" by Larry Harris (skim)",
            priority: "critical",
          },
          {
            text: "Asset classes overview — equities, fixed income, FX, futures, options (just the vocabulary)",
            resource: "Hull Ch. 1–3 or Investopedia",
            priority: "critical",
          },
          {
            text: "Time value of money, discounting, basic bond math",
            resource: "Khan Academy Finance section",
            priority: "normal",
          },
          {
            text: "Read financial news daily — Bloomberg, FT, Matt Levine's newsletter",
            resource: "Matt Levine \"Money Stuff\" (free via Bloomberg)",
            priority: "normal",
          },
        ],
      },
    ],
    milestone:
      "You can load any stock's price history, compute returns, plot distributions, and explain what a p-value means in the context of a trading signal. You know what an order book looks like.",
    weeklyHours: "15–20 hrs/week",
  },
  {
    id: 2,
    title: "Core Quant Skills",
    duration: "Months 4–7",
    subtitle: "Stochastic Calculus, Time Series & Factor Models",
    icon: "◇",
    why: "This is the meat. These are the topics that separate a data scientist who trades from an actual quant. You'll start building real models here.",
    tracks: [
      {
        name: "Stochastic Calculus & Derivatives",
        items: [
          {
            text: "Brownian motion, Itô's lemma, geometric Brownian motion",
            resource: "\"Stochastic Calculus for Finance II\" by Shreve (the quant bible)",
            priority: "critical",
          },
          {
            text: "Black-Scholes derivation — understand it, don't just memorize it",
            resource: "Shreve + Wilmott's \"Paul Wilmott Introduces Quantitative Finance\"",
            priority: "critical",
          },
          {
            text: "Greeks — delta, gamma, vega, theta. What they mean practically",
            resource: "Options pricing tutorial on QuantLib Python",
            priority: "critical",
          },
          {
            text: "Monte Carlo simulation for option pricing",
            resource: "Code it yourself in Python",
            priority: "critical",
          },
        ],
      },
      {
        name: "Time Series Analysis",
        items: [
          {
            text: "Stationarity, autocorrelation, ADF test",
            resource: "\"Analysis of Financial Time Series\" by Tsay (Ch. 1–3)",
            priority: "critical",
          },
          {
            text: "ARIMA, GARCH models — modeling volatility",
            resource: "statsmodels library + Tsay",
            priority: "critical",
          },
          {
            text: "Cointegration & pairs trading — the classic stat arb strategy",
            resource: "Ernie Chan \"Algorithmic Trading\" Ch. 2–4",
            priority: "critical",
          },
          {
            text: "Kalman filters for dynamic hedge ratios",
            resource: "Ernie Chan + pykalman library",
            priority: "normal",
          },
        ],
      },
      {
        name: "Factor Models & Portfolio Theory",
        items: [
          {
            text: "Modern Portfolio Theory — efficient frontier, Sharpe ratio",
            resource: "\"Quantitative Equity Portfolio Management\" by Chincarini & Kim",
            priority: "critical",
          },
          {
            text: "CAPM, Fama-French 3-factor, Carhart 4-factor models",
            resource: "Kenneth French's data library (free) + above book",
            priority: "critical",
          },
          {
            text: "Risk decomposition — systematic vs idiosyncratic risk",
            resource: "Same + Barra factor model whitepapers",
            priority: "normal",
          },
          {
            text: "Portfolio optimization in Python — cvxpy or scipy.optimize",
            resource: "Code it: mean-variance, Black-Litterman",
            priority: "critical",
          },
        ],
      },
    ],
    milestone:
      "You can price a European option with Monte Carlo and Black-Scholes, build a pairs trading backtest, and construct an optimized portfolio using factor exposures. You can explain your Sharpe ratio and what assumptions it rests on.",
    weeklyHours: "15–25 hrs/week",
  },
  {
    id: 3,
    title: "Machine Learning for Alpha",
    duration: "Months 8–10",
    subtitle: "ML Applied to Markets (Not Kaggle ML)",
    icon: "◈",
    why: "ML in finance is very different from ML in tech. Overfitting is your #1 enemy. This phase teaches you how quant funds actually use ML — with heavy emphasis on regularization, cross-validation on time series, and feature engineering from financial data.",
    tracks: [
      {
        name: "ML Foundations (Quant-Flavored)",
        items: [
          {
            text: "Cross-validation for time series — walk-forward, purged k-fold, embargo",
            resource: "\"Advances in Financial ML\" by Marcos López de Prado (Ch. 7)",
            priority: "critical",
          },
          {
            text: "Feature engineering — technical indicators, fundamental ratios, microstructure features, labeling methods (triple barrier)",
            resource: "López de Prado Ch. 3–5",
            priority: "critical",
          },
          {
            text: "Tree-based models — random forests, gradient boosting (XGBoost/LightGBM) for cross-sectional alpha",
            resource: "scikit-learn, XGBoost docs",
            priority: "critical",
          },
          {
            text: "Regularization obsession — L1/L2, early stopping, feature importance, why neural nets often lose to trees in low-signal regimes",
            resource: "López de Prado + Hastie \"Elements of Statistical Learning\"",
            priority: "critical",
          },
        ],
      },
      {
        name: "Deep Learning (Selective)",
        items: [
          {
            text: "LSTMs and Transformers for sequence modeling — understand the hype vs reality",
            resource: "PyTorch tutorials + research papers",
            priority: "normal",
          },
          {
            text: "Autoencoders for factor extraction",
            resource: "Research papers (search \"autoencoder factor model\")",
            priority: "normal",
          },
          {
            text: "Reinforcement learning for execution/portfolio optimization (advanced, skim only)",
            resource: "\"Foundations of RL\" by Barto & Sutton",
            priority: "low",
          },
        ],
      },
      {
        name: "Alternative Data & NLP",
        items: [
          {
            text: "Sentiment analysis on news/earnings calls",
            resource: "HuggingFace transformers + SEC EDGAR filings",
            priority: "normal",
          },
          {
            text: "Understanding alt data: satellite imagery, credit card data, web scraping signals",
            resource: "\"Alternative Data\" by Denev & Amen",
            priority: "normal",
          },
          {
            text: "Data sourcing ethics and legality",
            resource: "Read actual SEC guidance on material non-public info",
            priority: "normal",
          },
        ],
      },
    ],
    milestone:
      "You have a walk-forward backtested ML strategy that predicts cross-sectional returns. You understand why your in-sample Sharpe of 4.0 is meaningless and your out-of-sample Sharpe of 0.8 is actually interesting.",
    weeklyHours: "15–25 hrs/week",
  },
  {
    id: 4,
    title: "Strategy Development & Backtesting",
    duration: "Months 11–14",
    subtitle: "Build, Test & Doubt Your Strategies",
    icon: "♣",
    why: "This is where you go from student to practitioner. You'll build a proper backtesting framework, develop your own strategies, and learn the painful art of strategy evaluation — where most of your ideas will fail.",
    tracks: [
      {
        name: "Backtesting Infrastructure",
        items: [
          {
            text: "Build your own event-driven backtester OR use Zipline/Backtrader/vectorbt deeply",
            resource: "vectorbt (fastest to start) or build your own (best for learning)",
            priority: "critical",
          },
          {
            text: "Transaction costs modeling — commissions, slippage, market impact",
            resource: "\"Algorithmic Trading\" by Ernie Chan",
            priority: "critical",
          },
          {
            text: "Avoiding lookahead bias, survivorship bias, selection bias",
            resource: "López de Prado Ch. 8–11 + Bailey et al. \"Pseudo-Mathematics\"",
            priority: "critical",
          },
          {
            text: "Performance metrics beyond Sharpe — Sortino, Calmar, max drawdown, turnover",
            resource: "quantstats library + pyfolio",
            priority: "critical",
          },
        ],
      },
      {
        name: "Strategy Families to Implement",
        items: [
          {
            text: "Mean reversion — pairs trading, Ornstein-Uhlenbeck, stat arb baskets",
            resource: "Ernie Chan books",
            priority: "critical",
          },
          {
            text: "Momentum / trend following — time-series momentum, cross-sectional momentum",
            resource: "AQR research papers (free), Moskowitz et al. \"Time Series Momentum\"",
            priority: "critical",
          },
          {
            text: "Market making (paper trade only) — understand bid-ask dynamics",
            resource: "\"Algorithmic and High-Frequency Trading\" by Cartea, Jaimungal, Penalva",
            priority: "normal",
          },
          {
            text: "Options strategies — volatility trading, dispersion, skew trades",
            resource: "\"Volatility Trading\" by Euan Sinclair",
            priority: "normal",
          },
        ],
      },
      {
        name: "Strategy Evaluation",
        items: [
          {
            text: "Combinatorial Purged Cross-Validation (CPCV)",
            resource: "López de Prado Ch. 12",
            priority: "critical",
          },
          {
            text: "Deflated Sharpe Ratio — accounting for multiple testing",
            resource: "Bailey & López de Prado paper (free)",
            priority: "critical",
          },
          {
            text: "Walk-forward analysis and out-of-sample testing discipline",
            resource: "Your own framework",
            priority: "critical",
          },
          {
            text: "Strategy correlation — does this add value to your existing book?",
            resource: "Portfolio-level thinking",
            priority: "normal",
          },
        ],
      },
    ],
    milestone:
      "You have 2–3 backtested strategies with realistic transaction costs, out-of-sample Sharpe ratios > 0.5, and you can articulate why they might work (and why they might stop working).",
    weeklyHours: "20–25 hrs/week",
  },
  {
    id: 5,
    title: "Live Trading & Interview Prep",
    duration: "Months 15–18",
    subtitle: "Real Money, Real Pain, Real Skills",
    icon: "▲",
    why: "Paper trading is not trading. You need to deploy with real money (small amounts) to learn execution, psychology, and ops. Simultaneously, if you want to interview at firms, you prep for their specific process.",
    tracks: [
      {
        name: "Live Deployment",
        items: [
          {
            text: "Brokerage setup — Interactive Brokers (best API), Alpaca (free, simpler)",
            resource: "IB TWS API docs or Alpaca API docs",
            priority: "critical",
          },
          {
            text: "Execution infrastructure — order management, position tracking, risk limits, kill switches",
            resource: "Build it yourself — this is where your SWE skills shine",
            priority: "critical",
          },
          {
            text: "Start with $5K–$25K — enough to be real, not enough to ruin you",
            resource: "Your risk tolerance",
            priority: "critical",
          },
          {
            text: "Monitoring & alerting — PnL dashboards, drawdown alerts, position limits",
            resource: "Grafana + your logging stack",
            priority: "critical",
          },
          {
            text: "Tax implications — wash sale rules, 1256 contracts, mark-to-market election",
            resource: "Consult a CPA who knows active traders",
            priority: "normal",
          },
        ],
      },
      {
        name: "Quant Interview Prep",
        items: [
          {
            text: "Probability puzzles & brainteasers",
            resource: "\"Heard on the Street\" by Tim Crack, \"Green Book\" (Joshi)",
            priority: "critical",
          },
          {
            text: "Coding interviews — leetcode but also data manipulation (pandas, SQL, live signal construction)",
            resource: "Leetcode + QuantConnect challenges",
            priority: "critical",
          },
          {
            text: "Statistics questions — explain p-hacking, why most backtest results are false, bias-variance tradeoff in finance context",
            resource: "Your own notes from this entire journey",
            priority: "critical",
          },
          {
            text: "Market questions — \"pitch me a trade\" — you need 2–3 trade ideas you can defend in depth",
            resource: "Your live strategies!",
            priority: "critical",
          },
          {
            text: "System design for trading — latency, data pipelines, risk systems",
            resource: "Your SWE background + what you've built",
            priority: "normal",
          },
        ],
      },
      {
        name: "Continuous Learning",
        items: [
          {
            text: "Read research — SSRN quantitative finance section, Journal of Portfolio Management",
            resource: "SSRN.com, arXiv q-fin section",
            priority: "normal",
          },
          {
            text: "Community — QuantConnect, Wilmott forums, r/algotrading (filter heavily), Twitter/X quant community",
            resource: "Various",
            priority: "normal",
          },
          {
            text: "Kaggle competitions — Jane Street, Optiver, Two Sigma competitions for practice",
            resource: "Kaggle.com",
            priority: "normal",
          },
        ],
      },
    ],
    milestone:
      "You're running at least one live strategy, tracking real PnL, and can walk into an interview and talk about your own trading system — what it does, why it works, how you built it, and what its weaknesses are.",
    weeklyHours: "20–30 hrs/week",
  },
];

export const BOOK_SHELF: Book[] = [
  {
    title: "Stochastic Calculus for Finance II",
    author: "Shreve",
    phase: "Core",
    tier: "essential",
  },
  {
    title: "Algorithmic Trading",
    author: "Ernie Chan",
    phase: "Core → Strat",
    tier: "essential",
  },
  {
    title: "Advances in Financial ML",
    author: "López de Prado",
    phase: "ML → Strat",
    tier: "essential",
  },
  {
    title: "Options, Futures, and Other Derivatives",
    author: "Hull",
    phase: "Foundation",
    tier: "essential",
  },
  {
    title: "Volatility Trading",
    author: "Sinclair",
    phase: "Strategy",
    tier: "recommended",
  },
  {
    title: "Quantitative Trading",
    author: "Ernie Chan",
    phase: "Foundation",
    tier: "recommended",
  },
  {
    title: "Paul Wilmott Introduces QF",
    author: "Wilmott",
    phase: "Core",
    tier: "recommended",
  },
  {
    title: "Heard on the Street",
    author: "Crack",
    phase: "Interview",
    tier: "essential",
  },
  {
    title: "The Man Who Solved the Market",
    author: "Zuckerman",
    phase: "Anytime",
    tier: "fun",
  },
  {
    title: "My Life as a Quant",
    author: "Derman",
    phase: "Anytime",
    tier: "fun",
  },
];

export const REALITY_CHECKS: RealityCheck[] = [
  {
    icon: "⚠",
    text: "Most strategies that look good in backtests don't work live. This is normal. Your edge is discipline and iteration, not finding one magic signal.",
  },
  {
    icon: "💰",
    text: "Realistic personal trading returns: a consistently profitable quant making 15–30% annually risk-adjusted is doing very well. Anyone promising 100%+ is selling something.",
  },
  {
    icon: "🧠",
    text: "The quant job market values: (1) math chops, (2) coding speed, (3) financial intuition, (4) intellectual humility. In roughly that order for junior roles.",
  },
  {
    icon: "⏱",
    text: "This roadmap assumes ~20 hrs/week alongside a full-time job. If you go full-time on this, compress the timeline by ~40%.",
  },
  {
    icon: "🎯",
    text: "Your SWE background is a massive advantage. Most math PhDs can't build production systems. You can. Lean into that.",
  },
];

export const JOB_CATEGORIES: JobCategory[] = [
  {
    name: "Hedge funds",
    description:
      "(Citadel, Two Sigma, DE Shaw, Renaissance) — hardest to break into, mostly hire PhDs from top programs. But they do hire experienced SWE-turned-quants for quant dev and quant researcher roles, especially if you bring a strong track record or niche domain knowledge.",
  },
  {
    name: "Prop trading firms",
    description:
      "(Jane Street, Optiver, SIG, Jump) — more open to non-traditional backgrounds but interviews are brutally mathematical. Probability puzzles, market making games, live mental math.",
  },
  {
    name: "Banks",
    description:
      "(Goldman, JPM, Morgan Stanley quant desks) — more structured hiring, often want MFE/MQF degrees. Strats roles at Goldman are attainable for strong SWEs.",
  },
  {
    name: "Crypto / DeFi funds",
    description:
      "— the wild west. Lower bar to entry, higher variance outcomes. Can be a stepping stone.",
  },
  {
    name: "Your own capital",
    description:
      "— the ultimate goal for many. No politics, no interviews, full ownership. But undercapitalization is real — you need either leverage (futures/options) or a long time horizon.",
  },
];
