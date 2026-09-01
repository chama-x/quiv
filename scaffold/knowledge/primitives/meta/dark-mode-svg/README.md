---
name: dark-mode-svg
status: PROVEN
version: "1.0"
domain: meta
capability: visual-assets
tags: [svg, dark-mode, github-readme, theme-switching, visual-design]
depends_on: []
description: GitHub-native dark/light mode responsive SVG banner and picture element wrappers.
---

# `dark-mode-svg`

> **Automatic dark/light theme switching for GitHub README headers and SVG banners.**

## Problem
Over 84% of developers browse GitHub in dark mode. Serving white-background images blinds dark mode users, while pure dark images look broken for light mode users.

## Solution
Leverage GitHub markdown theme fragment identifiers (`#gh-dark-mode-only` and `#gh-light-mode-only`) or HTML `<picture>` elements to serve theme-matched SVGs.

## Implementation

```markdown
<p align="center">
  <a href="https://github.com/{{ORG}}/{{REPO}}">
    <img src="assets/banner-dark.svg#gh-dark-mode-only" alt="{{PROJECT_NAME}} Banner" width="100%">
    <img src="assets/banner-light.svg#gh-light-mode-only" alt="{{PROJECT_NAME}} Banner" width="100%">
  </a>
</p>
```

## Constraints
- Both SVGs must maintain the exact same dimensions (e.g. 1200×340).
- Keep file size under 15KB per SVG by using system fonts and SVG vector primitives rather than embedded raster base64 images.
