import { buttonSpring } from "../springs/apple-hig-springs"

/**
 * Button tap micro-interaction preset.
 * Pair with Motion.dev `whileTap` prop.
 */
export const buttonTapMotion = {
  whileTap: {
    scale: 0.96,
    transition: buttonSpring,
  },
}
