"use client"

import React, { useSyncExternalStore } from "react"
import { ZeroClsBanner } from "../zero-cls-banner"

function subscribe(callback: () => void) {
  window.addEventListener("online", callback)
  window.addEventListener("offline", callback)
  return () => {
    window.removeEventListener("online", callback)
    window.removeEventListener("offline", callback)
  }
}

export function OfflineStatusBanner() {
  const isOffline = useSyncExternalStore(
    subscribe,
    () => !navigator.onLine,
    () => false
  )

  return (
    <ZeroClsBanner
      visible={isOffline}
      bannerHeight={34}
      className="bg-neutral-900 text-xs font-medium text-white"
    >
      <span>You're offline — viewing cached store data</span>
    </ZeroClsBanner>
  )
}
