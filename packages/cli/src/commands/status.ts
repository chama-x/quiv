import { Command } from 'commander';
import { loadConfig } from '../core/config.js';
import { scanKnowledgeRepo } from '../core/scanner.js';
import { readActiveProjects } from '../core/registry.js';
import { formatStatus } from '../core/formatter.js';
import chalk from 'chalk';

export const statusCommand = new Command('status')
  .description('Quick health and inventory check for the agent knowledge system')
  .option('-p, --path <path>', 'Explicit path to knowledge repository')
  .option('-r, --registry <path>', 'Explicit path to registry repository')
  .action((options, cmd) => {
    const globalOpts = cmd?.parent?.opts() || {};
    const knowledgePathOpt = options.path || globalOpts.path;
    const registryPathOpt = options.registry || globalOpts.registry;

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

    const effectiveRegistry = registryPathOpt || config.registryPath;
    const patterns = scanKnowledgeRepo(config.knowledgePath);
    const projects = readActiveProjects(effectiveRegistry);

    console.log(formatStatus(patterns, projects));
    console.log(`\nPaths:`);
    console.log(`  Knowledge: ${config.knowledgePath}`);
    console.log(`  Registry:  ${effectiveRegistry || '(not found)'}`);
    console.log(`  Meta:      ${config.metaPath || '(not found)'}`);
    console.log(`  Org:       ${config.org}`);
  });

