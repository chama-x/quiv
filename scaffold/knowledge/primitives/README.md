# Primitives Tier (`primitives/`)

## Purpose
Pure, foundational building blocks. Primitives contain headless UI wrappers, custom React hooks, and pure utility functions.

## Subdirectories
- `ui/` — Headless components (wrapping Radix UI, Base UI, or Tailwind primitives)
- `hooks/` — Custom React/framework hooks (`useOfflineEntity`, `useSyncQueue`, `usePatternValidation`)
- `utils/` — Pure algorithmic utilities (`conflictResolution`, `auditLogger`, `formatters`)

## Rules
- Primitives must be stateless or self-contained.
- Primitives must NOT contain business/domain logic.
- Must have comprehensive unit tests.
