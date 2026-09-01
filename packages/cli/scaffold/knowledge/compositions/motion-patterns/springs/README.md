---
name: apple-hig-springs
status: PROVEN
version: "1.0"
used_in: 3
domain: shared
capability: motion
tags: [motion, springs, apple, hig, physics]
description: Apple HIG-verified spring physics parameters for Motion.dev and Framer Motion.
---

# Apple HIG Springs

## Status
[PROVEN] | v1.0 | Used in 3 projects

## Problem
Generic CSS transitions and uniform spring configurations produce mechanical, unnatural UI animations that lack the physical weight and spatial consistency of native iOS apps.

## Solution
A complete library of 12 interaction-specific spring presets mathematically converted from Apple UIKit and SwiftUI specifications (WWDC 2023/2024):
- `appleSpring` / `navSpring`: { k: 322, d: 29, m: 1 } (iOS navigation push)
- `interactiveSpring`: { k: 1755, d: 72, m: 1 } (SwiftUI .interactiveSpring for drag tracking)
- `sheetSpring`: { k: 500, d: 38, m: 0.9 } (magnetic sheet snap)
- `buttonSpring`: { k: 600, d: 28, m: 0.6 } (tap compression)
- `collapseSpring`, `tabIndicatorSpring`, `progressBarSpring`, `toastSpring`, `heroParallaxSpring`

## Constraints
- Never use a single spring preset for all UI elements. Navigation requires weight; interactive drag requires instant zero-overshoot tracking.
- Do not add crossfades during push/pop animations.
