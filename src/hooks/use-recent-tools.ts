import { useMemo, useSyncExternalStore } from 'react'
import { findToolByUrl, type SidebarSubMenuItem } from '@/app/tools'
import {
  parseRecentTools,
  readRecentToolsSnapshot,
  subscribeToRecentTools,
} from '@/lib/recent-tools'

/**
 * The tools this browser opened last, newest first. Empty while rendering on
 * the server, since the history only exists in the browser.
 */
export function useRecentTools() {
  const snapshot = useSyncExternalStore(
    subscribeToRecentTools,
    readRecentToolsSnapshot,
    () => '[]'
  )

  return useMemo(
    () =>
      parseRecentTools(snapshot).flatMap((url): SidebarSubMenuItem[] => {
        const found = findToolByUrl(url)
        return found ? [found.tool] : []
      }),
    [snapshot]
  )
}
