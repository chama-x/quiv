---
name: pwa-apple
status: PROVEN
version: "1.0"
used_in: 3
domain: shared
capability: mobile-pwa
depends_on:
  - features/offline-sync
tags: [apple, ios, pwa, mobile, styling]
description: Apple iOS/iPadOS HIG-compliant styling, standalone viewport safe areas, haptics, and fluid navigation.
---

# pwa-apple

## Status
[PROVEN] | v1.0 | Used in 3 projects

## Problem
PWAs installed to iOS home screen often feel like generic web pages rather than native iOS applications due to unhandled safe area insets, missing active press feedback, and lack of smooth momentum scrolling.

## Solution
Comprehensive iOS composition including `viewport-fit=cover` tokens, `env(safe-area-inset-*)` utilities, native-like spring transitions, and WebKit touch manipulation configurations.
