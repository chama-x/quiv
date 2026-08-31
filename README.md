<p align="center">
  <img src="assets/hero-visual.svg" alt="quiv — The Context Engine for AI Agents" width="100%">
</p>

<p align="center">
  <a href="https://github.com/chama-x/quiv/releases"><img src="https://img.shields.io/badge/version-0.1.0-3b82f6?style=flat-square" alt="Version"></a>
  <a href="https://github.com/chama-x/quiv/actions"><img src="https://img.shields.io/badge/build-passing-22c55e?style=flat-square" alt="Build Status"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.7+-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-22c55e?style=flat-square" alt="MIT License"></a>
</p>

# quiv

**Agents shouldn't have to read your whole codebase.**

Every feature you paste into a context window costs thousands of tokens of source. The architectural contract the agent actually needed was a few hundred.

`quiv` is a versioned registry of verified feature contracts — the compact form AI coding agents (Claude Code, Cursor, Copilot, Antigravity) ingest instead of raw code dumps.

> 🤖 **Machine Entry Point**: If you are an AI agent, index [`llms.txt`](llms.txt) for API specifications and [`knowledge/INDEX.md`](knowledge/INDEX.md) for the active pattern catalog.

---

<p align="center">
  <img src="assets/before-after.svg" alt="Without quiv vs With quiv" width="100%">
</p>

---

## Quickstart

Query the registry directly with Bun (no global install required):

```bash
bunx quiv find "offline sync"
```

```text
✔ Found 3 patterns (140 tokens | 11ms)
  • features/offline-sync           [PROVEN]    240 tok  — IndexedDB outbox with exponential backoff
  • primitives/use-offline-entity   [PROVEN]    110 tok  — Optimistic mutation React hook
  • domain/conflict-resolution      [VALIDATED] 180 tok  — Last-write-wins & vector clock rules
```

Inspect only the type contract and rules without implementation bloat:

```bash
bunx quiv read features/offline-sync --level overview
```

Scaffold the pattern into your target project:

```bash
bunx quiv use features/offline-sync --project my-app
```

---

## The Pattern Artifact (What Agents Ingest)

`quiv` patterns are not raw source dumps. They are structured contracts designed for minimal token ingestion and zero architectural drift:

```yaml
---
name: features/offline-sync
tier: features
status: PROVEN
tokens: 240
dependencies: [primitives/use-offline-entity, domain/conflict-resolution]
---

# Contract: Offline Sync Outbox
interface OfflineOutbox<T> {
  queueMutation(entity: string, payload: T): Promise<MutationResult>;
  syncPending(): Promise<SyncReport>;
  onConflict(strategy: 'last-write-wins' | 'merge-fn'): void;
}

# Rules
- Invariant: Mutations MUST persist in IndexedDB before returning to the UI thread.
- Invariant: Retries MUST apply jittered exponential backoff (base 500ms, cap 30s).
- Constraint: Never block the main render loop during bulk outbox flushes.
```

---

## The 5 Capability Tiers

Knowledge is organized into five progressive abstraction layers:

<p align="center">
  <img src="assets/tiers.svg" alt="5 Capability Tiers: Primitives, Domain, Features, Compositions, Templates" width="100%">
</p>

| Tier | Directory | Purpose | Typical Tokens | Example Patterns |
| :--- | :--- | :--- | :---: | :--- |
| **T1: Primitives** | `knowledge/primitives/` | Atomic building blocks, pure utilities, hooks | 100–300 | `useOfflineEntity`, `springVocabulary` |
| **T2: Domain** | `knowledge/domain/` | Business rules, calculations, schemas | 200–500 | Pricing calculators, tax models |
| **T3: Features** | `knowledge/features/` | Complete encapsulated feature slices | 300–800 | `offline-sync`, `executive-dashboard` |
| **T4: Compositions** | `knowledge/compositions/` | Blueprints assembling multiple tiers into app shells | 500–1,200 | `apple-native-pwa-shell`, `oled-glass-tokens` |
| **T5: Templates** | `knowledge/templates/` | Full-stack production starter scaffolds | Full repo | `nextjs-pwa`, `high-star-oss-repo` |

---

## Verifiable Benchmarks

Token counts measured with `tiktoken` (`cl100k_base` tokenizer) comparing raw multi-file feature implementations against `quiv` overview contracts:

| Task | Raw Source Loading | `quiv` Contract Read | Difference |
| :--- | :---: | :---: | :---: |
| **Search & Discovery** | 1,800 tokens (`grep` scans) | **140 tokens** | **92% less context** |
| **Architecture Contract Ingestion** | 8,200 tokens (all source files) | **240 tokens** | **97% less context** |
| **Scaffolding Latency** | Manual copy-paste | **< 14ms (local AST resolution)** | **Instant** |

---

## Agent Setup (`AGENTS.md` / Cursor Rules)

To configure coding agents in any project to automatically query `quiv` before writing domain logic:

```bash
bunx quiv init --agents
```

This generates:
- **`AGENTS.md`**: Top-level protocol instructions for coding agents.
- **`.cursor/rules/quiv.mdc`**: Cursor rule directing the agent to run `quiv find` before scaffolding code.

---

## Lore-lite Commit Standard

**Lore-lite** is a compact Git commit trailer convention that records architectural invariants and rejected alternatives directly in Git history — preserving reasoning across agent sessions:

```git
feat(offline-sync): add durable retry outbox

Implemented exponential backoff retry worker in IndexedDB.

Constraint: Must not block UI thread during heavy sync bursts
Rejected: LocalStorage queue | 5MB quota insufficient for attachments
Evidence: Tested 1,000 mutations, 100% synced on reconnect
```

---

## Contributing

Contributions, bug reports, and pattern submissions are welcome.

- Read [`CONTRIBUTING.md`](CONTRIBUTING.md) for pattern authoring guidelines and local development workflows.
- Join discussions and share patterns on our [Discord](https://discord.gg/quiv).

---

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for details.
