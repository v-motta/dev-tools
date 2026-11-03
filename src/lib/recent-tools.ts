const STORAGE_KEY = 'recent-tools'
const MAX_RECENT_TOOLS = 4

const listeners = new Set<() => void>()

// Storage can be unavailable (private windows, blocked site data), so every
// access falls back to an empty history instead of throwing

/** The raw stored value, a string so it can be a useSyncExternalStore snapshot */
export function readRecentToolsSnapshot() {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? '[]'
  } catch {
    return '[]'
  }
}

export function parseRecentTools(snapshot: string): string[] {
  try {
    const urls: unknown = JSON.parse(snapshot)
    return Array.isArray(urls)
      ? urls.filter((url) => typeof url === 'string')
      : []
  } catch {
    return []
  }
}

function writeRecentTools(urls: string[]) {
  try {
    if (urls.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(urls))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  } catch {
    return
  }

  for (const listener of listeners) listener()
}

/** Moves `url` to the top of the history, keeping the latest few. */
export function addRecentTool(url: string) {
  const urls = parseRecentTools(readRecentToolsSnapshot()).filter(
    (recentUrl) => recentUrl !== url
  )

  writeRecentTools([url, ...urls].slice(0, MAX_RECENT_TOOLS))
}

export function clearRecentTools() {
  writeRecentTools([])
}

/** Notifies on changes from this tab and, through `storage`, from others. */
export function subscribeToRecentTools(listener: () => void) {
  listeners.add(listener)
  window.addEventListener('storage', listener)

  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', listener)
  }
}
