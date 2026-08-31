---
name: quiv
description: >-
  Agent Knowledge Kit (quiv/qv) for discovering, retrieving, and scaffolding validated architectural patterns,
  UI shells, OLED tokens, motion systems, and offline sync building blocks without re-inventing solutions from scratch.
  MUST USE whenever asked to build, design, or scaffold PWA shells, Apple-grade UI, OLED dark tokens, motion/springs,
  offline sync features, or to learn and extract reusable components at the end of a project.
---

# Quiv Agent Knowledge System (quiv/qv)

## Overview
Quiv gives AI agents instant access to validated, proven architectural patterns across 5 tiers:
1. **Primitives**: Pure building blocks (hooks, utils, tabular numerals, haptics, spring vocabulary)
2. **Domain**: Business & domain models
3. **Features**: Turnkey capabilities (offline-sync, intent install prompts, zero-CLS banners)
4. **Compositions**: Assembly recipes (Apple-native PWA shell, storefront shells, OLED glass tokens, motion patterns)
5. **Templates**: Scaffold starters (high-star OSS repos, Next.js PWA)

## Zero-Token Workflow Loop

### 1. Conversational Triggers (When to Use Automatically)
When the user asks for:
* **PWA / Shells / Layouts**: *"Build an Apple-style PWA shell"*, *"Storefront layout"* $\rightarrow$ `quiv find "apple native pwa"`, `quiv use compositions/app-styles/apple-native-pwa --dest ./src`
* **Tokens / OLED / Theme**: *"Add OLED dark mode tokens"*, *"Glass styling"* $\rightarrow$ `quiv find "oled tokens"`, `quiv use compositions/oled-glass-tokens --dest ./src`
* **Motion / Physics**: *"Add spring animations"*, *"Swipe to dismiss"*, *"Haptic buttons"* $\rightarrow$ `quiv find "motion patterns"`, `quiv use compositions/motion-patterns --dest ./src`
* **Offline Sync / Queue**: *"Add offline sync"* $\rightarrow$ `quiv read features/offline-sync`, `quiv use features/offline-sync --dest ./src`
* **Post-Project Learn / Extract**: *"Extract this into QUIV"*, *"Learn from this project"* $\rightarrow$ `quiv learn` / `quiv extract`

### 2. Find Pattern
```bash
quiv find "<problem or component keyword>"
```
*Examples:* `quiv find "storefront"`, `quiv find "oled tokens"`, `quiv find "spring motion"`, `quiv find "offline sync"`

### 3. Read Constraints & Solutions (<300t overview)
```bash
quiv read <pattern-path> --level overview
```
*Note:* Reads token-optimized summary (<300t) including hard constraints and rejected alternatives. Use `--level full` or `--level implementation` only if code details are needed.

### 4. Scaffold into Workspace
```bash
quiv use <pattern-path> --dest ./src --project <project-name>
```
*Note:* Automatically copies the pattern files and all recursive dependencies into your workspace.

### 5. Post-Project Learn & Extract (Harvesting Knowledge)
When the user asks to learn, extract, or contribute reusable components built during the project:
```bash
quiv learn --from ./src/path/to/Component.tsx --tier <tier> --name <slug> -m "feat: description" -c "<constraints>" -r "<rejected>" -e "<evidence>"
```
*Note:* Automatically packages the component, creates the validated frontmatter README, commits with Lore-lite trailers, and records it into the knowledge base.
