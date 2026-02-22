export interface Section {
  id: string;
  title: string;
  content: string;
}

export interface Topic {
  slug: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  sections: Section[];
}

export const topics: Topic[] = [
  {
    slug: "how-market-works",
    title: "How the Stock Market Works",
    description: "Learn what stocks are, how exchanges work, and what moves prices.",
    icon: "📈",
    order: 1,
    sections: [
      {
        id: "what-is-stock",
        title: "What Is a Stock?",
        content: `A stock represents ownership in a company. When you buy a stock, you become a part-owner (shareholder) of that business.

**A Simple Example:**

Imagine a pizza shop worth $100,000 is divided into 1,000 shares. Each share is worth $100 and represents 0.1% ownership of the shop.

If you buy 10 shares for $1,000, you own 1% of the pizza shop. If the shop becomes more successful and is now worth $200,000, your shares are worth $2,000.

**Why Companies Sell Stock:**

Companies sell stock to raise money. Instead of borrowing from banks, they can sell partial ownership to investors. This money funds growth, research, new products, etc.

**Why Investors Buy Stock:**

1. **Capital Appreciation** — The stock price goes up, you can sell for a profit
2. **Dividends** — Some companies share profits with shareholders as cash payments
3. **Voting Rights** — Shareholders can vote on major company decisions

**Two Ways to Make Money:**

1. **Price Increase** — Buy at $50, sell at $75, profit $25 per share
2. **Dividends** — Company pays $2 per share annually while you hold it

**What You're Really Buying:**

When you buy stock in Apple, you're buying:
- A tiny fraction of ownership in Apple's buildings, products, and cash
- A claim on Apple's future profits
- The right to vote at shareholder meetings (most people don't bother)

**The Key Insight:**

Stock prices ultimately reflect what people think a company's future profits will be. If investors believe Apple will be more profitable in the future, the stock price goes up. If they're pessimistic, it goes down.`,
      },
      {
        id: "stock-exchanges",
        title: "Stock Exchanges: NYSE and NASDAQ",
        content: `A stock exchange is a marketplace where buyers and sellers trade stocks. Think of it like eBay, but for company ownership.

**The Two Major US Exchanges:**

**NYSE (New York Stock Exchange)**
- Located on Wall Street in NYC
- The largest exchange in the world by market cap
- Traditional, prestigious — many old, established companies
- Examples: Coca-Cola, Walmart, JPMorgan

**NASDAQ (National Association of Securities Dealers Automated Quotations)**
- Fully electronic, no physical trading floor
- Known for tech companies
- Examples: Apple, Microsoft, Google, Amazon

**Does It Matter Which Exchange?**

For you as an investor, not really. You can buy stocks from either exchange through any brokerage. The exchange affects the company (listing fees, requirements) but not your ability to trade.

**How Trading Works:**

1. You tell your broker "Buy 10 shares of AAPL at market price"
2. Your broker routes the order to the exchange
3. The exchange matches your buy order with someone's sell order
4. The trade executes in milliseconds
5. You now own the shares

**Other Exchanges:**

- **International** — London Stock Exchange, Tokyo Stock Exchange, Hong Kong Stock Exchange
- **Smaller US** — NYSE American (formerly AMEX), BATS, IEX

**Market Makers:**

These are firms that always offer to buy and sell certain stocks. They profit from the tiny difference between buy and sell prices and help ensure you can always trade when you want to.`,
      },
      {
        id: "market-hours",
        title: "Market Hours and Holidays",
        content: `US stock markets have specific hours when you can trade.

**Regular Trading Hours:**

- **Open:** 9:30 AM Eastern Time
- **Close:** 4:00 PM Eastern Time
- **Days:** Monday through Friday

**Extended Hours Trading:**

Some brokers offer extended hours:
- **Pre-market:** 4:00 AM - 9:30 AM ET
- **After-hours:** 4:00 PM - 8:00 PM ET

Extended hours trading has less volume (fewer buyers/sellers), which can mean:
- Wider bid-ask spreads (worse prices)
- More volatility
- Harder to execute large orders

Most beginners should stick to regular hours.

**Market Holidays:**

US markets are closed on:
- New Year's Day
- Martin Luther King Jr. Day
- Presidents' Day
- Good Friday
- Memorial Day
- Juneteenth
- Independence Day
- Labor Day
- Thanksgiving Day
- Christmas Day

If a holiday falls on a weekend, markets may close on the adjacent Friday or Monday.

**Why Hours Matter:**

- News released after hours can cause big moves when markets open
- Earnings reports are often released before open or after close
- Global events overnight can affect opening prices

**For Long-Term Investors:**

Market hours matter less if you're investing for decades. Whether you buy at 10 AM or 3 PM, or Monday vs. Thursday, makes little difference over 20 years.`,
      },
      {
        id: "bull-bear",
        title: "Bull vs. Bear Markets",
        content: `You'll hear "bull market" and "bear market" a lot. Here's what they mean.

**Bull Market:**

- Prices are rising or expected to rise
- Investor confidence is high
- Economy is generally strong
- Named because bulls attack by thrusting horns UP

**Bear Market:**

- Prices are falling or expected to fall
- Investor fear and pessimism
- Often accompanied by economic slowdowns
- Named because bears attack by swiping DOWN
- Technically defined as a 20%+ drop from recent highs

**Market Corrections:**

A "correction" is a 10-20% drop from recent highs. These happen regularly and are considered normal and healthy.

**Historical Perspective:**

- Bull markets have historically lasted longer than bear markets
- The average bear market lasts about 9-14 months
- The average bull market lasts about 3-5 years
- Over any 20-year period, the market has always ended higher than it started

**What Should You Do?**

**In a bull market:**
- Stay invested, don't get overconfident
- Stick to your plan
- Don't chase overpriced stocks just because everything is going up

**In a bear market:**
- Don't panic sell
- Consider it a "sale" — stocks are cheaper
- Continue investing regularly (you're buying at lower prices)
- Remember: every bear market in history has eventually ended

**The Key Insight:**

Bear markets feel terrible while you're in them, but they're when long-term investors build wealth. Buying during fear and holding through recovery is how fortunes are made.`,
      },
      {
        id: "price-determination",
        title: "How Stock Prices Are Determined",
        content: `Stock prices are determined by one simple force: supply and demand.

**The Basic Mechanism:**

- More buyers than sellers → Price goes up
- More sellers than buyers → Price goes down

Every transaction has a buyer AND a seller. When you buy, someone else is selling to you at that exact price.

**What Moves Prices:**

**Company-Specific Factors:**
- Earnings reports (profits higher/lower than expected)
- New products or services
- Management changes
- Scandals or lawsuits
- Acquisitions or mergers

**Market-Wide Factors:**
- Interest rate changes
- Economic data (unemployment, GDP, inflation)
- Political events
- Global crises
- Investor sentiment/psychology

**The Role of Expectations:**

Prices reflect EXPECTATIONS of future performance, not just current reality.

Example: A company reports record profits, but the stock drops. Why? Because investors expected EVEN HIGHER profits. The actual results disappointed relative to expectations.

**Bid and Ask:**

- **Bid** — The highest price a buyer is willing to pay right now
- **Ask** — The lowest price a seller is willing to accept right now
- **Spread** — The difference between bid and ask

When you place a market order, you buy at the ask price or sell at the bid price.

**Price Discovery:**

The constant interaction of millions of buyers and sellers, each with their own information and expectations, creates a "discovery" process that theoretically finds the fair price at any moment.

**The Efficient Market Hypothesis:**

This theory suggests that stock prices reflect all available information. If true, you can't consistently beat the market because prices already account for everything known. This is why many experts recommend index funds over trying to pick individual stocks.`,
      },
    ],
  },
  {
    slug: "investment-types",
    title: "Types of Investments",
    description: "Stocks, ETFs, mutual funds, and bonds — know your options.",
    icon: "🎨",
    order: 2,
    sections: [
      {
        id: "individual-stocks",
        title: "Individual Stocks",
        content: `Buying individual stocks means purchasing shares of specific companies directly.

**Pros:**
- Potential for high returns if you pick winners
- You control exactly what you own
- No management fees
- Can be exciting and educational

**Cons:**
- High risk — individual companies can fail completely
- Requires research and ongoing monitoring
- Emotional challenge of watching your picks
- Hard to diversify without significant capital

**When to Buy Individual Stocks:**

- After you understand the basics
- Money you can afford to lose
- You enjoy researching companies
- As a supplement to, not replacement for, diversified funds

**Stock Picking Reality Check:**

Studies show that most professional fund managers underperform simple index funds over time. If experts struggle, individual investors face even bigger challenges.

Most financial advisors recommend putting the majority of your portfolio in diversified funds, with individual stocks being a smaller "play money" portion if you enjoy it.`,
      },
      {
        id: "etfs",
        title: "ETFs & Index Funds",
        content: `ETFs (Exchange-Traded Funds) are the single best invention for individual investors. They're highly recommended for beginners.

**What Is an ETF?**

An ETF is a basket of stocks (or bonds) that trades like a single stock. When you buy one share of an S&P 500 ETF, you're effectively buying tiny pieces of 500 different companies.

**What Is an Index Fund?**

An index fund tracks a market index (like the S&P 500) rather than trying to beat it. Most ETFs are index funds.

**Why ETFs Are Great for Beginners:**

1. **Instant Diversification** — One purchase gives you hundreds of stocks
2. **Low Fees** — Many charge 0.03-0.20% annually (vs 1%+ for actively managed funds)
3. **Simplicity** — Buy one fund and you're done
4. **No Stock Picking** — The index decides what's included
5. **Trade Like Stocks** — Buy/sell anytime during market hours

**Popular ETFs:**

| ETF | What It Tracks | Expense Ratio |
|-----|----------------|---------------|
| VOO, SPY, IVV | S&P 500 (500 largest US companies) | 0.03-0.09% |
| VTI, ITOT | Total US Stock Market | 0.03% |
| VXUS | International Stocks | 0.07% |
| BND | US Bonds | 0.03% |
| QQQ | NASDAQ 100 (tech-heavy) | 0.20% |

**The "Just Buy VTI" Strategy:**

Many experts suggest beginners simply buy a total market ETF like VTI and call it a day. You'll own a piece of virtually every public US company, automatically diversified, for almost no fee.

**ETF vs. Mutual Fund:**

ETFs and index mutual funds are similar, but ETFs:
- Trade throughout the day (mutual funds only at end of day)
- Usually have lower minimums
- Are more tax-efficient
- Have slightly lower fees in many cases`,
      },
      {
        id: "mutual-funds",
        title: "Mutual Funds",
        content: `Mutual funds pool money from many investors to buy a diversified portfolio of stocks, bonds, or other assets.

**How They Work:**

1. You invest money in the fund
2. A professional manager decides what to buy/sell
3. The fund's value (NAV) is calculated daily
4. You own shares of the fund, not the underlying stocks directly

**Types of Mutual Funds:**

- **Index Funds** — Track an index passively (low fees)
- **Actively Managed** — Manager tries to beat the market (higher fees)
- **Target-Date Funds** — Automatically adjust risk as you approach retirement

**Pros:**
- Professional management
- Diversification
- Convenient for retirement accounts
- Automatic dividend reinvestment

**Cons:**
- Higher fees than ETFs (especially active funds)
- Only trade once per day (after market close)
- Minimum investments ($1,000-$3,000 common)
- Less tax-efficient than ETFs

**The Active vs. Passive Debate:**

Over 15-year periods, about 90% of actively managed funds underperform their benchmark index. You're paying higher fees for worse results.

This is why most experts recommend low-cost index funds over actively managed funds.

**When Mutual Funds Make Sense:**

- 401(k) plans often only offer mutual funds
- Target-date funds are convenient for hands-off retirement saving
- Some excellent low-cost index mutual funds exist (Fidelity, Vanguard)`,
      },
      {
        id: "bonds",
        title: "Bonds: A Brief Overview",
        content: `Bonds are loans you make to governments or corporations. They pay you interest and return your principal at maturity.

**How Bonds Work:**

1. You buy a $1,000 bond paying 5% annually
2. You receive $50/year in interest payments
3. At maturity (say, 10 years), you get your $1,000 back

**Types of Bonds:**

- **Government Bonds** — Issued by US Treasury (very safe)
- **Municipal Bonds** — Issued by states/cities (often tax-free)
- **Corporate Bonds** — Issued by companies (higher risk, higher yield)

**Why Include Bonds:**

- Lower volatility than stocks
- Provide steady income
- Often move opposite to stocks (diversification)
- Preserve capital for shorter time horizons

**Bond Risk:**

Bonds aren't risk-free:
- **Interest Rate Risk** — When rates rise, existing bond prices fall
- **Credit Risk** — The issuer could default (not pay you back)
- **Inflation Risk** — Fixed payments lose purchasing power over time

**Bonds for Beginners:**

Most beginners should focus on stocks for growth. Bonds become more important as you:
- Get closer to retirement
- Need more stability
- Have shorter time horizons

A simple rule: Your age in bonds. If you're 30, maybe 30% bonds. If you're 60, maybe 60% bonds. (This is a rough guideline, not a strict rule.)

**Easy Way to Own Bonds:**

Bond ETFs like BND (total bond market) or individual Treasury bonds through TreasuryDirect.gov.`,
      },
      {
        id: "why-etfs",
        title: "Why ETFs Are Great for Starting Out",
        content: `If you're just starting to invest, ETFs are almost certainly your best option.

**The Case for ETFs:**

**1. You Don't Need to Pick Stocks**

Picking winning stocks is extremely difficult. Even professionals fail most of the time. With an index ETF, you own the whole market and don't need to pick.

**2. Instant Diversification**

Owning 500+ companies in one purchase means:
- If one company fails, you barely notice
- You capture overall market growth
- Lower stress and volatility

**3. Incredibly Low Costs**

- Fidelity's FZROX: 0.00% (yes, free)
- Vanguard's VTI: 0.03% ($3 per $10,000 invested)

Compare to actively managed funds at 1%+ or financial advisors at 1-2%.

**4. Set It and Forget It**

Once you buy, you can leave it alone for decades. No need to watch daily prices, read earnings reports, or make trading decisions.

**5. Proven Results**

The S&P 500 has returned about 10% annually over its history. Simple index investing has made many people millionaires.

**A Simple Starting Portfolio:**

- **100% VTI** (Total US Stock Market) — Simple, effective
- **Or: 80% VTI + 20% VXUS** — Add international exposure
- **Or: 60% VTI + 40% BND** — More conservative with bonds

**The Boring Truth:**

The "boring" strategy of buying index funds and holding forever beats most "exciting" strategies over time. Embrace the boring.`,
      },
    ],
  },
  {
    slug: "first-investment",
    title: "Your First Investment",
    description: "Practical steps to open an account and make your first purchase.",
    icon: "🚀",
    order: 3,
    sections: [
      {
        id: "choosing-brokerage",
        title: "Choosing a Brokerage",
        content: `A brokerage is where you'll open an account to buy and sell investments. Choosing one is simpler than it used to be.

**What to Look For:**

1. **$0 Commission Trading** — Standard now at major brokerages
2. **No Account Minimum** — Start with any amount
3. **Fractional Shares** — Buy partial shares (important for expensive stocks)
4. **Good Mobile App** — Easy to use interface
5. **Educational Resources** — Helpful for learning
6. **Customer Support** — Responsive when you need help

**Popular Options for Beginners:**

| Brokerage | Pros | Cons |
|-----------|------|------|
| **Fidelity** | Excellent funds, great research, no minimums | Website can be complex |
| **Charles Schwab** | Full-service, good support | Interface less modern |
| **Vanguard** | Pioneer of index funds, investor-owned | Clunky interface |
| **Robinhood** | Slick app, very easy to use | Encourages trading, less educational |
| **M1 Finance** | Automated investing, "pies" | Less flexibility |

**My Suggestion for Beginners:**

**Fidelity** or **Schwab** — They're established, have great customer service, offer excellent low-cost funds, and won't go anywhere. Robinhood's app is pretty, but it gamifies investing in ways that can hurt beginners.

**What You'll Need to Open an Account:**

- Social Security Number
- Government ID
- Bank account for transfers
- Employment information
- About 10-15 minutes

**Transferring Money:**

Link your bank account and transfer money. This takes 1-3 business days initially. After that, you can often invest immediately while the transfer settles.`,
      },
      {
        id: "account-types",
        title: "Types of Accounts",
        content: `The type of account matters for taxes. Choose wisely.

**Retirement Accounts (Tax-Advantaged):**

**401(k)** — Through your employer
- Contributions reduce your taxable income
- Often includes employer matching (free money!)
- $23,000 contribution limit (2024)
- Penalty for withdrawal before age 59½

**Traditional IRA** — Individual account
- Contributions may be tax-deductible
- $7,000 contribution limit (2024)
- Penalty for early withdrawal

**Roth IRA** — Individual account
- Contributions are after-tax (no deduction)
- Withdrawals in retirement are TAX-FREE
- $7,000 contribution limit (2024)
- Can withdraw contributions (not gains) anytime without penalty

**Taxable Brokerage Account:**

- No tax benefits
- No contribution limits
- No withdrawal restrictions
- Pay taxes on dividends and capital gains

**Recommended Priority:**

1. **401(k) up to employer match** — Get the free money first
2. **Roth IRA** — Tax-free growth is powerful
3. **More 401(k)** — Up to the limit
4. **Taxable account** — For anything beyond

**Why Roth Is Often Best for Young Investors:**

- You're probably in a lower tax bracket now
- Pay taxes now at low rates
- Never pay taxes on decades of growth
- More flexibility for withdrawals`,
      },
      {
        id: "first-order",
        title: "Placing Your First Order",
        content: `You've opened an account and transferred money. Now let's buy something.

**Step-by-Step:**

1. **Search for the investment** — Enter the ticker symbol (e.g., VTI)
2. **Click "Trade" or "Buy"**
3. **Choose order type** — Select "Market Order" for simplicity
4. **Enter amount** — Number of shares or dollar amount
5. **Review and confirm**
6. **Done!** — You're now an investor

**Order Types (Keep It Simple):**

- **Market Order** — Buy immediately at current price. Best for beginners.
- **Limit Order** — Only buy if price is at or below your specified price.

For beginners buying ETFs: just use market orders during regular market hours. The difference in price is negligible for long-term investors.

**How Many Shares to Buy:**

With fractional shares, you can invest any dollar amount. Instead of "buy 3 shares," you can "buy $500 of VTI."

**Your First Purchase Might Feel Anticlimactic:**

You click confirm, and... that's it. No fireworks. You own a tiny piece of hundreds of companies. Check back in 20 years — it'll be more exciting then.

**What Happens After:**

- Your shares appear in your account
- If there are dividends, they'll be paid (often reinvested automatically)
- The value fluctuates with the market
- You don't need to do anything else`,
      },
      {
        id: "dollar-cost-averaging",
        title: "Dollar-Cost Averaging",
        content: `Dollar-cost averaging (DCA) is investing a fixed amount at regular intervals, regardless of price.

**How It Works:**

Instead of investing $6,000 at once, you invest $500 per month for 12 months.

**Month** | **Price** | **Shares Bought**
---------|-----------|------------------
Jan | $100 | 5.00
Feb | $90 | 5.56
Mar | $80 | 6.25
Apr | $85 | 5.88
May | $95 | 5.26
Jun | $100 | 5.00

Average price paid: $91.67 (better than the $100 you started at)

**Benefits:**

1. **Removes timing decisions** — No stress about "is now a good time?"
2. **Smooths out volatility** — Buy more when cheap, less when expensive
3. **Creates discipline** — Automatic, consistent investing
4. **Reduces regret** — No "I should have waited" or "I should have bought more"

**How to Automate:**

Most brokerages let you set up automatic investments:
1. Go to account settings
2. Set up recurring investment
3. Choose amount, frequency, and what to buy
4. Forget about it

**DCA vs. Lump Sum:**

Mathematically, investing a lump sum immediately beats DCA about 2/3 of the time (because markets generally go up). But DCA:
- Is easier emotionally
- Is how most people invest anyway (from each paycheck)
- Protects against bad timing

**The Best Approach:**

If you have a lump sum, investing it all immediately is statistically optimal. But if DCA helps you actually invest instead of sitting on cash, it's the right choice for you.

For ongoing income, automatic monthly investments are ideal.`,
      },
      {
        id: "fractional-shares",
        title: "Fractional Shares",
        content: `Fractional shares let you buy a portion of a stock instead of whole shares only.

**The Problem They Solve:**

Amazon stock costs about $180 per share. Berkshire Hathaway Class A costs over $600,000 per share. Without fractional shares, you'd need that much to buy even one share.

**How Fractional Shares Work:**

Instead of "buy 1 share of AMZN," you can "buy $50 of AMZN." If the stock is at $180, you'd own 0.278 shares.

**Benefits:**

1. **Start with any amount** — Invest $5 or $50,000
2. **Perfect for DCA** — Invest exact dollar amounts each month
3. **Easy diversification** — Buy small amounts of many stocks
4. **Full participation** — Own expensive stocks without huge capital

**Limitations:**

- Not all brokerages offer them
- Some only for certain stocks (usually major ones)
- May not transfer to other brokerages easily
- Voting rights may be limited

**Which Brokerages Offer Fractional Shares:**

- Fidelity — Yes
- Schwab — Yes (called "Stock Slices")
- Robinhood — Yes
- Vanguard — ETFs only

**For Beginners:**

Fractional shares are fantastic. They mean you can start investing TODAY with whatever you have, even if it's just $20. No need to save up for a full share first.`,
      },
    ],
  },
  {
    slug: "retirement-accounts",
    title: "Retirement Accounts",
    description: "401(k), IRA, and Roth — understand the tax-advantaged accounts.",
    icon: "🏦",
    order: 4,
    sections: [
      {
        id: "401k",
        title: "401(k) Basics & Employer Match",
        content: `A 401(k) is a retirement account offered through your employer. It's often the best place to start investing.

**How It Works:**

1. You choose a percentage of your paycheck to contribute
2. Money goes in BEFORE taxes are taken out
3. Your employer may match part of your contribution
4. Money grows tax-deferred
5. You pay taxes when you withdraw in retirement

**The Employer Match — FREE MONEY:**

Many employers match your contributions up to a certain amount. Common structures:
- "100% match up to 3%" — You contribute 3%, they add 3%
- "50% match up to 6%" — You contribute 6%, they add 3%

**This is free money. Always contribute at least enough to get the full match.**

Example: You earn $60,000 and your employer matches 100% up to 3%:
- You contribute 3%: $1,800/year
- Employer adds: $1,800/year
- Total invested: $3,600/year
- That's an instant 100% return!

**Contribution Limits (2024):**

- Under 50: $23,000/year
- 50 or older: $30,500/year (extra "catch-up" allowed)

**Investment Options:**

401(k)s typically offer a limited menu of funds. Look for:
- Low-cost index funds (S&P 500, total market)
- Target-date funds (set it and forget it)
- Avoid high-fee actively managed funds

**The Catch:**

- Money is locked until age 59½ (with some exceptions)
- Early withdrawal = 10% penalty + taxes
- Required minimum distributions starting at age 73`,
      },
      {
        id: "ira-types",
        title: "Traditional vs. Roth IRA",
        content: `An IRA (Individual Retirement Account) is a retirement account you open yourself, outside of work.

**Traditional IRA:**

- **Tax Break Now:** Contributions may be tax-deductible
- **Taxed Later:** Pay income tax on withdrawals in retirement
- **Best If:** You're in a high tax bracket now and expect lower in retirement

**Roth IRA:**

- **No Tax Break Now:** Contributions are after-tax
- **Tax-Free Later:** Withdrawals in retirement are 100% tax-free
- **Best If:** You're in a lower tax bracket now (common for younger workers)

**Comparison:**

| Feature | Traditional IRA | Roth IRA |
|---------|-----------------|----------|
| Tax deduction now? | Yes (usually) | No |
| Taxed on withdrawal? | Yes | No |
| Contribution limit | $7,000 (2024) | $7,000 (2024) |
| Income limits? | No (but deduction phases out) | Yes |
| Early withdrawal penalty | 10% on all | 10% on earnings only |
| Required distributions? | Yes, at 73 | No |

**Why Roth Is Often Better for Young Investors:**

1. You're likely in a low tax bracket now
2. Decades of tax-free growth
3. No required distributions ever
4. Can withdraw contributions (not gains) anytime without penalty
5. Provides tax diversification in retirement

**Roth Income Limits (2024):**

- Single: Phase out starts at $146,000
- Married filing jointly: Phase out starts at $230,000

If you earn too much, you can't contribute directly to a Roth IRA. (There's a "backdoor Roth" strategy for high earners.)

**Which Should You Choose?**

If your income is under $50,000 and you expect higher earnings later: **Roth IRA**

If your income is high and you're in a top tax bracket: **Traditional IRA** (or backdoor Roth)`,
      },
      {
        id: "account-priority",
        title: "Why Prioritize Tax-Advantaged Accounts",
        content: `The order you invest in different accounts matters significantly for your long-term wealth.

**Recommended Priority:**

**1. 401(k) up to employer match**
This is literally free money. A 100% return instantly. Always do this first.

**2. Pay off high-interest debt**
Credit card debt at 20%+ should be eliminated before investing beyond the match.

**3. Build emergency fund**
3-6 months expenses in savings.

**4. Max out Roth IRA**
$7,000/year (2024). Tax-free growth for decades is incredibly valuable.

**5. Max out 401(k)**
Contribute up to the $23,000 limit.

**6. Taxable brokerage account**
Once you've maxed tax-advantaged accounts, invest here.

**Why This Order?**

Let's compare $10,000 invested at 8% for 30 years:

| Account Type | Final Value | After-Tax Value |
|--------------|-------------|-----------------|
| Taxable | $100,626 | ~$82,000 (after capital gains) |
| Traditional 401(k) | $100,626 | ~$75,000 (taxed as income) |
| Roth IRA | $100,626 | **$100,626** (tax-free!) |

The Roth example assumes you'd pay 25% in taxes at the end. The actual benefit depends on your tax situation, but tax-free growth is powerful.

**Common Mistakes:**

- Leaving employer match on the table (shocking how often this happens)
- Investing in taxable accounts before maxing retirement accounts
- Contributing to Traditional when Roth would be better (or vice versa)
- Not investing because "I can't afford to max it out" — any amount helps!`,
      },
    ],
  },
  {
    slug: "reading-stock-data",
    title: "Reading Stock Data",
    description: "Understand quotes, metrics, and how to research companies.",
    icon: "📊",
    order: 5,
    sections: [
      {
        id: "stock-quotes",
        title: "Stock Quotes & Tickers",
        content: `Understanding how to read a stock quote is fundamental to investing.

**What's a Ticker Symbol?**

A ticker symbol is the short code that identifies a stock:
- AAPL = Apple
- MSFT = Microsoft
- GOOGL = Google (Alphabet)
- AMZN = Amazon

**Reading a Basic Quote:**

When you look up a stock, you'll see something like:

**AAPL - Apple Inc.**
**$185.92** +$2.34 (+1.27%)

- **$185.92** — Current price per share
- **+$2.34** — Change in dollars from yesterday's close
- **(+1.27%)** — Change as a percentage

**Key Data Points:**

| Term | Meaning |
|------|---------|
| **Open** | Price at market open today |
| **Close/Previous Close** | Price at yesterday's market close |
| **High/Low** | Highest and lowest price today |
| **52-Week High/Low** | Highest and lowest price in past year |
| **Volume** | Number of shares traded today |
| **Avg Volume** | Typical daily trading volume |

**Bid and Ask:**

- **Bid:** $185.90 — Highest price buyers are offering
- **Ask:** $185.94 — Lowest price sellers are accepting
- **Spread:** $0.04 — The difference (smaller is better)

**Real-Time vs. Delayed:**

Free quotes are often delayed by 15-20 minutes. For long-term investors, this doesn't matter. If you're actively trading, you need real-time quotes.`,
      },
      {
        id: "key-metrics",
        title: "Key Metrics Explained",
        content: `These are the most important numbers to understand when evaluating stocks.

**Market Cap (Market Capitalization)**

Total value of all shares: Stock Price × Shares Outstanding

- **Large Cap:** $10 billion+ (Apple, Microsoft) — Stable, established
- **Mid Cap:** $2-10 billion — Growth potential with some stability
- **Small Cap:** Under $2 billion — Higher risk, higher potential reward

**P/E Ratio (Price-to-Earnings)**

Stock Price ÷ Earnings Per Share

Tells you how much you're paying for each dollar of profit.
- P/E of 20 = paying $20 for every $1 of annual earnings
- Lower P/E might mean undervalued (or problems)
- Higher P/E might mean overvalued (or high growth expected)

Average S&P 500 P/E: historically around 15-20.

**EPS (Earnings Per Share)**

Company's profit divided by shares outstanding.

If a company earns $1 billion and has 500 million shares, EPS = $2.

**Dividend Yield**

Annual dividend ÷ Stock price, expressed as percentage.

$4 annual dividend ÷ $100 stock = 4% yield

**Beta**

Measures volatility compared to the market.
- Beta of 1.0 = moves with the market
- Beta of 1.5 = 50% more volatile
- Beta of 0.5 = 50% less volatile

**52-Week Range**

The lowest and highest prices in the past year. Useful for context on where current price sits.

**Volume**

Number of shares traded. High volume = lots of interest. Low volume can mean harder to buy/sell.`,
      },
      {
        id: "site-numbers",
        title: "What the Numbers on This Site Mean",
        content: `Here's a quick guide to understanding the data shown throughout this site.

**On Stock Detail Pages:**

**Price & Change**
- The main price shown is the current (or last) trading price
- Green = up from previous close
- Red = down from previous close
- Percentage shows the day's change

**Company Profile**
- Industry and sector classification
- Country and exchange where listed
- Market cap and shares outstanding

**On the Watchlist:**

- Current price and daily change for each stock
- Quick reference to track your picks

**On Insider Pages:**

- **Insider transactions** show when executives buy/sell their own company's stock
- **Insider sentiment** aggregates whether insiders are net buying or selling
- "Notable" highlights transactions over $1M — potentially more significant

**SEC Filings:**
- **10-K** — Annual report (comprehensive)
- **10-Q** — Quarterly report
- **8-K** — Current report (major events)
- **Form 4** — Insider transaction filing

**What's NOT Shown:**

Due to API limitations, we don't currently show:
- Historical price charts
- Real-time streaming quotes
- Advanced financial statements

For these, check Yahoo Finance, Google Finance, or your brokerage.`,
      },
      {
        id: "research-company",
        title: "How to Research a Company",
        content: `Before buying individual stocks, you should understand the business.

**Start With the Basics:**

1. **What does the company do?** Can you explain it simply?
2. **How does it make money?** Understand the business model.
3. **Who are the competitors?** Is it a leader or a follower?
4. **What are the risks?** Every company has them.

**Where to Find Information:**

- **Company website** — Investor relations section has reports
- **SEC filings** — 10-K annual reports are comprehensive
- **Earnings calls** — Transcripts reveal management's thinking
- **News** — Recent developments and analysis
- **This site** — Quick access to news, filings, and insider activity

**Key Questions to Ask:**

**Financial Health:**
- Is revenue growing?
- Is the company profitable?
- How much debt does it have?
- Is it generating cash?

**Competitive Position:**
- Does it have a "moat" (sustainable advantage)?
- Are customers loyal or is it easy to switch?
- Is the industry growing or shrinking?

**Valuation:**
- Is the P/E reasonable compared to peers?
- What growth is priced in?
- What could go wrong?

**Red Flags:**

- Consistent losses with no path to profitability
- Heavy debt with declining revenue
- Management selling lots of stock (check insider activity!)
- Accounting irregularities or restatements
- Too-good-to-be-true promises

**For Beginners:**

Honestly, most beginners shouldn't pick individual stocks. Index funds are simpler and historically perform better. But if you do want to pick stocks, research thoroughly and only use money you can afford to lose.`,
      },
    ],
  },
  {
    slug: "common-mistakes",
    title: "Common Mistakes to Avoid",
    description: "Learn from others' errors — emotional investing, timing, and more.",
    icon: "⚠️",
    order: 6,
    sections: [
      {
        id: "emotional-investing",
        title: "Emotional Investing: Fear & Greed",
        content: `The two most dangerous emotions in investing are fear and greed. They cause people to buy high and sell low — the exact opposite of what makes money.

**Greed (Buying High):**

When markets are booming and everyone's making money, you feel:
- "I'm missing out!"
- "This stock doubled, I need to buy!"
- "Things are different this time"

This leads to buying at peak prices, right before corrections.

**Fear (Selling Low):**

When markets crash and headlines are scary, you feel:
- "I'm losing everything!"
- "It's going to zero!"
- "I need to get out before it gets worse"

This leads to selling at the bottom, locking in losses, and missing the recovery.

**The Cycle:**

1. Market rises → Excitement → Buy more → Greed
2. Market peaks → Everyone invested → Euphoria
3. Market drops → Worry → Hold nervously
4. Market crashes → Panic → Sell everything → Fear
5. Market bottoms → Despair → "Never investing again"
6. Market recovers → Miss the gains → Repeat

**How to Fight Emotional Investing:**

1. **Have a plan** — Decide your strategy when you're calm, not during market chaos
2. **Automate** — Automatic investments remove emotional decisions
3. **Don't watch daily** — Checking prices constantly increases anxiety
4. **Zoom out** — Look at 10-year charts, not 10-day charts
5. **Remember history** — Every crash has eventually recovered

**The Simple Test:**

When you feel strongly about making a trade, wait 48 hours. If you still feel the same way, proceed. Often, the urge passes.`,
      },
      {
        id: "timing-market",
        title: "Trying to Time the Market",
        content: `Market timing means trying to predict when to buy low and sell high. It sounds smart. It doesn't work.

**The Problem:**

To time the market successfully, you need to be right TWICE:
1. When to sell (before a drop)
2. When to buy back in (before a rise)

Being wrong either time can devastate your returns.

**Why It Fails:**

- The market's best days often follow the worst days
- By the time you know a crash is happening, it's too late
- By the time you know a recovery started, you've missed big gains
- Transaction costs and taxes eat into any gains

**The Data:**

Missing just the 10 best days in the market over 20 years can cut your returns in half. Many of those best days occur during the worst periods — when scared investors are out of the market.

**Real Examples:**

- March 2020: COVID crash. Market dropped 34% in weeks.
- Many sold at the bottom in fear.
- The market then rallied 70%+ over the next year.
- Those who sold locked in losses and missed the recovery.

**The Alternative:**

Stay invested through ups and downs. Continue buying regularly. Don't try to be clever.

**"But What If I Know a Crash Is Coming?"**

You don't. Neither does anyone else. Experts have predicted "10 of the last 3 recessions." Even when they're right about direction, timing is impossible.

**The Bottom Line:**

Time IN the market beats timing the market. Always.`,
      },
      {
        id: "fomo",
        title: "Chasing Hot Tips and FOMO",
        content: `FOMO (Fear of Missing Out) causes investors to chase whatever's hot at the moment. This usually ends badly.

**The Pattern:**

1. A stock or sector gets hot (tech, crypto, meme stocks, AI)
2. Early investors make huge gains
3. Media covers it endlessly
4. Your coworker/friend/neighbor brags about gains
5. You feel like you're missing out
6. You buy in
7. The bubble pops
8. You lose money

**Why You're Always Late:**

By the time something is mainstream news, the easy money has been made. Those bragging about gains got in early. You're buying their overpriced shares.

**Hot Tips Don't Work:**

- "My brother-in-law says XYZ is the next big thing"
- "This guy on YouTube says ABC is going to 10x"
- "Everyone at work is buying DEF stock"

These are not investment strategies. They're how to lose money.

**Recent Examples:**

- **Meme stocks (2021):** GameStop hit $483, then crashed to $40. Many lost life savings.
- **Crypto (2021-2022):** Bitcoin hit $69K, crashed to $16K. Many "can't lose" coins went to zero.
- **SPACs (2021):** Most are now down 70-90% from peaks.

**Protecting Yourself:**

1. If a stranger is promoting an investment, be skeptical
2. If it sounds too good to be true, it is
3. If you're buying because everyone else is, pause
4. If you don't understand it, don't buy it
5. Stick to your plan

**The Boring Truth:**

The most successful long-term investors are boring. They buy index funds, contribute regularly, and ignore the noise.`,
      },
      {
        id: "not-diversifying",
        title: "Not Diversifying",
        content: `Putting all your eggs in one basket is one of the most dangerous mistakes an investor can make.

**What Can Go Wrong:**

- Your favorite company commits fraud (Enron, Theranos)
- Industry disruption makes a business obsolete (Kodak, Blockbuster)
- A competitor wins (MySpace vs Facebook)
- Management makes bad decisions
- A single event destroys value

**Real Examples:**

- **Enron employees** had retirement savings in company stock. When Enron collapsed, they lost their jobs AND their retirement.
- **Concentrated tech investors** in 2000 lost 80%+ when the bubble burst.
- **Holding only US stocks** missed international gains in some decades.

**How to Diversify:**

**Across companies:** Own many stocks, not just a few favorites.

**Across sectors:** Tech, healthcare, finance, energy, consumer goods, etc.

**Across geography:** US, international developed, emerging markets.

**Across asset classes:** Stocks, bonds, maybe real estate.

**The Easy Solution:**

A total market index fund like VTI owns 4,000+ US stocks. Add an international fund like VXUS, and you own the entire world's public companies.

**Diversification Doesn't Mean:**

- Owning 5 tech stocks (that's not diversified)
- Owning 10 different crypto tokens (that's not diversified)
- Owning the same thing at different brokerages (that's not diversified)

**The Trade-Off:**

Diversification means you'll never have ALL your money in the best performer. But you'll also never have all your money in a disaster. That trade-off is almost always worth it.`,
      },
      {
        id: "panic-selling",
        title: "Panic Selling During Downturns",
        content: `Panic selling during market crashes is how average investors earn below-average returns.

**The Psychology:**

When markets drop 30%:
- Headlines scream about the "crash"
- Pundits predict further doom
- Your portfolio shows scary red numbers
- Sleep becomes difficult
- The urge to "stop the bleeding" is overwhelming

**Why It's Exactly Wrong:**

Selling during a crash means:
1. You lock in your losses (they're now permanent)
2. You miss the recovery (which historically always comes)
3. You probably won't buy back in until prices are higher

**Market Recovery Stats:**

Every bear market in US history has eventually ended. Average recovery time to previous highs: about 2 years. If you're investing for 20+ years, short-term crashes don't matter.

**What Actually Happens:**

Studies of investor behavior show that average investors significantly underperform the very funds they invest in. Why? They sell low and buy high due to emotional decisions.

**How to Avoid Panic Selling:**

1. **Don't look** — Checking daily during crashes increases anxiety
2. **Remember your time horizon** — You don't need this money for decades
3. **Recall history** — Pull up a 50-year chart of the market
4. **Have a plan** — Decide in advance that you won't sell during crashes
5. **Reframe** — A crash is stocks "on sale"

**The Contrarian Approach:**

Wealthy investors often buy more during crashes. Warren Buffett: "Be fearful when others are greedy, and greedy when others are fearful."

**If You're Truly Losing Sleep:**

Your portfolio might be too aggressive for your risk tolerance. Consider adding bonds for stability. But make this decision when markets are calm, not during a panic.`,
      },
      {
        id: "ignoring-fees",
        title: "Ignoring Fees",
        content: `Fees seem small but compound into massive amounts over time.

**The Math:**

$10,000 invested for 30 years at 7% return:

| Annual Fee | Final Value | Lost to Fees |
|------------|-------------|--------------|
| 0.03% (Vanguard ETF) | $75,847 | $254 |
| 0.50% | $66,439 | $9,662 |
| 1.00% | $57,435 | $18,666 |
| 2.00% | $43,219 | $32,882 |

A 1% fee costs you $18,666 on a $10,000 investment. That's not small.

**Types of Fees to Watch:**

**Expense Ratios** — Annual fee charged by funds
- Good: 0.03% - 0.20%
- Acceptable: 0.20% - 0.50%
- High: 0.50% - 1.00%
- Avoid: 1.00%+

**Advisory Fees** — Financial advisors typically charge 1% of assets annually

**Trading Commissions** — Now $0 at most brokers (wasn't always!)

**Account Fees** — Some brokers charge for inactivity or small accounts

**Load Fees** — Mutual fund sales charges (front-end or back-end)
- These are always bad. Never pay them.

**How to Minimize Fees:**

1. Use low-cost index funds (Vanguard, Fidelity, Schwab)
2. Avoid actively managed funds
3. Use a brokerage with $0 commissions
4. Be wary of financial advisors who charge percentage fees
5. Never buy funds with "loads" (sales charges)

**Are Advisors Worth 1%?**

For most people with simple needs: No. A target-date fund or simple portfolio of index funds works fine.

For complex situations (estates, taxes, business owners): Maybe, but look for fee-only advisors who charge flat fees, not percentages.

**The Simple Rule:**

Every dollar paid in fees is a dollar you don't keep. Minimize fees relentlessly.`,
      },
    ],
  },
  {
    slug: "glossary",
    title: "Glossary",
    description: "A-Z reference of common investing terms.",
    icon: "📖",
    order: 7,
    sections: [
      {
        id: "a-d",
        title: "A - D",
        content: `**Asset Allocation** — How your portfolio is divided among different asset classes (stocks, bonds, cash). Determines most of your risk and return.

**Bear Market** — A market decline of 20% or more from recent highs. Named because bears swipe downward.

**Beta** — A measure of a stock's volatility compared to the market. Beta of 1.0 means it moves with the market.

**Blue Chip** — Large, well-established, financially stable companies with a history of reliable performance. Examples: Apple, Johnson & Johnson, Coca-Cola.

**Bond** — A loan you make to a government or corporation. They pay you interest and return your principal at maturity.

**Broker/Brokerage** — A firm that executes buy and sell orders for investors. Examples: Fidelity, Schwab, Vanguard.

**Bull Market** — A market rising 20% or more from recent lows, or a period of sustained optimism. Named because bulls thrust upward.

**Capital Gains** — Profit from selling an investment for more than you paid. Can be short-term (under 1 year, taxed higher) or long-term (over 1 year, taxed lower).

**Compound Interest** — Earning interest on your interest. The key to long-term wealth building.

**Correction** — A market decline of 10-20% from recent highs. Considered normal and healthy.

**Diversification** — Spreading investments across different assets, sectors, and regions to reduce risk.

**Dividend** — A payment made by a company to shareholders, usually from profits. Often paid quarterly.

**Dollar-Cost Averaging (DCA)** — Investing a fixed amount at regular intervals regardless of price. Smooths out the impact of volatility.`,
      },
      {
        id: "e-i",
        title: "E - I",
        content: `**Earnings Per Share (EPS)** — Company profit divided by shares outstanding. A key measure of profitability.

**ETF (Exchange-Traded Fund)** — A fund that holds a basket of securities and trades like a stock. Often tracks an index.

**Expense Ratio** — Annual fee charged by a fund, expressed as a percentage of assets. Lower is better.

**FDIC Insurance** — Federal insurance that protects bank deposits up to $250,000. Does NOT cover investments.

**Fiduciary** — Someone legally required to act in your best interest. Not all financial advisors are fiduciaries.

**401(k)** — Employer-sponsored retirement account with tax benefits and often employer matching.

**Index** — A benchmark that tracks a segment of the market. Examples: S&P 500, Dow Jones, NASDAQ.

**Index Fund** — A fund that aims to match the performance of an index rather than beat it. Usually low-cost.

**Inflation** — The gradual increase in prices over time, reducing purchasing power of money.

**IPO (Initial Public Offering)** — When a private company first sells stock to the public.

**IRA (Individual Retirement Account)** — Personal retirement account with tax advantages. Traditional IRA is pre-tax; Roth IRA is after-tax.`,
      },
      {
        id: "l-p",
        title: "L - P",
        content: `**Large Cap** — Companies with market capitalization over $10 billion. Generally more stable.

**Limit Order** — An order to buy or sell at a specific price or better. Only executes if that price is available.

**Liquidity** — How easily an investment can be bought or sold without affecting its price. Cash is most liquid.

**Load** — A sales charge on mutual funds. "Front-end load" is charged when buying; "back-end load" when selling. Avoid these.

**Market Cap (Market Capitalization)** — Total value of a company's outstanding shares. Stock price × shares outstanding.

**Market Order** — An order to buy or sell immediately at the best available price.

**Mid Cap** — Companies with market capitalization between $2-10 billion.

**Mutual Fund** — A pooled investment that holds many securities. Priced once daily after market close.

**NASDAQ** — A stock exchange known for technology companies. Fully electronic.

**NYSE (New York Stock Exchange)** — The largest stock exchange in the world, located on Wall Street.

**P/E Ratio (Price-to-Earnings)** — Stock price divided by earnings per share. Indicates how much you pay for each dollar of profit.

**Portfolio** — Your collection of investments.

**Principal** — The original amount invested, before any gains or losses.`,
      },
      {
        id: "r-z",
        title: "R - Z",
        content: `**Rebalancing** — Adjusting your portfolio back to target allocations. If stocks grew from 80% to 90%, you'd sell some to return to 80%.

**Risk Tolerance** — Your ability and willingness to handle investment losses. Determines how aggressive your portfolio should be.

**Roth IRA** — Retirement account where contributions are after-tax, but withdrawals in retirement are tax-free.

**S&P 500** — An index of 500 large US companies. The most common benchmark for US stock performance.

**SEC (Securities and Exchange Commission)** — The government agency that regulates securities markets and protects investors.

**Small Cap** — Companies with market capitalization under $2 billion. Higher risk and potential reward.

**Stock** — Ownership in a company. Each share represents a small piece of the business.

**Stock Split** — When a company divides existing shares into more shares. A 2-for-1 split doubles your shares but halves the price.

**Target-Date Fund** — A fund that automatically adjusts asset allocation based on your expected retirement year. Gets more conservative over time.

**Ticker Symbol** — The abbreviation used to identify a stock. Examples: AAPL (Apple), MSFT (Microsoft).

**Volatility** — How much an investment's price fluctuates. High volatility means bigger swings.

**Volume** — The number of shares traded in a given period. Higher volume means more active trading.

**Yield** — The income return on an investment, usually expressed as an annual percentage.`,
      },
    ],
  },
];

export function getAllTopics(): Topic[] {
  return topics.sort((a, b) => a.order - b.order);
}

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}

export function searchContent(query: string): { topic: Topic; section: Section; matchText: string }[] {
  const results: { topic: Topic; section: Section; matchText: string }[] = [];
  const lowerQuery = query.toLowerCase();

  for (const topic of topics) {
    // Search in topic title and description
    if (topic.title.toLowerCase().includes(lowerQuery) || 
        topic.description.toLowerCase().includes(lowerQuery)) {
      results.push({
        topic,
        section: topic.sections[0],
        matchText: topic.description,
      });
    }

    // Search in sections
    for (const section of topic.sections) {
      if (section.title.toLowerCase().includes(lowerQuery)) {
        results.push({
          topic,
          section,
          matchText: section.title,
        });
      } else if (section.content.toLowerCase().includes(lowerQuery)) {
        // Find the matching line for context
        const lines = section.content.split('\n');
        const matchingLine = lines.find(line => line.toLowerCase().includes(lowerQuery));
        results.push({
          topic,
          section,
          matchText: matchingLine?.slice(0, 100) || section.title,
        });
      }
    }
  }

  // Remove duplicates and limit results
  const seen = new Set<string>();
  return results.filter(r => {
    const key = `${r.topic.slug}-${r.section.id}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 20);
}
