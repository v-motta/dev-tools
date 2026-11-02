'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { isMenuItemActive, tools } from '@/app/tools'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from '@/components/ui/sidebar'

export function NavMain() {
  const pathname = usePathname()

  return (
    <>
      {tools.map((group) => (
        <SidebarGroup key={group.label}>
          <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
          <SidebarMenu>
            {group.menuItems.map((item) => (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton
                  isActive={isMenuItemActive(item, pathname)}
                  asChild
                >
                  <Link href={item.url}>
                    <item.icon className="size-4" />

                    {item.title}
                  </Link>
                </SidebarMenuButton>

                {item.subMenuItems.map((subItem) => (
                  <SidebarMenuSub key={subItem.url}>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={pathname === subItem.url}
                        asChild
                      >
                        <Link href={subItem.url}>
                          <subItem.icon className="size-4" />

                          {subItem.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenuSub>
                ))}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  )
}
