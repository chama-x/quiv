---
name: motion-patterns
status: PROVEN
version: "1.0"
used_in: 3
domain: shared
capability: motion
tags: [motion, animation, springs, framer-motion, transitions, gestures]
description: Comprehensive Apple HIG-verified motion system for Motion.dev and Framer Motion.
---

# Motion Patterns

## Status
[PROVEN] | v1.0 | Used in 3 projects

## Problem
Web animations frequently feel mechanical or sluggish due to inaccurate physics, incorrect transition modes (`mode="wait"` or `popLayout`), and lack of exiting-screen interaction locks.

## Solution
A complete motion framework covering:
- **Springs (`springs/`)**: 12 Apple HIG verified spring presets mathematically matching UIKit/SwiftUI.
- **Transitions (`transitions/`)**: Synchronous parallel push/pop variants with zero crossfade and exiting-screen interaction locks.
- **Gestures (`micro-interactions/`)**: Left-edge swipe-back and active-scroller pull-to-refresh.
- **Feedback (`feedback/`)**: Button compression and celebration pop animations.
- **Loading (`loading/`)**: Damped progress springs and content-aware skeleton pulses.

## Dependencies
- `motion` or `framer-motion` (^11.0.0 or ^12.0.0 or ^13.0.0)
