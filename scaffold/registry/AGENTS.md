# Registry Repository — Agent Instructions

## Purpose
This repository acts as the central state ledger for project usages and pattern dependency graphs across the organization.

## Files
- `active-projects.md` — Maps active projects to the exact version of patterns they consume.
- `dependencies.md` — Defines inter-pattern dependency constraints.

## Updating Registry
When an agent utilizes a pattern in a new or existing project:
1. Run `quiv use <pattern> --project <project-name>` (auto-updates registry)
2. Or append to `active-projects.md`:
   ```markdown
   | project-name | pattern-name@v1.0 | 2026-08-31 |
   ```
