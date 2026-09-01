"use client"

import React from "react"
import { useIntentInstallPrompt } from "../use-intent-install-prompt"

export function InstallBannerExample({ cartItemCount }: { cartItemCount: number }) {
  const { canPrompt, promptInstall, dismissPrompt } = useIntentInstallPrompt({
    intentScore: cartItemCount,
    thresholdScore: 2,
  })

  if (!canPrompt) return null

  return (
    <div className="fixed inset-x-3 bottom-20 z-40 flex items-center justify-between rounded-2xl border bg-white p-3 shadow-xl">
      <div>
        <p className="text-sm font-semibold">Install App</p>
        <p className="text-xs text-neutral-500">Fast 1-tap checkout</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={promptInstall}
          className="rounded-full bg-black px-4 py-2 text-xs font-semibold text-white"
        >
          Install
        </button>
        <button
          onClick={dismissPrompt}
          className="rounded-full p-2 text-neutral-500 hover:bg-neutral-100"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
