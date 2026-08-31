import { appleSpring, collapseSpring, buttonSpring } from "../springs/apple-hig-springs"
import type { Variants } from "motion/react"

/**
 * Apple-native forward push transition:
 * Arriving view enters from full width right (x: 100% -> 0%).
 * Departing view parallaxes to the left (x: 0% -> -30%).
 * Opacity remains 1 on both views (NO crossfade) to maintain spatial continuity.
 */
export const pushVariants: Variants = {
  initial: { opacity: 1, x: "100%" },
  animate: { opacity: 1, x: "0%" },
  exit: { opacity: 1, x: "-30%" },
}

/**
 * Apple-native reverse pop transition:
 * Arriving view enters from left (x: -30% -> 0%).
 * Departing view exits to right (x: 0% -> 100%).
 */
export const popVariants: Variants = {
  initial: { opacity: 1, x: "-30%" },
  animate: { opacity: 1, x: "0%" },
  exit: { opacity: 1, x: "100%" },
}

/**
 * List item enter/exit variants with layout collapse (height -> 0) on exit.
 */
export const listVariants: Variants = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: {
    height: 0,
    opacity: 0,
    marginBottom: 0,
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 0,
    transition: collapseSpring as any,
  },
}

/**
 * Grid staggered children container variant.
 */
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.04 },
  },
}

/**
 * Fade-in-up entrance variant for cards and dialogs.
 */
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: buttonSpring as any },
}
