import { Command } from 'commander';
import { loadConfig } from '../core/config.js';
import { checkProjectUpdates } from '../core/registry.js';
import chalk from 'chalk';

export const checkCommand = new Command('check')
  .description('Check if patterns used by a project have newer versions in knowledge repo')
  .requiredOption('-P, --project <project-name>', 'Name of the project to check')
  .option('-p, --path <path>', 'Explicit path to knowledge repository')
  .option('-r, --registry <path>', 'Explicit path to registry repository')
  .action((options) => {
    const config = loadConfig(options.path);

    if (!config.knowledgePath) {
      console.error(
        chalk.red(
          'Error: Could not locate knowledge repository.\n' +
            'Run `quiv init` or specify `--path <path>` / set `QUIV_KNOWLEDGE_PATH`.'
        )
      );
      process.exit(1);
    }

    if (!config.registryPath) {
      console.error(
        chalk.red(
          'Error: Could not locate registry repository.\n' +
            'Specify `--registry <path>` or set `QUIV_REGISTRY_PATH`.'
        )
      );
      process.exit(1);
    }

    const updates = checkProjectUpdates(
      config.registryPath,
      config.knowledgePath,
      options.project
    );

    if (updates.length === 0) {
      console.log(chalk.yellow(`No tracked patterns found for project "${options.project}" in registry.`));
      return;
    }

    console.log(chalk.bold(`\nPattern version status for: ${options.project}`));
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
