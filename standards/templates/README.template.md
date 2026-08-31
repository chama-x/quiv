<p align="center">
  <a href="https://github.com/{{ORG}}/{{REPO}}">
    <img src="assets/banner-dark.svg#gh-dark-mode-only" alt="{{PROJECT_NAME}} Banner" width="100%">
    <img src="assets/banner-light.svg#gh-light-mode-only" alt="{{PROJECT_NAME}} Banner" width="100%">
  </a>
</p>

# {{PROJECT_NAME}}

> **{{ONE_LINER_TAGLINE}}** — {{QUANTIFIED_BENEFIT}} for {{TARGET_ECOSYSTEM}}.

<p align="center">
  <a href="https://github.com/{{ORG}}/{{REPO}}/stargazers"><img src="https://img.shields.io/github/stars/{{ORG}}/{{REPO}}?style=flat-square&logo=github&color=blue" alt="GitHub Stars"></a>
  <a href="https://bun.sh"><img src="https://img.shields.io/badge/runtime-bun-black?style=flat-square&logo=bun" alt="Runtime: Bun"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/typescript-5.7+-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-22c55e?style=flat-square" alt="License: MIT"></a>
  <a href="https://discord.gg/{{DISCORD}}"><img src="https://img.shields.io/badge/community-discord-5865F2?style=flat-square&logo=discord&logoColor=white" alt="Discord"></a>
</p>

<p align="center">
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-key-features">Features</a> •
  <a href="#-benchmarks">Benchmarks</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

## ⚡ The Problem & The 10x Solution

AI coding agents spend **80%+ of their context window** re-reading bloated boilerplates or inventing brittle domain logic from scratch.

`{{PROJECT_NAME}}` solves this by delivering **progressive disclosure architecture primitives**, reducing context bloat by **10–32x** while guaranteeing strict type safety.

<p align="center">
  <img src="assets/demo.gif" alt="{{PROJECT_NAME}} Demo Recording" width="100%">
</p>

---

## 🚀 Quick Start (30 Seconds)

Evaluate immediately with zero install:

```bash
# 1. Discover available patterns
bunx {{CLI_NAME}} list

# 2. Search for a specific architecture requirement
bunx {{CLI_NAME}} find "offline sync"

# 3. Pull directly into your project
bunx {{CLI_NAME}} use features/offline-sync --project my-app
```

---

## 📊 Benchmark & Comparison

| Metric / Capability | Raw File Loading | Monolithic Frameworks | **`{{PROJECT_NAME}}`** |
| :--- | :---: | :---: | :---: |
| **Token Consumption** | 5,000 – 15,000 | 25,000+ | **200 – 800 (32x savings)** |
| **Discovery Latency** | Manual (Minutes) | Rigid | **< 15ms CLI Indexing** |
| **Agent Support** | Unstructured | Vendor-locked | **Claude Code, Cursor, Copilot, Antigravity** |
| **Deterministic Types** | ⚠️ Variable | ❌ Complex | **✅ 100% Strict TypeScript** |

---

## 🏛️ Architecture & Capability Tiers

```
knowledge/
├── primitives/     ← Pure utils, hooks, headless UI
├── domain/         ← Business rules, calculations, schemas
├── features/       ← Complete reusable features (offline sync, auth)
├── compositions/   ← Assembly patterns for application types
└── templates/      ← Full project starter scaffolds
```

---

## 🛠️ CLI Reference

| Command | Description | Target Tokens |
| :--- | :--- | :--- |
| `{{CLI_NAME}} list` | Browse available capability tiers and patterns | ~200 – 400 |
| `{{CLI_NAME}} find "<query>"` | Semantic & keyword pattern search | ~300 – 500 |
| `{{CLI_NAME}} read <path>` | Read with progressive disclosure (`--level overview\|full`) | ~250 – 2,000 |
| `{{CLI_NAME}} use <path>` | Resolve dependencies & scaffold into current repository | ~200 |
| `{{CLI_NAME}} status` | Health check & repository inventory overview | ~100 |

---

## 👥 Contributors

Contributions are welcome! Check out our [Contributing Guide](CONTRIBUTING.md) and browse our [`good-first-issues`](https://github.com/{{ORG}}/{{REPO}}/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22).

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

---

## 📈 Star History

If you find `{{PROJECT_NAME}}` useful, please consider giving us a ⭐ on GitHub — it helps the project grow and reach more developers!

<p align="center">
  <a href="https://star-history.com/#{{ORG}}/{{REPO}}&Date">
    <img src="https://api.star-history.com/svg?repos={{ORG}}/{{REPO}}&type=Date" alt="Star History Chart" width="90%">
  </a>
</p>

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.
