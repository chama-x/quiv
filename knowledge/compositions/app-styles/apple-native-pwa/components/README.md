---
name: storefront-shell
status: VALIDATED
version: "1.0"
used_in: 2
domain: shared
capability: pwa-styling
tags: [shell, layout, pwa, navigation]
description: Apple-native PWA storefront layout shell with parallel transitions, per-screen scrollers, and bottom tab navigation.
---

# Storefront Shell Component

## Status
[VALIDATED] | v1.0 | Used in 2 projects

## Assembly Guidelines
1. **Root Layout**: Ensure body has `overflow: hidden` and `overscroll-behavior-y: none`.
2. **Screen Navigation**: Use `<AnimatePresence mode="sync">` with `pushVariants` and `popVariants`.
3. **Screen Container**: Every screen root must be `absolute inset-0 overflow-y-auto overscroll-contain`.
4. **Interaction Lock**: Apply `getScreenInteractionLock` to exiting screen views.
5. **Scroll Memory**: Restore scrollTop before paint with `restoreScrollPosition`.
