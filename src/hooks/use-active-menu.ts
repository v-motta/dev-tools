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
            menuItem.subMenuItems?.some(
              (subItem) => pathname === `${menuItem.url}${subItem.url}`
            ) || false
          const updatedSubMenuItems = menuItem.subMenuItems.map((subItem) => ({
            ...subItem,
            isActive: pathname === `${menuItem.url}${subItem.url}`,
          }))
          return {
            ...menuItem,
            isActive: isMainActive || hasActiveChild,
            subMenuItems: updatedSubMenuItems,
          }
        }
      )
      return {
        ...item,
        menuItems: updatedMenuItems,
      }
    })
  }, [pathname, items])

  // Calculate active items whenever pathname or items change
  // const activeItems = useMemo(() => {
  //   return items.map((item) => {
  //     const isMainActive = pathname === item.url
  //     const hasActiveChild =
  //       item.items?.some((subItem) => pathname === subItem.url) || false

  //     return {
  //       ...item,
  //       isActive: isMainActive || hasActiveChild,
  //       items: item.items?.map((subItem) => ({
  //         ...subItem,
  //         isActive: pathname === subItem.url,
  //       })),
  //     }
  //   })
  // }, [pathname, items])

  return { activeItems }
}
