# 🤖 `llms.txt` & AI Search Engine Indexing (The 2026 Organic Traffic Vector)

> **How to structure and implement `llms.txt` and `llms-full.txt` to ensure AI coding agents (Claude Code, Cursor, Copilot, Antigravity) and AI search engines (Perplexity, ChatGPT Search, Gemini) cite, recommend, and drive organic stars to your repository.**

---

## 1. Why `llms.txt` is Critical for Open-Source Growth in 2026

In 2026, more than **40% of developer tool discovery occurs through LLM interfaces and AI search engines** rather than traditional Google search.

When a developer asks:
- *"What is the best token-efficient knowledge CLI for Claude Code or Cursor?"*
- *"How do I share reusable architecture patterns across AI coding agent projects?"*

AI search engines (Perplexity, ChatGPT Search, Gemini, Cursor @web) parse repositories that provide clean, structured, token-optimized context files (`llms.txt` and `llms-full.txt`).

If your repository implements the `llms.txt` standard:
1. AI search engines will **explicitly cite and hyperlink your GitHub repo** in their answer.
2. AI coding agents will load your exact CLI commands and documentation natively.
3. Users receive direct recommendations with high trust, leading to an **immediate star conversion rate exceeding 65%**.

---

## 2. Specification: `llms.txt` vs. `llms-full.txt`

The standard defines two root-level files:

| File | Purpose | Target Token Size | Audience |
| :--- | :--- | :--- | :--- |
| **`llms.txt`** | High-density semantic index and map of the repository | 500 – 1,500 tokens | AI Search engines, quick agent routing, overview queries |
| **`llms-full.txt`** | Full API reference, architectural tiers, CLI commands, and code samples | 4,000 – 12,000 tokens | In-depth agent context loading, automated implementation |

---

## 3. Reference Implementation for `quiv`

### `llms.txt` (Root Index File)

```markdown
# quiv (Knowledge Kit)

> 10–32x token-efficient CLI & architecture system for AI coding agents (Claude Code, Antigravity, Cursor, Copilot).

## Core Capabilities
- 5 Capability Tiers: Primitives, Domain, Features, Compositions, Templates
- CLI progressive disclosure (`quiv list`, `quiv find`, `quiv read`, `quiv use`)
- Lore-lite commit and pattern metadata format

## Key Documentation
- [CLI Reference](https://raw.githubusercontent.com/quiv-knowledge/quiv/main/packages/cli/README.md): Complete command syntax and flag definitions.
- [5 Tiers Guide](https://raw.githubusercontent.com/quiv-knowledge/quiv/main/knowledge/README.md): Architecture breakdown from primitives to full templates.
- [Conventions & Lore Format](https://raw.githubusercontent.com/quiv-knowledge/quiv/main/meta/conventions.md): Pattern contribution and backporting rules.
- [Full Context Bundle](https://raw.githubusercontent.com/quiv-knowledge/quiv/main/llms-full.txt): Comprehensive API and pattern specification.

## Quick CLI Usage
- Install / Run: `bunx quiv list` or `npm i -g @quiv/cli`
- Search patterns: `quiv find "offline sync with sqlite"`
- Consume pattern: `quiv use features/offline-sync --project my-app`
```

---

## 4. Serving `llms.txt` via GitHub Pages or Raw URLs

To allow external AI agents and crawlers to access `llms.txt` over HTTPS:

1. **Root Placement**: Keep `llms.txt` in the root of the GitHub repository (`https://raw.githubusercontent.com/<org>/<repo>/main/llms.txt`).
2. **Docs Site Route**: If hosting a documentation site (via VitePress, Nextra, Docusaurus, or GitHub Pages), ensure `https://quiv.dev/llms.txt` redirects or serves the raw text file directly with `Content-Type: text/plain`.
3. **Robots.txt Declaration**: Add explicit crawler indexing in your doc site's `robots.txt`:
   ```
   User-agent: *
   Allow: /llms.txt
   Allow: /llms-full.txt
   ```

---

## 5. Integrating with Cursor Rules (`.cursorrules` / `.cursor/rules`) and Claude Code (`AGENTS.md` / `CLAUDE.md`)

When other developers install your tool, providing an instant 1-command config generator creates viral repository backlinks:

```bash
# quiv init creates .cursorrules / AGENTS.md automatically referencing quiv
quiv init --agents
```

This ensures that every downstream repository initialized with `quiv` contains metadata linking back to your GitHub repo, creating a massive organic web of citations that LLMs crawl and index continuously.
