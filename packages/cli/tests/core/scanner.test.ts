import { describe, it, expect } from 'bun:test';
import { scanKnowledgeRepo, getPatternByPath } from '../../src/core/scanner.js';
import { getScaffoldPath } from '../test-utils.js';

describe('Scanner Core', () => {
  const scaffoldKnowledgeDir = getScaffoldPath('knowledge');

  it('scans scaffold knowledge repository and identifies patterns', () => {
    const patterns = scanKnowledgeRepo(scaffoldKnowledgeDir);
    expect(patterns.length).toBeGreaterThan(0);

    const offlineSync = patterns.find((p) => p.name === 'offline-sync');
    expect(offlineSync).toBeDefined();
    expect(offlineSync?.tier).toBe('features');
    expect(offlineSync?.metadata.status).toBe('PROVEN');
    expect(offlineSync?.metadata.version).toBe('2.0');
  });

  it('retrieves specific pattern by relative path', () => {
    const pattern = getPatternByPath(
      scaffoldKnowledgeDir,
      'primitives/hooks/useOfflineEntity'
    );
    expect(pattern).not.toBeNull();
    expect(pattern?.name).toBe('useOfflineEntity');
  });
});
