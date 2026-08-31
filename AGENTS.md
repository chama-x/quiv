# Agent Knowledge Protocol (quiv)

Quiv gives AI agents instant access to validated architectural patterns, UI shells, OLED tokens, motion systems, and offline sync building blocks without re-inventing solutions from scratch.

## Day-to-Day Conversational Workflow
1. **Start by Searching & Using**:
   - Run `quiv find "<problem description>"` or `quiv list` to check if a validated/proven pattern exists.
   - Run `quiv read <pattern> --level overview` (or `full`) to retrieve constraints, rejected alternatives, and verified designs (<300t budget).
   - Run `quiv use <pattern> --project <name> --dest ./src` to copy implementation and resolve recursive dependencies into the workspace.
2. **Build Unique Product Logic**:
   - Write custom code only for what no pattern covers.
3. **Finish by Learning & Distilling**:
   - When completing features, UI assemblies, or custom hooks, extract and upstream them into QUIV:
     `quiv learn --from ./src/components/<Name>.tsx --tier compositions --name <slug> -m "feat: description" -c "constraints" -r "rejected" -e "evidence"`
   - Or run `quiv contribute` with Lore-lite commit trailers.
