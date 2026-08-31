import { Command } from 'commander';
import { loadConfig } from '../core/config.js';
import { scanKnowledgeRepo } from '../core/scanner.js';
import { searchPatterns } from '../core/search.js';
import { formatSearchResults } from '../core/formatter.js';
import type { OutputFormat } from '../core/types.js';
import chalk from 'chalk';

export const findCommand = new Command('find')
  .description('Find patterns by problem or natural language description')
  .argument('<query>', 'Search query (e.g. "offline sync conflict resolution")')
  .option('-f, --format <format>', 'Output format (compact, json)', 'compact')
  .option('--json', 'Output machine-readable JSON', false)
  .option('-p, --path <path>', 'Explicit path to knowledge repository')
  .action((query, options, cmd) => {
    const globalOpts = cmd?.parent?.opts() || {};
    const knowledgePathOpt = options.path || globalOpts.path;
    const formatOpt = options.json || globalOpts.json ? 'json' : (options.format || globalOpts.format || 'compact');

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

    const allPatterns = scanKnowledgeRepo(config.knowledgePath);
    const results = searchPatterns(allPatterns, query);

    const output = formatSearchResults(results, formatOpt as OutputFormat);
    console.log(output);
  });

