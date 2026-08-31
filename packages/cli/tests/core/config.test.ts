import { describe, it, expect, beforeEach, afterEach } from 'bun:test';
import path from 'node:path';
import fs from 'node:fs';
import os from 'node:os';
import { loadConfig, isKnowledgeRepo, saveConfig } from '../../src/core/config.js';

describe('Config Core', () => {
  const tmpDir = path.join(os.tmpdir(), `quiv-test-config-${Date.now()}`);

  beforeEach(() => {
    fs.mkdirSync(tmpDir, { recursive: true });
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('detects a valid knowledge repo structure', () => {
    expect(isKnowledgeRepo(tmpDir)).toBe(false);

    fs.writeFileSync(path.join(tmpDir, 'INDEX.md'), '# Index', 'utf-8');
    fs.mkdirSync(path.join(tmpDir, 'primitives'), { recursive: true });

    expect(isKnowledgeRepo(tmpDir)).toBe(true);
  });

  it('loads default configuration when no files exist', () => {
    const config = loadConfig(tmpDir);
    expect(config.org).toBe('quiv-knowledge');
  });

  it('saves and loads configuration correctly', () => {
    saveConfig({ org: 'custom-org', defaultFormat: 'table' }, tmpDir);
    const configFile = path.join(tmpDir, '.quivrc');
    expect(fs.existsSync(configFile)).toBe(true);

    const saved = JSON.parse(fs.readFileSync(configFile, 'utf-8'));
    expect(saved.org).toBe('custom-org');
    expect(saved.defaultFormat).toBe('table');
  });
});
