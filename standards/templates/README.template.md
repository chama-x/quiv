<p align="center">
  <img src="assets/hero.svg" alt="{{PROJECT_NAME}} — Your AI agents stop starting from scratch" width="100%">
</p>

<p align="center">
  <a href="https://github.com/{{ORG}}/{{REPO}}/releases"><img src="https://img.shields.io/badge/version-v1.0.0-3b82f6?style=flat-square" alt="version"></a>
  <a href="https://github.com/{{ORG}}/{{REPO}}/actions"><img src="https://img.shields.io/badge/build-passing-22c55e?style=flat-square" alt="CI"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="MIT"></a>
</p>

<p align="center">
  <strong>{{PROJECT_NAME}}</strong> — your AI agents stop starting from scratch.<br>
  Every solution you keep becomes a versioned, proven pattern<br>
  your agents retrieve instead of re-invent.
</p>

---

## Every project starts at zero

You know this loop:

```text
You:      "Add {{FEATURE_NAME}}."

Agent:    writes it from scratch.
          picks {{FAILED_ALTERNATIVE}} for the queue —
          the exact thing you proved broken two projects ago.

You:      an hour of debugging. You re-explain the outbox
          design. It works. You ship.

Next project: same prompt. Same agent. Same from scratch.
              It picks {{FAILED_ALTERNATIVE}} again.
```

Your agents don't remember anything. Not the solutions you shipped,
not the failures you paid for, not the reasons the code is shaped
the way it is. Every session resets to zero.

---

## The same prompt, with {{PROJECT_NAME}}

```text
You:      "Add {{FEATURE_NAME}}."

Agent:    {{CLI_NAME}} find "{{FEATURE_SEARCH}}"
          {{CLI_NAME}} read {{SAMPLE_PATTERN}}

          → the design that already worked
          → the constraint that shaped it
          → the approach that already failed, and why

          {{CLI_NAME}} use {{SAMPLE_PATTERN}} --project my-project
          → dependencies resolved. Registry updated.

          writes only what no pattern covers.
```

Two commands replace the hour. And the architecture is the one you
already proved works — *because* it's the one you already proved works.

---

## It compounds

Project 1, you build the pattern and contribute it back.  
Project 2, your agent retrieves it in two commands.  
Project 5, it's versioned, proven, and better than the day you wrote it.

When a pattern improves, `{{CLI_NAME}} check` flags every project that
should pull the upgrade. Iteration propagates instead of evaporating.

> **Your codebase compounds. Your agents stop resetting.**

---

## What the agent retrieves

```text
{{SAMPLE_PATTERN}}                                  VALIDATED  v1.2.0  312t

Problem     keep entities editable offline, without conflicts
Solution    durable outbox + backoff retry worker in IndexedDB

Constraint  must not block the UI thread during sync bursts
Rejected    localStorage queue — 5MB quota fails with attachments
Evidence    1,000 offline mutations, 100% synced on reconnect

Deps        hooks/useOfflineEntity · utils/conflictResolution
Files       7
Deeper      {{CLI_NAME}} read {{SAMPLE_PATTERN}} --level full
```

The **Rejected** line is why your agent never picks localStorage.
It's the failure you already paid for, written down once, read forever.

---

## Use it

```bash
# 1. List available patterns
bunx {{CLI_NAME}} list

# 2. Search semantically
bunx {{CLI_NAME}} find "{{SEARCH_QUERY}}"

# 3. Pull into your project
bunx {{CLI_NAME}} use {{SAMPLE_PATTERN}} --project my-project
```

---

## The knowledge model

<p align="center">
  <img src="assets/tiers.svg" alt="Five composing tiers" width="100%">
</p>

| Tier | Holds |
| :--- | :--- |
| `primitives` | building blocks |
| `domain` | business rules |
| `features` | turnkey capabilities |
| `compositions` | assembly guidelines |
| `templates` | project scaffolds |

Every pattern carries a status it has earned:

`EXPERIMENTAL → VALIDATED → PROVEN`

---

## Equip your agents

```bash
bunx {{CLI_NAME}} init --agents
```

---

## Command reference

| Command | Does |
| :--- | :--- |
| `{{CLI_NAME}} list` | Patterns by tier, domain, or capability |
| `{{CLI_NAME}} find "<query>"` | Search by problem description |
| `{{CLI_NAME}} read <pattern>` | Read at `--level overview\|full` |
| `{{CLI_NAME}} use <pattern> --project <dir>` | Resolve deps, write files, update registry |
| `{{CLI_NAME}} check --project <dir>` | Flag outdated pattern versions in use |

---

## Contributing

```git
feat(scope): title

Constraint: Invariant that must not be broken
Rejected: Alternative evaluated | Why it failed
Evidence: Empirical validation / deployment details
```

---

## License

MIT — see [LICENSE](LICENSE).
