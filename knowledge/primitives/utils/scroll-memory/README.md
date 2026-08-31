---
name: scroll-memory
status: PROVEN
version: "1.0"
used_in: 3
domain: shared
capability: navigation
tags: [scroll, spa, ios-native, navigation]
description: Map-based scroll restoration for SPA views with pre-paint useLayoutEffect position recovery.
---

# Scroll Memory

## Status
[PROVEN] | v1.0 | Used in 3 projects

## Problem
In single-page applications with simulated view navigation, navigating "back" resets the scroll to the top or causes visible scroll jumping when restored asynchronously.

## Solution
Continuously record `scrollTop` to a persistent Map during scroll events and restore the exact position synchronously via `useLayoutEffect` before browser paint.
