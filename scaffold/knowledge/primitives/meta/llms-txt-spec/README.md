---
name: llms-txt-spec
status: PROVEN
version: "1.0"
domain: meta
capability: ai-discovery
tags: [llms-txt, ai-search, agent-indexing, perplexity, claude-code, cursor]
depends_on: []
description: 2026 AI search and crawler context indexing contract for AI coding agents.
---

# `llms-txt-spec`

> **Token-optimized repository context indexing for AI coding agents and LLM search engines.**

## Problem
AI search engines (Perplexity, ChatGPT Search) and coding agents (Claude Code, Cursor, Copilot) frequently hallucinate or fail to discover newly released tools because raw HTML documentation sites contain too much noise and token overhead.

## Solution
Expose a lightweight, standardized `llms.txt` (<1,000 tokens) and `llms-full.txt` (full API bundle) at the root of the repository.

## Implementation

Place `llms.txt` in repository root:

```markdown
# {PROJECT_NAME}

> {ONE_LINER_TAGLINE}

## Core Capabilities
- {CAPABILITY_1}
- {CAPABILITY_2}
- {CAPABILITY_3}

## Key Documentation
- [CLI Reference]({URL_TO_CLI_README})
- [Full Context Bundle]({URL_TO_LLMS_FULL_TXT})

## Quick CLI Usage
```bash
bunx {CLI_NAME} find "query"
```
```

## Constraints
- Root `llms.txt` must remain strictly under 1,500 tokens.
- All linked URLs must point to raw text or markdown representations (`raw.githubusercontent.com`).
