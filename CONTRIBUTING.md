# Contributing to `quiv`

Thank you for your interest in contributing to **quiv**! We welcome all contributions: new architecture patterns, CLI performance optimizations, documentation improvements, and bug fixes.

---

## 🛠️ Development Setup

quiv is structured as a Bun/TypeScript monorepo.

```bash
# 1. Clone the repository
git clone https://github.com/quiv-knowledge/quiv.git
cd quiv

# 2. Install dependencies
bun install

# 3. Build CLI package
bun run build

# 4. Run tests and typecheck
bun test
bun run typecheck
```

---

## 🏛️ Adding or Updating Patterns

Patterns reside in `knowledge/` under the 5 Capability Tiers:
- `knowledge/primitives/`
- `knowledge/domain/`
- `knowledge/features/`
- `knowledge/compositions/`
- `knowledge/templates/`

### Pattern Requirements
1. Every pattern directory **must contain a `README.md`** with standard YAML frontmatter:
   ```yaml
   ---
   name: pattern-name
   status: EXPERIMENTAL | VALIDATED | PROVEN
   version: "1.0"
   tags: [tag1, tag2]
   depends_on: []
   description: 1-sentence summary of what this pattern provides
   ---
   ```
2. After adding or modifying patterns, update the index:
   ```bash
   bun run update-index
   ```

---

## 📋 Lore-lite Commit Standard

Every commit that introduces or modifies reusable architecture patterns must include Lore-lite trailers:

```git
feat(scope): short summary

Detailed explanation of the change.

Constraint: Invariant that must not be broken
Rejected: Alternative evaluated | Why it was rejected
Evidence: Empirical test data or benchmarks
```

---

## ⭐️ Stargazers & Community

If you find `quiv` helpful, please [⭐ star the repo on GitHub](https://github.com/quiv-knowledge/quiv)!
