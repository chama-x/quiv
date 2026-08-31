<!-- ============================================================
     QUIV — The Context Engine for AI Agents
     Design: Loud Minimalism + SVG-first + Progressive Disclosure
     ============================================================ -->

<!-- 1. THE HOOK (0-3 seconds) -->
<p align="center">
  <img src="assets/hero-visual.svg" alt="quiv — The Context Engine for AI Agents" width="100%">
</p>

<!-- 2. CREDIBILITY STRIP (3-5 seconds) -->
<p align="center">
  <a href="https://github.com/chama-x/quiv/stargazers"><img src="https://img.shields.io/github/stars/chama-x/quiv?style=flat-square&logo=github&color=blue" alt="Stars"></a>
  <a href="https://bun.sh"><img src="https://img.shields.io/badge/runtime-bun-black?style=flat-square&logo=bun" alt="Bun"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.7+-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-22c55e?style=flat-square" alt="MIT"></a>
  <a href="https://discord.gg/quiv"><img src="https://img.shields.io/badge/Discord-join-5865F2?style=flat-square&logo=discord&logoColor=white" alt="Discord"></a>
</p>

<!-- 3. THE ONE-LINE ANSWER (5-8 seconds) -->
> **quiv** gives AI coding agents **140 tokens** of context instead of **8,200** — a 98% reduction with zero architectural hallucination.

---

<!-- 4. VISUAL MENTAL MODEL (8-15 seconds) -->
<p align="center">
  <img src="assets/before-after.svg" alt="Without quiv vs With quiv" width="100%">
</p>

---

<!-- 5. 30-SECOND QUICKSTART -->

## ⚡ Quickstart (30 Seconds)

```bash
# 1. Search for a pattern
bunx quiv find "offline sync with conflict resolution"

# 2. Read type contract with progressive disclosure (140-280 tokens)
bunx quiv read features/offline-sync --level overview

# 3. Pull directly into your project
bunx quiv use features/offline-sync --project my-app
```

---

<!-- 6. THE 5 CAPABILITY TIERS -->

## 🏛️ The 5 Capability Tiers

<p align="center">
  <img src="assets/tiers.svg" alt="5 Capability Tiers" width="100%">
</p>

| Tier | Purpose | Token Budget | Example |
|:---|:---|:---:|:---|
| **`primitives/`** | Atomic building blocks, pure hooks, utils | ~100–300 | `useOfflineEntity`, `conflictResolution` |
| **`domain/`** | Business rules, calculations, schemas | ~200–500 | Pricing calculators, tax models |
| **`features/`** | Complete encapsulated feature slices | ~300–800 | `offline-sync`, `intent-install` |
| **`compositions/`** | Assembly patterns for app types | ~500–1,200 | `pwa-apple`, `motion-patterns` |
| **`templates/`** | Production starter monorepos | Full repo | `nextjs-pwa`, `high-star-oss-repo` |

---

<!-- 7. BENCHMARKS & PROOF -->

## 📊 Benchmarks

| Metric | Raw Repository Dump | Monolithic Frameworks | **`quiv` Knowledge Kit** | Reduction |
|:---|:---:|:---:|:---:|:---:|
| **Pattern Discovery** | 1,800 tok (grep) | 4,200 tok | **140 tok** | **12.8×** |
| **Contract Ingestion** | 8,200 tok (full file) | 16,000+ tok | **260 tok** | **31.5×** |
| **Scaffolding & Registry** | Manual Copy-Paste | Heavy CLI tools | **180 tok (<14ms)** | **∞×** |
| **Invariants & Types** | ⚠️ Variable | ❌ Complex | **✅ 100% Strict TypeScript** | **Zero Drift** |

---

<!-- 8. CLI COMMANDS & DEEP DIVE (Progressive Disclosure) -->

## 🛠️ Commands & Progressive Disclosure

<details open>
<summary><strong>⚡ Core CLI Operations</strong></summary>

<br>

| Command | Action | Target Tokens |
|:---|:---|:---:|
| `qv find "<query>"` | 🔍 Semantic & keyword pattern search | ~500 |
| `qv read <pattern>` | 📖 Read pattern (`--level overview\|full\|implementation`) | 300–3K |
| `qv use <pattern>` | 📥 Resolve dependency tree & pull into project | ~200 |
| `qv list` | 📋 Discover available patterns by tier/domain | 200–800 |
| `qv status` | 💊 Ultra-compact inventory health check | ~100 |
| `qv check` | 🔄 Detect outdated pattern versions across projects | ~300 |
| `qv contribute` | 🌿 Create branch & commit with Lore-lite trailers | ~100 |
| `qv init --agents` | 🤖 Configure `AGENTS.md` and `.cursorrules` | — |

</details>

<details>
<summary><strong>🤖 AI Agent Setup (Claude Code, Cursor, Antigravity)</strong></summary>

<br>

To equip AI coding agents with `quiv`, initialize in any project:

```bash
# Generates AGENTS.md and .cursorrules configured for quiv
quiv init --agents
```

AI agents will automatically leverage `quiv find` and `quiv read` whenever building features, preventing token exhaustion and hallucinations.

</details>

<details>
<summary><strong>📋 Lore-lite Commit Standard</strong></summary>

<br>

**Why it matters:** AI agents lose context between sessions. Lore-lite trailers preserve architectural constraints and rejected alternatives directly in Git history — so the *next* agent doesn't repeat the same mistakes.

```git
feat(offline-sync): add durable retry outbox

Implemented exponential backoff retry worker in IndexedDB.

Constraint: Must not block UI thread during heavy sync bursts
Rejected: LocalStorage queue | 5MB quota insufficient for attachments
Evidence: Tested 1,000 mutations, 100% synced on reconnect
```

</details>

---

<!-- 9. COMMUNITY & CONTRIBUTING -->

## 👥 Community

Contributions, feature requests, and pattern submissions are welcome!

<p align="left">
  <a href="https://discord.gg/quiv"><img src="https://img.shields.io/badge/Discord-Join_Community-5865F2?style=flat-square&logo=discord&logoColor=white" alt="Discord"></a>
  <a href="https://github.com/chama-x/quiv/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22"><img src="https://img.shields.io/badge/Issues-Good_First_Issues-7C3AED?style=flat-square&logo=github" alt="Good First Issues"></a>
  <a href="https://github.com/chama-x/quiv/discussions"><img src="https://img.shields.io/badge/Discussions-Join_RFCs-0ea5e9?style=flat-square&logo=github" alt="Discussions"></a>
</p>

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

---

<!-- 10. STAR HISTORY -->

## 📈 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=chama-x/quiv&type=Date&theme=dark)](https://www.star-history.com/?repos=chama-x%2Fquiv&type=date&legend=top-left)

---

## License

MIT © [chama-x](https://github.com/chama-x)
