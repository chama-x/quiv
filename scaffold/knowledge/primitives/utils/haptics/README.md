---
name: haptics
status: PROVEN
version: "1.0"
used_in: 3
domain: shared
capability: haptics
tags: [vibration, mobile, feedback, a11y, haptics]
description: Intent-driven Vibration API wrapper mapping tactile feedback to user intent with reduced-motion compliance.
---

# Haptics Utility

## Status
[PROVEN] | v1.0 | Used in 3 projects

## Problem
Vibration on web apps is often applied haphazardly, vibrating uniformly for errors and successes, or causing discomfort for users sensitive to excessive stimulation.

## Solution
1. **Intent-Driven Cadence**:
   - `tap` (10ms): low-stakes tab switch, chip toggle
   - `light` (15ms): positive action (add to cart, increment)
   - `medium` (25ms): structural change (sheet open, expand)
   - `success` ([20, 40, 60]ms): order placed, task completed
   - `warning` (60ms): blocked action, validation error
   - `confirm` ([15, 40, 30]ms): submission queued
   - `release` (35ms): pull gesture trigger point
2. **Accessibility-First**: Automatically silences multi-pulse patterns when `prefers-reduced-motion: reduce` is enabled.
3. **Fail-Safe**: Silently no-ops in non-supporting browsers and when pages are backgrounded.

## Constraints
- Never fire haptics more than once within 100ms.
- Always pair haptics with visual animation in the same frame.
