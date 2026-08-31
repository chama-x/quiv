# `quiv` (Knowledge Kit)

> **Agent Knowledge Kit CLI & Architecture System** for AI coding agents (Antigravity, Claude Code, Cursor, Copilot).

[![Built with Bun](https://img.shields.io/badge/runtime-bun-black?logo=bun)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/typescript-strict-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## 💡 Overview

`quiv` (and alias `qv`) provides a **10–32x token-efficient CLI-first interface** for AI agents to discover, consume, and contribute reusable software architectures, domain models, and primitives across projects without bloating context windows.

### The 5 Capability Tiers

```
knowledge/
├── primitives/     ← WHAT you build with (hooks, pure utils, headless UI)
├── domain/         ← BUSINESS knowledge (ERP rules, calculations, schemas)
├── features/       ← COMPLETE reusable features (offline sync, dashboards)
├── compositions/   ← HOW to assemble for app types (Apple PWA, dashboard)
└── templates/      ← FULL project starter scaffolds (nextjs-pwa, vite-pwa)
```

---

## ⚡ CLI Commands

| Command | Purpose | Target Tokens |
|---------|---------|---------------|
| `quiv list` (or `qv list`) | Discover available patterns by domain/tier/capability | 200–800 |
| `quiv find "<query>"` | Semantic & keyword pattern search by problem description | ~500 |
| `quiv read <pattern>` | Read pattern with progressive disclosure (`--level overview\|full\|implementation`) | 300–3,000 |
| `quiv use <pattern> --project <name>` | Resolve dependency tree, generate sparse checkout, update registry | ~200 |
| `quiv contribute --pattern <path>` | Create branch, commit with **Lore-lite** trailers, open PR | ~100 |
| `quiv check --project <name>` | Detect outdated pattern versions used in projects | ~300 |
| `quiv status` | Ultra-compact inventory health check | ~100 |
| `quiv init --org <org>` | One-command bootstrap for 3 repositories (knowledge, registry, meta) | - |

---

## 🛠️ Quick Start

### 1. Install & Build
```bash
bun install
bun run build
bun test
```

### 2. Initialize Repositories
```bash
# Bootstrap local scaffolds and configure .quivrc
quiv init --org quiv-knowledge
```

### 3. Usage Examples
```bash
# List all features
quiv list --tier features

# Search for offline synchronization patterns
quiv find "offline sync with conflict resolution"

# Read implementation details
quiv read features/offline-sync --level implementation

# Use in a project
quiv use features/offline-sync --project erp-mobile-app

# Check backport status
quiv check --project erp-mobile-app

# Quick system status
quiv status
```

---

## 📋 Lore-lite Commit Format

When contributing patterns back:
```git
feat(offline-sync): add durable retry outbox

Implemented exponential backoff retry worker in IndexedDB.

Constraint: Must not block UI thread during heavy sync bursts
Rejected: LocalStorage queue | 5MB quota was insufficient for attachments
Evidence: Tested with 1,000 offline mutations, 100% synced on reconnect
```

---

## 📂 Architecture Organization Repositories

- [`quiv-knowledge/knowledge`](https://github.com/quiv-knowledge/knowledge) — Reusable patterns monorepo
- [`quiv-knowledge/registry`](https://github.com/quiv-knowledge/registry) — Project consumption state and dependency graph
- [`quiv-knowledge/meta`](https://github.com/quiv-knowledge/meta) — Agent instructions, conventions, and standards
