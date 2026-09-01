---
name: intent-install-prompt
status: VALIDATED
version: "1.0"
used_in: 2
domain: shared
capability: pwa
tags: [pwa, install-prompt, conversion, mobile]
description: Defers PWA install prompt until high-intent user signals are reached, with dismissal cooldown.
---

# Intent-Based Deferred Install Prompt

## Status
[VALIDATED] | v1.0 | Used in 2 projects

## Problem
Triggering the native PWA `beforeinstallprompt` on first page load results in high dismissal rates, annoys first-time visitors, and burns the one-time install prompt opportunity.

## Solution
1. Intercepts and holds the `beforeinstallprompt` event.
2. Evaluates user intent score (e.g. cart items >= 2, visits >= 3, or bookmark actions).
3. Surfaces a contextual banner only when intent threshold is satisfied.
4. Manages 30-day dismissal cooldown in local storage.

## Constraints
- Never prompt while the user is actively completing checkout or form input.
- Always respect standalone display mode.
