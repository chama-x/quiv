import { Command } from 'commander';
import { listCommand } from './commands/list.js';
import { readCommand } from './commands/read.js';
import { findCommand } from './commands/find.js';
import { useCommand } from './commands/use.js';
import { contributeCommand } from './commands/contribute.js';
import { checkCommand } from './commands/check.js';
import { statusCommand } from './commands/status.js';
import { initCommand } from './commands/init.js';

const program = new Command();

program
  .name('quiv')
  .alias('qv')
  .description('Agent Knowledge Kit (quiv/qv) — High-efficiency reusable architecture for AI coding agents')
  .version('0.1.0');

// Register all subcommands
program.addCommand(listCommand);
program.addCommand(readCommand);
program.addCommand(findCommand);
program.addCommand(useCommand);
program.addCommand(contributeCommand);
program.addCommand(checkCommand);
program.addCommand(statusCommand);
program.addCommand(initCommand);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
