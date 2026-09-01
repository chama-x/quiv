import type { Transition } from 'motion/react';

/**
 * Standard 5-tier spring physics vocabulary.
 */
export const SPRINGS = {
  /** SETTLE — The house spring for views, cards, and modal geometry. Gentle overshoot (~18%). */
  SETTLE: { type: 'spring', bounce: 0.18, duration: 0.48 } as const,
  /** MECH — Heavier, crisper. Structural layers and mechanical registration. */
  MECH: { type: 'spring', bounce: 0.06, duration: 0.32 } as const,
  /** LOCK — Fast, dead-stop snap. Alignment locks, zero bounce. */
  LOCK: { type: 'spring', bounce: 0.0, duration: 0.22 } as const,
  /** POP — Playful materialization from zero with ~38% overshoot. */
  POP: { type: 'spring', bounce: 0.38, duration: 0.36 } as const,
  /** DRAW — Slow, extruded motion along paths and indicators. */
  DRAW: { type: 'spring', bounce: 0.08, duration: 0.58 } as const,
} as const;

/** Color & opacity ramps — cross-fade on a smooth deceleration curve. */
export const TINT = {
  duration: 0.26,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
} as const;

export const SPRING_PRESETS = SPRINGS;
