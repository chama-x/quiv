/**
 * Interaction Lock for Exiting Screens in Parallel Navigation Transitions.
 *
 * When using <AnimatePresence mode="sync">, the outgoing screen remains mounted
 * for ~350ms while its exit animation executes. During this window, without lock:
 * 1. Momentum scrolling continues on the outgoing view (mid-transition scroll bleed).
 * 2. Sticky-finger taps land on outgoing elements rather than new view.
 * 3. iOS touch rubber-banding ignores pointer-events: none.
 *
 * Solution: Toggle `inert`, `touch-action: none`, and `pointer-events: none`
 * the instant the exit animation starts.
 */

export interface ExitingLockProps {
  inert?: boolean
  style: React.CSSProperties
}

export function getScreenInteractionLock(isExiting: boolean): {
  inert: boolean | undefined
  style: React.CSSProperties
} {
  return {
    inert: isExiting || undefined,
    style: isExiting
      ? {
          pointerEvents: "none",
          touchAction: "none",
          userSelect: "none",
        }
      : {},
  }
}
