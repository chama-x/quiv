export type Tier = 'primitives' | 'domain' | 'features' | 'compositions' | 'templates';

export const TIERS: Tier[] = ['primitives', 'domain', 'features', 'compositions', 'templates'];

export type PatternStatus = 'PROVEN' | 'VALIDATED' | 'EXPERIMENTAL' | 'DEPRECATED';

export interface PatternMetadata {
  name?: string;
  status?: PatternStatus;
  version?: string;
  used_in?: number;
  depends_on?: string[];
  domain?: string;
  capability?: string;
  tags?: string[];
  description?: string;
  [key: string]: unknown;
}

export interface Pattern {
  path: string; // e.g. "features/offline-sync"
  tier: Tier;
  name: string; // e.g. "offline-sync"
  metadata: PatternMetadata;
  readmePath?: string;
  summary: string;
  files: string[];
  fullPath: string;
}

export type OutputFormat = 'compact' | 'table' | 'json';
export type ReadLevel = 'overview' | 'full' | 'implementation';

export interface ProjectUsage {
  projectName: string;
  patterns: Array<{
    name: string;
    version: string;
  }>;
  lastSync?: string;
}

export interface DependencyRule {
  pattern: string;
  dependsOn: Array<{
    target: string;
    constraint: string;
  }>;
}

export interface QuivConfig {
  org: string;
  knowledgePath?: string;
  registryPath?: string;
  metaPath?: string;
  defaultFormat?: OutputFormat;
}
