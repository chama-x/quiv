import { Command } from 'commander';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { saveConfig } from '../core/config.js';
import { createGhRepo, isGhInstalled, getGit } from '../core/git.js';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const initCommand = new Command('init')
  .description('Initialize knowledge, registry, and meta repo structures')
  .option('-o, --org <org-name>', 'GitHub Organization name', 'quiv-knowledge')
  .option('-d, --dir <directory>', 'Root directory to scaffold repos into', process.cwd())
  .option('--create-remote', 'Create GitHub repositories in organization and push initial commits')
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

    if (scaffoldSourceDir && fs.existsSync(scaffoldSourceDir)) {
      copyDirectorySync(path.join(scaffoldSourceDir, 'knowledge'), knowledgeDir);
      copyDirectorySync(path.join(scaffoldSourceDir, 'registry'), registryDir);
      copyDirectorySync(path.join(scaffoldSourceDir, 'meta'), metaDir);
      console.log(chalk.green(`✓ Scaffolded structure from built-in templates:`));
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

    // 3. Remote creation and initial push if requested
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

function resolveScaffoldDir(): string | null {
  const candidates = [
    path.resolve(__dirname, '../../scaffold'),
    path.resolve(__dirname, '../scaffold'),
    path.resolve(process.cwd(), 'scaffold'),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
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
