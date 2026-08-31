# Domain Tier (`domain/`)

## Purpose
Core business knowledge, enterprise business rules, entity models, and domain calculations.

## Subdirectories
- `erp/`
  - `inventory/` — Reorder policies, valuation logic (FIFO/LIFO/Average Cost), stock constraints
  - `accounting/` — Double-entry bookkeeping rules, ledger schemas, reconciliation formulas
  - `hr/` — Leave management, shifts, payroll calculation rules
- `shared/`
  - `multi-tenant/` — Tenant isolation boundaries and schemas
  - `offline-first/` — Business conflict policy decisions (last-write-wins vs field-level merges)

## Rules
- Domain code is UI-agnostic.
- Contains business definitions, validation schemas, and mathematical calculations.
