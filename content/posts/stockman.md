---
title: "Stockman"
date: "2026-04-09"
excerpt: "*How we built an AI-assisted trading system, and why every component earns its place.*"
tags: ["AI", "Stock Trading"]
notebooklm: ""
audio: ""
audioTitle: ""
slides: ""
---
![Stockman UI — NVDA live session with Auto mode, positions, and AI assistant](images/ui1.png)



# Stockman — The Thinking Behind the Platform

## Why Alpaca

Every trading platform needs a brokerage at its core. We evaluated several API-first brokers before settling on Alpaca, and the decision wasn't close.


**The API is genuinely good.** Not just functional — well-designed. REST endpoints that behave predictably, clear documentation, consistent error shapes, and a WebSocket feed that actually works. When you're building automation, bad infrastructure is a multiplier of pain. Alpaca doesn't create that pain.

**Commission-free trading.** This sounds like a marketing point until you're running a strategy that makes twenty small trades a week. At $0 per trade, the cost of experimentation is zero. You can iterate on position sizing, entry timing, and exit logic without each adjustment eating into returns. For algorithmic strategies especially, zero commissions change the maths of what's viable.

**Paper trading.** This is the one we keep coming back to. Alpaca's paper trading environment is a full mirror of the live API — same endpoints, same response shapes, same order types. That means every line of code we test against paper is production-ready code. There's no "paper mode flag" to remove before going live. You build once, test extensively, then flip the account type. Most brokers treat paper trading as an afterthought. Alpaca treats it as a first-class product.

The practical result: we could build Stockman's entire execution engine — order placement, position monitoring, P&L tracking, automatic exits — without putting a single real dollar at risk.

---

## Why We Watch Congress

In 2012, the STOCK Act made it illegal for members of Congress to trade on non-public information. It also required them to disclose trades within 45 days. Capitol Trades aggregates those disclosures into a searchable, structured feed.

The premise isn't that politicians are corrupt. The premise is that people who sit on committees overseeing sectors — defence, technology, healthcare, energy — are exposed to information the rest of us aren't. They hear testimony. They read classified briefings. They know when regulation is coming and when it isn't. That exposure shapes how they allocate capital, even when they're not consciously acting on it.

The data bears this out. Multiple academic studies have found that congressional portfolios outperform market benchmarks by statistically significant margins. A 2004 study in the *Journal of Financial and Quantitative Analysis* found the average senator's portfolio beat the market by 12% annually. The numbers have come down since disclosure requirements tightened, but the signal remains.

We feed recent Capitol Trades data to our AI before market open each day. Not to copy individual trades mechanically — the 45-day disclosure lag makes that unreliable — but to identify sectors and tickers where there is persistent, repeated buying pressure from informed participants. When multiple politicians are buying the same sector over months, that's not noise.

Combined with other signals, it becomes a prior. A reason to look harder at a ticker before making a decision.

Each morning before the open, Stockman posts the AI's top 3 picks directly to Telegram — each with a one-line rationale drawn from the congressional trade data. The user replies with a ticker to confirm it, or overrides with their own choice.

![AI morning briefing on Telegram — top 3 picks from Capitol Trades analysis](images/telegram1.png)

---

## Crowd Wisdom: Polymarket

Polymarket is a prediction market. People bet real money on whether a stock will close higher or lower on a given day. The price of a contract directly expresses the crowd's probability estimate.

Prediction markets have a remarkably good track record. They outperform polls for elections. They outperform analyst consensus on event outcomes. The reason is structural: people with money at stake have an incentive to be calibrated, not confident. You don't win a prediction market by having strong opinions — you win by being right.

When Polymarket shows 70% probability that NVDA closes higher today, that's not sentiment. That's a market-clearing price representing the aggregate of everyone willing to bet on the question. It incorporates everything publicly known at the time of the bet.

In Stockman's out-of-bounds scan, we pull Polymarket's daily Up/Down markets for individual stocks. We use a 60% threshold — only stocks where the crowd assigns at least 60% probability to an upward close qualify as a signal. Below that, the edge isn't strong enough to act on.

Where Polymarket and Capitol Trades data point at the same ticker, we weight that heavily. Crowd markets reflect what's knowable publicly. Congressional trades reflect access that goes beyond the public. Convergence between the two is the strongest prior we have.

The scan report also includes a signal-source bar chart — a simple visual of which data source contributed the most actionable signals in that scan window. When Polymarket dominates the chart, the crowd is speaking clearly.

![Market Scan report — Polymarket crowd signals, AI picks, and source bar chart](images/telegram2.png)

---

## The AI Layer

The AI in Stockman isn't making trading decisions. It's doing the synthesis work that would take a human analyst two hours to do before market open.

Each morning it:
- Reads the most recent Capitol Trades disclosures
- Cross-references them against our whitelist of previously profitable assets
- Factors in broader sector momentum and macro conditions
- Produces three ranked picks with a one-line rationale for each

The output goes directly to Telegram. The user can accept a suggestion or override it with any ticker they choose. The AI is advisory, not autonomous — unless Auto mode is enabled.

In Auto mode, the AI picks are compared against the out-of-bounds media scan. If both agree on a ticker — if the AI's pre-market analysis and the media/Polymarket scan both surface the same name — that convergence is treated as the highest-conviction signal and the position is entered automatically.

**The confidence algorithm works like this:**

The AI produces picks. The scan produces picks, each tagged with a Polymarket probability. Where the two lists overlap, those tickers are ranked by Polymarket % (crowd confidence). Where there's no overlap, we fall back to the scan-only list, again ranked by Polymarket %. The top candidate is selected.

Once in a position, confidence is tracked through Z-score — the relationship between the fast moving average (FMA/10) and the slow moving average (SMA/50). A high positive Z-score means strong upward momentum: the fast average is well above the slow average, price is running. In that regime, the take-profit band widens and the stop-loss tightens. The strategy rides the momentum.

A Z-score near zero means the two averages are converging — momentum is fading. The band narrows: take profit comes closer, stop loss gives more room. The strategy becomes more defensive.

Each time the price hits the take-profit level, the band shifts upward. The old take-profit becomes the new entry median. The original entry price stays marked on the chart as a dashed yellow line — your original cost basis, permanently visible. An adjustment counter increments. The number of upward TP hits in a session is a direct measure of how well the momentum algorithm is working.

If performance deteriorates badly enough (a 3% draw-down from the position notional), Auto mode will close the position and cycle to the next candidate on the ranked list — the one with the second-highest conviction score.

---

## The Wheel Strategy

For accounts where capital preservation matters as much as growth, Stockman supports the Options Wheel — one of the few options strategies where you are consistently being paid to take on risk you'd accept anyway.

The wheel has two stages, and it cycles between them.

**Stage 1 — Cash-Secured Put**

You identify a stock you're happy to own at a lower price. You sell a put option roughly 10% below the current price, with two to four weeks to expiry. The premium goes into your account immediately.

If the stock stays above your strike price, the option expires worthless and you keep the premium. You run the wheel again.

If the stock falls below your strike, you are assigned: you buy 100 shares at the strike price. You expected this. You chose that strike because you were comfortable owning the stock at that price.

The rule: never sell a put without enough cash in the account to take assignment. The wheel only works if you're genuinely willing to own the underlying.

**Stage 2 — Covered Call**

Now you own the shares. You sell a call option roughly 10% above your cost basis (which includes the premiums you've collected), with four weeks to expiry.

If the stock stays below your strike, the call expires worthless. You keep the premium and keep the shares. Sell another call.

If the stock rises above your strike, your shares are called away at the strike price. You sell at a profit. You return to Stage 1 and repeat.

The rule: never sell a call below your cost basis. If the stock has fallen since you were assigned, wait. Selling below cost basis locks in a loss. The position can recover.

**The compounding effect**

What makes the wheel work over time is that you're collecting premium at every stage. The premiums reduce your effective cost basis continuously. A stock assigned to you at $90 after premium collection might have an effective cost of $86 by the time you sell a covered call. The strike for the call doesn't need to recover to the original price — it just needs to clear the reduced cost basis.

Stockman checks wheel positions every 15 minutes during market hours. It monitors for 50% profit on open contracts (the standard early-close signal used by professional options traders) and flags when calls approach the cost-basis boundary. Outside market hours, it does nothing — there's nothing to do.

The daily close summary goes to Telegram: current stage, open contracts, premium collected this cycle, P&L vs cost basis.

---

## What We're Building Toward

Stockman is a research platform as much as it is a trading tool. The combination of congressional signal, crowd probability, AI synthesis, and dynamic band management is an experiment in whether these data sources, used together, produce better outcomes than any of them would alone.

## Takeaway

The paper trading environment means we can run that experiment at full scale without risk. Every trade is recorded. The whitelist accumulates assets that have been profitable. The blacklist excludes assets that performed poorly. Over time, the system's prior gets sharper — it has more information about what has worked in this specific account with these specific parameters.

That's the loop we're building: execute, record, learn, improve. The AI isn't static. The strategy parameters aren't fixed. The goal is a system that gets incrementally better each session it runs.

