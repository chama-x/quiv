import fs from 'node:fs';
import path from 'node:path';
import type { Pattern } from './types.js';

export interface SearchResult {
  pattern: Pattern;
  score: number;
  matchedField: string;
  matchReason?: string;
  snippet?: string;
}

const SYNONYM_MAP: Record<string, string[]> = {
  // Mobile, PWA & Apple Ecosystem
  'camera': ['storefront', 'apple-native-pwa', 'storefront-shell', 'oled-glass-tokens', 'motion-patterns', 'pwa-apple'],
  'cinema': ['camera', 'rig', 'storefront', 'apple-native-pwa', 'oled-glass-tokens', 'motion-patterns'],
  'rig': ['camera', 'cinema', 'storefront', 'apple-native-pwa', 'design-tokens'],
  'store': ['storefront', 'storefront-shell', 'apple-native-pwa', 'ecommerce', 'checkout', 'pwa'],
  'storefront': ['store', 'apple-native-pwa', 'ecommerce', 'storefront-shell', 'pwa', 'apple-native-pwa-shell'],
  'ecommerce': ['storefront', 'store', 'checkout', 'apple-native-pwa'],
  'shop': ['storefront', 'store', 'ecommerce', 'apple-native-pwa'],
  'apple': ['ios', 'native', 'hig', 'spring', 'mobile', 'pwa-apple', 'apple-native-pwa', 'oled-glass-tokens'],
  'ios': ['apple', 'native', 'hig', 'spring', 'mobile', 'ios-tab-bar-choreography', 'pwa-apple'],
  'pwa': ['install', 'manifest', 'offline', 'apple-native-pwa', 'zero-cls-banner', 'pwa-apple', 'apple-native-pwa-shell'],
  'install': ['pwa', 'install-prompt', 'intent-install-prompt', 'manifest'],

  // OLED & Design Tokens
  'oled': ['oled-glass-tokens', 'tokens', 'dark-mode', 'glass', 'backdrop-blur', 'theme', 'design-tokens'],
  'glass': ['oled-glass-tokens', 'backdrop-blur', 'frosted-glass', 'tokens', 'design-tokens'],
  'tokens': ['design-tokens', 'oklch', 'theme', 'color', 'styling', 'css', 'oled-glass-tokens'],
  'theme': ['tokens', 'oklch', 'styling', 'dark-mode', 'apple-native', 'design-tokens'],
  'dark': ['dark-mode-svg', 'oled-glass-tokens', 'theme', 'tokens'],
  'dark-mode': ['dark', 'oled-glass-tokens', 'dark-mode-svg', 'theme'],

  // Motion & Animation
  'motion': ['motion-patterns', 'transitions', 'springs', 'spring-vocabulary', 'micro-interactions', 'feedback', 'loading', 'framer-motion', 'animation'],
  'animation': ['motion', 'transition', 'spring', 'physics', 'framer-motion', 'motion-patterns'],
  'spring': ['physics', 'motion', 'apple', 'hig', 'bounce', 'springs', 'spring-vocabulary', 'apple-hig-springs'],
  'springs': ['spring', 'motion', 'physics', 'motion-patterns', 'apple-hig-springs'],
  'transition': ['transitions', 'push-pop-variants', 'motion-patterns', 'animation'],
  'transitions': ['transition', 'push-pop-variants', 'motion-patterns', 'screen-interaction-lock'],
  'gesture': ['micro-interactions', 'swipe-back', 'pull-to-refresh', 'touch', 'motion-patterns'],
  'swipe down': ['pull-to-refresh', 'pull-refresh', 'reload-gesture', 'refresh', 'gestures'],
  'swipedown': ['pull-to-refresh', 'pull-refresh', 'reload-gesture', 'refresh'],
  'pull to refresh': ['swipe-down', 'reload-gesture', 'refresh', 'gestures', 'pull-to-refresh'],
  'pull-to-refresh': ['swipe-down', 'reload-gesture', 'refresh', 'gestures'],
  'swipe back': ['edge-swipe-back', 'back-gesture', 'navigation', 'gestures'],
  'swipe-back': ['edge-swipe-back', 'back-gesture', 'navigation', 'gestures'],

  // Shells, Navigation & UI
  'shell': ['apple-native-pwa-shell', 'storefront-shell', 'high-converting-repo-shell', 'layout', 'pwa'],
  'shells': ['shell', 'apple-native-pwa-shell', 'storefront-shell', 'high-converting-repo-shell'],
  'tab': ['ios-tab-bar-choreography', 'tabbar', 'navigation', 'dock'],
  'tabbar': ['ios-tab-bar-choreography', 'tab', 'navigation', 'dock'],
  'navigation': ['ios-tab-bar-choreography', 'apple-native-pwa-shell', 'transitions'],
  'ui': ['tabular-numeral', 'zero-cls-banner', 'primitives', 'components', 'storefront-shell', 'design-tokens'],
  'haptics': ['vibration', 'tactile', 'feedback', 'touch', 'button-press'],
  'vibration': ['haptics', 'tactile', 'feedback'],
  'feedback': ['haptics', 'button-press', 'success-celebration', 'motion-patterns'],

  // Offline, Data & Utilities
  'offline': ['cache', 'local-storage', 'indexeddb', 'persistence', 'sync', 'useOfflineEntity', 'conflictResolution'],
  'sync': ['offline', 'outbox', 'indexeddb', 'queue', 'conflict', 'offline-sync'],
  'conflict': ['conflictResolution', 'offline-sync', 'lww', '3-way'],
  'debounce': ['throttle', 'rate-limit', 'cadence', 'timing'],
  'throttle': ['debounce', 'rate-limit', 'cadence'],
  'loading': ['skeleton', 'spinner', 'progress-bar', 'progress', 'shimmer', 'pulse', 'loading'],
  'skeleton': ['shimmer', 'loading', 'pulse', 'placeholder', 'skeleton-pulse'],
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

    // 1. Exact match on name or path
    if (name === normalizedQuery || pPath === normalizedQuery) {
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
        score += 30;
        if (!matchedField) {
          matchedField = 'name';
          matchReason = `Name contains term "${term}"`;
        }
      }
    }

    // 3. Exact Tag Match
    for (const tag of tags) {
      if (tag === normalizedQuery || queryTerms.includes(tag)) {
        score += 40;
        if (!matchedField) {
          matchedField = 'tag (exact)';
          matchReason = `Matched tag "${tag}"`;
        }
      }
    }

    // 4. Synonym Expansion Match
    for (const syn of expandedSynonyms) {
      if (name.includes(syn) || pPath.includes(syn) || tags.includes(syn) || capability.includes(syn)) {
        score += 35;
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
        score += 20;
      }
    }

    // 6. Domain & capability match
    for (const term of queryTerms) {
      if (domain.includes(term)) {
        score += 25;
        if (!matchedField) {
          matchedField = 'domain';
          matchReason = `Domain contains "${term}"`;
        }
      }
      if (capability.includes(term)) {
        score += 25;
        if (!matchedField) {
          matchedField = 'capability';
          matchReason = `Capability contains "${term}"`;
        }
      }
      if (tags.some((t) => t.includes(term))) {
        score += 20;
        if (!matchedField) {
          matchedField = 'tags';
          matchReason = `Tags contain term "${term}"`;
        }
      }
    }

    // 7. Summary / Problem match
    if (summary.includes(normalizedQuery)) {
      score += 35;
      if (!matchedField) {
        matchedField = 'summary';
        matchReason = `Summary matches "${query}"`;
      }
      snippet = extractMatchSnippet(pattern.summary, normalizedQuery);
    } else {
      for (const term of queryTerms) {
        if (summary.includes(term)) {
          score += 15;
          if (!matchedField) {
            matchedField = 'summary';
            matchReason = `Summary contains "${term}"`;
          }
          if (!snippet) snippet = extractMatchSnippet(pattern.summary, term);
        }
      }
    }

    // 8. Deep directory and file content search
    if (pattern.readmePath) {
      const patternDir = path.dirname(pattern.readmePath);
      const deepMatch = searchPatternDirectoryFiles(patternDir, queryTerms, expandedSynonyms);
      if (deepMatch.score > 0) {
        score += deepMatch.score;
        if (!matchedField) {
          matchedField = deepMatch.field;
          matchReason = deepMatch.reason;
        }
        if (!snippet && deepMatch.snippet) {
          snippet = deepMatch.snippet;
        }
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

function searchPatternDirectoryFiles(
  dir: string,
  queryTerms: string[],
  synonyms: Set<string>
): { score: number; field: string; reason: string; snippet?: string } {
  let score = 0;
  let field = '';
  let reason = '';
  let snippet: string | undefined;

  try {
    if (!fs.existsSync(dir)) return { score: 0, field: '', reason: '' };

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const lowerName = entry.name.toLowerCase();

      // Check file/subdirectory name matches
      for (const term of queryTerms) {
        if (lowerName.includes(term)) {
          score += 25;
          field = `file: ${entry.name}`;
          reason = `Pattern includes file "${entry.name}" matching "${term}"`;
        }
      }
      for (const syn of synonyms) {
        if (lowerName.includes(syn)) {
          score += 20;
          if (!field) {
            field = `file: ${entry.name}`;
            reason = `Pattern file "${entry.name}" matches concept "${syn}"`;
          }
        }
      }

      // Check file contents for text files (tsx, ts, js, json, css, md)
      if (entry.isFile() && /\.(tsx?|jsx?|json|css|md)$/i.test(entry.name)) {
        try {
          const filePath = path.join(dir, entry.name);
          const stat = fs.statSync(filePath);
          if (stat.size <= 50000) {
            const content = fs.readFileSync(filePath, 'utf-8');
            const lowerContent = content.toLowerCase();

            for (const term of queryTerms) {
              if (lowerContent.includes(term)) {
                score += 15;
                if (!snippet) {
                  snippet = extractMatchSnippet(content, term);
                }
                if (!field) {
                  field = `code: ${entry.name}`;
                  reason = `File "${entry.name}" contains "${term}"`;
                }
              }
            }

            for (const syn of synonyms) {
              if (lowerContent.includes(syn)) {
                score += 10;
                if (!snippet) {
                  snippet = extractMatchSnippet(content, syn);
                }
              }
            }
          }
        } catch {
          // ignore read errors
        }
      }
    }
  } catch {
    // ignore
  }

  return { score, field, reason, snippet };
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

