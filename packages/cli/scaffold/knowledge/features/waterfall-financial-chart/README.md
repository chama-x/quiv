---
name: waterfall-financial-chart
status: EXPERIMENTAL
version: "1.0"
used_in: 1
domain: finance
capability: visualization
tags: [finance, waterfall-chart, accounting, reconciliation, data-viz]
description: Step-down and step-up financial waterfall chart breaking gross inflows into intermediate deductions and retained net position.
---

# Waterfall Financial Chart

## Status
[EXPERIMENTAL] | v1.0 | Used in 1 project

## Problem
Standard bar charts fail to communicate financial attribution (how gross revenue steps down through variable expenses, fixed costs, and distributions into net retained earnings).

## Solution
1. **Cumulative Step Calculation**: Automatically computes floating start/end heights for deductions and final baseline bars.
2. **Tabular Numerals**: Formats money deltas and percentages with mono-spaced alignment.
3. **Interactive Step Inspect**: Emits step keys on press with haptic feedback.
