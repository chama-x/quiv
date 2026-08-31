---
name: spring-vocabulary
status: EXPERIMENTAL
version: "1.0"
used_in: 1
domain: shared
capability: motion
tags: [motion, springs, physics, animation, apple-hig, motion-12]
description: Centralized 5-spring physics vocabulary for Motion 12 and React 19 providing tactile, interruptible animations.
---

# Spring Physics Vocabulary

## Status
[EXPERIMENTAL] | v1.0 | Used in 1 project

## Problem
Scattered animation curves across components result in visual inconsistency and unnatural UI movement. CSS easings feel robotic and lack physical weight or interruptibility.

## Solution
Centralizes a 5-tier spring physics system parameterized with modern Motion 12 `bounce` and `duration` curves:

1. **`SETTLE`**: House spring for screens, cards, and modal geometry (gentle overshoot).
2. **`MECH`**: Heavier, crisper spring for structural registration and tabs.
3. **`LOCK`**: Dead-stop alignment snap (zero bounce).
4. **`POP`**: Springy entry from zero (~38% bounce).
5. **`DRAW`**: Slow, mass-like motion for path extrusion and indicators.
6. **`TINT`**: Deceleration ease curve reserved strictly for color/opacity ramps.

## Constraints
- Never use spring physics for color/opacity fades; always use `TINT` deceleration.
- All spring animations must remain interruptible.
