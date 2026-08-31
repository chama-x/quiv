import fs from 'node:fs';
import type { Pattern } from './types.js';

export interface SearchResult {
  pattern: Pattern;
  score: number;
  matchedField: string;
  matchReason?: string;
  snippet?: string;
}

const SYNONYM_MAP: Record<string, string[]> = {
  'swipe down': ['pull-to-refresh', 'pull-refresh', 'reload-gesture', 'refresh', 'gestures'],
  'swipedown': ['pull-to-refresh', 'pull-refresh', 'reload-gesture', 'refresh'],
  'pull to refresh': ['swipe-down', 'reload-gesture', 'refresh', 'gestures'],
  'pull-to-refresh': ['swipe-down', 'reload-gesture', 'refresh', 'gestures'],
  'swipe back': ['edge-swipe-back', 'back-gesture', 'navigation', 'gestures'],
  'swipe-back': ['edge-swipe-back', 'back-gesture', 'navigation', 'gestures'],
  'debounce': ['throttle', 'rate-limit', 'cadence', 'timing'],
  'throttle': ['debounce', 'rate-limit', 'cadence'],
  'offline': ['cache', 'local-storage', 'indexeddb', 'persistence', 'sync', 'zero-cls-banner'],
  'sync': ['offline', 'outbox', 'indexeddb', 'queue', 'conflict'],
  'animation': ['motion', 'transition', 'spring', 'physics', 'framer-motion'],
  'spring': ['physics', 'motion', 'apple', 'hig', 'bounce'],
  'ios': ['apple', 'native', 'hig', 'spring', 'mobile'],
  'apple': ['ios', 'native', 'hig', 'spring', 'mobile'],
  'haptics': ['vibration', 'tactile', 'feedback', 'touch'],
  'vibration': ['haptics', 'tactile', 'feedback'],
  'install': ['pwa', 'install-prompt', 'deferred-install', 'manifest'],
  'pwa': ['install', 'manifest', 'offline', 'apple-native-pwa', 'zero-cls-banner'],
  'loading': ['skeleton', 'spinner', 'progress-bar', 'progress', 'shimmer', 'pulse'],
  'skeleton': ['shimmer', 'loading', 'pulse', 'placeholder'],
  'tokens': ['design-tokens', 'oklch', 'theme', 'color', 'styling', 'css'],
  'theme': ['tokens', 'oklch', 'styling', 'dark-mode', 'apple-native'],
};

export function searchPatterns(patterns: Pattern[], query: string): SearchResult[] {
  const normalizedQuery = query.trim().toLowerCase();
  const queryTerms = normalizedQuery.split(/\s+/).filter((t) => t.length > 0);

  if (queryTerms.length === 0) {
    return patterns.map((p) => ({
      pattern: p,
      score: 1,
      matchedField: 'all',
      matchReason: 'all patterns',
    }));
  }

  // Expand query with synonyms
  const expandedSynonyms = new Set<string>();
  if (SYNONYM_MAP[normalizedQuery]) {
    for (const s of SYNONYM_MAP[normalizedQuery]) expandedSynonyms.add(s.toLowerCase());
  }
  for (const term of queryTerms) {
    if (SYNONYM_MAP[term]) {
      for (const s of SYNONYM_MAP[term]) expandedSynonyms.add(s.toLowerCase());
    }
  }

  const results: SearchResult[] = [];

  for (const pattern of patterns) {
    let score = 0;
    let matchedField = '';
    let matchReason = '';
    let snippet = '';

    const name = pattern.name.toLowerCase();
    const pPath = pattern.path.toLowerCase();
    const summary = pattern.summary.toLowerCase();
    const domain = (pattern.metadata.domain || '').toLowerCase();
    const capability = (pattern.metadata.capability || '').toLowerCase();
    const tags = (pattern.metadata.tags || []).map((t) => t.toLowerCase());

    // 1. Exact match on name
    if (name === normalizedQuery) {
      score += 100;
      matchedField = 'name (exact)';
      matchReason = `Exact match for "${query}"`;
    } else if (name.includes(normalizedQuery)) {
      score += 60;
      matchedField = 'name';
      matchReason = `Name contains "${query}"`;
    }

    // 2. Term matches on name
    for (const term of queryTerms) {
      if (name.includes(term)) {
        score += 25;
        if (!matchedField) {
          matchedField = 'name';
          matchReason = `Name contains term "${term}"`;
        }
      }
    }

    // 3. Exact Tag Match (8 points per matched tag)
    for (const tag of tags) {
      if (tag === normalizedQuery || queryTerms.includes(tag)) {
        score += 35;
        if (!matchedField) {
          matchedField = 'tag (exact)';
          matchReason = `Matched tag "${tag}"`;
        }
      }
    }

    // 4. Synonym Expansion Match (6 points)
    for (const syn of expandedSynonyms) {
      if (name.includes(syn) || pPath.includes(syn) || tags.includes(syn) || capability.includes(syn)) {
        score += 25;
        if (!matchedField) {
          matchedField = 'synonym';
          matchReason = `Matched via synonym concept "${syn}"`;
        }
      }
    }

    // 5. Path match
    if (pPath.includes(normalizedQuery)) {
      score += 40;
      if (!matchedField) {
        matchedField = 'path';
        matchReason = `Path contains "${query}"`;
      }
    }
    for (const term of queryTerms) {
      if (pPath.includes(term)) {
        score += 15;
      }
    }

    // 6. Domain & capability match
    for (const term of queryTerms) {
      if (domain.includes(term)) {
        score += 20;
        if (!matchedField) {
          matchedField = 'domain';
          matchReason = `Domain contains "${term}"`;
        }
      }
      if (capability.includes(term)) {
        score += 20;
        if (!matchedField) {
          matchedField = 'capability';
          matchReason = `Capability contains "${term}"`;
        }
      }
      if (tags.some((t) => t.includes(term))) {
        score += 15;
        if (!matchedField) {
          matchedField = 'tags';
          matchReason = `Tags contain term "${term}"`;
        }
      }
    }

    // 7. Summary / Problem match
    if (summary.includes(normalizedQuery)) {
      score += 30;
      if (!matchedField) {
        matchedField = 'summary';
        matchReason = `Summary matches "${query}"`;
      }
      snippet = extractMatchSnippet(pattern.summary, normalizedQuery);
    } else {
      for (const term of queryTerms) {
        if (summary.includes(term)) {
          score += 10;
          if (!matchedField) {
            matchedField = 'summary';
            matchReason = `Summary contains "${term}"`;
          }
          if (!snippet) snippet = extractMatchSnippet(pattern.summary, term);
        }
      }
    }

    // 8. Full README content match
    if (pattern.readmePath && fs.existsSync(pattern.readmePath)) {
      try {
        const readme = fs.readFileSync(pattern.readmePath, 'utf-8').toLowerCase();
        for (const term of queryTerms) {
          if (readme.includes(term)) {
            score += 5;
            if (!snippet) {
              snippet = extractMatchSnippet(readme, term);
            }
          }
        }
      } catch {
        // Ignore read errors
      }
    }

    if (score > 0) {
      results.push({
        pattern,
        score,
        matchedField: matchedField || 'content',
        matchReason: matchReason || `Content match`,
        snippet: snippet || pattern.summary.slice(0, 120),
      });
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  return results;
}

function extractMatchSnippet(text: string, term: string, maxLength: number = 100): string {
  const lower = text.toLowerCase();
  const idx = lower.indexOf(term.toLowerCase());
  if (idx === -1) return text.slice(0, maxLength);

  const start = Math.max(0, idx - 30);
  const end = Math.min(text.length, idx + term.length + 50);

  let snippet = text.slice(start, end).replace(/\n+/g, ' ').trim();
  if (start > 0) snippet = '...' + snippet;
  if (end < text.length) snippet = snippet + '...';

  return snippet;
}
