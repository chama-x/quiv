---
description: Quiv Architecture Knowledge System Global Agent Rule
globs: *
alwaysApply: true
---

# Quiv Architecture Rule for AI Agents

- **Stop Starting from Scratch**: Always check for existing proven/validated architectural patterns before writing boilerplate or designing state/layout from zero.
- **Workflow**:
  1. \`quiv find "<query>"\` to discover relevant patterns.
  2. \`quiv read <pattern> --level overview\` to understand constraints and rejected approaches.
  3. \`quiv use <pattern> --dest ./src --project <project-name>\` to scaffold the pattern and its dependencies.
- **Lore-lite Standard**: When adding or updating patterns, always document:
  - \`Constraint:\` what must not break
  - \`Rejected:\` alternatives tried and why they failed
  - \`Evidence:\` benchmark or test verification
