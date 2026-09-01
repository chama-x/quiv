# Knowledge Repository — Agent Instructions

## Purpose
This repository contains reusable development patterns. Read `INDEX.md` first to discover what's available.

## Structure (5 Capability Tiers)
- `primitives/` — WHAT you build with (pure building blocks: hooks, utils, headless components)
- `domain/` — BUSINESS knowledge (ERP rules, data models, calculations)
- `features/` — COMPLETE reusable features (offline sync, inventory dashboard)
- `compositions/` — HOW to assemble for app types (Apple PWA, dashboard, forms-heavy)
- `templates/` — FULL project starting scaffolds (nextjs-pwa, vite-pwa)

## How to Use
1. Read `INDEX.md` to see available patterns (or run `quiv list` / `qv list`)
2. Sparse-clone only what you need (or run `quiv use <pattern> --project <name>`)
3. Read pattern README for guidance (`quiv read <pattern> --level overview`)
4. Implement using pattern's approach
5. If you discovered something new, contribute back (`quiv contribute`)

## HITL Decision Points (Antigravity & AI Agents)
Pause and ask the user (`ask_question` or chat prompt) when:
1. **Pattern Selection**: Multiple patterns could apply (present trade-offs)
2. **Novel Solution**: Solved something differently than existing pattern (ask whether to save)
3. **Pattern Conflict**: Two patterns give conflicting advice (ask which to follow)
4. **Backport Decision**: Deciding which projects to update when pattern changes

## Contributing & Commit Message Format (Lore-lite)
When you learn something new:
1. Create a branch: `contribute/<pattern-name>`
2. Add/update pattern files with standard README.md
3. Commit with reasoning:
```
feat/fix: brief description

Explanation of what changed and why.

Constraint: what must not be broken
Rejected: alternative | why it failed
Evidence: what validates this approach
```
4. Open PR for human review: `gh pr create` (or `quiv contribute`)

## DO NOT
- Clone the entire repo (use sparse checkout)
- Modify patterns on `main` without opening a PR
- Skip the INDEX when looking for patterns
- Add patterns without proven status markers
