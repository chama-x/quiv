# 🔶 Show HN & Technical Reddit Post Launch Templates

> **Battle-tested copy templates engineered to respect community guidelines, avoid spam detection filters, and maximize organic engagement and star conversion.**

---

## 1. Hacker News "Show HN" Submission Template

### Submission Title
`Show HN: quiv – 10–32x token-efficient architecture system for AI coding agents`

### URL
`https://github.com/quiv-knowledge/quiv`

### Immediate Founder Comment (Post within 60s of submission)

```markdown
Hi HN,

We built quiv because we were frustrated by the massive token bloat and hallucinatory regressions that happen when AI coding agents (Claude Code, Cursor, Copilot) build full-stack features.

When an agent needs to implement an offline sync queue or ERP domain calculation, developers typically feed full repository dumps or let the agent write domain logic from scratch. This burns 10,000–30,000 tokens per prompt, spikes API bills, and frequently causes agents to lose track of system constraints.

quiv introduces a 5-tier progressive disclosure architecture for agent knowledge:
1. Primitives: Pure hooks, headless utilities, and micro-contracts
2. Domain: Strict business rules, calculations, and schemas
3. Features: Complete encapsulated units (offline sync, auth flows)
4. Compositions: Assembly patterns for specific application targets
5. Templates: Full project starter scaffolds

How it works:
Instead of dumping full source files into context, agents interact with quiv via an ultra-lightweight CLI:
- `quiv find "<query>"`: Returns semantic pattern summaries (~200 tokens)
- `quiv read <pattern> --level overview`: Reads only high-level contracts (~300 tokens)
- `quiv use <pattern> --project <name>`: Resolves dependencies and scaffolds code directly into the target project

In our benchmarks across complex React/TypeScript apps, this reduces agent context token consumption by 10x to 32x while enforcing strict architectural consistency through Lore-lite commit trailers.

It's completely open-source (MIT licensed) and written in strict TypeScript for Bun and Node.

We'd love to hear your feedback on the progressive disclosure format and how your teams manage architecture across multi-agent workflows.

GitHub: https://github.com/quiv-knowledge/quiv
```

---

## 2. Reddit r/programming & r/typescript Post Template

### Title
`How we reduced AI coding agent context overhead by 32x using progressive disclosure CLIs (Open Source)`

### Post Body

```markdown
Hey everyone,

Over the past six months of testing AI coding agents (Claude Code, Cursor, Antigravity) across large monorepos, we noticed a consistent pattern: agents perform significantly better when given small, hierarchical architecture primitives rather than dumping entire files or frameworks into their context window.

To solve this systematically, we built and open-sourced **quiv** (https://github.com/quiv-knowledge/quiv).

### The Technical Problem
When an LLM context window reaches 30k+ tokens, "needle-in-a-haystack" retrieval accuracy degrades, leading to hallucinated API calls and subtle logic regressions.

### The Progressive Disclosure Solution
Instead of static context injection, `quiv` uses a 3-level progressive disclosure CLI:
1. `quiv find`: Semantic search across domain patterns (~150 tokens)
2. `quiv read --level overview`: Type definitions and behavioral contracts only (~250 tokens)
3. `quiv read --level implementation`: Full source AST only when ready to code (~2k tokens)

### Benchmarks
- Pattern lookup: **140 tokens** (vs 1,800 tokens raw grep)
- Feature scaffolding: **240 tokens** (vs 8,200 tokens full file context)
- Startup time: **< 12ms** powered by Bun & native TypeScript

### Try it with bunx:
```bash
bunx quiv find "offline sync with conflict resolution"
```

The project is 100% open-source under MIT. Code and architecture diagrams are on GitHub: https://github.com/quiv-knowledge/quiv

Curious to hear how others here are tackling token bloat and architectural consistency across multi-agent setups!
```
