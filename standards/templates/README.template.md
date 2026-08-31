<p align="center">
  <img src="assets/hero.svg" alt="{{PROJECT_NAME}} — Stop letting AI agents write complex architecture from scratch" width="100%">
</p>

<p align="center">
  <a href="https://github.com/{{ORG}}/{{REPO}}/releases"><img src="https://img.shields.io/badge/version-v1.0.0-3b82f6?style=flat-square" alt="version"></a>
  <a href="https://github.com/{{ORG}}/{{REPO}}/actions"><img src="https://img.shields.io/badge/build-passing-22c55e?style=flat-square" alt="CI"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="MIT"></a>
</p>

# {{PROJECT_NAME}}

### **Stop letting your AI agent write complex architecture from scratch.**

When you ask Claude Code, Cursor, or Copilot to build complex features from zero, it guesses. It invents half-baked schemas, misses edge cases, and repeats mistakes others spent weeks debugging.

**`{{PROJECT_NAME}}` is like `shadcn/ui` for full-stack architecture.**

Instead of letting your agent hallucinate complex domain plumbing, `{{PROJECT_NAME}}` gives your AI instant access to battle-tested, drop-in capability slices with all invariants, edge cases, and types already solved.

---

## ⚡ The Pain vs. The Magic

```text
❌ WITHOUT {{PROJECT_NAME}} (The 3-Hour Prompt Loop)
You: "Claude, implement {{FEATURE_EXAMPLE}}."
→ Agent generates hundreds of lines of unverified code.
→ Misses platform edge cases and limits.
→ You spend the entire afternoon debugging Claude's architecture mistakes.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ WITH {{PROJECT_NAME}} (The 30-Second Reality)
You: "Claude, add {{FEATURE_EXAMPLE}} using {{CLI_NAME}}."
→ Agent runs: bunx {{CLI_NAME}} use {{SAMPLE_PATTERN}} --project app
→ Drops in proven, verified modules and strict TypeScript contracts.
→ Agent simply connects the pre-built hooks to your UI in seconds.
```

---

## 🚀 How It Works in 30 Seconds

```bash
# 1. Search for a capability
bunx {{CLI_NAME}} find "{{SEARCH_QUERY}}"

# 2. Inspect the contract
bunx {{CLI_NAME}} read {{SAMPLE_PATTERN}} --level overview

# 3. Drop into your project
bunx {{CLI_NAME}} use {{SAMPLE_PATTERN}} --project my-app
```

---

## 🤖 Equip Your AI Agent

```bash
bunx {{CLI_NAME}} init --agents
```

---

## 🏛️ What's in the Catalog (The 5 Tiers)

<p align="center">
  <img src="assets/tiers.svg" alt="5 capability tiers" width="100%">
</p>

| Tier | What it gives your AI |
| :--- | :--- |
| **`primitives/`** | Atomic hooks, pure utilities, math engines |
| **`domain/`** | Business rules, calculation algorithms, schemas |
| **`features/`** | Complete, turnkey feature modules |
| **`compositions/`** | Whole-app UI guidelines & layout blueprints |
| **`templates/`** | Full-stack production starter repos |

---

## 📋 Lore-lite: Code That Remembers Why

```git
feat(scope): title

Constraint: Must not break runtime boundary
Rejected: Alternative evaluated | Why it failed
Evidence: Empirical validation / test verification
```

---

## 🛠️ CLI Quick Reference

| Command | What it does |
| :--- | :--- |
| `bunx {{CLI_NAME}} find "<query>"` | Find ready-to-use patterns by problem name |
| `bunx {{CLI_NAME}} read <pattern>` | View types, constraints, and contracts |
| `bunx {{CLI_NAME}} use <pattern>` | Scaffold pattern and dependencies directly into your codebase |
| `bunx {{CLI_NAME}} list` | Browse all available patterns across tiers |
| `bunx {{CLI_NAME}} init --agents` | Configure Claude Code, Cursor, and Copilot |

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for details.
