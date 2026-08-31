---
name: conflictResolution
status: PROVEN
version: "1.0"
used_in: 4
domain: shared
capability: offline-sync
tags: [offline, conflict, lww, crdt]
description: Pure conflict resolution algorithms including Last-Write-Wins (LWW) and 3-way field-level merges.
---

# conflictResolution

## Status
[PROVEN] | v1.0 | Used in 4 projects

## Problem
Concurrent offline edits lead to state diverging between clients and server.

## Solution
Deterministic field-level 3-way merge algorithm with timestamp-based LWW fallback and conflict audit trail.
