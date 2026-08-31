import { haptic } from "../haptics"

// Low-stakes tap
export function handleTabChange() {
  haptic.tap()
}

// Add item success
export function handleAddToCart() {
  haptic.light()
}

// Blocked action
export function handleSoldOutClick() {
  haptic.warning()
}

// Pull-to-refresh trigger
export function handlePullTrigger() {
  haptic.release()
}
