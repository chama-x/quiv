<p align="center">
  <img src="assets/hero-visual.svg" alt="{{PROJECT_NAME}} — {{TAGLINE}}" width="100%">
</p>

<p align="center">
  <a href="https://github.com/{{ORG}}/{{REPO}}/releases"><img src="https://img.shields.io/badge/version-0.1.0-3b82f6?style=flat-square" alt="Version"></a>
  <a href="https://github.com/{{ORG}}/{{REPO}}/actions"><img src="https://img.shields.io/badge/build-passing-22c55e?style=flat-square" alt="Build Status"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.7+-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-22c55e?style=flat-square" alt="MIT License"></a>
</p>

# {{PROJECT_NAME}}

**{{ONE_LINER_HOOK}}**

{{PROBLEM_PARAGRAPH}}

`{{PROJECT_NAME}}` is a {{CATEGORY_DESCRIPTION}} — {{MECHANISM_DESCRIPTION}}.

> 🤖 **Machine Entry Point**: If you are an AI agent, index [`llms.txt`](llms.txt) for API specifications and [`INDEX.md`](INDEX.md) for the active catalog.

---

<p align="center">
  <img src="assets/before-after.svg" alt="Without vs With {{PROJECT_NAME}}" width="100%">
</p>

---

## Quickstart

Query the registry directly with Bun (no global install required):

```bash
bunx {{CLI_NAME}} find "{{SEARCH_QUERY}}"
```

```text
✔ Found 3 patterns (140 tokens | 11ms)
  • {{PATTERN_PATH}}    [PROVEN]    240 tok  — {{PATTERN_SUMMARY}}
```

Inspect only the type contract and rules:

```bash
bunx {{CLI_NAME}} read {{PATTERN_PATH}} --level overview
```

Scaffold into your target project:

```bash
bunx {{CLI_NAME}} use {{PATTERN_PATH}} --project my-app
```

---

## The Pattern Artifact

```yaml
---
name: {{PATTERN_PATH}}
tier: features
status: PROVEN
tokens: 240
---

# Contract: {{CONTRACT_NAME}}
interface {{CONTRACT_NAME}} {
  // strict types
}

# Rules
- Invariant: Key architectural invariant
- Constraint: Runtime or thread boundary constraint
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

## Verifiable Benchmarks

| Task | Raw Source Loading | `{{PROJECT_NAME}}` Contract Read | Difference |
| :--- | :---: | :---: | :---: |
| **Search & Discovery** | 1,800 tokens | **140 tokens** | **92% less context** |
| **Architecture Contract Ingestion** | 8,200 tokens | **240 tokens** | **97% less context** |
| **Scaffolding Latency** | Manual copy-paste | **< 14ms** | **Instant** |

---

## Agent Setup

```bash
bunx {{CLI_NAME}} init --agents
```

---

## Lore-lite Commit Standard

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
