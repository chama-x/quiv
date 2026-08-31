<!-- ============================================================
     {{PROJECT_NAME}} — {{TAGLINE}}
     Design: Loud Minimalism + SVG-first + Progressive Disclosure
     ============================================================ -->

<!-- 1. THE HOOK (0-3 seconds) -->
<p align="center">
  <img src="assets/hero-visual.svg" alt="{{PROJECT_NAME}} — {{TAGLINE}}" width="100%">
</p>

<!-- 2. CREDIBILITY STRIP (3-5 seconds) -->
<p align="center">
  <a href="https://github.com/{{ORG}}/{{REPO}}/stargazers"><img src="https://img.shields.io/github/stars/{{ORG}}/{{REPO}}?style=flat-square&logo=github&color=blue" alt="Stars"></a>
  <a href="https://bun.sh"><img src="https://img.shields.io/badge/runtime-bun-black?style=flat-square&logo=bun" alt="Bun"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.7+-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-22c55e?style=flat-square" alt="MIT"></a>
  <a href="https://discord.gg/{{DISCORD}}"><img src="https://img.shields.io/badge/Discord-join-5865F2?style=flat-square&logo=discord&logoColor=white" alt="Discord"></a>
</p>

<!-- 3. THE ONE-LINE ANSWER (5-8 seconds) -->
> **{{PROJECT_NAME}}** {{ONE_LINER_DESCRIPTION}}

---

<!-- 4. VISUAL MENTAL MODEL (8-15 seconds) -->
<p align="center">
  <img src="assets/before-after.svg" alt="Without vs With {{PROJECT_NAME}}" width="100%">
</p>

---

<!-- 5. 30-SECOND QUICKSTART -->

## ⚡ Quickstart (30 Seconds)

```bash
# 1. Discover available patterns
bunx {{CLI_NAME}} list

# 2. Search semantically
bunx {{CLI_NAME}} find "{{SEARCH_QUERY}}"

# 3. Read contract (low tokens)
bunx {{CLI_NAME}} read {{PATTERN_PATH}} --level overview

# 4. Pull into your project
bunx {{CLI_NAME}} use {{PATTERN_PATH}} --project my-project
```

---

<!-- 6. THE 5 CAPABILITY TIERS -->

## 🏛️ Architecture & Tiers

<p align="center">
  <img src="assets/tiers.svg" alt="Architecture Tiers" width="100%">
</p>

---

<!-- 7. BENCHMARKS & PROOF -->

## 📊 Benchmarks

| Metric | Traditional Dump | Monolithic Framework | **{{PROJECT_NAME}}** | Reduction |
|:---|:---:|:---:|:---:|:---:|
| **Discovery** | 1,800 tok | 4,200 tok | **140 tok** | **12.8×** |
| **Context** | 8,200 tok | 16,000+ tok | **260 tok** | **31.5×** |
| **Scaffolding** | Minutes | Heavy CLI | **<14ms** | **Instant** |

---

<!-- 8. CLI COMMANDS & DEEP DIVE (Progressive Disclosure) -->

## 🛠️ Commands & Progressive Disclosure

<details open>
<summary><strong>⚡ Core CLI Operations</strong></summary>

<br>

| Command | Action | Target Tokens |
|:---|:---|:---:|
| `qv find "<query>"` | 🔍 Semantic search | ~500 |
| `qv read <pattern>` | 📖 Read pattern (3 levels) | 300–3K |
| `qv use <pattern>` | 📥 Pull into project | ~200 |
| `qv list` | 📋 Discover by tier/domain | 200–800 |
| `qv status` | 💊 Health check | ~100 |

</details>

<details>
<summary><strong>🤖 AI Agent Setup (Claude Code, Cursor, Copilot)</strong></summary>

<br>

```bash
{{CLI_NAME}} init --agents
```

</details>

<details>
<summary><strong>📋 Lore-lite Commit Standard</strong></summary>

<br>

```git
feat(scope): title

Constraint: Invariant that must not be broken
Rejected: Alternative evaluated | Why it failed
Evidence: Empirical validation / deployment details
```

</details>

---

<!-- 9. COMMUNITY & CONTRIBUTING -->

## 👥 Community

Contributions, feature requests, and pattern submissions are welcome!

<p align="left">
  <a href="https://discord.gg/{{DISCORD}}"><img src="https://img.shields.io/badge/Discord-Join_Community-5865F2?style=flat-square&logo=discord&logoColor=white" alt="Discord"></a>
  <a href="https://github.com/{{ORG}}/{{REPO}}/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22"><img src="https://img.shields.io/badge/Issues-Good_First_Issues-7C3AED?style=flat-square&logo=github" alt="Good First Issues"></a>
</p>

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

---

## License

MIT © [{{ORG}}](https://github.com/{{ORG}})
