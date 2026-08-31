# 🎨 GitHub Social Preview & OpenGraph Design Specification (1280×640)

> **Design blueprint for creating viral 1280×640 Social Preview cards for Figma / Photoshop / Canva.**

---

## 1. Canvas Settings
- **Width**: `1280px`
- **Height**: `640px`
- **Resolution**: `72 DPI` (Web) / `144 DPI` (Retina @2x: 2560×1280 scaled down)
- **Format**: PNG or WebP with crisp color reproduction (< 1MB).

---

## 2. Color Palette (Dark Theme Native)

| Element | Hex Color | Role |
| :--- | :--- | :--- |
| **Canvas Background** | `#0D1117` | GitHub native dark canvas |
| **Surface Card / Terminal** | `#161B22` | Raised terminal surface |
| **Card Border** | `#30363D` | 1px subtle crisp border |
| **Primary Text / Heading** | `#F0F6FC` | High-contrast white |
| **Secondary / Subtitle** | `#8B949E` | Muted subtitle text |
| **Primary Accent (Brand)** | `#3B82F6` | Electric Blue / Cyan gradient |
| **Success Accent (Output)**| `#22C55E` | Emerald green for terminal success |

---

## 3. Layer Breakdown (Top to Bottom)

1. **Brand Layer (Top Left)**:
   - Icon / Logo: 48×48px icon
   - Project Name: `quiv` (Font: Geist Sans / Inter Bold, 42pt, `#F0F6FC`)
   - Category Badge: `Agent Knowledge Kit & CLI` (`#3B82F6`, rounded badge)

2. **Headline / Value Proposition (Middle Left)**:
   - Primary Hook: `10–32x Token-Efficient Architecture System` (Font: Inter SemiBold, 28pt)
   - Target Ecosystem: `For Claude Code, Cursor, Antigravity & Copilot` (Font: Inter Regular, 18pt, `#8B949E`)

3. **Terminal Preview Window (Right / Center)**:
   - Window frame with 3 macOS traffic light buttons (Red, Yellow, Green).
   - Monospace font (`JetBrains Mono`, 15pt):
     ```bash
     $ bunx quiv find "offline sync"
     ✔ Found 3 patterns [240 tokens | 12ms]
     ✔ Saved 7,560 context tokens
     ```

4. **Ecosystem Logos (Bottom Row)**:
   - Monochrome partner/runtime badges: `Bun`, `TypeScript`, `Claude`, `Cursor`, `MIT License`.
