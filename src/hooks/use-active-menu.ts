'use client'

import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import type { SidebarGroup, SidebarMenuItem } from '@/app/tools'

export function useActiveMenu(items: SidebarGroup[]) {
  const pathname = usePathname()

  const activeItems = useMemo(() => {
    return items.map((item) => {
      const updatedMenuItems: SidebarMenuItem[] = item.menuItems.map(
        (menuItem) => {
          const isMainActive = pathname === menuItem.url
          const hasActiveChild =
            menuItem.subMenuItems.some((subItem) => {
              const subItemUrl = `${menuItem.url}${subItem.url}`

              return pathname === subItemUrl
            }) || false

          const updatedSubMenuItems = menuItem.subMenuItems.map((subItem) => {
            const subItemUrl = `${menuItem.url}${subItem.url}`

            return { ...subItem, isActive: pathname === subItemUrl }
          })

          return {
            ...menuItem,
            isActive: isMainActive || hasActiveChild,
            subMenuItems: updatedSubMenuItems,
          }
        }
      )

      return { ...item, menuItems: updatedMenuItems }
    })
  }, [pathname, items])

  return { activeItems }
}
