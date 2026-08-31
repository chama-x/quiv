<p align="center">
  <img src="assets/hero-visual.svg" alt="{{PROJECT_NAME}} — {{TAGLINE}}" width="100%">
</p>

<p align="center">
  <a href="https://github.com/{{ORG}}/{{REPO}}/releases"><img src="https://img.shields.io/badge/version-0.1.0-blue?style=flat-square" alt="Version 0.1.0"></a>
  <a href="https://github.com/{{ORG}}/{{REPO}}/actions"><img src="https://img.shields.io/badge/build-passing-22c55e?style=flat-square" alt="Build Status"></a>
  <a href="https://bun.sh"><img src="https://img.shields.io/badge/runtime-bun-000000?style=flat-square&logo=bun" alt="Bun"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.7+-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-22c55e?style=flat-square" alt="MIT License"></a>
  <a href="https://discord.gg/{{DISCORD}}"><img src="https://img.shields.io/badge/Discord-join-5865F2?style=flat-square&logo=discord&logoColor=white" alt="Discord"></a>
</p>

**{{PROJECT_NAME}}** {{ONE_LINER_DESCRIPTION}}

> 🤖 **Machine Entry Point**: If you are an AI agent reading this repository, see [`llms.txt`](llms.txt) for raw API specifications and [`INDEX.md`](INDEX.md) for the complete pattern registry.

---

<p align="center">
  <img src="assets/before-after.svg" alt="Without vs With {{PROJECT_NAME}}" width="100%">
</p>

---

## Quickstart

Test `{{PROJECT_NAME}}` in any repository using Bun:

```bash
bunx {{CLI_NAME}} find "{{SEARCH_QUERY}}"
```

**Output:**
```text
✔ Found 3 patterns (140 tokens | 11ms)
  • {{PATTERN_PATH}}    [PROVEN]    240 tok  — {{PATTERN_SUMMARY}}
```

To inspect contracts with progressive disclosure:

```bash
bunx {{CLI_NAME}} read {{PATTERN_PATH}} --level overview
```

To scaffold into your target project:

```bash
bunx {{CLI_NAME}} use {{PATTERN_PATH}} --project my-app
```

---

## Architecture & Tiers

<p align="center">
  <img src="assets/tiers.svg" alt="Architecture Tiers" width="100%">
</p>

| Tier | Directory | Purpose | Typical Tokens |
| :--- | :--- | :--- | :---: |
| **T1: Primitives** | `primitives/` | Atomic building blocks, pure utilities, hooks | 100–300 |
| **T2: Domain** | `domain/` | Business rules, calculations, schemas | 200–500 |
| **T3: Features** | `features/` | Complete encapsulated feature slices | 300–800 |
| **T4: Compositions** | `compositions/` | Blueprints assembling multiple tiers into app shells | 500–1,200 |
| **T5: Templates** | `templates/` | Full-stack production starter scaffolds | Full repo |

---

## Benchmarks & Methodology

| Operation | Raw File Dumping | Monolithic AST Dumps | **{{PROJECT_NAME}}** | Measured Reduction |
| :--- | :---: | :---: | :---: | :---: |
| **Pattern Search** | 1,800 tokens (`grep`) | 4,200 tokens | **140 tokens** | **12.8× cut** |
| **Contract Read** | 8,200 tokens (full file) | 16,000+ tokens | **260 tokens** | **31.5× cut** |
| **Scaffolding Latency** | Manual copy-paste | ~3.2s | **< 14ms** | **Instant** |

> **Methodology**: Token counts are measured using `tiktoken` (`cl100k_base` tokenizer) comparing raw multi-file feature code vs. `{{PROJECT_NAME}}` contract interfaces.

---

## CLI Reference

| Command | Action | Token Budget |
| :--- | :--- | :---: |
| `bunx {{CLI_NAME}} find "<query>"` | Semantic & keyword search | ~140–500 |
| `bunx {{CLI_NAME}} read <path>` | Progressive disclosure (`--level overview\|full`) | 200–3,000 |
| `bunx {{CLI_NAME}} use <path>` | Scaffold into project | ~200 |
| `bunx {{CLI_NAME}} list` | Browse catalog by tier | 200–800 |
| `bunx {{CLI_NAME}} status` | Health check | ~100 |

---

## AI Agent Integration

To configure AI agents (Claude Code, Cursor, Copilot) to automatically query `{{PROJECT_NAME}}`:

```bash
bunx {{CLI_NAME}} init --agents
```

This generates:
- **`AGENTS.md`**: Top-level protocol instructions for coding agents.
- **`.cursor/rules/{{CLI_NAME}}.mdc`**: Cursor rules enabling autonomous pattern search before writing code.

---

## Lore-lite Commit Standard

**Lore-lite** is a lightweight Git commit convention that records architectural invariants, rejected alternatives, and empirical evidence directly in commit trailers:

```git
feat(scope): title

Constraint: Invariant that must not be broken
Rejected: Alternative evaluated | Why it failed
Evidence: Empirical validation / deployment details
```

---

## Contributing

Contributions and pattern submissions are welcome. See [`CONTRIBUTING.md`](CONTRIBUTING.md) for details.

---

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for details.
