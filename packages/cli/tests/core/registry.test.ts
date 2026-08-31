import { describe, it, expect, beforeEach, afterEach } from 'bun:test';
import path from 'node:path';
import fs from 'node:fs';
import os from 'node:os';
import {
  readActiveProjects,
  recordProjectUsage,
  readDependencies,
  checkProjectUpdates,
} from '../../src/core/registry.js';
import { getScaffoldPath } from '../test-utils.js';

describe('Registry Core', () => {
  const tmpDir = path.join(os.tmpdir(), `quiv-test-registry-${Date.now()}`);
  const scaffoldKnowledgeDir = getScaffoldPath('knowledge');

  beforeEach(() => {
    fs.mkdirSync(tmpDir, { recursive: true });
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('records and reads active projects via JSON and markdown', () => {
    recordProjectUsage(tmpDir, 'test-app', [
      { name: 'offline-sync', version: 'v1.0' },
      { name: 'useOfflineEntity', version: 'v1.0' },
    ]);

    const projects = readActiveProjects(tmpDir);
    expect(projects.length).toBe(1);
    expect(projects[0].projectName).toBe('test-app');
    expect(projects[0].patterns.length).toBe(2);

    expect(fs.existsSync(path.join(tmpDir, 'projects.json'))).toBe(true);
  });

  it('detects outdated pattern versions for active projects', () => {
    recordProjectUsage(tmpDir, 'legacy-app', [
      { name: 'offline-sync', version: '1.0' },
    ]);

    const updates = checkProjectUpdates(tmpDir, scaffoldKnowledgeDir, 'legacy-app');
    expect(updates.length).toBe(1);
    expect(updates[0].pattern).toBe('offline-sync');
    expect(updates[0].currentVersion).toBe('1.0');
    expect(updates[0].availableVersion).toBe('2.0');
    expect(updates[0].isOutdated).toBe(true);
  });

  it('reads dependencies from markdown or JSON', () => {
    const scaffoldRegistry = getScaffoldPath('registry');
    const deps = readDependencies(scaffoldRegistry);
    expect(deps.length).toBeGreaterThan(0);
    const offlineSyncDep = deps.find((d) => d.pattern.includes('offline-sync'));
    expect(offlineSyncDep).toBeDefined();
  });
});
