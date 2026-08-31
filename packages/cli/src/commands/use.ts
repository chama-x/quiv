import { Command } from 'commander';
import path from 'node:path';
import fs from 'node:fs';
import { loadConfig, detectProjectName } from '../core/config.js';
import { getPatternByPath, scanKnowledgeRepo } from '../core/scanner.js';
import { recordProjectUsage } from '../core/registry.js';
import type { Pattern } from '../core/types.js';
import chalk from 'chalk';

export const useCommand = new Command('use')
  .description('Get pattern and dependent building blocks for project implementation')
  .argument('<pattern-path>', 'Path or name of the pattern to use')
  .option('-P, --project <project-name>', 'Name of the current project (required for registry tracking)')
  .option('-d, --dest <directory>', 'Destination directory to write pattern files (e.g. ./src or .)')
  .option('-w, --write', 'Write and scaffold pattern files to destination', false)
  .option('--copy', 'Alias for --write', false)
  .option('--flat', 'Scaffold files directly into destination directory without subfolder nesting', false)
  .option('-p, --path <path>', 'Explicit path to knowledge repository')
  .option('-r, --registry <path>', 'Explicit path to registry repository')
  .action((patternPathArg, options, cmd) => {
    const globalOpts = cmd?.parent?.opts() || {};
    const knowledgePathOpt = options.path || globalOpts.path;
    const registryPathOpt = options.registry || globalOpts.registry;

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

    // Scaffolding / File Writing if dest or write requested
    const shouldWrite = Boolean(options.dest || options.write || options.copy);
    const destDir = options.dest ? path.resolve(options.dest) : (options.write || options.copy ? process.cwd() : null);

    const writtenFiles: string[] = [];

    if (shouldWrite && destDir) {
      const patternsToCopy = [pattern, ...resolvedDeps];
      for (const pat of patternsToCopy) {
        if (pat.readmePath) {
          const srcDir = path.dirname(pat.readmePath);
          const targetDir = options.flat && pat === pattern ? destDir : path.join(destDir, pat.path);
          const copied = copyPatternFiles(srcDir, targetDir);
          writtenFiles.push(...copied);
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

    if (writtenFiles.length > 0 && destDir) {
      console.log(chalk.green(`✓ Scaffolded ${writtenFiles.length} file(s) into: ${destDir}`));
      for (const f of writtenFiles.slice(0, 10)) {
        console.log(chalk.gray(`  • ${path.relative(destDir, f)}`));
      }
      if (writtenFiles.length > 10) {
        console.log(chalk.gray(`  ... and ${writtenFiles.length - 10} more files`));
      }
      console.log('');
    } else {
      const checkoutPaths = [pattern.path, ...resolvedDeps.map((d) => d.path)].join(' \\\n    ');
      console.log(chalk.cyan(`Sparse-checkout command (if importing selectively):`));
      console.log(`git sparse-checkout set \\\n    ${checkoutPaths}\n`);
      console.log(chalk.gray(`Tip: Run with --dest <directory> or --write to scaffold files directly.\n`));
    }

    // Record in registry (auto-detect project name if not explicitly passed)
    const projectName = detectProjectName(options.project);
    const effectiveRegistryPath = registryPathOpt || config.registryPath;

    if (projectName && effectiveRegistryPath) {
      const patternsToRecord = [
        { name: pattern.name, version: `v${pattern.metadata.version || '1.0'}` },
        ...resolvedDeps.map((d) => ({
          name: d.name,
          version: `v${d.metadata.version || '1.0'}`,
        })),
      ];
      recordProjectUsage(effectiveRegistryPath, projectName, patternsToRecord);
      console.log(chalk.green(`✓ Recorded in registry for project: "${projectName}"`));
    } else if (projectName) {
      console.log(
        chalk.gray(`Note: Registry repo not detected. Usage not written to disk. (Set QUIV_REGISTRY_PATH to enable)`)
      );
    }
  });

function copyPatternFiles(srcDir: string, targetDir: string): string[] {
  const written: string[] = [];
  if (!fs.existsSync(srcDir)) return written;

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    if (
      entry.name === 'node_modules' ||
      entry.name === '.git' ||
      entry.name === '.DS_Store'
    ) {
      continue;
    }

    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      written.push(...copyPatternFiles(srcPath, destPath));
    } else {
      fs.copyFileSync(srcPath, destPath);
      written.push(destPath);
    }
  }

  return written;
}

