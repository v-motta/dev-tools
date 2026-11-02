'use client'

import { House } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { tools } from '@/app/tools'

function findMenuItemByUrl(url: string) {
  for (const group of tools) {
    for (const menuItem of group.menuItems) {
      if (menuItem.url === url) {
        return { title: menuItem.title, icon: menuItem.icon, url: menuItem.url }
      }

      const subItem = menuItem.subMenuItems.find((item) => item.url === url)
      if (subItem) {
        return { title: subItem.title, icon: subItem.icon, url: subItem.url }
      }
    }
  }

  return null
}

export function useBreadcrumb() {
  const pathname = usePathname()

  const breadcrumb = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean)

    // Match each cumulative URL (/a, /a/b, /a/b/c) so that segments with the
    // same name in different sections (e.g. generators/cpf and validators/cpf)
    // resolve to the right tool
    return segments.flatMap((_, index) => {
      const url = `/${segments.slice(0, index + 1).join('/')}`
      const menuItem = findMenuItemByUrl(url)

      return menuItem ? [{ menuItem }] : []
    })
  }, [pathname])

  const homeItem = { title: 'Home', icon: House, url: '/' }

  return { breadcrumb: [{ menuItem: homeItem }, ...breadcrumb] }
}
