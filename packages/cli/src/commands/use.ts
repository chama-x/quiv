import { Command } from 'commander';
import { loadConfig } from '../core/config.js';
import { getPatternByPath, scanKnowledgeRepo } from '../core/scanner.js';
import { recordProjectUsage } from '../core/registry.js';
import type { Pattern } from '../core/types.js';
import chalk from 'chalk';

export const useCommand = new Command('use')
  .description('Get pattern and dependent building blocks for project implementation')
  .argument('<pattern-path>', 'Path or name of the pattern to use')
  .option('-P, --project <project-name>', 'Name of the current project (required for registry tracking)')
  .option('-p, --path <path>', 'Explicit path to knowledge repository')
  .option('-r, --registry <path>', 'Explicit path to registry repository')
  .action((patternPathArg, options) => {
    const config = loadConfig(options.path);

    if (!config.knowledgePath) {
      console.error(
        chalk.red(
          'Error: Could not locate knowledge repository.\n' +
            'Run `quiv init` to set up, or specify `--path <path>` / set `QUIV_KNOWLEDGE_PATH`.'
        )
      );
      process.exit(1);
    }

    const allPatterns = scanKnowledgeRepo(config.knowledgePath);
    let pattern = getPatternByPath(config.knowledgePath, patternPathArg);

    if (!pattern) {
      pattern = allPatterns.find(
        (p) =>
          p.name.toLowerCase() === patternPathArg.toLowerCase() ||
          p.path.toLowerCase() === patternPathArg.toLowerCase() ||
          p.path.toLowerCase().endsWith(`/${patternPathArg.toLowerCase()}`)
      ) || null;
    }

    if (!pattern) {
      console.error(chalk.red(`Error: Pattern "${patternPathArg}" not found in knowledge repository.`));
      process.exit(1);
    }

    // Resolve dependencies recursively
    const resolvedDeps: Pattern[] = [];
    const queue = [...(pattern.metadata.depends_on || [])];
    const visited = new Set<string>();

    while (queue.length > 0) {
      const depPath = queue.shift()!;
      if (visited.has(depPath)) continue;
      visited.add(depPath);

      const depPattern = allPatterns.find(
        (p) => p.path === depPath || p.name === depPath || p.path.endsWith(`/${depPath}`)
      );
      if (depPattern) {
        resolvedDeps.push(depPattern);
        if (depPattern.metadata.depends_on) {
          queue.push(...depPattern.metadata.depends_on);
        }
      }
    }

    // Output pattern details
    console.log(chalk.bold(`\n=== Pattern: ${pattern.name} (${pattern.path}) ===`));
    console.log(`Status:  ${pattern.metadata.status || 'EXPERIMENTAL'} | Version: v${pattern.metadata.version || '1.0'}`);
    console.log(`Summary: ${pattern.summary}\n`);

    if (resolvedDeps.length > 0) {
      console.log(chalk.yellow(`Dependencies (${resolvedDeps.length}):`));
      for (const dep of resolvedDeps) {
        console.log(`  • ${dep.path} (v${dep.metadata.version || '1.0'})`);
      }
      console.log('');
    }

    const checkoutPaths = [pattern.path, ...resolvedDeps.map((d) => d.path)].join(' \\\n    ');
    console.log(chalk.cyan(`Sparse-checkout command (if importing selectively):`));
    console.log(`git sparse-checkout set \\\n    ${checkoutPaths}\n`);

    // Record in registry if project specified
    const projectName = options.project;
    if (projectName && config.registryPath) {
      const patternsToRecord = [
        { name: pattern.name, version: `v${pattern.metadata.version || '1.0'}` },
        ...resolvedDeps.map((d) => ({
          name: d.name,
          version: `v${d.metadata.version || '1.0'}`,
        })),
      ];
      recordProjectUsage(config.registryPath, projectName, patternsToRecord);
      console.log(chalk.green(`✓ Recorded in registry for project: "${projectName}"`));
    } else if (projectName) {
      console.log(
        chalk.gray(`Note: Registry repo not detected. Usage not written to disk. (Set QUIV_REGISTRY_PATH to enable)`)
      );
    }
  });
