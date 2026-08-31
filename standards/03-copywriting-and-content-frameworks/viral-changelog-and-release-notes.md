# 📢 Viral Changelogs & Narrative Release Notes

> **How to engineer GitHub Releases and changelogs that developers actually read, tweet about, and share across technical communities.**

---

## 1. Why Git Commit Dumps Fail

Most open-source maintainers publish releases containing raw git commit logs:
```
v1.2.0 Release Notes:
- fix: typo in readme
- chore: update deps
- feat: add new parser flag
```
**Result**: 0 shares, 0 new stargazers, 0 excitement.

### The Narrative Release Philosophy
Every GitHub release is a mini product launch. High-growth projects (like Supabase, Tailwind, Biome, and Bun) treat release notes as **developer stories with visual demonstrations, architectural rationale, and community celebration**.

---

## 2. The 5-Part Viral Release Note Anatomy

```
┌────────────────────────────────────────────────────────┐
│ 1. THE BIG HOOK & HERO GIF                             │
│    (Highlight the flagship capability in 1 sentence)   │
├────────────────────────────────────────────────────────┤
│ 2. WHAT'S NEW & ARCHITECTURAL BREAKDOWN                │
│    (Code snippets, benchmarks, progressive details)    │
├────────────────────────────────────────────────────────┤
│ 3. BREAKING CHANGES & MIGRATION PATH                   │
│    (Clear, copy-pasteable before-and-after diffs)      │
├────────────────────────────────────────────────────────┤
│ 4. COMMUNITY & CONTRIBUTOR SHOUTOUTS                   │
│    (Avatars, PR links, public gratitude)              │
├────────────────────────────────────────────────────────┤
│ 5. WHAT'S COMING NEXT & STAR CTA                       │
│    (Roadmap teaser + star call-to-action)              │
└────────────────────────────────────────────────────────┘
```

---

## 3. Production Release Template (Markdown)

```markdown
# 🚀 quiv v1.2.0: Progressive Disclosure & 32x Token Compression

We're thrilled to release **quiv v1.2.0**! This release introduces multi-level progressive disclosure (`--level overview|full|implementation`), reducing agent prompt overhead by up to **32x**.

<p align="center">
  <img src="https://raw.githubusercontent.com/quiv-knowledge/quiv/main/assets/demo-v1.2.gif" alt="v1.2 Demo" width="90%">
</p>

## ✨ Highlights

### ⚡ 3-Tier Progressive Disclosure CLI
AI agents no longer need to consume full file contents when exploring options.
```bash
# Get a 200-token summary
quiv read features/offline-sync --level overview

# Pull full implementation only when ready to code
quiv read features/offline-sync --level implementation
```

### 📊 Token Reduction Benchmarks
| Mode | Old Prompt Cost | v1.2.0 Prompt Cost | Reduction |
| :--- | :--- | :--- | :--- |
| **Pattern Search** | 1,800 tokens | **140 tokens** | **12.8x** |
| **Pattern Read** | 8,200 tokens | **260 tokens** | **31.5x** |

---

## 👥 Community Contributions
Huge thanks to our amazing contributors who made this release possible:
- @developer1 for implementing the AST parser in [#42](https://github.com/quiv-knowledge/quiv/pull/42)
- @developer2 for improving Bun runtime startup latency in [#48](https://github.com/quiv-knowledge/quiv/pull/48)

---

## ⭐️ Star the Repo!
If you love this release, please [give us a star on GitHub](https://github.com/quiv-knowledge/quiv)!
```
