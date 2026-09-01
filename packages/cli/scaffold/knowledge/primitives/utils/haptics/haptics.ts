// Intent-driven Vibration API wrapper with prefers-reduced-motion safety.
// Silently no-ops on desktop and non-supporting browsers.

export type HapticIntent =
  | "tap"      // 10ms — registered low-stakes action (tab switch, chip toggle)
  | "light"    // 15ms — small success (add to cart, increment)
  | "medium"   // 25ms — structural change (sheet open, section toggle)
  | "success"  // 20-40-60ms — completion / unlock
  | "warning"  // 60ms — blocked / error / destructive
  | "confirm"  // 15-40-30ms — async submission received
  | "release"  // 35ms — pull gesture threshold fired

const PATTERNS: Record<HapticIntent, number | number[]> = {
  tap: 10,
  light: 15,
  medium: 25,
  success: [20, 40, 60],
  warning: 60,
  confirm: [15, 40, 30],
  release: 35,
}

const REDUCED_MOTION_ALLOWED: ReadonlySet<HapticIntent> = new Set([
  "tap",
  "light",
  "medium",
  "warning",
  "release",
])

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function vibrate(intent: HapticIntent): void {
  if (typeof window === "undefined" || typeof navigator === "undefined") return
  if (typeof navigator.vibrate !== "function") return

  // Silence multi-pulse vibrations under prefers-reduced-motion
  if (prefersReducedMotion() && !REDUCED_MOTION_ALLOWED.has(intent)) return

  try {
    navigator.vibrate(PATTERNS[intent])
  } catch {
    // Silently ignore browser exceptions on hidden pages
  }
}

export const haptic = {
  tap: () => vibrate("tap"),
  light: () => vibrate("light"),
  medium: () => vibrate("medium"),
  success: () => vibrate("success"),
  warning: () => vibrate("warning"),
  confirm: () => vibrate("confirm"),
  release: () => vibrate("release"),
}
