---
name: design-tokens
status: VALIDATED
version: "1.0"
used_in: 2
domain: shared
capability: styling
tags: [tokens, oklch, styling, theme, design-system]
description: Multi-tier token system (primitives, semantics, themes) based on OKLCH color spaces, warm neutrals, and stepped radii.
---

# Design Tokens

## Status
[VALIDATED] | v1.0 | Used in 2 projects

## Problem
Design tokens in modern web apps frequently suffer from hardcoded hex values, cold/harsh grey palettes, inconsistent border-radii, and lack of separation between raw scale primitives and semantic meanings.

## Solution
A 3-tier token architecture:
1. **Primitives (`primitives.json`)**: Raw scales for color (OKLCH), spacing, stepped radii, duration, and easings.
2. **Semantic (`semantic.json`)**: Contextual meaning mapping raw primitives to purposeful intent (`--color-surface`, `--color-primary`, `--radius-card`).
3. **Themes (`themes/apple-native.json`)**: Context-specific palettes (light/dark mode with warm-tinted shadows and OKLCH balance).

## Implementation
- `primitives.json`: Raw values
- `semantic.json`: Meaning layer
- `themes/apple-native.json`: Concrete theme tokens

## Constraints
- Always use OKLCH for color definitions to guarantee perceptual uniformity across lightness steps.
- Avoid pure black shadows (`rgba(0,0,0,...)`) in warm light themes; tint shadows with warm undertones (`rgba(35, 32, 24, ...)`).

## Dependencies
- None (pure JSON token spec)
