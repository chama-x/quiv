---
name: feedback-motion
status: PROVEN
version: "1.0"
used_in: 3
domain: shared
capability: motion
tags: [feedback, button-press, celebration, haptics]
description: Tactile feedback animations including button compression and completion celebrations.
---

# Feedback Motion Patterns

## Status
[PROVEN] | v1.0 | Used in 3 projects

## Problem
Buttons and action triggers feel unresponsive or floaty when visual feedback is delayed or disconnected from touch events.

## Solution
Pair whileTap compression (`scale: 0.96`) using `buttonSpring` with intentional haptic pulses in the same event frame.
