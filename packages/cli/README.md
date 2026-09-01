# @quiv-knowledge/cli (`quiv` / `qv`)

> Agent Knowledge Kit (quiv/qv) — High-efficiency reusable architecture for AI coding agents.

[![Version](https://img.shields.io/npm/v/@quiv-knowledge/cli?style=flat-square)](https://www.npmjs.com/package/@quiv-knowledge/cli)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](https://github.com/chama-x/quiv)

---

## Installation & Quickstart

```bash
# 1. From local source / repository:
bun run build
cd packages/cli && npm link

# 2. Or from npm registry (when published):
bun install -g @quiv-knowledge/cli
# Or npm:
npm install -g @quiv-knowledge/cli
```

### 10-Second Setup for AI Agents & Antigravity
```bash
quiv init --agents --antigravity
```
Installs:
- Native Antigravity Skill (`~/.gemini/config/skills/quiv/SKILL.md`)
- Global & Project Rules (`AGENTS.md`, `.cursor/rules/quiv.mdc`)
- Global config fallback (`~/.config/quiv/config.json`)

---

## Core Commands

### 1. `quiv find "<query>"`
Deep semantic & keyword search across all pattern tiers with relevancy scores:
```bash
quiv find "offline sync with conflict resolution"
qv find "apple pwa oled tokens"
```

### 2. `quiv read <pattern> [--level overview|full|implementation]`
Token-optimized progressive disclosure reading (<300t overview):
```bash
quiv read features/offline-sync --level overview
```

### 3. `quiv use <pattern> [--dest <dir>] [--flat] [-P <project>]`
Resolves recursive dependencies, scaffolds code into your workspace, and updates project registry:
```bash
# Standard scaffold into ./src (preserves relative dependency tree)
quiv use compositions/app-styles/apple-native-pwa --dest ./src

# Flat direct placement for isolated tokens or components
quiv use compositions/oled-glass-tokens --dest ./src/styles --flat
```

### 4. `quiv learn` (alias `quiv extract`)
Harvest and distill newly implemented components from your project into QUIV with Lore-lite metadata:
```bash
quiv learn \
  --from ./src/components/DynamicSheet.tsx \
  --tier compositions \
  --name dynamic-sheet \
  -m "feat: gesture sheet with spring dismiss" \
  -c "touch-action: none required for iOS Safari" \
  -r "framer-motion layoutId due to mobile jank" \
  -e "60fps on iPhone 15 Pro"
```

### 5. `quiv check [-P <project>]`
Detects outdated pattern versions in active projects (auto-detects project name from `package.json`):
```bash
quiv check
```

### 6. `quiv list [-t <tier>] [-f compact|table|json]`
Catalog patterns across the 5 capability tiers (`primitives`, `domain`, `features`, `compositions`, `templates`).

---

## Lore-Lite Commit Standard

Every pattern contributed to QUIV includes three trailers:
```git
feat(offline-sync): add durable retry outbox

Constraint: must not block the UI thread during heavy sync bursts
Rejected: localStorage queue | 5MB quota was insufficient for attachments
Evidence: tested with 1,000 offline mutations, 100% synced on reconnect
```

---

## License
MIT
