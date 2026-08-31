import { describe, it, expect } from 'bun:test';
import { formatLoreLiteCommit } from '../../src/core/git.js';

describe('Git & Lore-lite Formatter', () => {
  it('formats commit with Lore-lite trailers correctly', () => {
    const msg = formatLoreLiteCommit({
      message: 'feat(offline-sync): add queue compression',
      description: 'Compress mutations before storing in IndexedDB to save memory.',
      constraint: 'Must remain backward-compatible with uncompressed payload schemas.',
      rejected: 'Raw LZMA compression | CPU overhead was too high on mobile.',
      evidence: 'Tested with 10k entities, 68% payload reduction with zero frame drop.',
    });

    expect(msg).toContain('feat(offline-sync): add queue compression');
    expect(msg).toContain('Constraint: Must remain backward-compatible with uncompressed payload schemas.');
    expect(msg).toContain('Rejected: Raw LZMA compression | CPU overhead was too high on mobile.');
    expect(msg).toContain('Evidence: Tested with 10k entities, 68% payload reduction with zero frame drop.');
  });
});
