"use client"

import React, { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { appleSpring, pushVariants, popVariants } from "../motion"
import { getScreenInteractionLock } from "../motion"

export interface StorefrontShellProps {
  currentScreenKey: string
  isBackNavigation: boolean
  children: React.ReactNode
  bottomTabBar?: React.ReactNode
}

/**
 * Canonical shell component demonstrating Apple-native PWA layout architecture.
 */
export function StorefrontShell({
  currentScreenKey,
  isBackNavigation,
  children,
  bottomTabBar,
}: StorefrontShellProps) {
  const variants = isBackNavigation ? popVariants : pushVariants
  const [exiting, setExiting] = useState(false)
  const lock = getScreenInteractionLock(exiting)

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-background">
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={currentScreenKey}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={appleSpring}
          onAnimationStart={(def) => {
            if (def === "exit") setExiting(true)
          }}
          onAnimationComplete={(def) => {
            if (def === "exit") setExiting(false)
          }}
          inert={lock.inert}
          style={lock.style}
          className="screen-container bg-background"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {bottomTabBar && (
        <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/80 pb-[env(safe-area-inset-bottom)] backdrop-blur-md">
          {bottomTabBar}
        </nav>
      )}
    </main>
  )
}
