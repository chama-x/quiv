---
name: ios-tab-bar-choreography
status: EXPERIMENTAL
version: "1.0"
used_in: 1
domain: pwa
capability: navigation
tags: [navigation, tab-bar, bottom-bar, svg-animation, spring-physics]
description: Tactile bottom navigation tab bar with choreographed multi-element SVG icon animations, spring physics, and shared layoutId glow.
---

# iOS Tab Bar Choreography

## Status
[EXPERIMENTAL] | v1.0 | Used in 1 project

## Problem
Standard bottom navigation bars use static icons that swap color or trigger abrupt transitions, lacking tactile response and delightful choreography on selection.

## Solution
1. **Shared Spring Material**: All SVG sub-elements share a centralized spring vocabulary (`SETTLE`, `MECH`, `LOCK`, `POP`, `DRAW`).
2. **Layout Glow**: Uses `motion.span layoutId="tabglow"` to slide an active highlight pill smoothly behind tabs.
3. **Safe-Area Clamping**: Automatically adds `paddingBottom: env(safe-area-inset-bottom)` for borderless home-indicator clearance.

## Dependencies
- `motion/react`
