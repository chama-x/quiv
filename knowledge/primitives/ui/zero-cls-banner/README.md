---
name: zero-cls-banner
status: PROVEN
version: "1.0"
used_in: 2
domain: shared
capability: ui
tags: [banner, cls, scroll-compensation, pwa]
description: Dynamic sticky banner using pre-paint scroll compensation to guarantee zero Cumulative Layout Shift (CLS).
---

# Zero-CLS Banner

## Status
[PROVEN] | v1.0 | Used in 2 projects

## Problem
Dynamic notification banners (e.g. offline status, promo banners) inserted at the top of a page cause jarring visual content jumps (Cumulative Layout Shift) when mounting while the user is scrolled.

## Solution
1. Combines a fixed full-width visual banner with an animated in-flow spacer of identical height.
2. Uses `useLayoutEffect` before paint to adjust `window.scrollBy(0, bannerHeight)` when mounting, ensuring content under the viewport does not shift.
