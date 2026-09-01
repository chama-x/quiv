"use client"

import React, { useEffect } from "react"
import { motion, useMotionValue } from "motion/react"

export interface EdgeSwipeBackProps {
  onBack: () => void
  canBack: boolean
  disabled?: boolean
  swipeDistance?: number
  swipeVelocity?: number
  edgeWidth?: number
  onHaptic?: () => void
}

/**
 * Native-feeling left-edge swipe-back gesture detector.
 * Uses interactive spring physics for 1:1 drag tracking without lag.
 */
export function EdgeSwipeBack({
  onBack,
  canBack,
  disabled = false,
  swipeDistance = 70,
  swipeVelocity = 350,
  edgeWidth = 22,
  onHaptic,
}: EdgeSwipeBackProps) {
  const x = useMotionValue(0)
  const active = canBack && !disabled

  useEffect(() => {
    x.set(0)
  }, [disabled, x])

  if (!active) return null

  return (
    <motion.div
      aria-hidden="true"
      className="fixed bottom-0 left-0 top-0 z-30 touch-pan-y"
      style={{ x, width: edgeWidth, cursor: "ew-resize" }}
      drag="x"
      dragConstraints={{ left: 0, right: 160 }}
      dragElastic={0.2}
      dragMomentum={false}
      dragTransition={{ bounceStiffness: 1755, bounceDamping: 72 }}
      onDragEnd={(_, info) => {
        const committed =
          info.offset.x > swipeDistance || info.velocity.x > swipeVelocity
        if (committed) {
          onHaptic?.()
          onBack()
        }
        x.set(0)
      }}
    />
  )
}
