---
name: high-converting-repo-shell
status: PROVEN
version: "1.0"
domain: meta
capability: repo-scaffolding
tags: [repo-shell, github-ergonomics, conversion, open-source, launch-ready]
depends_on: [primitives/meta/gh-badge-matrix, primitives/meta/dark-mode-svg, primitives/meta/llms-txt-spec, features/github-star-engine, features/community-flywheel]
description: Complete repository shell composition assembling high-converting README, issue forms, and PR templates.
---

# `high-converting-repo-shell`

> **Turnkey repository composition configured for maximum developer conversion and GitHub discovery.**

## Problem
Bootstrapping a new open-source tool requires manually configuring dozens of disconnected files: issue forms, PR templates, CI workflows, social preview cards, badges, and `llms.txt`.

## Solution
Assemble all atomic meta primitives and community features into a single, cohesive repository composition that can be instantiated with 1 command.

## Composed Components
- `primitives/meta/gh-badge-matrix`: Flat-square badge bar
- `primitives/meta/dark-mode-svg`: Dark/light mode SVG headers
- `primitives/meta/llms-txt-spec`: `llms.txt` and `llms-full.txt`
- `features/github-star-engine`: 7-second README layout & VHS recording
- `features/community-flywheel`: Issue forms, PR templates, All-Contributors

## Implementation

```bash
# Scaffold the full high-converting repository shell
quiv use compositions/high-converting-repo-shell --project my-new-tool
```

## Constraints
- Must include `.github/ISSUE_TEMPLATE/*.yml`, `CONTRIBUTING.md`, `LICENSE`, `SECURITY.md`, and `.devcontainer/`.
