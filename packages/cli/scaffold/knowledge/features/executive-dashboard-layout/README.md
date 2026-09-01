---
name: executive-dashboard-layout
status: EXPERIMENTAL
version: "1.0"
used_in: 1
domain: shared
capability: dashboard
tags: [dashboard, executive-pulse, hero-card, kpi-grid, activity-feed]
description: Executive mobile-first ops cockpit assembling hero pulse cards, proportional stacked allocation bars, KPI grids, and live activity streams.
---

# Executive Dashboard Layout

## Status
[EXPERIMENTAL] | v1.0 | Used in 1 project

## Problem
Operations executive dashboards often suffer from information overload or desktop-bound layouts that don't communicate high-stakes daily health and priority blockers at a glance on mobile.

## Solution
1. **Hero Pulse Card**: Instant top-of-funnel daily throughput volume and pace bands.
2. **Stacked Allocation Bar**: Proportional breakdown of revenue/resource split.
3. **Stat Grid**: Modular 2-column KPI cards with change deltas.
4. **Attention & Feed**: Actionable anomaly queue followed by a real-time event log.

## Dependencies
- `motion/react`
- `compositions/apple-native-pwa-shell`
