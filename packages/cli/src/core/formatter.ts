import chalk from 'chalk';
import type { OutputFormat, Pattern, ProjectUsage, ReadLevel } from './types.js';
import type { SearchResult } from './search.js';
import fs from 'node:fs';

export function formatPatternList(patterns: Pattern[], format: OutputFormat = 'compact'): string {
  if (format === 'json') {
    return JSON.stringify(
      patterns.map((p) => ({
        name: p.name,
        path: p.path,
        tier: p.tier,
        status: p.metadata.status || 'EXPERIMENTAL',
        version: p.metadata.version || '1.0',
        summary: p.summary,
        depends_on: p.metadata.depends_on || [],
      })),
      null,
      2
    );
  }

  if (format === 'table') {
    let out = `| Name | Path | Tier | Status | Version |\n`;
    out += `|------|------|------|--------|---------|\n`;
    for (const p of patterns) {
      const status = p.metadata.status || 'EXPERIMENTAL';
      const version = p.metadata.version || '1.0';
      out += `| ${p.name} | \`${p.path}\` | ${p.tier} | ${status} | ${version} |\n`;
    }
    return out.trim();
  }

  // Compact mode (Default: token-optimized for AI agents)
  if (patterns.length === 0) {
    return 'No patterns found.';
  }

  const lines: string[] = [];
  lines.push(`Total patterns: ${patterns.length}`);

  // Group by tier
  const tiers = ['primitives', 'domain', 'features', 'compositions', 'templates'] as const;
  for (const tier of tiers) {
    const tierPatterns = patterns.filter((p) => p.tier === tier);
    if (tierPatterns.length === 0) continue;

    lines.push(`\n[${tier.toUpperCase()}] (${tierPatterns.length})`);
    for (const p of tierPatterns) {
      const status = p.metadata.status || 'EXP';
      const shortStatus =
        status === 'PROVEN' ? chalk.green('PROVEN') :
        status === 'VALIDATED' ? chalk.cyan('VALID') :
        chalk.yellow('EXP');
      const version = p.metadata.version ? `v${p.metadata.version}` : 'v1.0';
      lines.push(`  • ${p.path} [${shortStatus}|${version}] - ${p.summary.slice(0, 80)}`);
    }
  }

  return lines.join('\n');
}

export function formatPatternRead(
  pattern: Pattern,
  level: ReadLevel = 'full',
  knowledgeRepoPath?: string
): string {
  if (!pattern.readmePath || !fs.existsSync(pattern.readmePath)) {
    return `# ${pattern.name}\n\nPath: ${pattern.path}\nTier: ${pattern.tier}\nSummary: ${pattern.summary}\n(No README.md found)`;
  }

  const rawReadme = fs.readFileSync(pattern.readmePath, 'utf-8');

  if (level === 'overview') {
    // Return only top metadata + problem + solution summary
    const lines = rawReadme.split('\n');
    const overviewLines: string[] = [];
    let sectionCount = 0;

    for (const line of lines) {
      if (line.startsWith('## Implementation') || line.startsWith('## Constraints') || line.startsWith('## When NOT')) {
        break;
      }
      overviewLines.push(line);
      if (line.startsWith('## ')) sectionCount++;
      if (sectionCount >= 3) break;
    }

    return overviewLines.join('\n').trim();
  }

  if (level === 'full') {
    return rawReadme.trim();
  }

  if (level === 'implementation') {
    let out = rawReadme.trim() + '\n\n---\n## Code Files & Implementation\n';

    if (pattern.files.length === 0) {
      out += '\n_No additional code files in pattern directory._';
    } else {
      for (const fileName of pattern.files) {
        if (fileName.toLowerCase() === 'readme.md') continue;
        const filePath = `${pattern.fullPath}/${fileName}`;
        if (fs.existsSync(filePath)) {
          try {
            const content = fs.readFileSync(filePath, 'utf-8');
            const ext = fileName.split('.').pop() || '';
            out += `\n### \`${fileName}\`\n\`\`\`${ext}\n${content}\n\`\`\`\n`;
          } catch {
            out += `\n### \`${fileName}\` (unable to read content)\n`;
          }
        }
      }
    }

    return out;
  }

  return rawReadme;
}

export function formatSearchResults(results: SearchResult[], format: OutputFormat = 'compact'): string {
  if (format === 'json') {
    return JSON.stringify(
      results.map((r) => ({
        path: r.pattern.path,
        name: r.pattern.name,
        tier: r.pattern.tier,
        status: r.pattern.metadata.status || 'EXPERIMENTAL',
        score: r.score,
        matchedOn: r.matchedField,
        snippet: r.snippet,
      })),
      null,
      2
    );
  }

  if (results.length === 0) {
    return 'No matching patterns found.';
  }

  const lines: string[] = [];
  lines.push(`Found ${results.length} matching pattern(s):`);

  for (const r of results) {
    const status = r.pattern.metadata.status || 'EXP';
    lines.push(`\n[Score: ${r.score}] ${r.pattern.path} (${status})`);
    lines.push(`  Match: ${r.matchedField}`);
    if (r.snippet) {
      lines.push(`  "${r.snippet}"`);
    }
  }

  return lines.join('\n');
}

export function formatStatus(patterns: Pattern[], projects: ProjectUsage[] = []): string {
  const total = patterns.length;
  const proven = patterns.filter((p) => (p.metadata.status || 'EXP') === 'PROVEN').length;
  const valid = patterns.filter((p) => (p.metadata.status || 'EXP') === 'VALIDATED').length;
  const exp = patterns.filter((p) => (p.metadata.status || 'EXP') === 'EXPERIMENTAL').length;

  const byTier: Record<string, number> = {};
  for (const p of patterns) {
    byTier[p.tier] = (byTier[p.tier] || 0) + 1;
  }

  const tierSummary = Object.entries(byTier)
    .map(([t, count]) => `${t}: ${count}`)
    .join(' | ');

  let out = `QUIV KNOWLEDGE STATUS\n`;
  out += `────────────────────────────────────────\n`;
  out += `Total Patterns: ${total} (Proven: ${proven}, Validated: ${valid}, Experimental: ${exp})\n`;
  out += `By Tier:        ${tierSummary || 'none'}\n`;
  out += `Active Projects:${projects.length}\n`;

  if (projects.length > 0) {
    out += `\nTracked Projects:\n`;
    for (const proj of projects) {
      out += `  • ${proj.projectName} (${proj.patterns.length} patterns used)\n`;
    }
  }

  return out.trim();
}
