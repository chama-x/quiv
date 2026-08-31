import { Command } from 'commander';
import path from 'node:path';
import fs from 'node:fs';
import { loadConfig } from '../core/config.js';
import { formatLoreLiteCommit, getGit, createGhPr, isGhInstalled } from '../core/git.js';
import { TIERS, type Tier } from '../core/types.js';
import chalk from 'chalk';

export const learnCommand = new Command('learn')
  .alias('extract')
  .description('Harvest and distill reusable code from a project into QUIV knowledge tiers')
  .option('-f, --from <paths...>', 'Source file(s) or directory to extract from (e.g. ./src/components/Drawer.tsx)')
  .option('-t, --tier <tier>', 'Knowledge tier: primitives, domain, features, compositions, templates', 'compositions')
  .option('-n, --name <name>', 'Pattern name (e.g. gesture-sheet, dynamic-island-safe-area)')
  .requiredOption('-m, --message <message>', 'Summary of what this pattern provides')
  .option('-d, --description <description>', 'Detailed architectural explanation of problem and solution')
  .option('-c, --constraints <constraints>', 'Hard constraints that shaped the implementation')
  .option('-r, --rejected <rejected>', 'Alternative approaches rejected and why they failed')
  .option('-e, --evidence <evidence>', 'Empirical benchmarks or test evidence')
  .option('--tags <tags>', 'Comma-separated tags for search and discovery')
  .option('--domain <domain>', 'Domain classification (e.g. mobile-ui, ecommerce, shared)', 'shared')
  .option('--capability <capability>', 'Capability tag (e.g. gesture, offline, navigation)', 'general')
  .option('--status <status>', 'Initial status: EXPERIMENTAL, VALIDATED, PROVEN', 'VALIDATED')
  .option('--dry-run', 'Preview the extracted structure without writing files or committing', false)
  .option('--no-pr', 'Skip opening GitHub PR (only create branch and commit)')
  .option('-p, --path <path>', 'Explicit path to knowledge repository')
  .option('--json', 'Output machine-readable JSON summary')
  .action(async (options, cmd) => {
    const globalOpts = cmd?.parent?.opts() || {};
    const knowledgePathOpt = options.path || globalOpts.path;
    const isJson = Boolean(options.json || globalOpts.json);

    const config = loadConfig(knowledgePathOpt);

    if (!config.knowledgePath) {
      if (isJson) {
        console.log(JSON.stringify({ success: false, error: 'Could not locate knowledge repository.' }));
      } else {
        console.error(
          chalk.red(
            'Error: Could not locate knowledge repository.\n' +
              'Run `quiv init` or specify `--path <path>` / set `QUIV_KNOWLEDGE_PATH`.'
          )
        );
      }
      process.exit(1);
    }

    const tier = options.tier.toLowerCase() as Tier;
    if (!TIERS.includes(tier)) {
      const msg = `Invalid tier "${options.tier}". Must be one of: ${TIERS.join(', ')}`;
      if (isJson) {
        console.log(JSON.stringify({ success: false, error: msg }));
      } else {
        console.error(chalk.red(`Error: ${msg}`));
      }
      process.exit(1);
    }

    // Determine clean slugified name
    let patternName = options.name;
    if (!patternName && options.from && options.from.length > 0) {
      const firstPath = options.from[0];
      const parsedBase = path.basename(firstPath, path.extname(firstPath));
      patternName = slugify(parsedBase);
    } else if (!patternName) {
      patternName = slugify(options.message.replace(/^(feat|fix|refactor|add):\s*/i, ''));
    } else {
      patternName = slugify(patternName);
    }

    const targetPatternDir = path.join(config.knowledgePath, tier, patternName);
    const relPatternPath = `${tier}/${patternName}`;

    const tags = options.tags
      ? options.tags.split(',').map((t: string) => t.trim().toLowerCase()).filter(Boolean)
      : [tier, patternName];

    const sourcePaths: string[] = [];
    if (options.from) {
      for (const p of options.from) {
        const resolved = path.resolve(process.cwd(), p);
        if (!fs.existsSync(resolved)) {
          const err = `Source path "${p}" does not exist.`;
          if (isJson) {
            console.log(JSON.stringify({ success: false, error: err }));
          } else {
            console.error(chalk.red(`Error: ${err}`));
          }
          process.exit(1);
        }
        sourcePaths.push(resolved);
      }
    }

    // Build README markdown content
    const titleCaseName = patternName
      .split('-')
      .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    const description = options.description || options.message;
    const constraints = options.constraints || 'None specified';
    const rejected = options.rejected || 'None specified';
    const evidence = options.evidence || 'None specified';
    const status = (options.status || 'VALIDATED').toUpperCase();

    const readmeContent = `---
name: ${patternName}
status: ${status}
version: "1.0"
used_in: 1
domain: ${options.domain}
capability: ${options.capability}
tags: [${tags.map((t: string) => `"${t}"`).join(', ')}]
description: >-
  ${description.replace(/\n/g, ' ')}
---

# ${titleCaseName}

## Status
[${status}] | v1.0 | Extracted from project implementation

## Problem
${options.message}

## Solution
${description}

## Hard Constraints
${constraints.split(';').map((c: string) => `- ${c.trim()}`).join('\n')}

## Rejected Alternatives
${rejected.split(';').map((r: string) => `- ${r.trim()}`).join('\n')}

## Evidence & Verification
${evidence.split(';').map((e: string) => `- ${e.trim()}`).join('\n')}
`;

    if (options.dryRun) {
      if (isJson) {
        console.log(
          JSON.stringify({
            success: true,
            dryRun: true,
            pattern: relPatternPath,
            targetDir: targetPatternDir,
            sources: sourcePaths,
            readme: readmeContent,
          }, null, 2)
        );
      } else {
        console.log(chalk.bold.cyan(`\n🔍 [DRY RUN] Quiv Learn: ${relPatternPath}`));
        console.log(chalk.gray(`Target: ${targetPatternDir}`));
        console.log(chalk.gray(`Sources: ${sourcePaths.join(', ') || 'None (scaffold only)'}\n`));
        console.log(chalk.bold('Generated README.md:'));
        console.log(chalk.gray('────────────────────────────────────────'));
        console.log(readmeContent);
        console.log(chalk.gray('────────────────────────────────────────'));
      }
      return;
    }

    // 1. Create target directory
    if (!fs.existsSync(targetPatternDir)) {
      fs.mkdirSync(targetPatternDir, { recursive: true });
    }

    // 2. Copy source files
    const copiedFiles: string[] = [];
    for (const src of sourcePaths) {
      const stats = fs.statSync(src);
      if (stats.isDirectory()) {
        const copied = copyDirRecursive(src, targetPatternDir);
        copiedFiles.push(...copied);
      } else {
        const dest = path.join(targetPatternDir, path.basename(src));
        fs.copyFileSync(src, dest);
        copiedFiles.push(dest);
      }
    }

    // 3. Write README.md
    const readmeFile = path.join(targetPatternDir, 'README.md');
    fs.writeFileSync(readmeFile, readmeContent, 'utf-8');
    copiedFiles.push(readmeFile);

    // 4. Git branch, commit with Lore-lite trailers & PR
    const branchName = `learn/${patternName}-${Date.now().toString().slice(-4)}`;
    const commitMsg = formatLoreLiteCommit({
      message: options.message,
      description: `Harvested pattern ${relPatternPath} into knowledge base.\n\n${description}`,
      constraint: options.constraints,
      rejected: options.rejected,
      evidence: options.evidence,
    });

    let prUrl: string | undefined;
    let gitCommitted = false;

    try {
      const git = getGit(config.knowledgePath);
      await git.checkoutLocalBranch(branchName);
      await git.add(path.relative(config.knowledgePath, targetPatternDir));
      await git.commit(commitMsg);
      gitCommitted = true;

      if (options.pr && isGhInstalled()) {
        try {
          await git.push('origin', branchName, ['-u']);
          const prBody = `## Pattern Distillation: \`${relPatternPath}\`\n\n### Problem & Solution\n${description}\n\n### Lore-lite Metadata\n- **Constraints:** ${constraints}\n- **Rejected Alternatives:** ${rejected}\n- **Evidence:** ${evidence}`;
          const prRes = await createGhPr(config.knowledgePath, `feat(${tier}): learn ${patternName}`, prBody, 'main');
          if (prRes.success && prRes.url) {
            prUrl = prRes.url;
          }
        } catch {
          // non-fatal git push error
        }
      }
    } catch {
      // ignore git failure in non-git test envs
    }

    const knowledgePath = config.knowledgePath;

    if (isJson) {
      console.log(
        JSON.stringify({
          success: true,
          pattern: relPatternPath,
          targetDir: targetPatternDir,
          files: copiedFiles.map((f) => path.relative(knowledgePath, f)),
          branch: branchName,
          committed: gitCommitted,
          prUrl,
        }, null, 2)
      );
    } else {
      console.log(chalk.bold.green(`\n✓ Successfully learned and harvested pattern: ${relPatternPath}`));
      console.log(`  • Location: ${chalk.cyan(targetPatternDir)}`);
      console.log(`  • Files:    ${copiedFiles.length} file(s) distilled`);
      if (gitCommitted) {
        console.log(`  • Branch:   ${chalk.gray(branchName)} (Committed with Lore-lite trailers)`);
      }
      if (prUrl) {
        console.log(`  • PR:       ${chalk.green(prUrl)}`);
      }
      console.log(`\nAgents can now retrieve this with: ${chalk.bold(`quiv find "${patternName}"`)} or ${chalk.bold(`quiv use ${relPatternPath}`)}\n`);
    }
  });

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function copyDirRecursive(srcDir: string, destDir: string): string[] {
  const copied: string[] = [];
  if (!fs.existsSync(srcDir)) return copied;

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    if (
      entry.name === 'node_modules' ||
      entry.name === '.git' ||
      entry.name === '.DS_Store' ||
      entry.name === 'dist'
    ) {
      continue;
    }

    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      copied.push(...copyDirRecursive(srcPath, destPath));
    } else {
      fs.copyFileSync(srcPath, destPath);
      copied.push(destPath);
    }
  }

  return copied;
}
