"use client"

import React, { useLayoutEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"

export interface ZeroClsBannerProps {
  visible: boolean
  bannerHeight?: number
  className?: string
  children: React.ReactNode
}

/**
 * Sticky banner that compensates viewport scroll pre-paint with useLayoutEffect
 * to completely eliminate Cumulative Layout Shift (CLS) when mounting/unmounting.
 */
export function ZeroClsBanner({
  visible,
  bannerHeight = 34,
  className = "",
  children,
}: ZeroClsBannerProps) {
  const firstLayout = useRef(true)

  // Bump scroll position by banner height pre-paint when mounting while scrolled
  useLayoutEffect(() => {
    if (firstLayout.current) {
      firstLayout.current = false
      return
    }
    if (visible && window.scrollY > 0) {
      window.scrollBy(0, bannerHeight)
    }
  }, [visible, bannerHeight])

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          key="zero-cls-banner-wrapper"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: bannerHeight, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden"
          role="status"
        >
          <div
            style={{ height: bannerHeight }}
            className={`fixed inset-x-0 top-0 z-40 flex items-center justify-center ${className}`}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
