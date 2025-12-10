'use client'

import { House } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { tools } from '@/app/tools'

function findMenuItemByPath(path: string) {
  for (const group of tools) {
    for (const menuItem of group.menuItems) {
      if (menuItem.url === path) {
        return { title: menuItem.title, icon: menuItem.icon, url: menuItem.url }
      }

      for (const subItem of menuItem.subMenuItems) {
        if (subItem.url === path) {
          return {
            title: subItem.title,
            icon: subItem.icon,
            url: subItem.url,
          }
        }
      }
    }
  }

  return null
}

export function useBreadcrumb() {
  const pathname = usePathname()

  const breadcrumb = useMemo(() => {
    const paths = pathname.split('/').filter(Boolean)

    return paths.map((path) => {
      const menuItem = findMenuItemByPath(`/${path}`)

      return { menuItem }
    })
  }, [pathname])

  const homeItem = { title: 'Home', icon: House, url: '/' }

  return { breadcrumb: [{ menuItem: homeItem }, ...breadcrumb] }
}
