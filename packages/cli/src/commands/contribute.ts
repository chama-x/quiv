import { Command } from 'commander';
import path from 'node:path';
import fs from 'node:fs';
import { loadConfig } from '../core/config.js';
import { formatLoreLiteCommit, getGit, createGhPr, isGhInstalled } from '../core/git.js';
import { scanKnowledgeRepo } from '../core/scanner.js';
import chalk from 'chalk';

export const contributeCommand = new Command('contribute')
  .description('Commit learnings to knowledge repo with Lore-lite trailers and open PR (supports single or batch)')
  .option('--pattern <path>', 'Single pattern path (e.g. features/offline-sync)')
  .option('--batch <paths...>', 'Multiple pattern paths or directories to contribute together')
  .option('--tier <tier>', 'Contribute all patterns in a specific tier (e.g. compositions, primitives)')
  .option('--all', 'Contribute all staged and unstaged changes across knowledge repository')
  .requiredOption('-m, --message <message>', 'Brief description of the change (e.g. feat: extract motion patterns)')
  .option('-d, --description <description>', 'Detailed explanation of what changed and why')
  .option('-c, --constraints <constraints>', 'What must not be broken')
  .option('-r, --rejected <rejected>', 'Alternative approaches rejected and why')
  .option('-e, --evidence <evidence>', 'Empirical evidence or test results')
  .option('--no-pr', 'Skip opening GitHub PR (only create branch and commit)')
  .option('-p, --path <path>', 'Explicit path to knowledge repository')
  .action(async (options, cmd) => {
    const globalOpts = cmd?.parent?.opts() || {};
    const knowledgePathOpt = options.path || globalOpts.path;

    const config = loadConfig(knowledgePathOpt);

    if (!config.knowledgePath) {
      console.error(
        chalk.red(
          'Error: Could not locate knowledge repository.\n' +
            'Run `quiv init` or specify `--path <path>` / set `QUIV_KNOWLEDGE_PATH`.'
        )
      );
      process.exit(1);
    }

    if (!options.pattern && !options.batch && !options.tier && !options.all) {
      console.error(
        chalk.red(
          'Error: Please specify what to contribute using --pattern <path>, --batch <paths...>, --tier <tier>, or --all.'
        )
      );
      process.exit(1);
    }

    const git = getGit(config.knowledgePath);
    const patternsToStage: string[] = [];


    if (options.all) {
      patternsToStage.push('.');
    } else if (options.tier) {
      const tierPath = path.resolve(config.knowledgePath, options.tier);
      if (!fs.existsSync(tierPath)) {
        console.error(chalk.red(`Error: Tier "${options.tier}" does not exist at ${tierPath}.`));
        process.exit(1);
      }
      patternsToStage.push(options.tier);
    } else if (options.batch && Array.isArray(options.batch)) {
      for (const p of options.batch) {
        const full = path.resolve(config.knowledgePath, p);
        if (!fs.existsSync(full)) {
          console.error(chalk.red(`Error: Pattern path "${p}" does not exist.`));
          process.exit(1);
        }
        patternsToStage.push(p);
      }
    } else if (options.pattern) {
      const patternFullPath = path.resolve(config.knowledgePath, options.pattern);
      if (!fs.existsSync(patternFullPath)) {
        console.error(chalk.red(`Error: Pattern path "${options.pattern}" does not exist at ${patternFullPath}.`));
        process.exit(1);
      }
      patternsToStage.push(options.pattern);
    }

    // Determine clean branch name
    let branchBase = 'patterns';
    if (options.pattern) {
      branchBase = path.basename(options.pattern);
    } else if (options.tier) {
      branchBase = options.tier;
    } else if (options.batch && options.batch.length === 1) {
      branchBase = path.basename(options.batch[0]);
    } else if (options.all) {
      branchBase = 'batch-extraction';
    }

    const branchName = `extract/${branchBase}-${Date.now().toString().slice(-4)}`;

    // Build comprehensive description
    const scanned = scanKnowledgeRepo(config.knowledgePath);
    const patternListDesc = scanned.length > 0
      ? `\n\nPatterns included:\n${scanned.map((p) => `- **${p.name}** (\`${p.path}\`): ${p.summary}`).join('\n')}`
      : '';

    const fullDescription = `${options.description || options.message}${patternListDesc}`;

    const commitMessage = formatLoreLiteCommit({
      message: options.message,
      description: fullDescription,
      constraint: options.constraints,
      rejected: options.rejected,
      evidence: options.evidence,
    });

    console.log(chalk.cyan(`1. Creating branch: ${branchName}...`));
    try {
      await git.checkoutLocalBranch(branchName);

      for (const p of patternsToStage) {
        console.log(chalk.gray(`   Staging: ${p}`));
        await git.add(p);
      }

      await git.commit(commitMessage);
      console.log(chalk.green(`✓ Committed changes with Lore-lite trailers:`));
      console.log(chalk.gray(`────────────────────────────────────────`));
      console.log(commitMessage);
      console.log(chalk.gray(`────────────────────────────────────────`));

      if (options.pr && isGhInstalled()) {
        console.log(chalk.cyan(`2. Pushing branch and opening PR...`));
        try {
          await git.push('origin', branchName, ['-u']);
          const prBody = `## Summary\n${fullDescription}\n\n### Lore-lite Metadata\n- **Constraints:** ${options.constraints || 'None specified'}\n- **Rejected Alternatives:** ${options.rejected || 'None specified'}\n- **Evidence:** ${options.evidence || 'None specified'}`;
          const prRes = await createGhPr(config.knowledgePath, options.message, prBody, 'main');
          if (prRes.success && prRes.url) {
            console.log(chalk.green(`✓ PR opened successfully: ${prRes.url}`));
          } else {
            console.log(chalk.yellow(`Warning: Could not open PR automatically: ${prRes.error || 'Check gh auth'}`));
          }
        } catch (pushErr: any) {
          console.log(chalk.yellow(`Warning: Git push failed: ${pushErr.message}. Local branch and commit preserved.`));
        }
      } else if (!options.pr) {
        console.log(chalk.gray(`Skipped PR creation (--no-pr flag provided).`));
      } else {
        console.log(chalk.yellow(`GitHub CLI (gh) not detected. To push and create PR:\n  git push origin ${branchName}\n  gh pr create`));
      }
    } catch (err: any) {
      console.error(chalk.red(`Failed to contribute pattern(s): ${err.message}`));
      process.exit(1);
    }
  });
