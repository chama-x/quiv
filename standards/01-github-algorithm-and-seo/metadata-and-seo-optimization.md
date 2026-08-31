# 🔍 GitHub Metadata, Search Engine Optimization (SEO) & Topic Matrix

> **How to optimize your repository's internal GitHub search rank, Google ranking, topic taxonomy, and OpenGraph metadata to capture high-intent developer search traffic.**

---

## 1. The GitHub Search Algorithm Ranking Factors

GitHub's internal code & repository search engine (Blackbird + Elastic) indexes repositories based on weighted signals:

| Ranking Signal | Weight | Optimization Tactic |
| :--- | :--- | :--- |
| **Repository Name** | 35% | Must contain high-volume primary keyword or short brand name (e.g. `quiv`, `knowledge-kit`, `agent-architecture`). |
| **Short Description (`About`)** | 25% | First 140 characters must contain 2–3 target keywords + strong value proposition. |
| **Topic Tags (`Topics`)** | 20% | Exactly 8–15 high-volume and niche curated topic tags. |
| **README H1 & First Paragraph** | 10% | Semantic keyword density in top 300 words without keyword stuffing. |
| **Recent Star / Commit Velocity** | 10% | Frequent updates signal active maintenance and bump search rank. |

---

## 2. Crafting the Perfect 140-Character "About" Description

The "About" description appears in:
- GitHub Search Results
- Twitter / OpenGraph Link Previews
- GitHub Trending cards
- Google Search Snippets

### The 3-Part Formula
$$\text{Description} = \text{[Category / Definition]} + \text{[Target Audience / Platform]} + \text{[Concrete 10x Benefit]}$$

### Examples & Anti-Patterns

❌ **Weak / Generic**:
> "A tool for AI coding agents and knowledge management written in TypeScript."
*(Boring, zero urgency, no quantified benefit).*

❌ **Hype without clarity**:
> "The revolutionary, next-generation hyper-scale framework for the future of AI coding!"
*(Fluff, meaningless buzzwords, triggers dev skepticism).*

✅ **High-Converting (`quiv` formulation)**:
> "Agent Knowledge Kit & CLI: 10–32x token-efficient architecture discovery for AI coding agents (Claude Code, Cursor, Antigravity, Copilot)."
*(Clear noun, targeted agent ecosystems, empirical 10-32x token efficiency claim).*

---

## 3. Topic Tag Taxonomy & Strategy

GitHub allows up to 20 topic tags. Use a **3-tier topic strategy**:

```
                               ┌───────────────────────────┐
                               │ 1. High-Volume Macro Tags │ (100k+ repos)
                               │ e.g. ai, typescript, cli  │
                               └─────────────┬─────────────┘
                                             │
                               ┌─────────────▼─────────────┐
                               │ 2. Domain / Category Tags │ (5k-50k repos)
                               │ e.g. agentic-ai, llm-tools│
                               └─────────────┬─────────────┘
                                             │
                               ┌─────────────▼─────────────┐
                               │ 3. Ecosystem / Niche Tags │ (100-5k repos)
                               │ e.g. claude-code, cursor  │
                               └───────────────────────────┘
```

### Curated Topic Matrix for `quiv` / AI Agent Developer Tools:

1. **Macro / Language Tags**:
   - `typescript`
   - `bun`
   - `cli`
   - `developer-tools`
2. **Category / AI Domain Tags**:
   - `ai-agents`
   - `agentic-ai`
   - `coding-assistant`
   - `llm-tools`
   - `software-architecture`
3. **Ecosystem & Interop Tags (High-Intent Conversion)**:
   - `claude-code`
   - `cursor-rules`
   - `antigravity`
   - `copilot`
   - `token-optimization`
   - `mcp` (Model Context Protocol)

> [!TIP]
> **Why Ecosystem Tags Matter**: When developers search for specific agent workflows (e.g. `claude-code patterns` or `cursor token reduction`), having these niche topic tags places your repo at the **#1 search position**, converting at >40% star rate because the intent is razor-sharp.

---

## 4. Google SEO for GitHub Repositories

Google indexes GitHub repos with high domain authority (`github.com` has a PageRank of 96). You can easily outrank standalone blogs on high-intent queries if your README is properly structured:

1. **Semantic H1 / H2 Hierarchy**: Use strict HTML / Markdown headings:
   - `H1`: `# quiv: Agent Knowledge Kit CLI & Architecture System`
   - `H2`: `## ⚡ The Problem: Context Window Bloat & Agent Amnesia`
   - `H2`: `## 🛠️ Quick Start (30-Second Setup)`
2. **Canonical Links**: If you maintain a documentation website (e.g., `quiv.dev`), ensure documentation pages link back to the GitHub repository as the primary source of truth.
3. **Rich Snippets via Markdown Tables**: Google frequently extracts Markdown comparison tables directly into Google Search Featured Snippets.

---

## 5. Website URL & Social Linking Settings

In the GitHub repository sidebar settings:

- **Website URL**: Always point to either:
  1. The live documentation / interactive demo page.
  2. Or if no docs site exists yet, anchor directly to the Quickstart section: `https://github.com/org/repo#quick-start`.
- **Include in home page**: Ensure `Releases`, `Packages`, and `Discussions` checkboxes are enabled in the sidebar to maximize indexed metadata surface area.
