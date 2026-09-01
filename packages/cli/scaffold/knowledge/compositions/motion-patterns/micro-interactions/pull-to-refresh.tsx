"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react"

export interface PullToRefreshProps {
  onRefresh: () => Promise<void>
  activeScroller: HTMLElement | null
  disabled?: boolean
  triggerDistance?: number
  maxPull?: number
  onHaptic?: () => void
  renderIndicator?: (state: { refreshing: boolean; justDone: boolean; pull: number }) => React.ReactNode
}

/**
 * Touch pull-to-refresh for per-screen scroller architectures.
 * Uses ref-mirrored state to avoid tearing down event listeners during threshold flips.
 */
export function PullToRefresh({
  onRefresh,
  activeScroller,
  disabled = false,
  triggerDistance = 72,
  maxPull = 110,
  onHaptic,
  renderIndicator,
}: PullToRefreshProps) {
  const [refreshing, setRefreshing] = useState(false)
  const [justDone, setJustDone] = useState(false)
  const pull = useMotionValue(0)

  const armedRef = useRef(false)
  const startY = useRef<number | null>(null)
  const pulling = useRef(false)

  useEffect(() => {
    if (disabled) return

    const scrollerTop = () => activeScroller?.scrollTop ?? 0

    const onTouchStart = (e: TouchEvent) => {
      if (scrollerTop() > 2 || refreshing) return
      startY.current = e.touches[0].clientY
      pulling.current = false
    }

    const onTouchMove = (e: TouchEvent) => {
      if (startY.current === null || refreshing) return
      const delta = e.touches[0].clientY - startY.current
      if (delta <= 0) {
        pull.set(0)
        armedRef.current = false
        return
      }
      if (scrollerTop() > 2) return

      const damped = Math.min(maxPull, delta * 0.55)
      pulling.current = true
      if (e.cancelable) e.preventDefault()
      pull.set(damped)
      armedRef.current = damped >= triggerDistance
    }

    const onTouchEnd = async () => {
      if (startY.current === null) return
      const wasArmed = armedRef.current
      startY.current = null

      if (pulling.current && wasArmed) {
        pulling.current = false
        armedRef.current = false
        onHaptic?.()
        setRefreshing(true)
        pull.set(46)

        try {
          await onRefresh()
        } catch {
          // Ignore failure
        } finally {
          setRefreshing(false)
          pull.set(0)
          setJustDone(true)
          setTimeout(() => setJustDone(false), 1400)
        }
      } else {
        pull.set(0)
        armedRef.current = false
      }
    }

    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: false })
    window.addEventListener("touchend", onTouchEnd)

    return () => {
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("touchend", onTouchEnd)
    }
  }, [disabled, refreshing, pull, activeScroller, triggerDistance, maxPull, onHaptic, onRefresh])

  const indicatorY = useTransform(pull, [0, maxPull], [-56, maxPull - 56])

  return (
    <AnimatePresence>
      {(pull.get() > 2 || refreshing || justDone) && (
        <motion.div
          key="ptr-indicator"
          style={{ y: indicatorY }}
          className="pointer-events-none fixed left-1/2 top-0 z-40 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {renderIndicator ? (
            renderIndicator({ refreshing, justDone, pull: pull.get() })
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-lg">
              {justDone ? "✓" : refreshing ? "..." : "↓"}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
