'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  isMenuItemActive,
  type SidebarMenuItem as NavMenuItem,
  tools,
} from '@/app/tools'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from '@/components/ui/sidebar'

function NavItem({ item, pathname }: { item: NavMenuItem; pathname: string }) {
  const isActive = isMenuItemActive(item, pathname)
  const [isOpen, setIsOpen] = useState(isActive)
  const [wasActive, setWasActive] = useState(isActive)

  // The sidebar outlives navigation, so open the section of each page the user
  // goes to. Sections never close on their own, only when the user closes them.
  if (isActive !== wasActive) {
    setWasActive(isActive)
    if (isActive) setIsOpen(true)
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="group/collapsible"
      asChild
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton isActive={isActive && !isOpen}>
            <item.icon className="size-4" />

            {item.title}

            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <SidebarMenuSub className="gap-1 py-0.5">
            {item.subMenuItems.map((subItem) => (
              <SidebarMenuItem key={subItem.url}>
                <SidebarMenuButton isActive={pathname === subItem.url} asChild>
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
  )
}

export function NavMain() {
  const pathname = usePathname()

  return (
    <>
      {tools.map((group) => (
        <SidebarGroup key={group.label}>
          <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
          <SidebarMenu>
            {group.menuItems.map((item) => (
              <NavItem key={item.title} item={item} pathname={pathname} />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  )
}
