// Map-based scroll restoration utility for SPA navigation.
// Enables iOS-native scroll restoration across virtual screen transitions.

export class ScrollMemoryManager {
  private memory = new Map<string, number>()

  public save(key: string, scrollY: number): void {
    this.memory.set(key, scrollY)
  }

  public get(key: string): number {
    return this.memory.get(key) ?? 0
  }

  public clear(): void {
    this.memory.clear()
  }
}

/**
 * Restores scroll position before paint using useLayoutEffect.
 */
export function restoreScrollPosition(
  element: HTMLElement | null,
  savedScrollY: number | undefined,
  isBackNav: boolean
): void {
  if (!element) return
  const target = isBackNav ? (savedScrollY ?? 0) : 0
  element.scrollTo({ top: target, behavior: "auto" })
}
