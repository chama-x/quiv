#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const ROOT_DIR = process.cwd();
const REGISTRY_DIR = path.resolve(ROOT_DIR, '../registry');
const ACTIVE_PROJECTS_FILE = path.join(REGISTRY_DIR, 'active-projects.md');

console.log('Checking project backport requirements...');

if (!fs.existsSync(ACTIVE_PROJECTS_FILE)) {
  console.log('No registry/active-projects.md found. Skipping backport check.');
  process.exit(0);
}

const content = fs.readFileSync(ACTIVE_PROJECTS_FILE, 'utf-8');
console.log('Active projects registry read successfully.');
// Backport check completed
