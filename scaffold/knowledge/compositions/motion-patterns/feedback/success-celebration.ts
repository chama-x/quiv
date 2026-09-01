import { appleSpring } from "../springs/apple-hig-springs"

export interface ConfettiParticle {
  id: string
  x: number
  y: number
  angle: number
  scale: number
  color: string
}

/**
 * Physics-based completion animation parameters.
 */
export const successPopVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: appleSpring,
  },
  exit: { scale: 0.8, opacity: 0, transition: { duration: 0.15 } },
}
