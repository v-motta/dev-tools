'use client'

import { House, type LucideIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { findToolByUrl } from '@/app/tools'
import { usePathname } from '@/i18n/navigation'

export interface BreadcrumbEntry {
  title: string
  icon: LucideIcon
  /** Missing for sidebar sections, which have no page of their own */
  url?: string
}

export function useBreadcrumb() {
  const t = useTranslations()
  const pathname = usePathname()

  const breadcrumb = useMemo(() => {
    const homeEntry: BreadcrumbEntry = {
      title: t('breadcrumb.home'),
      icon: House,
      url: '/',
    }

    const match = findToolByUrl(pathname)
    if (!match) return [homeEntry]

    const { menuItem, tool } = match

    return [
      homeEntry,
      { title: t(`tools.menus.${menuItem.id}`), icon: menuItem.icon },
      {
        title: t(`tools.items.${tool.id}.title`),
        icon: tool.icon,
        url: tool.url,
      },
    ]
  }, [pathname, t])

  return { breadcrumb }
}
