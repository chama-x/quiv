import { Command } from 'commander';
import { loadConfig } from '../core/config.js';
import { getPatternByPath, scanKnowledgeRepo } from '../core/scanner.js';
import { formatPatternRead } from '../core/formatter.js';
import type { ReadLevel } from '../core/types.js';
import chalk from 'chalk';

export const readCommand = new Command('read')
  .description('Read specific pattern content with progressive disclosure')
  .argument('<pattern-path>', 'Path or name of the pattern (e.g. features/offline-sync)')
  .option('-l, --level <level>', 'Detail level: overview (300t), full (1000t), implementation (3000t)', 'full')
  .option('-p, --path <path>', 'Explicit path to knowledge repository')
  .action((patternPathArg, options, cmd) => {
    const globalOpts = cmd?.parent?.opts() || {};
    const knowledgePathOpt = options.path || globalOpts.path;

    const config = loadConfig(knowledgePathOpt);

    if (!config.knowledgePath) {
      console.error(
        chalk.red(
          'Error: Could not locate knowledge repository.\n' +
            'Run `quiv init` to set up, or specify `--path <path>` / set `QUIV_KNOWLEDGE_PATH`.'
        )
      );
      process.exit(1);
    }

    let pattern = getPatternByPath(config.knowledgePath, patternPathArg);

    if (!pattern) {
      // Try fuzzy search by name
      const all = scanKnowledgeRepo(config.knowledgePath);
      pattern = all.find(
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

    const output = formatPatternRead(pattern, options.level as ReadLevel, config.knowledgePath);
    console.log(output);
  });

