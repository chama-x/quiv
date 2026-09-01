---
name: community-flywheel
status: PROVEN
version: "1.0"
domain: community
capability: contributor-gamification
tags: [community, contributors, github-actions, all-contributors, gamification, retention]
depends_on: []
description: All-contributors automation, good first issue schemas, and stargazer milestone celebratory loops.
---

# `community-flywheel`

> **Automated contributor recognition, gamified issue workflows, and social milestone loops.**

## Problem
Single-developer open source projects struggle to retain community momentum after launch spikes. Without structured contributor pathways and public gratitude, stargazers remain passive observers.

## Solution
1. Integrate All-Contributors bot automation (`.github/workflows/contributors.yml`).
2. Label low-friction `good-first-issue` tasks with explicit step-by-step resolution blueprints.
3. Trigger automated milestone celebrations (100, 500, 1,000 stars) on social media to generate recurring traffic waves.

## Implementation

```yaml
# .github/workflows/contributors.yml
name: All Contributors
on:
  issue_comment:
    types: [created]
jobs:
  contribute:
    runs-on: ubuntu-latest
    if: startsWith(github.event.comment.body, '@all-contributors')
    steps:
      - uses: actions/checkout@v4
      - uses: all-contributors/all-contributors-bot@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Constraints
- Acknowledge non-code contributions (docs, design, bug reports, ideas) equally.
- Never let `good-first-issue` tickets sit unanswered for more than 24 hours.
