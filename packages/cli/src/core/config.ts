import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
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

  // Check home directory
  const homeConfig = path.join(os.homedir(), '.config', 'quiv', 'config.json');
  if (fs.existsSync(homeConfig)) {
    return homeConfig;
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

  // Resolve sibling registry & meta repos if not explicitly set
  let registryPath = envRegistryPath || fileConfig.registryPath;
  let metaPath = envMetaPath || fileConfig.metaPath;

  if (knowledgePath) {
    const parentDir = path.dirname(path.resolve(knowledgePath));
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

export function isKnowledgeRepo(dir: string): boolean {
  try {
    const hasAgents = fs.existsSync(path.join(dir, 'AGENTS.md'));
    const hasIndex = fs.existsSync(path.join(dir, 'INDEX.md'));
    const hasPrimitives = fs.existsSync(path.join(dir, 'primitives'));
    const hasFeatures = fs.existsSync(path.join(dir, 'features'));

    return (hasAgents || hasIndex) && (hasPrimitives || hasFeatures);
  } catch {
    return false;
  }
}
