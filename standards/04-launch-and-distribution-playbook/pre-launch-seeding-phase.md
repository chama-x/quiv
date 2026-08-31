# ⏳ Pre-Launch Seeding Phase & Velocity Priming (Day -14 to Day 0)

> **The 14-day preparation playbook: how to seed lighthouse users, prime initial star velocity, pre-populate GitHub Discussions, and ensure zero friction before public launch.**

---

## 1. The Pre-Launch Objective

Launching a repository with 0 stars and an empty issue tracker creates immediate buyer hesitation. Developers hesitate to star repos that look abandoned or unverified.

**The Golden Pre-Launch Goal**: Arrive at Day 0 with:
- **30–50 initial organic stars** from early testers and power users.
- **3–5 high-quality pre-populated GitHub Discussions** (RFCs, Q&A).
- **100% polished README, badges, terminal demos, and OpenGraph preview cards**.
- **Tested zero-install execution** (`bunx` / `npx` / Codespaces).

---

## 2. The 14-Day Countdown Timeline

```
┌───────────────┬────────────────────────────────────────────────────────┐
│ Timeline      │ Milestone & Action Items                               │
├───────────────┼────────────────────────────────────────────────────────┤
│ Day -14 to -10│ 🛠️ Internal Code Freeze & Zero-Install Testing          │
│               │ - Verify `bunx quiv` runs on clean Mac, Linux, Windows  │
│               │ - Build and embed VHS terminal demo recordings         │
│               │ - Create 1280x640 Social Preview card                  │
├───────────────┼────────────────────────────────────────────────────────┤
│ Day -10 to -5 │ 👥 Lighthouse User Preview (10-20 Private Devs)        │
│               │ - Share private repo with 15 trusted engineers/friends │
│               │ - Have them test real agent workflows with Claude/Cursor│
│               │ - Gather initial feedback, fix edge cases              │
├───────────────┼────────────────────────────────────────────────────────┤
│ Day -5 to -2  │ 💬 Seed Community Discussions & Issues                 │
│               │ - Post 2 Architectural RFCs in GitHub Discussions      │
│               │ - Label 5 curated "Good First Issues" for contributors │
│               │ - Ask lighthouse testers to star the repo (30-50 stars)│
├───────────────┼────────────────────────────────────────────────────────┤
│ Day -1        │ 🚀 Final Launch Prep & Staging                         │
│               │ - Prepare Show HN post draft, Reddit posts, X thread   │
│               │ - Double-check all links in README                     │
│               │ - Align launch team for 6-hour burst window on Day 0   │
└───────────────┴────────────────────────────────────────────────────────┘
```

---

## 3. How to Seed GitHub Discussions Authentically

Pre-populating GitHub Discussions signals a thriving, collaborative open-source community:

### Discussion 1: The RFC / Architecture Proposal
- **Category**: `💡 Ideas & RFCs`
- **Title**: `RFC: Extending Capability Tiers to include WebAssembly sandbox runtime`
- **Content**: Detailed architectural explanation asking for community thoughts.

### Discussion 2: The Agent Compatibility Matrix
- **Category**: `🙌 Show and Tell`
- **Title**: `Benchmarking quiv across Claude Code, Cursor, and Copilot`
- **Content**: Real token consumption numbers and workflow recommendations.

---

## 4. Pre-Launch Quality Assurance Checklist

Before flipping the repository to Public:

- [ ] Repository visibility is set to `Public` (or staged to flip on Day 0).
- [ ] 1280x640 Social Preview image uploaded in Repository Settings.
- [ ] Topic tags (10–12 curated tags) added in the `About` sidebar.
- [ ] 1-liner description strictly under 140 chars with concrete benefit.
- [ ] `llms.txt` and `llms-full.txt` present in root.
- [ ] License file (`LICENSE` / MIT) present.
- [ ] Contributing guide (`CONTRIBUTING.md`) and Code of Conduct present.
- [ ] Verified `bunx <package>` executes without throwing errors on a clean machine.
