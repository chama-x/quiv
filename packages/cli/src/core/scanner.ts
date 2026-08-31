import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Pattern, PatternMetadata, Tier } from './types.js';
import { TIERS } from './types.js';

export function scanKnowledgeRepo(repoPath: string): Pattern[] {
  const patterns: Pattern[] = [];
  if (!fs.existsSync(repoPath)) {
    return patterns;
  }

  for (const tier of TIERS) {
    const tierDir = path.join(repoPath, tier);
    if (!fs.existsSync(tierDir)) continue;

    scanTierDirectory(tierDir, tier, repoPath, patterns);
  }

  return patterns;
}

function scanTierDirectory(
  currentDir: string,
  tier: Tier,
  repoRoot: string,
  outPatterns: Pattern[]
): void {
  const baseName = path.basename(currentDir);

  // Ignore directories starting with _ or known non-pattern folders
  if (
    baseName.startsWith('_') ||
    baseName === 'examples' ||
    baseName === 'node_modules' ||
    baseName === 'dist' ||
    baseName === '.git'
  ) {
    return;
  }

  const entries = fs.readdirSync(currentDir, { withFileTypes: true });

  const hasReadme = entries.some(
    (e) => e.isFile() && e.name.toLowerCase() === 'readme.md'
  );
  const relPath = path.relative(repoRoot, currentDir);
  const isTierRoot = relPath === tier;

  if (!isTierRoot && hasReadme) {
    const pattern = parsePatternDirectory(currentDir, tier, repoRoot);
    if (pattern) {
      outPatterns.push(pattern);
    }
  }

  // Recurse into subdirectories
  for (const entry of entries) {
    if (
      entry.isDirectory() &&
      !entry.name.startsWith('.') &&
      !entry.name.startsWith('_') &&
      entry.name !== 'node_modules' &&
      entry.name !== 'examples'
    ) {
      scanTierDirectory(path.join(currentDir, entry.name), tier, repoRoot, outPatterns);
    }
  }
}

export function parsePatternDirectory(
  dirPath: string,
  tier: Tier,
  repoRoot: string
): Pattern | null {
  const relPath = path.relative(repoRoot, dirPath);
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  const readmeEntry = entries.find(
    (e) => e.isFile() && e.name.toLowerCase() === 'readme.md'
  );

  if (!readmeEntry) return null;

  const readmePath = path.join(dirPath, readmeEntry.name);
  const content = fs.readFileSync(readmePath, 'utf-8');

  // Requirement: Must have YAML frontmatter containing `name:`
  let metadata: PatternMetadata = {};
  let summary = '';

  try {
    const parsed = matter(content);
    if (!parsed.data || typeof parsed.data !== 'object' || !parsed.data.name) {
      // Missing required YAML frontmatter with `name:` -> skip directory (internal docs)
      return null;
    }
    metadata = { ...parsed.data };
    const body = parsed.content.trim();
    summary = extractSummary(body);
  } catch {
    // Malformed frontmatter -> skip
    return null;
  }

  const files: string[] = [];
  for (const entry of entries) {
    if (entry.isFile() && !entry.name.startsWith('.')) {
      files.push(entry.name);
    }
  }

  const patternName: string = typeof metadata.name === 'string' ? metadata.name : path.basename(dirPath);

  return {
    path: relPath,
    tier,
    name: patternName,
    metadata: {
      status: metadata.status || 'EXPERIMENTAL',
      version: metadata.version || '1.0',
      used_in: metadata.used_in ?? 0,
      domain: metadata.domain || 'shared',
      capability: metadata.capability || 'general',
      tags: Array.isArray(metadata.tags) ? metadata.tags : [],
      depends_on: Array.isArray(metadata.depends_on) ? metadata.depends_on : [],
      description: metadata.description || summary,
      ...metadata,
    },
    readmePath,
    summary: metadata.description || summary,
    files,
    fullPath: dirPath,
  };
}

function extractSummary(markdown: string): string {
  const lines = markdown.split('\n');
  const nonHeadingLines: string[] = [];

  let inProblemSection = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith('#')) {
      if (/^##\s+Problem/i.test(trimmed)) {
        inProblemSection = true;
        continue;
      } else if (inProblemSection && trimmed.startsWith('##')) {
        break;
      }
      continue;
    }

    if (inProblemSection) {
      nonHeadingLines.push(trimmed);
      if (nonHeadingLines.length >= 2) break;
    } else if (nonHeadingLines.length === 0 && !trimmed.startsWith('>')) {
      nonHeadingLines.push(trimmed);
    }
  }

  return nonHeadingLines.join(' ') || 'No description available.';
}

export function getPatternByPath(repoPath: string, patternPath: string): Pattern | null {
  const fullPath = path.resolve(repoPath, patternPath);
  if (!fs.existsSync(fullPath)) return null;

  const rel = path.relative(repoPath, fullPath);
  const tier = TIERS.find((t) => rel.startsWith(t));
  if (!tier) return null;

  return parsePatternDirectory(fullPath, tier, repoPath);
}
