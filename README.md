<p align="center">
  <img src="assets/hero.svg" alt="quiv — Stop letting AI agents write complex architecture from scratch" width="100%">
</p>

<p align="center">
  <a href="https://github.com/chama-x/quiv/releases"><img src="https://img.shields.io/badge/version-v1.0.0-3b82f6?style=flat-square" alt="version"></a>
  <a href="https://github.com/chama-x/quiv/actions"><img src="https://img.shields.io/badge/build-passing-22c55e?style=flat-square" alt="CI"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="MIT"></a>
</p>

# quiv

### **Stop letting your AI agent write complex architecture from scratch.**

When you ask Claude Code, Cursor, or Copilot to build an offline sync engine, a real-time event queue, or an Apple-grade PWA dashboard from zero, it guesses. It invents half-baked schemas, misses edge cases, and repeats mistakes others spent weeks debugging.

**`quiv` is like `shadcn/ui` for full-stack architecture.**

Instead of letting your agent hallucinate complex domain plumbing, `quiv` gives your AI instant access to battle-tested, drop-in capability slices with all invariants, edge cases, and types already solved.

Your agent stops guessing. You stop debugging prompt loops. You iterate at maximum speed.

---

## ⚡ The Pain vs. The Magic

```text
❌ WITHOUT QUIV (The 3-Hour Prompt Loop)
You: "Claude, implement offline sync with IndexedDB."
→ Agent generates 600 lines of unverified code.
→ Forgets iOS Safari IndexedDB quota limits.
→ Blocks the main UI thread on bulk mutation retries.
→ You spend the entire afternoon debugging Claude's architecture mistakes.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ WITH QUIV (The 30-Second Reality)
You: "Claude, add offline sync to the orders page using quiv."
→ Agent runs: bunx quiv use features/offline-sync --project app
→ Drops in a proven IndexedDB outbox, jittered retry worker, and React hooks.
→ 100% strict TypeScript. All failure modes and constraints pre-solved.
→ Agent simply connects the pre-built hook to your UI in 8 seconds.
```

---

## 🚀 How It Works in 30 Seconds

Your agent (or you) interacts with `quiv` using 3 simple steps:

### 1. Search for a capability
```bash
$ bunx quiv find "offline sync"
```
```text
✔ Found 3 verified patterns:
  • features/offline-sync           [PROVEN]    Durable outbox + backoff retry in IndexedDB
  • primitives/use-offline-entity   [PROVEN]    Optimistic mutation React hook
  • domain/conflict-resolution      [VALIDATED] Last-write-wins & vector clock rules
```

### 2. Inspect the contract (Zero bloat)
```bash
$ bunx quiv read features/offline-sync --level overview
```
```text
offline-sync                                  VALIDATED  v1.2.0  312t

Problem     keep entities editable offline, without conflicts
Solution    durable outbox + backoff retry worker in IndexedDB

Constraint  must not block the UI thread during sync bursts
Rejected    localStorage queue — 5MB quota fails with attachments
Evidence    1,000 offline mutations, 100% synced on reconnect
```

### 3. Drop into your project
```bash
$ bunx quiv use features/offline-sync --project my-app
```
```text
✓ resolved   utils/conflictResolution, hooks/useOfflineEntity
✓ wrote      7 files → my-app/src/features/offline-sync/
✓ ready      my-app now has offline-sync v1.2.0 installed
```

---

## 🤖 Equip Your AI Agent (Claude Code, Cursor, Copilot)

Turn your AI agent into an architecture-aware builder with one command:

```bash
bunx quiv init --agents
```

This writes `.cursor/rules/quiv.mdc` and `AGENTS.md`. From that moment on, whenever you ask your agent to build a feature, its first instinct is the **quiv loop**:

```text
User: "Build an executive analytics dashboard with waterfall revenue charts."

Agent:
  1. 🔍 bunx quiv find "executive dashboard"
  2. 📥 bunx quiv use features/executive-dashboard-layout --project client-portal
  3. 📥 bunx quiv use features/waterfall-financial-chart --project client-portal
  4. ⚡ Connects your live API data into the scaffolded components.
  → Feature shipped in 45 seconds with zero hallucinated layout bugs.
```

---

## 🏛️ What's in the Catalog (The 5 Tiers)

<p align="center">
  <img src="assets/tiers.svg" alt="quiv's five tiers composing left to right" width="100%">
</p>

| Tier | What it gives your AI | Examples in Catalog |
| :--- | :--- | :--- |
| **`primitives/`** | Atomic hooks, pure utilities, math engines | `useOfflineEntity`, `springVocabulary`, `tabular-numeral` |
| **`domain/`** | Business rules, calculation algorithms, schemas | `inventory-allocation`, `conflict-resolution`, `pricing-models` |
| **`features/`** | Complete, turnkey feature modules | `offline-sync`, `executive-dashboard`, `waterfall-chart` |
| **`compositions/`** | Whole-app UI guidelines & layout blueprints | `apple-native-pwa-shell`, `ios-tab-bar`, `oled-glass-tokens` |
| **`templates/`** | Full-stack production starter repos | `nextjs-pwa`, `high-star-oss-repo` |

---

## 📋 Lore-lite: Code That Remembers Why

Every pattern in `quiv` comes with its **Lore-lite** record — the reasons why alternatives were rejected and how the architecture was validated:

```git
feat(offline-sync): add durable retry outbox

Constraint: Must not block UI thread during heavy sync bursts
Rejected: LocalStorage queue | 5MB quota failed with image attachments
Evidence: Tested with 1,000 offline mutations, 100% synced on reconnect
```

When your AI reads a `quiv` pattern, it doesn't just get code — **it inherits the hard-earned lessons** so it never re-introduces rejected bugs.

---

## 🛠️ CLI Quick Reference

| Command | What it does |
| :--- | :--- |
| `bunx quiv find "<query>"` | Find ready-to-use patterns by problem or feature name |
| `bunx quiv read <pattern>` | View types, constraints, and contracts (`--level overview\|full`) |
| `bunx quiv use <pattern>` | Scaffold pattern and all dependencies directly into your codebase |
| `bunx quiv list` | Browse all available patterns across all 5 tiers |
| `bunx quiv check` | Check if your project is using outdated pattern versions |
| `bunx quiv init --agents` | Configure Claude Code, Cursor, and Copilot for autonomous discovery |

---

## 👥 Community & Contributions

Contributions, new pattern submissions, and improvements are welcome!

- Pick up a [`good-first-issue`](https://github.com/chama-x/quiv/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
- Join the discussion on [Discord](https://discord.gg/quiv)
- Read [`CONTRIBUTING.md`](CONTRIBUTING.md) to learn how to author and publish patterns.

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for details.
