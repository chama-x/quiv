---
name: github-star-engine
status: PROVEN
version: "1.0"
domain: growth
capability: conversion-funnel
tags: [github-stars, readme-conversion, 7-second-rule, vhs, terminal-demo, social-proof]
depends_on: [primitives/meta/gh-badge-matrix, primitives/meta/dark-mode-svg, primitives/meta/llms-txt-spec]
description: Complete 7-second README conversion funnel with terminal recording automation and social proof anchors.
---

# `github-star-engine`

> **The architectural conversion engine that turns casual repository visitors into stargazers and power users.**

## Problem
Open-source repositories suffer from high bounce rates (>75%) when visitors encounter walls of text, lack visual proof, or cannot evaluate the tool in under 10 seconds.

## Solution
Implement the 7-second F-pattern README layout:
1. High-contrast Dark-mode SVG header with 1-liner quantified differentiator.
2. Flat-square badge row.
3. 60fps automated terminal recording (VHS) showing instant value in < 5 seconds.
4. Benchmark comparison table vs. existing alternatives.
5. 30-second zero-install Quickstart (`bunx` / `npx`).
6. Star history embed and roadmap participation CTA.

## Implementation

```markdown
# 1. Generate crisp VHS terminal recording
vhs assets/demo.tape

# 2. Embed into README directly above the fold
<p align="center">
  <img src="assets/demo.gif" alt="Demo" width="100%">
</p>
```

## Constraints
- Terminal demo GIF must stay under 3.5MB.
- Quickstart commands must be executable on clean machines without prior configuration.
