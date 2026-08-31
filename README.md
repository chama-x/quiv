<p align="center">
  <img src="assets/hero.svg" alt="quiv — Your AI agents stop starting from scratch" width="100%">
</p>

<p align="center">
  <a href="https://github.com/chama-x/quiv/releases"><img src="https://img.shields.io/badge/version-v1.0.0-3b82f6?style=flat-square" alt="version"></a>
  <a href="https://github.com/chama-x/quiv/actions"><img src="https://img.shields.io/badge/build-passing-22c55e?style=flat-square" alt="CI"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="MIT"></a>
</p>

<p align="center">
  <strong>quiv</strong> — your AI agents stop starting from scratch.<br>
  Every solution you keep becomes a versioned, proven pattern<br>
  your agents retrieve instead of re-invent.
</p>

---

## Every project starts at zero

You know this loop:

```text
You:      "Add offline sync with conflict resolution."

Agent:    writes it from scratch.
          picks localStorage for the queue —
          the exact thing you proved broken two projects ago.

You:      an hour of debugging. You re-explain the outbox
          design. It works. You ship.

Next project: same prompt. Same agent. Same from scratch.
              It picks localStorage again.
```

Your agents don't remember anything. Not the solutions you shipped,
not the failures you paid for, not the reasons the code is shaped
the way it is. Every session resets to zero.

---

## The same prompt, with quiv

```text
You:      "Add offline sync with conflict resolution."

Agent:    quiv find "offline sync conflict resolution"
          quiv read features/offline-sync

          → the design that already worked
          → the constraint that shaped it
          → the approach that already failed, and why

          quiv use features/offline-sync --project my-project
          → 7 files. Dependencies resolved. Registry updated.

          writes only what no pattern covers.
```

Two commands replace the hour. And the architecture is the one you
already proved works — *because* it's the one you already proved works.

---

## It compounds

Project 1, you build the pattern and contribute it back.  
Project 2, your agent retrieves it in two commands.  
Project 5, it's versioned, proven, and better than the day you wrote it.

When a pattern improves, `quiv check` flags every project that
should pull the upgrade. Iteration propagates instead of evaporating.

> **Your codebase compounds. Your agents stop resetting.**

---

## What the agent retrieves

This is `quiv read features/offline-sync` — the 312 tokens your
agent ingests instead of 15,000 tokens of raw source:

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

The **Rejected** line is why your agent never picks localStorage.
It's the failure you already paid for, written down once, read forever.

When you contribute a pattern back, you record three lines —
constraint, rejected, evidence. That record is what your next agent
reads instead of guessing.

---

## Use it

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

To keep it: `bun install -g @quiv-knowledge/cli` — `quiv` and `qv` both work.  
No Bun handy? [Open a Codespace](https://codespaces.new/chama-x/quiv) with everything preloaded.

---

## The knowledge model

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

---

## Equip your agents

```bash
bunx quiv init --agents
```

Writes `AGENTS.md` plus rules for Claude Code, Cursor (`.cursor/rules/quiv.mdc`), and Copilot. From then
on, the agent's instinct is the loop: `find` the problem → `read` the pattern →
`use` the code — and write only what no pattern covers.

---

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

---

## Contributing

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

---

## Community

- [good-first-issues](https://github.com/chama-x/quiv/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) — the on-ramp.
- [Discord](https://discord.gg/quiv) — where patterns get argued into `PROVEN`.

---

## License

MIT — see [LICENSE](LICENSE).
