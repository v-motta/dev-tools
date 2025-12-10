'use client'

import Link from 'next/link'
import { tools } from '@/app/tools'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from '@/components/ui/sidebar'
import { useActiveMenu } from '@/hooks/use-active-menu'

export function NavMain() {
  const { activeItems } = useActiveMenu(tools)

  console.log(activeItems)

  return (
    <>
      {activeItems.map((group) => (
        <SidebarGroup key={group.label}>
          <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
          <SidebarMenu>
            {group.menuItems.map((item) => (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton isActive={item.isActive} asChild>
                  <Link href={item.url}>
                    <item.icon className="size-4" />
                    {item.title}
                  </Link>
                </SidebarMenuButton>

                {item.subMenuItems.map((subItem) => (
                  <SidebarMenuSub key={subItem.url}>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive={item.isActive} asChild>
                        <Link href={`${item.url}${subItem.url}`}>
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
