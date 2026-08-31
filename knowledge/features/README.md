# Features Tier (`features/`)

## Purpose
Complete, end-to-end reusable features that combine primitives and domain rules into ready-to-use functional capabilities.

## Examples
- `offline-sync/` — End-to-end IndexedDB caching, background queue, conflict resolver, online/offline status bar
- `inventory-dashboard/` — Stock level charts, threshold alerts, filterable inventory table
- `navigation/` — Responsive collapsible sidebar, breadcrumbs, search shortcut palette
- `form-validation/` — Dynamic schema-driven forms with real-time feedback

## Standard Structure for Features
```
features/<feature-name>/
├── README.md              ← What this feature provides and how to use it
├── implementation/        ← Source code
├── tests/                 ← Automated test suites
└── examples/              ← Integration examples
```
