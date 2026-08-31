import { Command } from 'commander';
import { loadConfig } from '../core/config.js';
import { scanKnowledgeRepo } from '../core/scanner.js';
import { formatPatternList } from '../core/formatter.js';
import type { OutputFormat, Tier } from '../core/types.js';
import chalk from 'chalk';

export const listCommand = new Command('list')
  .description('List available patterns with metadata (token-optimized)')
  .option('-d, --domain <domain>', 'Filter by business domain (e.g. erp, finance)')
  .option('-c, --capability <capability>', 'Filter by capability (e.g. offline-sync)')
  .option('-t, --tier <tier>', 'Filter by tier (primitives, domain, features, compositions, templates)')
  .option('-f, --format <format>', 'Output format (compact, table, json)', 'compact')
  .option('--json', 'Output machine-readable JSON', false)
  .option('-p, --path <path>', 'Explicit path to knowledge repository')
  .action((options, cmd) => {
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

    let patterns = scanKnowledgeRepo(config.knowledgePath);

    if (options.tier) {
      const tierFilter = options.tier.toLowerCase() as Tier;
      patterns = patterns.filter((p) => p.tier === tierFilter);
    }

    if (options.domain) {
      const domainFilter = options.domain.toLowerCase();
      patterns = patterns.filter(
        (p) =>
          p.metadata.domain?.toLowerCase().includes(domainFilter) ||
          p.path.toLowerCase().includes(domainFilter)
      );
    }

    if (options.capability) {
      const capFilter = options.capability.toLowerCase();
      patterns = patterns.filter(
        (p) =>
          p.metadata.capability?.toLowerCase().includes(capFilter) ||
          p.path.toLowerCase().includes(capFilter) ||
          p.name.toLowerCase().includes(capFilter)
      );
    }

    const output = formatPatternList(patterns, formatOpt as OutputFormat);
    console.log(output);
  });

