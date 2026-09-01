# Compositions Tier (`compositions/`)

## Purpose
HOW to assemble primitives and features for specific application types, form factors, and design paradigms.

## Subdirectories
- `pwa-apple/` — iOS/iPadOS Human Interface Guidelines assembly: safe area insets, haptic feedback, status bar styles, standalone PWA manifest
- `dashboard/` — Multi-column analytics layouts, responsive card grids, KPI blocks
- `forms-heavy/` — Multi-step wizards, sticky action bars, keyboard-first navigation

## Standard Structure
```
compositions/<composition-name>/
├── README.md              ← Assembly guidance and UX principles
├── requires.md            ← Required primitives and features
├── styling/               ← Tailored CSS / Tailwind rules
└── layout-patterns/       ← Shell and page layout components
```
