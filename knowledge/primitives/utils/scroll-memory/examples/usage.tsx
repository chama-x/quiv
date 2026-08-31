"use client"

import React, { useLayoutEffect, useRef } from "react"
import { ScrollMemoryManager, restoreScrollPosition } from "../scroll-memory"

const globalScrollMemory = new ScrollMemoryManager()

export function ScreenView({
  screenKey,
  isBack,
  children,
}: {
  screenKey: string
  isBack: boolean
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    // 1. Restore scroll position before paint
    const saved = isBack ? globalScrollMemory.get(screenKey) : 0
    restoreScrollPosition(el, saved, isBack)

    // 2. Track scroll position continuously
    const onScroll = () => {
      globalScrollMemory.save(screenKey, el.scrollTop)
    }

    el.addEventListener("scroll", onScroll, { passive: true })
    globalScrollMemory.save(screenKey, el.scrollTop)

    return () => {
      el.removeEventListener("scroll", onScroll)
      globalScrollMemory.save(screenKey, el.scrollTop)
    }
  }, [screenKey, isBack])

  return (
    <div ref={ref} className="absolute inset-0 overflow-y-auto">
      {children}
    </div>
  )
}
