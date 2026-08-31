import { Command } from 'commander';
import { loadConfig, detectProjectName } from '../core/config.js';
import { checkProjectUpdates } from '../core/registry.js';
import chalk from 'chalk';

export const checkCommand = new Command('check')
  .description('Check if patterns used by a project have newer versions in knowledge repo')
  .option('-P, --project <project-name>', 'Name of the project to check (auto-detected from package.json if omitted)')
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

    if (!effectiveRegistry) {
      console.error(
        chalk.red(
          'Error: Could not locate registry repository.\n' +
            'Specify `--registry <path>` or set `QUIV_REGISTRY_PATH`.'
        )
      );
      process.exit(1);
    }

    const projectName = detectProjectName(options.project);

    const updates = checkProjectUpdates(
      effectiveRegistry,
      config.knowledgePath,
      projectName
    );

    if (updates.length === 0) {
      console.log(chalk.yellow(`No tracked patterns found for project "${projectName}" in registry.`));
      return;
    }

    console.log(chalk.bold(`\nPattern version status for: ${projectName}`));
    console.log(`────────────────────────────────────────────────────`);

    let outdatedCount = 0;
    for (const item of updates) {
      if (item.isOutdated) {
        outdatedCount++;
        console.log(
          `${chalk.yellow('⚡ UPDATE AVAILABLE:')} ${item.pattern} (current: ${item.currentVersion} → latest: ${item.availableVersion})`
        );
      } else {
        console.log(
          `${chalk.green('✓ Up to date:')}       ${item.pattern} (${item.currentVersion})`
        );
      }
    }

    console.log(`────────────────────────────────────────────────────`);
    if (outdatedCount > 0) {
      console.log(
        chalk.yellow(`\nFound ${outdatedCount} outdated pattern(s). Consider upgrading and testing.`)
      );
    } else {
      console.log(chalk.green(`\nAll patterns for "${options.project}" are up to date.`));
    }
  });

