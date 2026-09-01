import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import type { QuivConfig } from './types.js';

const DEFAULT_ORG = 'quiv-knowledge';
const CONFIG_FILE_NAMES = ['.quivrc', '.quivrc.json', 'quiv.config.json'];

export function findConfigFile(startDir: string = process.cwd()): string | null {
  let curr = path.resolve(startDir);
  while (true) {
    for (const name of CONFIG_FILE_NAMES) {
      const candidate = path.join(curr, name);
      if (fs.existsSync(candidate)) {
        return candidate;
      }
    }
    const parent = path.dirname(curr);
    if (parent === curr) break;
    curr = parent;
  }

  // Check home directory locations
  const globalConfigCandidates = [
    path.join(os.homedir(), '.config', 'quiv', 'config.json'),
    path.join(os.homedir(), '.quiv', 'config.json'),
    path.join(os.homedir(), '.quivrc'),
  ];

  for (const candidate of globalConfigCandidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return null;
}

export function loadConfig(explicitKnowledgePath?: string): QuivConfig {
  let fileConfig: Partial<QuivConfig> = {};
  const configFile = findConfigFile();

  if (configFile) {
    try {
      const content = fs.readFileSync(configFile, 'utf-8');
      fileConfig = JSON.parse(content);
    } catch {
      // Ignore parse errors, fallback to defaults
    }
  }

  const envOrg = process.env.QUIV_ORG;
  const envKnowledgePath = process.env.QUIV_KNOWLEDGE_PATH;
  const envRegistryPath = process.env.QUIV_REGISTRY_PATH;
  const envMetaPath = process.env.QUIV_META_PATH;

  const org = envOrg || fileConfig.org || DEFAULT_ORG;

  // Resolve knowledge path
  let knowledgePath = explicitKnowledgePath || envKnowledgePath || fileConfig.knowledgePath;
  if (!knowledgePath) {
    knowledgePath = autoDetectKnowledgeRepo(process.cwd());
  }

  // If still not resolved, check standard global and package-relative locations
  if (!knowledgePath) {
    knowledgePath = resolveGlobalOrPackageKnowledge();
  }

  // Auto-cache to ~/.config/quiv/config.json if resolved and no global config exists
  if (knowledgePath && !configFile) {
    try {
      saveGlobalConfig({
        org,
        knowledgePath: path.resolve(knowledgePath),
      });
    } catch {
      // Non-fatal if global config cannot be written
    }
  }

  // Resolve sibling registry & meta repos if not explicitly set
  let registryPath = envRegistryPath || fileConfig.registryPath;
  let metaPath = envMetaPath || fileConfig.metaPath;

  if (knowledgePath) {
    const resolvedKPath = path.resolve(knowledgePath);
    const parentDir = path.dirname(resolvedKPath);
    if (!registryPath) {
      const candidate = path.join(parentDir, 'registry');
      if (fs.existsSync(candidate)) registryPath = candidate;
    }
    if (!metaPath) {
      const candidate = path.join(parentDir, 'meta');
      if (fs.existsSync(candidate)) metaPath = candidate;
    }
  }

  return {
    org,
    knowledgePath: knowledgePath ? path.resolve(knowledgePath) : undefined,
    registryPath: registryPath ? path.resolve(registryPath) : undefined,
    metaPath: metaPath ? path.resolve(metaPath) : undefined,
    defaultFormat: fileConfig.defaultFormat || 'compact',
  };
}

export function saveConfig(config: Partial<QuivConfig>, targetDir: string = process.cwd()): string {
  const targetFile = path.join(targetDir, '.quivrc');
  const existing = fs.existsSync(targetFile)
    ? JSON.parse(fs.readFileSync(targetFile, 'utf-8'))
    : {};
  const merged = { ...existing, ...config };
  fs.writeFileSync(targetFile, JSON.stringify(merged, null, 2) + '\n', 'utf-8');
  return targetFile;
}

export function saveGlobalConfig(config: Partial<QuivConfig>): string {
  const globalDir = path.join(os.homedir(), '.config', 'quiv');
  if (!fs.existsSync(globalDir)) {
    fs.mkdirSync(globalDir, { recursive: true });
  }
  const targetFile = path.join(globalDir, 'config.json');
  const existing = fs.existsSync(targetFile)
    ? JSON.parse(fs.readFileSync(targetFile, 'utf-8'))
    : {};
  const merged = { ...existing, ...config };
  fs.writeFileSync(targetFile, JSON.stringify(merged, null, 2) + '\n', 'utf-8');
  return targetFile;
}

export function autoDetectKnowledgeRepo(dir: string): string | undefined {
  let curr = path.resolve(dir);
  while (true) {
    // Check if current directory is knowledge repo
    if (isKnowledgeRepo(curr)) {
      return curr;
    }

    // Check if there is a 'knowledge' subdirectory
    const knowledgeSub = path.join(curr, 'knowledge');
    if (fs.existsSync(knowledgeSub) && isKnowledgeRepo(knowledgeSub)) {
      return knowledgeSub;
    }

    // Check sibling directory 'knowledge'
    const siblingKnowledge = path.join(path.dirname(curr), 'knowledge');
    if (fs.existsSync(siblingKnowledge) && isKnowledgeRepo(siblingKnowledge)) {
      return siblingKnowledge;
    }

    const parent = path.dirname(curr);
    if (parent === curr) break;
    curr = parent;
  }

  return undefined;
}

export function resolveGlobalOrPackageKnowledge(): string | undefined {
  const candidates: string[] = [
    path.join(os.homedir(), '.quiv', 'knowledge'),
    path.join(os.homedir(), '.config', 'quiv', 'knowledge'),
    path.join(os.homedir(), '.local', 'share', 'quiv', 'knowledge'),
  ];

  // Also check package installation directory (for global or linked installs)
  try {
    const currentFile = fileURLToPath(import.meta.url);
    const cliPackageDir = path.resolve(path.dirname(currentFile), '..', '..');
    const monorepoKnowledge = path.resolve(cliPackageDir, '..', 'knowledge');
    if (fs.existsSync(monorepoKnowledge) && isKnowledgeRepo(monorepoKnowledge)) {
      candidates.push(monorepoKnowledge);
    }
    const scaffoldKnowledge = path.resolve(cliPackageDir, 'scaffold', 'knowledge');
    if (fs.existsSync(scaffoldKnowledge) && isKnowledgeRepo(scaffoldKnowledge)) {
      candidates.push(scaffoldKnowledge);
    }
    const rootScaffoldKnowledge = path.resolve(cliPackageDir, '..', 'scaffold', 'knowledge');
    if (fs.existsSync(rootScaffoldKnowledge) && isKnowledgeRepo(rootScaffoldKnowledge)) {
      candidates.push(rootScaffoldKnowledge);
    }
  } catch {
    // ignore
  }

  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && isKnowledgeRepo(candidate)) {
      return candidate;
    }
  }

  return undefined;
}

export function isKnowledgeRepo(dir: string): boolean {
  try {
    if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
      return false;
    }
    const hasAgents = fs.existsSync(path.join(dir, 'AGENTS.md'));
    const hasIndex = fs.existsSync(path.join(dir, 'INDEX.md'));
    const hasPrimitives = fs.existsSync(path.join(dir, 'primitives'));
    const hasFeatures = fs.existsSync(path.join(dir, 'features'));
    const hasCompositions = fs.existsSync(path.join(dir, 'compositions'));
    const hasDomain = fs.existsSync(path.join(dir, 'domain'));
    const hasTemplates = fs.existsSync(path.join(dir, 'templates'));

    const tierCount = [hasPrimitives, hasFeatures, hasCompositions, hasDomain, hasTemplates].filter(Boolean).length;

    return hasAgents || hasIndex || tierCount >= 1;
  } catch {
    return false;
  }
}

export function detectProjectName(explicit?: string, startDir: string = process.cwd()): string {
  if (explicit && explicit.trim()) return explicit.trim();

  // 1. Check package.json in startDir
  const pkgJson = path.join(startDir, 'package.json');
  if (fs.existsSync(pkgJson)) {
    try {
      const data = JSON.parse(fs.readFileSync(pkgJson, 'utf-8'));
      if (data.name) return data.name;
    } catch {
      // ignore
    }
  }

  // 2. Check .quivrc in startDir
  const quivrc = path.join(startDir, '.quivrc');
  if (fs.existsSync(quivrc)) {
    try {
      const data = JSON.parse(fs.readFileSync(quivrc, 'utf-8'));
      if (data.project) return data.project;
    } catch {
      // ignore
    }
  }

  // 3. Fallback to folder basename
  const base = path.basename(startDir);
  return base || 'unnamed-project';
}

