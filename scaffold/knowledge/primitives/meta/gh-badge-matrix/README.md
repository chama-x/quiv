---
name: gh-badge-matrix
status: PROVEN
version: "1.0"
domain: meta
capability: github-ergonomics
tags: [badges, shields, github, ui, social-proof]
depends_on: []
description: Standardized token-efficient Shields.io and SVG badge matrix for developer repositories.
---

# `gh-badge-matrix`

> **Minimalist, high-signal badge matrix for open-source GitHub repositories.**

## Problem
Many repositories suffer from "badge vomit"—stacking 20+ multicolored, unreadable badges that slow down mobile rendering and distract from the core value proposition.

## Solution
Standardize on a clean single-row badge matrix using `style=flat-square` with unified color tokens (Black for Bun, TypeScript Blue, Emerald Green for MIT, Discord Blurple, Purple for Codespaces).

## Implementation

```markdown
<p align="center">
  <a href="https://github.com/{{ORG}}/{{REPO}}/stargazers"><img src="https://img.shields.io/github/stars/{{ORG}}/{{REPO}}?style=flat-square&logo=github&color=blue" alt="GitHub Stars"></a>
  <a href="https://bun.sh"><img src="https://img.shields.io/badge/runtime-bun-black?style=flat-square&logo=bun" alt="Runtime: Bun"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/typescript-5.7+-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-22c55e?style=flat-square" alt="License: MIT"></a>
  <a href="https://discord.gg/{{DISCORD}}"><img src="https://img.shields.io/badge/community-discord-5865F2?style=flat-square&logo=discord&logoColor=white" alt="Discord"></a>
</p>
```

## Constraints
- Max 5–6 badges in the primary row.
- Never wrap across more than 2 lines on mobile screens.
- All badges must link to actionable destinations (stargazers, runtime docs, license file, discord invite).
