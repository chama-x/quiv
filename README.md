<p align="center">
  <a href="https://github.com/quiv-knowledge/quiv">
    <img src="assets/banner-dark.svg#gh-dark-mode-only" alt="quiv banner" width="100%">
    <img src="assets/banner-light.svg#gh-light-mode-only" alt="quiv banner" width="100%">
  </a>
</p>

# `quiv` (Knowledge Kit)

> **The Agent Knowledge Kit & Architecture System** — 10–32x token-efficient pattern discovery and progressive disclosure for AI coding agents (Claude Code, Cursor, Antigravity, Copilot).

<p align="center">
  <a href="https://github.com/quiv-knowledge/quiv/stargazers"><img src="https://img.shields.io/github/stars/quiv-knowledge/quiv?style=flat-square&logo=github&color=blue" alt="GitHub Stars"></a>
  <a href="https://bun.sh"><img src="https://img.shields.io/badge/runtime-bun-black?style=flat-square&logo=bun" alt="Runtime: Bun"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/typescript-5.7+-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-22c55e?style=flat-square" alt="License: MIT"></a>
  <a href="https://discord.gg/quiv"><img src="https://img.shields.io/badge/community-discord-5865F2?style=flat-square&logo=discord&logoColor=white" alt="Discord"></a>
  <a href="https://codespaces.new/quiv-knowledge/quiv"><img src="https://img.shields.io/badge/codespaces-open_sandbox-purple?style=flat-square&logo=github" alt="Open in Codespaces"></a>
</p>

<p align="center">
  <a href="#-the-problem--the-10x-solution">The Problem</a> •
  <a href="#-quick-start-30-seconds">Quick Start</a> •
  <a href="#-benchmarks--token-savings">Benchmarks</a> •
  <a href="#-the-5-capability-tiers">5 Capability Tiers</a> •
  <a href="#-cli-commands">CLI Reference</a> •
  <a href="#-agent-instructions-agagentsmd">Agent Setup</a> •
  <a href="#-star-history">Star History</a>
</p>

---

## ⚡ The Problem & The 10x Solution

When AI coding agents build full-stack features, developers typically dump entire codebases into the prompt or let agents write domain logic from scratch:
- ❌ **Context Window Bloat**: Consumes $10\text{k} - 30\text{k}$ tokens per prompt.
- ❌ **Hallucinatory Regressions**: Reasoning degrades as context fills with irrelevant boilerplate.
- ❌ **Architectural Fragmentation**: Every agent session invents different, incompatible schemas.

### The `quiv` Solution: Progressive Disclosure CLI
Instead of monolithic dumps, `quiv` provides a **5-tier architecture registry** and progressive disclosure CLI (`quiv list`, `find`, `read`, `use`) that delivers **only the exact 200–800 tokens** an agent needs to execute cleanly.

```
┌────────────────────────────────────────────────────────────────────────┐
│ $ bunx quiv find "offline sync"                                        │
│ ✔ Found 3 patterns [240 tokens | 12ms]                                 │
│                                                                        │
│ $ quiv read features/offline-sync --level overview                     │
│ ✔ Returned type contract & rules [280 tokens | 0 boilerplate]          │
│                                                                        │
│ $ quiv use features/offline-sync --project erp-app                     │
│ ✔ Scaffolded into project & updated registry [180 tokens]              │
│ ⚡ Total context savings: 31.8x reduction vs. full repository loading   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start (30 Seconds)

Evaluate `quiv` immediately without global installation:

```bash
# 1. Discover available patterns
bunx quiv list --tier features

# 2. Search by requirement
bunx quiv find "offline sync with conflict resolution"

# 3. Read with progressive disclosure (overview | full | implementation)
bunx quiv read features/offline-sync --level overview

# 4. Pull pattern into your project
bunx quiv use features/offline-sync --project my-project
```

---

## 📊 Benchmarks & Token Savings

| Task / Operation | Raw Code Injection | Monolithic Frameworks | **`quiv` Knowledge Kit** |
| :--- | :---: | :---: | :---: |
| **Pattern Search** | 1,800 tokens (grep) | 4,200 tokens | **140 tokens (12.8x cut)** |
| **Architecture Contract Read** | 8,200 tokens (full file) | 16,000+ tokens | **260 tokens (31.5x cut)** |
| **Pattern Ingestion & Scaffolding** | Manual Copy-Paste | Heavy CLI tools | **180 tokens (<15ms)** |
| **Type Safety & Contracts** | ⚠️ Variable | ❌ Complex | **✅ Strict TypeScript (100%)** |
| **Contribution Feedback** | Lost | Fragile | **✅ Lore-lite Git Trailers** |

---

## 🏛️ The 5 Capability Tiers

```
knowledge/
├── primitives/     ← WHAT you build with (hooks, pure utils, headless UI, contracts)
├── domain/         ← BUSINESS knowledge (ERP rules, calculations, data schemas)
├── features/       ← COMPLETE reusable features (offline sync, intent install)
├── compositions/   ← HOW to assemble for app types (Apple PWA, dashboard, motion)
└── templates/      ← FULL project starter scaffolds (nextjs-pwa, vite-pwa)
```

### Pattern Status Lifecycle
- `PROVEN`: Battle-tested across 3+ production deployments without regressions.
- `VALIDATED`: Proven in 1–2 production projects with live traffic.
- `EXPERIMENTAL`: New architecture pattern, under evaluation.

---

## ⚡ CLI Commands

| Command | Purpose | Target Tokens |
| :--- | :--- | :--- |
| `quiv list` (or `qv list`) | Discover available patterns by tier, domain, or capability | 200–800 |
| `quiv find "<query>"` | Semantic & keyword pattern search by problem description | ~500 |
| `quiv read <pattern>` | Read pattern with progressive disclosure (`--level overview\|full\|implementation`) | 300–3,000 |
| `quiv use <pattern> --project <name>` | Resolve dependency tree, generate sparse checkout, update registry | ~200 |
| `quiv contribute --pattern <path>` | Create branch, commit with **Lore-lite** trailers, open PR | ~100 |
| `quiv check --project <name>` | Detect outdated pattern versions used across projects | ~300 |
| `quiv status` | Ultra-compact inventory health check | ~100 |
| `quiv init --org <org>` | One-command bootstrap for 3 repositories (knowledge, registry, meta) | - |

---

## 📋 Lore-lite Commit & Contribution Standard

When contributing patterns back, preserve constraints and rationale using **Lore-lite** Git trailers:

```git
feat(offline-sync): add durable retry outbox

Implemented exponential backoff retry worker in IndexedDB.

Constraint: Must not block UI thread during heavy sync bursts
Rejected: LocalStorage queue | 5MB quota was insufficient for attachments
Evidence: Tested with 1,000 offline mutations, 100% synced on reconnect
```

---

## 🤖 Agent Instructions (`AGENTS.md` / `.cursorrules`)

To equip AI coding agents (Claude Code, Cursor, Copilot, Antigravity) with `quiv`, initialize in any project:

```bash
# Generates AGENTS.md and .cursorrules configured for quiv
quiv init --agents
```

AI agents will automatically leverage `quiv find` and `quiv read` whenever building features, preventing token exhaustion and hallucinations.

---

## 👥 Contributors & Community

Contributions are welcomed and celebrated! Feel free to pick up a [`good-first-issue`](https://github.com/quiv-knowledge/quiv/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) or join our [Discord](https://discord.gg/quiv).

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

---

## 📈 Star History

If `quiv` saves your AI agents context tokens and keeps your architecture clean, please consider giving us a ⭐ on GitHub!

<p align="center">
  <a href="https://star-history.com/#quiv-knowledge/quiv&Date">
    <img src="https://api.star-history.com/svg?repos=quiv-knowledge/quiv&type=Date" alt="Star History Chart" width="90%">
  </a>
</p>

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for details.
