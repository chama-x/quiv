import { describe, it, expect } from 'bun:test';
import {
  formatPatternList,
  formatPatternRead,
  formatStatus,
} from '../../src/core/formatter.js';
import { scanKnowledgeRepo } from '../../src/core/scanner.js';
import { getScaffoldPath } from '../test-utils.js';

describe('Formatter Core', () => {
  const scaffoldKnowledgeDir = getScaffoldPath('knowledge');
  const patterns = scanKnowledgeRepo(scaffoldKnowledgeDir);

  it('formats pattern list in compact, table, and json formats', () => {
    const compact = formatPatternList(patterns, 'compact');
    expect(compact).toContain('Total patterns:');

    const table = formatPatternList(patterns, 'table');
    expect(table).toContain('primitives');

    const json = formatPatternList(patterns, 'json');
    expect(() => JSON.parse(json)).not.toThrow();
  });

  it('formats pattern read with progressive disclosure levels', () => {
    const offlineSync = patterns.find((p) => p.name === 'offline-sync') || patterns[0];
    if (offlineSync) {
      const overview = formatPatternRead(offlineSync, 'overview', scaffoldKnowledgeDir);
      expect(overview).toContain('Status');

      const full = formatPatternRead(offlineSync, 'full', scaffoldKnowledgeDir);
      expect(full).toContain('Problem');
    }
  });

  it('formats status report concisely', () => {
    const report = formatStatus(patterns, []);
    expect(report).toContain('QUIV KNOWLEDGE STATUS');
    expect(report).toContain('Total Patterns:');
  });
});
