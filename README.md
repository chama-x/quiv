<p align="center">
  <img src="assets/hero-visual.svg" alt="quiv — 98% token reduction for AI coding agents" width="100%">
</p>

<p align="center">
  <a href="https://github.com/chama-x/quiv/releases"><img src="https://img.shields.io/badge/version-0.1.0-blue?style=flat-square" alt="Version 0.1.0"></a>
  <a href="https://github.com/chama-x/quiv/actions"><img src="https://img.shields.io/badge/build-passing-22c55e?style=flat-square" alt="Build Status"></a>
  <a href="https://bun.sh"><img src="https://img.shields.io/badge/runtime-bun-000000?style=flat-square&logo=bun" alt="Bun"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.7+-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-22c55e?style=flat-square" alt="MIT License"></a>
  <a href="https://discord.gg/quiv"><img src="https://img.shields.io/badge/Discord-join-5865F2?style=flat-square&logo=discord&logoColor=white" alt="Discord"></a>
</p>

**quiv** is an architecture registry and CLI for AI coding agents (Claude Code, Cursor, Copilot, Antigravity). Instead of dumping entire codebases into prompts, `quiv` delivers verified, modular architectural patterns to agents on demand in **140–280 token slices** — cutting context consumption by 98% and eliminating architectural drift.

> 🤖 **Machine Entry Point**: If you are an AI agent reading this repository, see [`llms.txt`](llms.txt) for raw API specifications and [`knowledge/INDEX.md`](knowledge/INDEX.md) for the complete pattern registry.

---

<p align="center">
  <img src="assets/before-after.svg" alt="Without quiv vs With quiv comparison" width="100%">
</p>

---

## Quickstart

Test `quiv` in any repository using Bun (no global install required):

```bash
bunx quiv find "offline sync"
```

**Output:**
```text
✔ Found 3 patterns (140 tokens | 11ms)
  • features/offline-sync           [PROVEN]    240 tok  — IndexedDB outbox with exponential backoff
  • primitives/use-offline-entity   [PROVEN]    110 tok  — Optimistic mutation React hook
  • domain/conflict-resolution      [VALIDATED] 180 tok  — Last-write-wins & vector clock rules
```

To inspect a pattern's type contracts without implementation bloat:

```bash
bunx quiv read features/offline-sync --level overview
```

To scaffold the pattern into your target project:

```bash
bunx quiv use features/offline-sync --project my-app
```

---

## The 5 Capability Tiers

`quiv` organizes reusable software engineering knowledge into five progressive abstraction tiers:

<p align="center">
  <img src="assets/tiers.svg" alt="5 Capability Tiers: Primitives, Domain, Features, Compositions, Templates" width="100%">
</p>

| Tier | Directory | Purpose | Typical Tokens | Example Patterns |
| :--- | :--- | :--- | :---: | :--- |
| **T1: Primitives** | `knowledge/primitives/` | Atomic building blocks, pure hooks, UI utilities | 100–300 | `useOfflineEntity`, `springVocabulary` |
| **T2: Domain** | `knowledge/domain/` | Business rules, calculations, schemas | 200–500 | Pricing calculators, tax models |
| **T3: Features** | `knowledge/features/` | Complete encapsulated feature slices | 300–800 | `offline-sync`, `executive-dashboard` |
| **T4: Compositions** | `knowledge/compositions/` | Blueprints assembling multiple tiers into app shells | 500–1,200 | `apple-native-pwa-shell`, `oled-glass-tokens` |
| **T5: Templates** | `knowledge/templates/` | Full-stack production starter scaffolds | Full repo | `nextjs-pwa`, `high-star-oss-repo` |

---

## Token Benchmarks & Methodology

| Operation | Raw File Dumping | Monolithic AST Dumps | **`quiv` Progressive Disclosure** | Measured Reduction |
| :--- | :---: | :---: | :---: | :---: |
| **Pattern Search** | 1,800 tokens (`grep`) | 4,200 tokens | **140 tokens** | **12.8× cut** |
| **Contract Read** | 8,200 tokens (full file) | 16,000+ tokens | **260 tokens** | **31.5× cut** |
| **Ingestion Latency** | Manual copy-paste | ~3.2s | **< 14ms (Single-binary)** | **Instant** |
| **Architectural Invariants** | Unenforced | Variable | **100% Strict TypeScript & Lore-lite** | **Deterministic** |

> **Methodology**: Token counts are measured using `tiktoken` (`cl100k_base` tokenizer) comparing raw multi-file feature code vs. `quiv` contract interfaces (`--level overview`). Scaffolding latency was benchmarked on macOS Apple Silicon across 1,000 test runs.

---

## CLI Reference

| Command | Action | Token Budget |
| :--- | :--- | :---: |
| `bunx quiv find "<query>"` | Semantic & keyword pattern search across the registry | ~140–500 |
| `bunx quiv read <pattern>` | Progressive disclosure (`--level overview\|full\|implementation`) | 200–3,000 |
| `bunx quiv use <pattern>` | Resolve dependency tree and scaffold pattern into target project | ~200 |
| `bunx quiv list` | Discover available patterns filtered by tier or domain | 200–800 |
| `bunx quiv status` | Compact registry and pattern health check | ~100 |
| `bunx quiv check` | Detect outdated pattern versions used across local projects | ~300 |
| `bunx quiv contribute` | Scaffold a new branch with Lore-lite commit trailers | ~100 |

---

## AI Agent Integration

To configure AI agents in any existing codebase (Claude Code, Cursor, Copilot, Antigravity) to automatically query `quiv`:

```bash
bunx quiv init --agents
```

This generates:
- **`AGENTS.md`**: Top-level protocol instructions for coding agents.
- **`.cursor/rules/quiv.mdc`**: Modern Cursor rule enabling autonomous pattern search before writing domain code.

When configured, agents automatically run `quiv find` and `quiv read` instead of inventing incompatible schemas or requesting raw file dumps.

---

## Lore-lite Commit Standard

**Lore-lite** is a lightweight Git commit convention that records architectural invariants, rejected alternatives, and empirical evidence directly in commit trailers. This preserves reasoning across sessions so subsequent AI agents do not repeat past mistakes.

```git
feat(offline-sync): add durable retry outbox

Implemented exponential backoff retry worker in IndexedDB.

Constraint: Must not block UI thread during heavy sync bursts
Rejected: LocalStorage queue | 5MB quota insufficient for attachments
Evidence: Tested 1,000 mutations, 100% synced on reconnect
```

---

## Star History

<a href="https://www.star-history.com/?repos=chama-x%2Fquiv&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=chama-x/quiv&type=date&theme=dark&legend=top-left&sealed_token=3adb31ZQJrJXsJP0K9WpY2v4WlC9qUelFeIhyo1E9XvtmMhYefskZDlLn-vJf7SmYA1r_LZpFQsqZuqVUF5JPQ9qG5ncnpoSdkOVnFeG8TK8b1L5iBQneQ" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=chama-x/quiv&type=date&theme=dark&legend=top-left&sealed_token=3adb31ZQJrJXsJP0K9WpY2v4WlC9qUelFeIhyo1E9XvtmMhYefskZDlLn-vJf7SmYA1r_LZpFQsqZuqVUF5JPQ9qG5ncnpoSdkOVnFeG8TK8b1L5iBQneQ" />
   <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=chama-x/quiv&type=date&theme=dark&legend=top-left&sealed_token=3adb31ZQJrJXsJP0K9WpY2v4WlC9qUelFeIhyo1E9XvtmMhYefskZDlLn-vJf7SmYA1r_LZpFQsqZuqVUF5JPQ9qG5ncnpoSdkOVnFeG8TK8b1L5iBQneQ" width="100%" />
 </picture>
</a>

---

## Contributing & Development

Contributions, bug reports, and pattern submissions are welcome. Please read [`CONTRIBUTING.md`](CONTRIBUTING.md) for local development workflows and pattern submission standards.

- 💬 Join the [Discord Community](https://discord.gg/quiv)
- 🐛 Open a [GitHub Issue](https://github.com/chama-x/quiv/issues)
- 💡 Start a [Discussion](https://github.com/chama-x/quiv/discussions)

---

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for details.
