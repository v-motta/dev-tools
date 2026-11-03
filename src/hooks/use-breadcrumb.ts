'use client'

import { House, type LucideIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { findToolByUrl } from '@/app/tools'

export interface BreadcrumbEntry {
  title: string
  icon: LucideIcon
  /** Missing for sidebar sections, which have no page of their own */
  url?: string
}

const homeEntry: BreadcrumbEntry = { title: 'Início', icon: House, url: '/' }

export function useBreadcrumb() {
  const pathname = usePathname()

  const breadcrumb = useMemo(() => {
    const match = findToolByUrl(pathname)
    if (!match) return [homeEntry]

    const { menuItem, tool } = match

    return [
      homeEntry,
      { title: menuItem.title, icon: menuItem.icon },
      { title: tool.title, icon: tool.icon, url: tool.url },
    ]
  }, [pathname])

  return { breadcrumb }
}
