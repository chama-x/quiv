import fs from 'node:fs';
import path from 'node:path';
import type { DependencyRule, ProjectUsage } from './types.js';
import { scanKnowledgeRepo } from './scanner.js';

export function readActiveProjects(registryDir?: string): ProjectUsage[] {
  if (!registryDir || !fs.existsSync(registryDir)) return [];

  // 1. Try structured projects.json first
  const jsonPath = path.join(registryDir, 'projects.json');
  if (fs.existsSync(jsonPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
      if (data && data.projects && typeof data.projects === 'object') {
        const projects: ProjectUsage[] = [];
        for (const [projectName, pData] of Object.entries(data.projects as Record<string, any>)) {
          const patterns = (pData.patterns || []).map((pStr: string) => {
            const [name, version] = pStr.split('@');
            return {
              name: name.trim(),
              version: version ? version.trim() : 'latest',
            };
          });
          projects.push({
            projectName,
            patterns,
            lastSync: pData.last_sync || '',
          });
        }
        return projects;
      }
    } catch {
      // Fallback to markdown
    }
  }

  // 2. Fallback to active-projects.md
  const filePath = path.join(registryDir, 'active-projects.md');
  if (!fs.existsSync(filePath)) return [];

  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const projects: ProjectUsage[] = [];

  let inTable = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith('| Project') || trimmed.startsWith('| **Project**')) {
      inTable = true;
      continue;
    }

    if (inTable) {
      if (!trimmed.startsWith('|') || trimmed.includes('---')) continue;

      const cells = trimmed
        .split('|')
        .map((c) => c.trim())
        .filter((c) => c.length > 0);

      if (cells.length >= 2) {
        const projectName = cells[0].replace(/\*\*/g, '');
        const patternsRaw = cells[1];
        const lastSync = cells[2] || '';

        const patterns = patternsRaw
          .split(',')
          .map((p) => p.trim())
          .filter((p) => p.length > 0)
          .map((p) => {
            const [name, version] = p.split('@');
            return {
              name: name.trim(),
              version: version ? version.trim() : 'latest',
            };
          });

        if (projectName && !projectName.toLowerCase().includes('example')) {
          projects.push({
            projectName,
            patterns,
            lastSync,
          });
        }
      }
    }
  }

  return projects;
}

export function recordProjectUsage(
  registryDir: string,
  projectName: string,
  patternsToAdd: Array<{ name: string; version: string }>,
  repoUrl?: string
): void {
  if (!fs.existsSync(registryDir)) {
    fs.mkdirSync(registryDir, { recursive: true });
  }

  const existingProjects = readActiveProjects(registryDir);
  const existingIdx = existingProjects.findIndex(
    (p) => p.projectName.toLowerCase() === projectName.toLowerCase()
  );

  const today = new Date().toISOString().split('T')[0];

  if (existingIdx >= 0) {
    const existing = existingProjects[existingIdx];
    for (const toAdd of patternsToAdd) {
      const pIdx = existing.patterns.findIndex((p) => p.name === toAdd.name);
      if (pIdx >= 0) {
        existing.patterns[pIdx].version = toAdd.version;
      } else {
        existing.patterns.push(toAdd);
      }
    }
    existing.lastSync = today;
  } else {
    existingProjects.push({
      projectName,
      patterns: patternsToAdd,
      lastSync: today,
    });
  }

  // 1. Write structured projects.json
  const jsonPath = path.join(registryDir, 'projects.json');
  const projectsObj: Record<string, any> = {};
  for (const proj of existingProjects) {
    projectsObj[proj.projectName] = {
      patterns: proj.patterns.map((p) => `${p.name}@${p.version}`),
      last_sync: proj.lastSync || today,
      repo: repoUrl || `quiv-knowledge/${proj.projectName}`,
    };
  }
  fs.writeFileSync(jsonPath, JSON.stringify({ projects: projectsObj }, null, 2), 'utf-8');

  // 2. Also keep active-projects.md synced for markdown readability
  const mdPath = path.join(registryDir, 'active-projects.md');
  let out = `# Project Registry\n\n## Active Projects\n| Project | Patterns Used | Last Sync |\n|---------|---------------|-----------|\n`;
  for (const proj of existingProjects) {
    const patternStr = proj.patterns.map((p) => `${p.name}@${p.version}`).join(', ');
    out += `| ${proj.projectName} | ${patternStr} | ${proj.lastSync || today} |\n`;
  }
  fs.writeFileSync(mdPath, out, 'utf-8');
}

export function readDependencies(registryDir?: string): DependencyRule[] {
  if (!registryDir || !fs.existsSync(registryDir)) return [];

  // 1. Try structured dependencies.json first
  const jsonPath = path.join(registryDir, 'dependencies.json');
  if (fs.existsSync(jsonPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
      if (data && data.dependencies && typeof data.dependencies === 'object') {
        const rules: DependencyRule[] = [];
        for (const [pattern, depList] of Object.entries(data.dependencies as Record<string, string[]>)) {
          const dependsOn = depList.map((depStr) => {
            const [target, constraint] = depStr.split('@');
            return {
              target: target.trim(),
              constraint: constraint ? constraint.trim() : '^1.0',
            };
          });
          rules.push({ pattern, dependsOn });
        }
        return rules;
      }
    } catch {
      // Fallback to markdown
    }
  }

  // 2. Fallback to dependencies.md
  const filePath = path.join(registryDir, 'dependencies.md');
  if (!fs.existsSync(filePath)) return [];

  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const rules: DependencyRule[] = [];

  let currentPattern = '';
  let currentDeps: Array<{ target: string; constraint: string }> = [];

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith('## ') && trimmed.includes('depends on:')) {
      if (currentPattern && currentDeps.length > 0) {
        rules.push({ pattern: currentPattern, dependsOn: currentDeps });
      }
      currentPattern = trimmed
        .replace(/^##\s+/, '')
        .replace(/\s+depends on:.*$/i, '')
        .trim();
      currentDeps = [];
      continue;
    }

    if (trimmed.startsWith('- ') && currentPattern) {
      const depStr = trimmed.replace(/^-+\s+/, '').trim();
      const [target, constraint] = depStr.split('@');
      currentDeps.push({
        target: target.trim(),
        constraint: constraint ? constraint.trim() : '^1.0',
      });
    }
  }

  if (currentPattern && currentDeps.length > 0) {
    rules.push({ pattern: currentPattern, dependsOn: currentDeps });
  }

  return rules;
}

export function checkProjectUpdates(
  registryDir: string | undefined,
  knowledgeRepoPath: string,
  projectName: string
): Array<{
  pattern: string;
  currentVersion: string;
  availableVersion: string;
  isOutdated: boolean;
}> {
  const projects = readActiveProjects(registryDir);
  const project = projects.find(
    (p) => p.projectName.toLowerCase() === projectName.toLowerCase()
  );

  if (!project) return [];

  const availablePatterns = scanKnowledgeRepo(knowledgeRepoPath);
  const results: Array<{
    pattern: string;
    currentVersion: string;
    availableVersion: string;
    isOutdated: boolean;
  }> = [];

  for (const used of project.patterns) {
    const matched = availablePatterns.find(
      (p) => p.name.toLowerCase() === used.name.toLowerCase() || p.path === used.name
    );

    const availableVersion = matched?.metadata.version || '1.0';
    const isOutdated =
      used.version !== 'latest' &&
      used.version !== availableVersion &&
      compareVersions(availableVersion, used.version) > 0;

    results.push({
      pattern: used.name,
      currentVersion: used.version,
      availableVersion,
      isOutdated,
    });
  }

  return results;
}

function compareVersions(v1: string, v2: string): number {
  const clean = (v: string) => v.replace(/^v/i, '').split('.').map((n) => parseInt(n, 10) || 0);
  const p1 = clean(v1);
  const p2 = clean(v2);
  const maxLen = Math.max(p1.length, p2.length);

  for (let i = 0; i < maxLen; i++) {
    const n1 = p1[i] || 0;
    const n2 = p2[i] || 0;
    if (n1 > n2) return 1;
    if (n1 < n2) return -1;
  }
  return 0;
}
