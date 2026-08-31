<p align="center">
  <img src="assets/hero.svg" alt="quiv wordmark beside a pattern card showing its Constraint, Rejected, and Evidence lines" width="100%">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@quiv-knowledge/quiv"><img src="https://img.shields.io/npm/v/@quiv-knowledge/quiv?style=flat-square" alt="npm version"></a>
  <a href="https://github.com/chama-x/quiv/actions"><img src="https://img.shields.io/badge/build-passing-22c55e?style=flat-square" alt="CI"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="MIT"></a>
</p>

<p align="center">
  <strong>quiv</strong> — a knowledge system for AI coding agents.<br>
  Every pattern ships with its constraints, rejected alternatives, and evidence:<br>
  versioned, tiered, and tracked across projects.
</p>

---

## The problem

> The why never travels with the code.

When an agent reads your source, it learns what the code does — not why it's shaped that way.

The constraint that dictated the design isn't in the files. The approach somebody
tried and rejected isn't in the files. The test that set the batch size isn't in
the files.

So the agent guesses. Sometimes it guesses the thing you already proved wrong.

That knowledge exists — in commit logs, in chat threads, in one person's head.
It just never travels with the code.

## A pattern

> Code, plus the record of how it earned its shape.

A real one, read at overview level:

```bash
$ bunx quiv read features/offline-sync --level overview
```

```text
offline-sync                                  VALIDATED  v1.2.0  312t

Problem     keep entities editable offline, without conflicts
Solution    durable outbox + backoff retry worker in IndexedDB

Constraint  must not block the UI thread during sync bursts
Rejected    localStorage queue — 5MB quota fails with attachments
Evidence    1,000 offline mutations, 100% synced on reconnect

Deps        hooks/useOfflineEntity · utils/conflictResolution
Files       7
Deeper      quiv read offline-sync --level full
```

312 tokens, self-reported. The code, the constraint, the failure somebody
already paid for, the proof it works.

Those three lines — **Constraint · Rejected · Evidence** — are **Lore-lite**,
quiv's record standard. They're captured when a pattern is contributed, and
they ride with it through every version.

## Use it

> Discovery to running code in four commands.

Bun required — 30 seconds if you don't have it:

```bash
curl -fsSL https://bun.sh/install | bash
```

Then, from anywhere:

```bash
$ bunx quiv list --tier features
```

```text
features (12)                                        204t

offline-sync       VALIDATED     offline edit + conflict resolution
audit-log          PROVEN        append-only event trail
image-pipeline     EXPERIMENTAL  srcset + cache headers
...
```

```bash
$ bunx quiv find "conflict resolution"
```

```text
features/offline-sync         0.92
utils/conflictResolution      0.71
hooks/useOfflineEntity        0.44
```

```bash
$ bunx quiv use features/offline-sync --project my-project
```

```text
✓ resolved   utils/conflictResolution, hooks/useOfflineEntity
✓ wrote      7 files → my-project/src/features/offline-sync/
✓ registry   my-project tracks offline-sync v1.2.0      184t
```

To keep it: `bun install -g @quiv-knowledge/quiv` — `quiv` and `qv` both work.
No Bun handy? [Open a Codespace](https://codespaces.new/chama-x/quiv)
with everything preloaded.

## The knowledge model

> Knowledge composes. Confidence is earned.

<p align="center">
  <img src="assets/tiers.svg" alt="quiv's five tiers, composing left to right: primitives, domain, features, compositions, templates" width="100%">
</p>

| Tier | Holds | Example |
| :--- | :--- | :--- |
| `primitives` | building blocks | `hooks/useOfflineEntity` |
| `domain` | business rules | `erp/inventory-allocation` |
| `features` | turnkey capabilities | `offline-sync` |
| `compositions` | assembly guidelines | `pwa-apple` |
| `templates` | project scaffolds | `nextjs-pwa` |

`use` pulls the dependency tree with it — a feature arrives standing on the
hooks and utils it actually needs.

Every pattern carries a status it has earned:

`EXPERIMENTAL → VALIDATED → PROVEN`

Status isn't a version. A version says the code changed. Status says the
approach survived.

A registry remembers which projects consume which patterns, at which versions.
When a pattern moves, `quiv check` tells you exactly where the drift is.

## Equip your agents

> Teach the loop before the code.

```bash
bunx quiv init --agents
```

Writes `AGENTS.md` plus rules for Claude Code, Cursor (`.cursor/rules/quiv.mdc`), and Copilot. From then
on, the agent's instinct is the loop: `find` the problem → `read` the pattern →
`use` the code — and write only what no pattern covers.

## Command reference

| Command | Does | Output budget |
| :--- | :--- | :--- |
| `quiv list` | Patterns by tier, domain, or capability | ≤ 800t |
| `quiv find "<query>"` | Search by problem description | ~ 500t |
| `quiv read <pattern>` | Read at `--level overview\|full\|implementation` | 300–3,000t |
| `quiv use <pattern> --project <dir>` | Resolve deps, write files, update registry | ~ 200t |
| `quiv check --project <dir>` | Flag outdated pattern versions in use | ~ 300t |
| `quiv status` | Inventory health check | ~ 100t |
| `quiv contribute` | Branch, Lore-lite commit, PR | — |
| `quiv init` | Bootstrap the knowledge repos | — |

Budgets are design targets, not marketing: every command prints its actual
token count. Run one and check it.

## Contributing

> Rationale is the contribution.

`quiv contribute` opens the branch, formats the commit, and files the PR.
The standard is three trailers:

```git
feat(offline-sync): add durable retry outbox

Durable outbox queue with exponential-backoff retry worker in IndexedDB.

Constraint: must not block the UI thread during heavy sync bursts
Rejected: localStorage queue | 5MB quota was insufficient for attachments
Evidence: tested with 1,000 offline mutations, 100% synced on reconnect
```

That's the whole format. It's what stops the next agent from re-litigating a
settled decision.

## Community

[good-first-issues](https://github.com/chama-x/quiv/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) — the on-ramp.
[Discord](https://discord.gg/quiv) — where patterns get argued into `PROVEN`.

## License

MIT — see [LICENSE](LICENSE).
