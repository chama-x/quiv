# 🎪 The Supabase-Style "Launch Week" Strategy

> **How to execute a 5-day consecutive release campaign that turns a single-day traffic spike into a compounding, multi-week GitHub star avalanche.**

---

## 1. Why Single-Day Launches Fade

Traditional launches spike on Day 1 and crash by Day 3:
- Day 1: 150 stars (Launch spike)
- Day 2: 40 stars
- Day 3: 10 stars (Drop-off below trending threshold)

**The Launch Week Multiplier**:
By staging 5 distinct, high-signal product announcements across Monday to Friday, you sustain star velocity above the Trending threshold for 7+ consecutive days, triggering the **Weekly Trending** and **Monthly Trending** leaderboards.

```
Star Velocity Comparison:
Single Day:  [██████████] ──> [██] ──> [█] (Fades)
Launch Week: [██████████] ──> [████████] ──> [████████] ──> [█████████] ──> [██████████] (Compounds)
```

---

## 2. The 5-Day Launch Week Blueprint for `quiv`

```
┌───────────┬────────────────────────────────────────────────────────────┐
│ Day       │ Theme & Flagship Announcement                              │
├───────────┼────────────────────────────────────────────────────────────┤
│ Monday    │ 🚀 Day 1: The Foundation & 32x Token Reduction Benchmark   │
│           │ - Launch core quiv CLI on GitHub & Hacker News.            │
│           │ - Publish benchmark: 240 tokens vs. 7,800 tokens.         │
├───────────┼────────────────────────────────────────────────────────────┤
│ Tuesday   │ ⚡ Day 2: Progressive Disclosure & Smart Search             │
│           │ - Introduce `quiv find` & multi-level `quiv read`.         │
│           │ - Drop 60fps terminal demo on Twitter/X.                   │
├───────────┼────────────────────────────────────────────────────────────┤
│ Wednesday │ 📦 Day 3: The 5-Tier Architecture Catalog                  │
│           │ - Open-source the standard Pattern Library.                │
│           │ - Drop starter compositions for Next.js, Apple PWA & ERP.  │
├───────────┼────────────────────────────────────────────────────────────┤
│ Thursday  │ 🤖 Day 4: Seamless Agent Interop (Claude Code & Cursor)    │
│           │ - Announce automated `.cursorrules` & `AGENTS.md` support. │
│           │ - Showcase live Claude Code & Cursor pair-programming demo.│
├───────────┼────────────────────────────────────────────────────────────┤
│ Friday    │ 🏆 Day 5: Community Contributor Flywheel & Roadmap         │
│           │ - Launch "Lore-lite" backport contribution workflow.       │
│           │ - Celebrate weekly milestones & reveal v2.0 roadmap.       │
└───────────┴────────────────────────────────────────────────────────────┘
```

---

## 3. Daily Content Asset Checklist

For each day of Launch Week:
1. **GitHub Release / Tag**: Dedicated release tag (`v1.1.0`, `v1.2.0`, etc.) with narrative release notes.
2. **Flagship Demo Video / GIF**: 15–30 second visual showcasing that specific day's feature.
3. **Dedicated X/Twitter Thread**: Explaining the technical problem and architectural solution.
4. **Interactive Discussion Thread**: Dedicated topic in GitHub Discussions for community feedback.
5. **Updated README Highlight**: Update the top hero badge or "What's New" banner to keep the README fresh.
