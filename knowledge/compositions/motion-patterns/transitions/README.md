---
name: page-transitions
status: PROVEN
version: "1.0"
used_in: 3
domain: shared
capability: motion
tags: [transitions, push-pop, navigation, spa, interaction-lock]
description: Apple-native push/pop page transitions with parallel AnimatePresence and exiting-screen interaction locks.
---

# Page Transitions & Screen Interaction Lock

## Status
[PROVEN] | v1.0 | Used in 3 projects

## Problem
1. Sequential transitions (`mode="wait"`) create a visible dead gap between screen changes.
2. Layout popping (`mode="popLayout"`) causes layout shifts and scroll jumps.
3. Crossfading views destroys spatial continuity.
4. In parallel transitions (`mode="sync"`), outgoing screens remain interactive, allowing touches and scroll bleed during transition.

## Solution
1. **Parallel Push/Pop**: Arriving screen slides `x: 100% -> 0%`; outgoing screen parallaxes `x: 0% -> -30%` with `opacity: 1` constant.
2. **Per-Screen Scrollers**: Each view is `absolute inset-0 overflow-y-auto`; root body overflow is locked.
3. **Exiting Screen Lock**: Apply `inert` + `touch-action: none` + `pointer-events: none` on exit start.
