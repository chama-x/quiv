---
name: useOfflineEntity
status: PROVEN
version: "1.0"
used_in: 5
domain: shared
capability: offline-sync
tags: [react, hooks, offline, indexeddb]
description: React hook for CRUD operations with automatic optimistic updates, IndexedDB cache, and background sync queue.
---

# useOfflineEntity

## Status
[PROVEN] | v1.0 | Used in 5 projects

## Problem
Web applications running in intermittent or offline environments need seamless local data access with immediate UI updates, queuing mutations until connectivity is restored.

## Solution
`useOfflineEntity` provides reactive CRUD bindings against local IndexedDB storage with an integrated outbox queue that synchronizes changes with backend APIs upon reconnection.

## Implementation
- See `useOfflineEntity.ts` for full implementation

## Constraints
- Must not block main thread with synchronous serialization
- Mutations must be idempotent

## Provenance
- First extracted from enterprise mobile inventory PWA
