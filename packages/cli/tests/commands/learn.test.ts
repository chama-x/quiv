import { describe, it, expect, beforeEach, afterEach } from 'bun:test';
import path from 'node:path';
import fs from 'node:fs';
import os from 'node:os';
import matter from 'gray-matter';
import { scanKnowledgeRepo } from '../../src/core/scanner.js';

describe('Learn / Extract Command', () => {
  const tmpDir = path.join(os.tmpdir(), `quiv-test-learn-${Date.now()}`);
  const knowledgeDir = path.join(tmpDir, 'knowledge');
  const projectDir = path.join(tmpDir, 'project');

  beforeEach(() => {
    fs.mkdirSync(path.join(knowledgeDir, 'compositions'), { recursive: true });
    fs.mkdirSync(path.join(knowledgeDir, 'primitives'), { recursive: true });
    fs.writeFileSync(path.join(knowledgeDir, 'INDEX.md'), '# Knowledge Base Index\n', 'utf-8');

    fs.mkdirSync(path.join(projectDir, 'src', 'components'), { recursive: true });
    fs.writeFileSync(
      path.join(projectDir, 'src', 'components', 'VelocityDrawer.tsx'),
      'export const VelocityDrawer = () => <div>Drawer</div>;\n',
      'utf-8'
    );
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('scaffolds pattern README with Lore-lite metadata in knowledge tier', () => {
    const patternName = 'velocity-drawer';
    const targetDir = path.join(knowledgeDir, 'compositions', patternName);
    fs.mkdirSync(targetDir, { recursive: true });

    // Copy source component
    fs.copyFileSync(
      path.join(projectDir, 'src', 'components', 'VelocityDrawer.tsx'),
      path.join(targetDir, 'VelocityDrawer.tsx')
    );

    const readmeContent = `---
name: ${patternName}
status: VALIDATED
version: "1.0"
used_in: 1
domain: mobile-ui
capability: gesture-navigation
tags: ["ui", "gesture", "drawer", "mobile"]
description: >-
  Velocity-based gesture sheet with 60fps spring flick dismiss and safe-area snapping.
---

# Velocity Drawer

## Status
[VALIDATED] | v1.0 | Extracted from project implementation

## Problem
Standard modals fail to handle high-velocity flick dismisses on mobile devices.

## Solution
Velocity-based gesture sheet with 60fps spring flick dismiss.

## Hard Constraints
- Must use CSS touch-action: none on drag handle to prevent iOS Safari page pull-down

## Rejected Alternatives
- react-spring gesture library — 40kb bundle weight overhead

## Evidence & Verification
- 60fps sustained on iPhone 15 Pro, tested in Safari standalone PWA mode
`;

    fs.writeFileSync(path.join(targetDir, 'README.md'), readmeContent, 'utf-8');

    expect(fs.existsSync(path.join(targetDir, 'VelocityDrawer.tsx'))).toBe(true);
    expect(fs.existsSync(path.join(targetDir, 'README.md'))).toBe(true);

    const parsed = matter(fs.readFileSync(path.join(targetDir, 'README.md'), 'utf-8'));
    expect(parsed.data.name).toBe('velocity-drawer');
    expect(parsed.data.status).toBe('VALIDATED');
    expect(parsed.data.domain).toBe('mobile-ui');
    expect(parsed.data.tags).toContain('gesture');

    const scanned = scanKnowledgeRepo(knowledgeDir);
    const found = scanned.find((p) => p.name === 'velocity-drawer');
    expect(found).toBeDefined();
    expect(found?.tier).toBe('compositions');
    expect(found?.files).toContain('VelocityDrawer.tsx');
  });
});
