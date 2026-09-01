---
name: apple-native-pwa-shell
status: EXPERIMENTAL
version: "1.0"
used_in: 1
domain: pwa
capability: shell
tags: [pwa, apple-hig, screen-shell, collapsible-header, safe-areas, pull-to-refresh]
description: Apple HIG compliant screen layout shell with scroll-linked collapsible large titles, glassmorphic header backdrops, and safe-area geometry.
---

# Apple Native PWA Shell (`Screen`)

## Status
[EXPERIMENTAL] | v1.0 | Used in 1 project

## Problem
Web apps wrapped as PWAs often feel like desktop websites framed inside a mobile container, lacking native iOS behaviors like collapsible large titles on scroll, rubber-banding, and correct notch/safe-area clipping.

## Solution
1. **Collapsible Large Title**: The header transitions from an iOS-style 34pt large title to a compact centered navigation title on scroll using `useScroll` + `useTransform`.
2. **Glassmorphic Blurred Header**: Fades in a `backdrop-filter: blur(24px)` background when content scrolls underneath.
3. **Safe-Area Inset Handling**: Automatically clamps content with `--sat` and `--sab` CSS environment offsets.

## Dependencies
- `motion/react`
