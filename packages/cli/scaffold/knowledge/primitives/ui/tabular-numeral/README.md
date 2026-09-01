---
name: tabular-numeral
status: EXPERIMENTAL
version: "1.0"
used_in: 1
domain: ui
capability: typography
tags: [typography, numbers, animated-counter, tabular-nums, formatting]
description: Monotonic tabular numeral display with spring animated counting, magnitude sizing, and unit typography.
---

# Tabular Numeral Display (`Num`)

## Status
[EXPERIMENTAL] | v1.0 | Used in 1 project

## Problem
Numbers changing in real-time dashboards jitter horizontally without tabular figures, and large numbers lack visual typographic hierarchy between the integer, decimal, and magnitude units (k/M/B).

## Solution
1. **`font-variant-numeric: tabular-nums`**: Prevents horizontal layout jitter on re-renders.
2. **Animated Interpolation**: Uses `motion/react` values with spring smoothing for count-up/count-down animations.
3. **Magnitude Hierarchy**: Encodes unit suffixes (k, M, B) with dedicated weights and optical sizing.

## Constraints
- Must specify `fontVariantNumeric: 'tabular-nums'` or CSS class `.tnum`.
- Animated numbers should honor `prefers-reduced-motion`.
