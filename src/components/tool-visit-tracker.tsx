'use client'

import { useEffect } from 'react'
import { findToolByUrl } from '@/app/tools'
import { usePathname } from '@/i18n/navigation'
import { addRecentTool } from '@/lib/recent-tools'

const COUNTED_STORAGE_KEY = 'counted-tool-views'

/** Counts each tool once per session, so reloads don't inflate the ranking. */
function countToolView(url: string) {
  try {
    const counted: string[] = JSON.parse(
      sessionStorage.getItem(COUNTED_STORAGE_KEY) ?? '[]'
    )
    if (counted.includes(url)) return

    sessionStorage.setItem(
      COUNTED_STORAGE_KEY,
      JSON.stringify([...counted, url])
    )
  } catch {
    // Without session storage the view is still counted, just not deduped
  }

  navigator.sendBeacon(
    '/api/tool-views',
    new Blob([JSON.stringify({ url })], { type: 'application/json' })
  )
}

/** Records the tool being opened in the recent history and the ranking. */
export function ToolVisitTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (!findToolByUrl(pathname)) return

    addRecentTool(pathname)
    countToolView(pathname)
  }, [pathname])

  return null
}
