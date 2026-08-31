# 🖼️ GitHub Social Preview (OpenGraph) Engineering (1280×640)

> **How to engineer high-CTR GitHub Social Preview cards and OpenGraph images that stand out in developer timelines (X/Twitter, Reddit, Discord, LinkedIn) and maximize incoming referral traffic.**

---

## 1. The Critical Role of the Social Preview Card

When someone shares a GitHub link on Twitter, LinkedIn, Reddit, or Discord, the **1280×640 Social Preview card occupies over 60% of the screen real estate**.

- Repositories with standard default GitHub banners have a link CTR of **1.8% – 3.2%**.
- Repositories with custom engineered, high-contrast, benefit-oriented Social Preview cards achieve a CTR of **8.5% – 14.2%**.

A $3\times$ increase in CTR translates directly into $3\times$ more visitors landing on your README, multiplying organic star velocity.

---

## 2. Canvas Specifications & Safe Zones

- **Dimensions**: Exactly `1280px × 640px` (2:1 aspect ratio).
- **Format**: High-quality PNG or WebP (< 1MB).
- **Safe Zone Margin**: Keep all critical text and logos at least `80px` away from the edges to avoid clipping in Discord embeds and mobile cards.

```
┌────────────────────────────────────────────────────────────────────────┐
│  [80px Margin]                                            [80px Margin]│
│                                                                        │
│   🗂️  quiv                                       [ TypeScript / Bun ]  │
│                                                                        │
│   The Agent Knowledge Kit & Architecture System                        │
│   -------------------------------------------------                    │
│   10–32x Token-Efficient Pattern Discovery for AI Coding Agents        │
│                                                                        │
│   ┌──────────────────────────────────────────────────────────────┐     │
│   │ $ bunx quiv find "offline sync"  → Resolved in 12ms (240 tok)│     │
│   └──────────────────────────────────────────────────────────────┘     │
│                                                                        │
│   [ Claude Code ]   [ Cursor ]   [ Antigravity ]   [ Copilot ]         │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. The 5 Visual Elements of a High-CTR Preview Card

1. **Brand Icon & Clean Typography**: Bold, modern sans-serif or monospace font (Inter, JetBrains Mono, or Geist Sans).
2. **Quantified Value Hook**: Highlight the biggest differentiator (e.g. `10–32x Token Reduction` or `Sub-10ms CLI`).
3. **Realistic UI / Terminal Snippet**: A small dark terminal window showing an intuitive command and output.
4. **Target Ecosystem Logos**: Small, elegant monochrome badges of supported systems (Claude, Cursor, Antigravity, Bun, TypeScript).
5. **Background Visual Texture**: Subtle dark mesh gradient, isometric grid, or glow accent (avoid busy or distracting illustrations).

---

## 4. How to Set Up in GitHub

1. Navigate to your repository on GitHub.
2. Go to **Settings** $\rightarrow$ **General**.
3. Scroll to **Social preview**.
4. Click **Edit** $\rightarrow$ **Upload an image**.
5. Upload your `1280x640.png` file.
6. Verify link preview rendering using the [Twitter Card Validator / Opengraph.xyz](https://www.opengraph.xyz).
