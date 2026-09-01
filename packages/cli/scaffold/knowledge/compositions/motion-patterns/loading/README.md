---
name: loading-motion
status: VALIDATED
version: "1.0"
used_in: 2
domain: shared
capability: motion
tags: [loading, progress-bar, skeleton, shimmer]
description: Loading state animations including catch-up progress bars and skeleton shimmer pulses.
---

# Loading Motion Patterns

## Status
[VALIDATED] | v1.0 | Used in 2 projects

## Problem
Snappy progress bars can feel jarring when updating values, while abrupt spinners create cognitive stress.

## Solution
Use a deliberately slower, damped progress spring (`stiffness: 160, damping: 24`) that produces a gentle catch-up overshoot.
