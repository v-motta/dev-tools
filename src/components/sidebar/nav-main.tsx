'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { isMenuItemActive, tools } from '@/app/tools'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
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
              <Collapsible key={item.url} defaultOpen asChild>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={isMenuItemActive(item, pathname)}
                    asChild
                  >
                    <Link href={item.url}>
                      <item.icon className="size-4" />

                      {item.title}
                    </Link>
                  </SidebarMenuButton>

                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">
                        Mostrar ou esconder {item.title.toLowerCase()}
                      </span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub className="gap-1 py-0.5">
                      {item.subMenuItems.map((subItem) => (
                        <SidebarMenuItem key={subItem.url}>
                          {/* The parent item's collapse chevron would otherwise
                              reserve its padding on every nested button too */}
                          <SidebarMenuButton
                            isActive={pathname === subItem.url}
                            className="group-has-data-[sidebar=menu-action]/menu-item:pr-2"
                            asChild
                          >
                            <Link href={subItem.url}>
                              <subItem.icon className="size-4" />

                              {subItem.title}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  )
}
