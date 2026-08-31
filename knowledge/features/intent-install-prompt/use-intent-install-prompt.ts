"use client"

import { useEffect, useState, useCallback } from "react"

export interface IntentInstallOptions {
  intentScore: number
  thresholdScore?: number
  dismissMemoryDays?: number
  storageKey?: string
}

export interface IntentInstallState {
  canPrompt: boolean
  isInstalled: boolean
  promptInstall: () => Promise<boolean>
  dismissPrompt: () => void
}

const DEFAULT_STORAGE_KEY = "pwa_install_dismissed_at"

function isStandaloneMode(): boolean {
  if (typeof window === "undefined") return false
  return (
    Boolean(window.matchMedia?.("(display-mode: standalone)").matches) ||
    Boolean((window.navigator as unknown as { standalone?: boolean }).standalone)
  )
}

export function useIntentInstallPrompt({
  intentScore,
  thresholdScore = 2,
  dismissMemoryDays = 30,
  storageKey = DEFAULT_STORAGE_KEY,
}: IntentInstallOptions): IntentInstallState {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    setIsInstalled(isStandaloneMode())

    const dismissedAt = localStorage.getItem(storageKey)
    if (dismissedAt) {
      const ms = Date.now() - parseInt(dismissedAt, 10)
      const days = ms / (1000 * 60 * 60 * 24)
      if (days < dismissMemoryDays) {
        setDismissed(true)
      }
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    const handleAppInstalled = () => {
      setIsInstalled(true)
      setDeferredPrompt(null)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [storageKey, dismissMemoryDays])

  const dismissPrompt = useCallback(() => {
    setDismissed(true)
    localStorage.setItem(storageKey, Date.now().toString())
  }, [storageKey])

  const promptInstall = useCallback(async (): Promise<boolean> => {
    if (!deferredPrompt || typeof deferredPrompt.prompt !== "function") {
      return false
    }

    try {
      await deferredPrompt.prompt()
      const choiceResult = await deferredPrompt.userChoice
      setDeferredPrompt(null)
      if (choiceResult?.outcome === "accepted") {
        setIsInstalled(true)
        return true
      }
    } catch {
      // Prompt error
    }
    return false
  }, [deferredPrompt])

  const canPrompt =
    Boolean(deferredPrompt) &&
    !isInstalled &&
    !dismissed &&
    intentScore >= thresholdScore

  return {
    canPrompt,
    isInstalled,
    promptInstall,
    dismissPrompt,
  }
}
