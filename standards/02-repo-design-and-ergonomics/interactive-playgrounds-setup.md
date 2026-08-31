# ⚡ Interactive Playgrounds & Zero-Friction Evaluation

> **How to eliminate developer evaluation friction by providing 1-click browser environments, WebContainers, Codespaces, and zero-install execution.**

---

## 1. The Friction-to-Star Drop-off Curve

Every step required to evaluate a tool reduces the likelihood of a developer giving a star or adopting the project:

```
[Look at README]  ──(100% visitors)
       │
[Requires git clone + setup] ──(Drops to 20%)
       │
[Requires npm install + env keys] ──(Drops to 8%)
       │
[Encounter version mismatch / build error] ──(Drops to 1%) ❌ No Star
```

**The 2026 Zero-Friction Paradigm**:
```
[Look at README] ──(100% visitors)
       │
[Run bunx / Click 1-Click Sandbox] ──(Instant 5-second value delivery)
       │
[Aha! Moment] ──(Star Conversion Rate jumps to 45%+) ⭐
```

---

## 2. Setting Up GitHub Codespaces (`.devcontainer/devcontainer.json`)

GitHub provides free Codespaces hours for public repositories. Adding a `.devcontainer` directory enables the **"Open in GitHub Codespaces"** badge:

### `.devcontainer/devcontainer.json`
```json
{
  "name": "quiv Dev Sandbox",
  "image": "mcr.microsoft.com/devcontainers/javascript-node:1-22-bookworm",
  "features": {
    "ghcr.io/devcontainers/features/bun:1": {
      "version": "latest"
    }
  },
  "postCreateCommand": "bun install && bun run build",
  "customizations": {
    "vscode": {
      "extensions": [
        "dbaeumer.vscode-eslint",
        "biomejs.biome"
      ]
    }
  }
}
```

### Codespaces README Badge
```markdown
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/quiv-knowledge/quiv)
```

---

## 3. StackBlitz / WebContainer 1-Click Interactive Playground

WebContainers run a full Node.js / Bun environment directly inside the browser’s WebAssembly engine without spinning up remote VMs.

### StackBlitz URL Formula
```markdown
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/quiv-knowledge/quiv?terminal=dev)
```

Developers can test CLI commands and explore architectural tiers directly in their browser tab with zero local environment changes.

---

## 4. Zero-Install Execution via `bunx` / `npx`

Always configure your package binaries so users can test immediately without global installations:

```bash
# Instant evaluation without npm install
bunx quiv list --tier features
# or with npx
npx @quiv/cli find "offline sync"
```

In your `package.json`:
```json
{
  "name": "@quiv/cli",
  "bin": {
    "quiv": "./dist/index.js",
    "qv": "./dist/index.js"
  }
}
```
