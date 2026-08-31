# Engineering Conventions & Agent Standards

## 1. Status Marker Lifecycle
- **`EXPERIMENTAL`**: New pattern, unproven in production (< 1 deployment).
- **`VALIDATED`**: Proven in 1–2 production projects with real user traffic.
- **`PROVEN`**: Battle-tested across 3+ production deployments without breaking issues.
- **`DEPRECATED`**: Superceded by newer pattern.

## 2. Commit Format (Lore-lite)
Every change to reusable patterns must document constraints and trade-offs:
```
<type>(<scope>): <short summary>

<detailed rationale>

Constraint: <what invariant must be preserved>
Rejected: <alternative considered> | <why it was rejected>
Evidence: <empirical validation / deployment details>
```

## 3. Token Efficiency Invariant
- Every CLI tool output must minimize formatting fluff and avoid printing unnecessary file contents.
- Keep `list` under 800 tokens.
- Keep `status` under 100 tokens.
- Keep `find` under 500 tokens.
