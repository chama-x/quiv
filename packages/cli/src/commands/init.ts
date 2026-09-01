import { Command } from 'commander';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { saveConfig } from '../core/config.js';
import { createGhRepo, isGhInstalled, getGit } from '../core/git.js';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import os from 'node:os';

export const initCommand = new Command('init')
  .description('Initialize knowledge, registry, and meta repo structures')
  .option('-o, --org <org-name>', 'GitHub Organization name', 'quiv-knowledge')
  .option('-d, --dir <directory>', 'Root directory to scaffold repos into', process.cwd())
  .option('--create-remote', 'Create GitHub repositories in organization and push initial commits')
  .option('--agents', 'Scaffold AGENTS.md, Cursor rules, and AI agent configuration', false)
  .option('--antigravity', 'Install native Antigravity skill and rules globally (~/.gemini/config/)', false)
  .action(async (options) => {
    const rootDir = path.resolve(options.dir);
    const org = options.org;

    console.log(chalk.bold(`\n🚀 Initializing Quiv Agent Knowledge System for: ${org}`));
    console.log(`Directory: ${rootDir}\n`);

    const knowledgeDir = path.join(rootDir, 'knowledge');
    const registryDir = path.join(rootDir, 'registry');
    const metaDir = path.join(rootDir, 'meta');

    // 1. Copy or generate scaffold directories
    const scaffoldSourceDir = resolveScaffoldDir();
    const monorepoKnowledgeDir = path.resolve(__dirname, '../../../knowledge');
    const monorepoRegistryDir = path.resolve(__dirname, '../../../registry');
    const monorepoMetaDir = path.resolve(__dirname, '../../../meta');

    if (scaffoldSourceDir && fs.existsSync(scaffoldSourceDir)) {
      copyDirectorySync(path.join(scaffoldSourceDir, 'knowledge'), knowledgeDir);
      copyDirectorySync(path.join(scaffoldSourceDir, 'registry'), registryDir);
      copyDirectorySync(path.join(scaffoldSourceDir, 'meta'), metaDir);
      console.log(chalk.green(`✓ Scaffolded structure from built-in templates:`));
    } else if (fs.existsSync(monorepoKnowledgeDir)) {
      copyDirectorySync(monorepoKnowledgeDir, knowledgeDir);
      if (fs.existsSync(monorepoRegistryDir)) copyDirectorySync(monorepoRegistryDir, registryDir);
      if (fs.existsSync(monorepoMetaDir)) copyDirectorySync(monorepoMetaDir, metaDir);
      console.log(chalk.green(`✓ Scaffolded structure from verified knowledge repository:`));
    } else {
      // Fallback: programmatic creation
      createStructureProgrammatically(knowledgeDir, registryDir, metaDir);
      console.log(chalk.green(`✓ Generated structure programmatically:`));
    }

    console.log(`  • Knowledge: ${knowledgeDir}`);
    console.log(`  • Registry:  ${registryDir}`);
    console.log(`  • Meta:      ${metaDir}`);

    // 2. Save .quivrc configuration
    const savedRc = saveConfig(
      {
        org,
        knowledgePath: knowledgeDir,
        registryPath: registryDir,
        metaPath: metaDir,
      },
      rootDir
    );
    console.log(chalk.green(`✓ Saved configuration to: ${savedRc}`));

    // Save global config for zero-config discovery anywhere
    try {
      const globalConfigDir = path.join(os.homedir(), '.config', 'quiv');
      if (!fs.existsSync(globalConfigDir)) {
        fs.mkdirSync(globalConfigDir, { recursive: true });
      }
      fs.writeFileSync(
        path.join(globalConfigDir, 'config.json'),
        JSON.stringify(
          {
            org,
            knowledgePath: knowledgeDir,
            registryPath: registryDir,
            metaPath: metaDir,
          },
          null,
          2
        ) + '\n'
      );
      console.log(chalk.green(`✓ Registered global fallback config in ~/.config/quiv/config.json`));
    } catch {
      // ignore
    }

    // 3. Install agent rules / Antigravity skills
    if (options.agents || options.antigravity) {
      setupAgentFiles(rootDir, knowledgeDir);
    }

    // 4. Remote creation and initial push if requested
    if (options.createRemote) {
      if (!isGhInstalled()) {
        console.log(
          chalk.yellow(`\nGitHub CLI (gh) not found. Skipping remote repo creation.\nRun \`brew install gh\` and create them manually.`)
        );
      } else {
        console.log(chalk.cyan(`\nCreating private repositories under org "${org}"...`));
        const repos = [
          { name: 'knowledge', dir: knowledgeDir, desc: 'Reusable patterns for AI agents (quiv)' },
          { name: 'registry', dir: registryDir, desc: 'Project tracking and pattern backports (quiv)' },
          { name: 'meta', dir: metaDir, desc: 'System index and agent conventions (quiv)' },
        ];

        for (const r of repos) {
          const res = await createGhRepo(org, r.name, r.desc, true);
          if (res.success) {
            console.log(chalk.green(`✓ Created https://github.com/${org}/${r.name}`));
          } else {
            console.log(chalk.yellow(`Notice for ${r.name}: ${res.output.trim()}`));
          }

          // Initialize local git repo, commit, and push
          try {
            const git = getGit(r.dir);
            await git.init();
            await git.add('.');
            await git.commit('feat: initialize repository scaffold with quiv conventions');
            await git.branch(['-M', 'main']);

            const remotes = await git.getRemotes();
            const remoteUrl = `https://github.com/${org}/${r.name}.git`;
            if (!remotes.some((rem) => rem.name === 'origin')) {
              await git.addRemote('origin', remoteUrl);
            } else {
              await git.remote(['set-url', 'origin', remoteUrl]);
            }

            await git.push('origin', 'main', ['-u']);
            console.log(chalk.green(`  ✓ Pushed initial commit to origin/main for ${r.name}`));
          } catch (gitErr: any) {
            console.log(chalk.yellow(`  Note for ${r.name} git push: ${gitErr.message}`));
          }
        }
      }
    }

    console.log(chalk.bold.green(`\n🎉 Initialization Complete!`));
    console.log(`You can now run:`);
    console.log(`  quiv list     - list all available patterns`);
    console.log(`  quiv status   - view knowledge base status`);
    console.log(`  quiv find     - search for patterns`);
  });

function setupAgentFiles(rootDir: string, knowledgeDir: string): void {
  // AGENTS.md in root
  const agentsMdContent = `# Agent Knowledge Protocol (quiv)

Quiv gives AI agents instant access to validated architectural patterns, UI shells, OLED tokens, motion systems, and offline sync building blocks without re-inventing solutions from scratch.

## Day-to-Day Conversational Workflow
1. **Start by Searching & Using**:
   - Run \`quiv find "<problem description>"\` or \`quiv list\` to check if a validated/proven pattern exists.
   - Run \`quiv read <pattern> --level overview\` (or \`full\`) to retrieve constraints, rejected alternatives, and verified designs (<300t budget).
   - Run \`quiv use <pattern> --project <name> --dest ./src\` to copy implementation and resolve recursive dependencies into the workspace.
2. **Build Unique Product Logic**:
   - Write custom code only for what no pattern covers.
3. **Finish by Learning & Distilling**:
   - When completing features, UI assemblies, or custom hooks, extract and upstream them into QUIV:
     \`quiv learn --from ./src/components/<Name>.tsx --tier compositions --name <slug> -m "feat: description" -c "constraints" -r "rejected" -e "evidence"\`
   - Or run \`quiv contribute\` with Lore-lite commit trailers.
`;
  fs.writeFileSync(path.join(rootDir, 'AGENTS.md'), agentsMdContent, 'utf-8');
  console.log(chalk.green(`✓ Wrote AGENTS.md`));

  // .cursor/rules/quiv.mdc
  const cursorDir = path.join(rootDir, '.cursor', 'rules');
  if (!fs.existsSync(cursorDir)) fs.mkdirSync(cursorDir, { recursive: true });
  fs.writeFileSync(
    path.join(cursorDir, 'quiv.mdc'),
    `---
description: Quiv Architecture Knowledge System (Agent Protocol)
globs: *
alwaysApply: true
---
${agentsMdContent}`,
    'utf-8'
  );
  console.log(chalk.green(`✓ Wrote .cursor/rules/quiv.mdc`));

  // Global Antigravity skill in ~/.gemini/config/skills/quiv/
  try {
    const agySkillDir = path.join(os.homedir(), '.gemini', 'config', 'skills', 'quiv');
    if (!fs.existsSync(agySkillDir)) fs.mkdirSync(agySkillDir, { recursive: true });
    const agySkillContent = `---
name: quiv
description: >-
  Agent Knowledge Kit (quiv/qv) for discovering, retrieving, and scaffolding validated architectural patterns,
  UI shells, OLED tokens, motion systems, and offline sync building blocks without re-inventing solutions from scratch.
  MUST USE whenever asked to build, design, or scaffold PWA shells, Apple-grade UI, OLED dark tokens, motion/springs,
  offline sync features, or to learn and extract reusable components at the end of a project.
---

# Quiv Agent Knowledge System (quiv/qv)

## Overview
Quiv gives AI agents instant access to validated, proven architectural patterns across 5 tiers:
1. **Primitives**: Pure building blocks (hooks, utils, tabular numerals, haptics, spring vocabulary)
2. **Domain**: Business & domain models
3. **Features**: Turnkey capabilities (offline-sync, intent install prompts, zero-CLS banners)
4. **Compositions**: Assembly recipes (Apple-native PWA shell, storefront shells, OLED glass tokens, motion patterns)
5. **Templates**: Scaffold starters (high-star OSS repos, Next.js PWA)

## Zero-Token Workflow Loop

### 1. Find Pattern
\`\`\`bash
quiv find "<problem or component keyword>"
\`\`\`
*Examples:* \`quiv find "storefront"\`, \`quiv find "oled tokens"\`, \`quiv find "spring motion"\`, \`quiv find "offline sync"\`

### 2. Read Constraints & Solutions (<300t overview)
\`\`\`bash
quiv read <pattern-path> --level overview
\`\`\`
*Note:* Reads token-optimized summary including hard constraints and rejected alternatives. Use \`--level full\` or \`--level implementation\` only if code details are needed.

### 3. Scaffold into Workspace
\`\`\`bash
quiv use <pattern-path> --dest ./src --project <project-name>
\`\`\`
*Note:* Automatically copies the pattern files and all recursive dependencies into your workspace.

### 4. Post-Project Learn & Extract (Harvesting Knowledge)
When the user asks to learn, extract, or contribute reusable components built during the project:
\`\`\`bash
quiv learn --from ./src/path/to/Component.tsx --tier <tier> --name <slug> -m "feat: description" -c "<constraints>" -r "<rejected>" -e "<evidence>"
\`\`\`
*Note:* Automatically packages the component, creates the validated frontmatter README, commits with Lore-lite trailers, and records it into the knowledge base.
`;
    fs.writeFileSync(path.join(agySkillDir, 'SKILL.md'), agySkillContent, 'utf-8');
    console.log(chalk.green(`✓ Installed Antigravity skill: ~/.gemini/config/skills/quiv/SKILL.md`));
  } catch {
    // ignore
  }
}


function resolveScaffoldDir(): string | null {
  const candidates: string[] = [
    path.resolve(process.cwd(), 'scaffold'),
  ];
  let curr = __dirname;
  for (let i = 0; i < 6; i++) {
    candidates.push(path.join(curr, 'scaffold'));
    candidates.push(path.join(curr, 'dist', 'scaffold'));
    const parent = path.dirname(curr);
    if (parent === curr) break;
    curr = parent;
  }
  for (const c of candidates) {
    if (fs.existsSync(c) && fs.existsSync(path.join(c, 'knowledge'))) return c;
  }
  return null;
}

function copyDirectorySync(src: string, dest: string): void {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirectorySync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function createStructureProgrammatically(kDir: string, rDir: string, mDir: string): void {
  // Knowledge structure
  const kDirs = [
    'primitives/ui',
    'primitives/hooks',
    'primitives/utils',
    'domain/erp/inventory',
    'domain/erp/accounting',
    'domain/erp/hr',
    'domain/shared',
    'features/offline-sync',
    'features/inventory-dashboard',
    'features/navigation',
    'features/form-validation',
    'compositions/pwa-apple',
    'compositions/dashboard',
    'compositions/forms-heavy',
    'templates/nextjs-pwa',
    'templates/vite-pwa',
  ];

  for (const sub of kDirs) {
    const p = path.join(kDir, sub);
    fs.mkdirSync(p, { recursive: true });
    fs.writeFileSync(path.join(p, '.gitkeep'), '', 'utf-8');
  }

  // Registry structure
  fs.mkdirSync(rDir, { recursive: true });
  fs.writeFileSync(
    path.join(rDir, 'active-projects.md'),
    '# Project Registry\n\n## Active Projects\n| Project | Patterns Used | Last Sync |\n|---|---|---|\n',
    'utf-8'
  );
  fs.writeFileSync(
    path.join(rDir, 'dependencies.md'),
    '# registry/dependencies.md\n\n## Dependency Rules\n',
    'utf-8'
  );

  // Meta structure
  fs.mkdirSync(mDir, { recursive: true });
  fs.writeFileSync(
    path.join(mDir, 'conventions.md'),
    '# Meta Conventions\n\n- Follow Lore-lite commit trailers\n- Update INDEX on changes\n',
    'utf-8'
  );
}
