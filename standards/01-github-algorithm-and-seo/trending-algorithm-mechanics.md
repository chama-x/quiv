# 📈 GitHub Trending Algorithm Mechanics & Velocity Engineering

> **How GitHub's discovery engine indexes repositories, how Trending works under the hood, and the exact mathematical thresholds required to dominate Daily, Weekly, and Monthly Trending leaderboards.**

---

## 1. How the GitHub Trending Algorithm Works

GitHub Trending is not a simple "total stars" leaderboard. It is a **time-decayed, velocity-driven ranking system** designed to surface repositories generating sudden, high-intensity developer interest.

### The Core Ranking Formula (Decompiled / Observed Behavior)

GitHub computes an internal score $S_{\text{trending}}$ roughly defined as:

$$S_{\text{trending}} = \sum_{i=1}^{N} w(t_i) \cdot Q(u_i) \cdot C_{\text{repo}}$$

Where:
- **$N$**: Number of stars accrued within the target window ($\Delta t \in \{24\text{h}, 7\text{d}, 30\text{d}\}$).
- **$w(t_i)$**: Time decay weight. A star gained 1 hour ago is weighted significantly higher ($~3\times$) than a star gained 20 hours ago:
  $$w(t) = e^{-\lambda \cdot (t_{\text{now}} - t_i)}$$
- **$Q(u_i)$**: User Quality / Trust Factor of the starring account:
  - High weight ($1.0$): Established accounts with commit history, public repos, and existing followers.
  - Medium weight ($0.6$): Regular users with older accounts.
  - Low / Discarded weight ($0.0 - 0.1$): Brand new accounts created $<48\text{h}$, zero public activity (anti-bot filtering).
- **$C_{\text{repo}}$**: Repository Health Multiplier:
  - Ratio of Forks to Stars (Healthy organic baseline: $1:5$ to $1:15$).
  - Active commits within the past 48 hours ($+15\%$ boost).
  - Open/Closed issues and discussions ratio (active engagement signal).
  - Primary language categorization tag present.

---

## 2. Velocity Thresholds: What It Takes to Trend (2026 Benchmarks)

The following star velocity targets are empirical benchmarks required to hit the GitHub Trending Leaderboard across different categories:

| Target Placement | Primary Language (e.g. TypeScript, Rust, Python) | Overall / All Languages Leaderboard | Time Window |
| :--- | :--- | :--- | :--- |
| **Top 25 Daily** | 35 – 50 stars / 24h | 80 – 120 stars / 24h | 24 Hours |
| **Top 10 Daily** | 60 – 100 stars / 24h | 150 – 250 stars / 24h | 24 Hours |
| **#1 - #3 Daily** | 120 – 200+ stars / 24h | 300 – 600+ stars / 24h | 24 Hours |
| **Top 10 Weekly** | 250 – 450 stars / 7d | 800 – 1,500 stars / 7d | 7 Days |
| **Top 10 Monthly** | 1,000 – 2,500 stars / 30d | 3,000 – 6,000+ stars / 30d | 30 Days |

### The "Burst Velocity Window" (The 6-Hour Golden Rule)

GitHub calculates Trending updates periodically (approximately every 2 to 4 hours). 
- If you accumulate **50 stars in 4 hours**, your trending score spikes higher than accumulating 70 stars spread evenly across 24 hours.
- **Actionable Rule**: Concentrate all initial traffic spikes (Show HN, Twitter thread, Reddit post) to land within the **same 4-to-6 hour UTC window** (optimal window: 13:00 UTC to 19:00 UTC / 6 AM to 12 PM PST).

---

## 3. The 3 Trending Loops & The Flywheel Effect

```
   ┌────────────────────────────────────────────────────────┐
   │ 1. External Push (Show HN, X Thread, Reddit)          │
   └───────────────────────────┬────────────────────────────┘
                               │ (50-100 stars in 6h)
                               ▼
   ┌────────────────────────────────────────────────────────┐
   │ 2. Language-Specific Daily Trending (#1-#5 TypeScript) │
   └───────────────────────────┬────────────────────────────┘
                               │ (Passive +100-200 stars)
                               ▼
   ┌────────────────────────────────────────────────────────┐
   │ 3. Overall All-Languages Daily Trending                │
   └───────────────────────────┬────────────────────────────┘
                               │ (Global visibility boost)
                               ▼
   ┌────────────────────────────────────────────────────────┐
   │ 4. Weekly Trending + GitHub Explore + AI Digest Feeds  │
   │    (Compounding Organic Multiplier: 500-2,000+ stars)  │
   └────────────────────────────────────────────────────────┘
```

1. **Language-Specific Trending**: Reaching Top 5 in your primary language (e.g. `TypeScript`) requires a lower initial burst (~50 stars). 
2. **Overall Trending Transition**: The traffic from Language Trending pushes your velocity past 150+ stars, breaking into the Global All-Languages Trending page.
3. **Weekly Inelasticity**: Once on Weekly Trending, you capture passive daily visitors who check the leaderboard on weekends and Mondays, providing baseline daily growth of 50–150 stars without active promotions.

---

## 4. Algorithmic Penalties & How to Avoid Them

GitHub’s spam and fraud detection algorithms aggressively filter or de-index repositories exhibiting inorganic signals:

### ⚠️ Prohibited & Penalized Actions
1. **Star Buying / Bot Networks**: GitHub silently flags and shadow-bans repos using fake star services. They strip stars, remove the repo from Trending indefinitely, and lower search rank.
2. **Sudden Account Inactive Stars**: 100 stars from accounts created in the last 24h with no profile pics or commits triggers an automated safety quarantine.
3. **Star-for-Star (S4S) Repos / Exchange Rings**: Explicitly against GitHub Terms of Service and easily detected by graph network analysis.

### ✅ Safe Velocity Accelerators
- **Direct Link Anchoring**: When sharing on Twitter, Hacker News, or newsletters, direct users straight to the repository with clear value context.
- **Embedded Star Badge in Documentation**: Add an unobtrusive GitHub Star button or live star counter in docs and CLI outputs.
- **"Star on GitHub" CLI Helper**: An interactive CLI prompt when a developer successfully uses a tool:
  ```
  ✨ Enjoying quiv? Give us a star on GitHub: https://github.com/quiv-knowledge/quiv ⭐
  ```
  *(Only trigger this after successful value delivery, e.g., after pattern export or build).*

---

## 5. Day-of-Week Trending Strategy

| Day (UTC) | Competition Level | Developer Traffic | Recommended Action |
| :--- | :--- | :--- | :--- |
| **Tuesday** | 🔥🔥🔥 Very High | Maximum (Global dev peak) | Best day for massive Day-0 product launches and Show HN. |
| **Wednesday** | 🔥🔥🔥 Very High | Peak tech reading | Ideal for follow-up launch threads, deep dive technical blogs. |
| **Thursday** | 🔥🔥 High | Strong sustained traffic | Great for secondary feature drops or Launch Week Day 4. |
| **Friday** | 🔥 Medium | Decreasing after 18:00 UTC | Good for fun tools, lightweight CLI toys, games, AI experiments. |
| **Saturday - Sunday** | 🧊 Low | Enthusiasts, weekend hackers | **Easiest time to hit #1 Trending** with modest star volume (40-60 stars can get you on Daily Trending). |
| **Monday** | 🔥🔥 High | Weekly reset | Weekly Trending leaderboard recalculation begins. |

> [!TIP]
> **The Weekend Launch Hack**: Launching on a Saturday morning (14:00 UTC) requires **50% fewer stars** to hit #1 Daily Trending. Once indexed on Sunday, your repo remains on the leaderboard when the massive Monday morning developer traffic arrives!
