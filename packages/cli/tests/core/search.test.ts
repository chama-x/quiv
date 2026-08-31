import { describe, it, expect } from 'bun:test';
import { scanKnowledgeRepo } from '../../src/core/scanner.js';
import { searchPatterns } from '../../src/core/search.js';
import { getScaffoldPath } from '../test-utils.js';

describe('Search Core', () => {
  const scaffoldKnowledgeDir = getScaffoldPath('knowledge');
  const patterns = scanKnowledgeRepo(scaffoldKnowledgeDir);

  it('finds patterns by exact keyword', () => {
    const results = searchPatterns(patterns, 'offline-sync');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].pattern.name).toBe('offline-sync');
    expect(results[0].score).toBeGreaterThan(50);
  });

  it('finds patterns by natural problem query', () => {
    const results = searchPatterns(patterns, 'conflict resolution in offline storage');
    expect(results.length).toBeGreaterThan(0);
    const topNames = results.slice(0, 3).map((r) => r.pattern.name);
    expect(topNames.includes('conflictResolution') || topNames.includes('offline-sync')).toBe(true);
  });

  it('finds patterns via synonym expansion', () => {
    const results = searchPatterns(patterns, 'sync');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r.pattern.name === 'offline-sync')).toBe(true);
  });

  it('returns empty array when query does not match anything', () => {
    const results = searchPatterns(patterns, 'xyznonexistentterm12345');
    expect(results.length).toBe(0);
  });
});
