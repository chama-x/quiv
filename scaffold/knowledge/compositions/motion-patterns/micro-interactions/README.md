---
name: micro-interactions
status: PROVEN
version: "1.0"
used_in: 3
domain: shared
capability: gestures
tags: [gestures, swipe-back, pull-to-refresh, touch]
description: Touch micro-interactions including left-edge swipe-back and scroller-aware pull-to-refresh.
---

# Micro-Interactions

## Status
[PROVEN] | v1.0 | Used in 3 projects

## Problem
Web applications often struggle with responsive gesture recognition when touch listeners trigger unnecessary component re-renders during active drag operations.

## Solution
1. **Edge Swipe Back**: 22px hotzone boundary using `interactiveSpring` physics.
2. **Pull To Refresh**: Reads from per-screen `activeScroller` and mirrors arming state to stable refs to avoid listener thrashing.
