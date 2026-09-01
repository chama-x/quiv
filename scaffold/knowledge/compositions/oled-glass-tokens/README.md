---
name: oled-glass-tokens
status: EXPERIMENTAL
version: "1.0"
used_in: 1
domain: ui
capability: styling
tags: [design-tokens, oled, dark-mode, glassmorphism, safe-areas]
description: OLED-optimized dark surface hierarchy with frosted glass backdrop blur, hairline borders, and hardware safe-area variables.
---

# OLED Glass Design Tokens

## Status
[EXPERIMENTAL] | v1.0 | Used in 1 project

## Problem
Standard dark modes use muddy grays (`#1e1e1e`) that fail to leverage true OLED black power savings, while pure `#000` text halos aggressively without intermediate elevation steps.

## Solution
1. **OLED Surface Hierarchy**:
   - `--bg`: `#000000` (True OLED pitch black)
   - `--s1`: `#0B0B0C` (Elevated cards; stops white text halation)
   - `--s2`: `#141416` (Interactive rows / secondary surfaces)
   - `--s3`: `#1C1C1E` (Grouped container backgrounds)
   - `--s4`: `#242427` (Floating overlays and tooltips)
2. **Hairline Precision**: Subtle white alpha borders (`rgba(255,255,255,0.09)`) for crisp retina resolution without heavy strokes.
3. **Safe-Area Dynamic Geometry**: Automatic fallback-aware CSS viewport safe-area insets (`--sat`, `--sab`, `--sal`, `--sar`).
