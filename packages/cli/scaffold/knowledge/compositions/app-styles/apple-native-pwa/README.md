---
name: apple-native-pwa
status: VALIDATED
version: "1.0"
used_in: 2
domain: shared
capability: pwa-styling
depends_on:
  - compositions/design-tokens
  - compositions/motion-patterns
tags: [pwa, apple, mobile, styling, tokens]
description: Opinionated aesthetic assembly for building Apple-native feeling PWAs on Next.js or React.
---

# Apple-Native PWA Composition

## Status
[VALIDATED] | v1.0 | Used in 2 projects

## Problem
PWAs often look and feel like websites inside a standalone browser wrapper—plagued by rubber-band scroll issues, lack of safe area awareness, and unrefined styling.

## Solution
A unified composition combining:
- **Warm OKLCH Color Palette & Warm-Tinted Shadows** (`tokens.css`)
- **Parallel Push/Pop Navigation Physics** (`motion.ts`)
- **Per-Screen Scroll Containers & Exiting-Screen Interaction Locks** (`components/storefront-shell.tsx`)

## Dependencies
- `compositions/design-tokens`
- `compositions/motion-patterns`
