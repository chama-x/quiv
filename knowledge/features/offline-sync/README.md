---
name: offline-sync
status: PROVEN
version: "2.0"
used_in: 6
domain: shared
capability: offline-sync
depends_on:
  - primitives/hooks/useOfflineEntity
  - primitives/utils/conflictResolution
tags: [offline, pwa, synchronization, background-sync]
description: Full offline synchronization engine with durable outbox queue, exponential backoff, and toast notifications.
---

# offline-sync

## Status
[PROVEN] | v2.0 | Used in 6 projects

## Problem
Complex enterprise applications need a turnkey offline synchronization engine that persists mutations across browser restarts, retries with backoff, and resolves conflicts transparently.

## Solution
An end-to-end sync engine built on top of IndexedDB and Web Workers, providing background synchronization, retry queues, and reactive UI state indicators.

## Implementation
- `implementation/offlineSyncEngine.ts` — Core sync manager

## Dependencies
- `primitives/hooks/useOfflineEntity`
- `primitives/utils/conflictResolution`
