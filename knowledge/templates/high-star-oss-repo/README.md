---
name: high-star-oss-repo
status: PROVEN
version: "1.0"
domain: meta
capability: project-scaffold
tags: [scaffold, starter, oss-template, star-growth, high-conversion]
depends_on: [compositions/high-converting-repo-shell]
description: Production-ready open-source repository starter scaffold optimized for maximum organic GitHub star conversion.
---

# `high-star-oss-repo`

> **Full project scaffold with 2026 bleeding-edge star conversion ergonomics and launch automation.**

## Problem
Starting a new open source repository from an empty folder requires re-implementing CI, issue forms, PR checklists, VHS demo scripts, dark-mode banners, and `llms.txt` every time.

## Solution
A full scaffold template containing the entire suite of verified high-converting assets, ready to be initialized with 1 command.

## Included Structure
```
template/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.yml
│   │   ├── feature_request.yml
│   │   └── config.yml
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── release.yml
│   │   └── contributors.yml
│   ├── pull_request_template.md
│   ├── FUNDING.yml
│   └── CODE_OF_CONDUCT.md
├── .devcontainer/devcontainer.json
├── assets/
│   ├── banner-dark.svg
│   ├── banner-light.svg
│   └── demo.tape
├── llms.txt
├── llms-full.txt
├── CONTRIBUTING.md
├── SECURITY.md
├── LICENSE
└── README.md
```

## Implementation

```bash
# Bootstrap using quiv
quiv use templates/high-star-oss-repo --project my-new-agent-tool
```
