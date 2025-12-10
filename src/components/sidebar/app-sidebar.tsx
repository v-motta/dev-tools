import { Drill } from 'lucide-react'
import Link from 'next/link'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuButton,
} from '../ui/sidebar'
import { NavMain } from './nav-main'
import { SidebarFooter } from './sidebar-footer'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenuButton size="lg">
          <Link
            href="/"
            className="flex items-center gap-3 p-1 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]/35 rounded-lg"
          >
            <div className="flex aspect-square items-center justify-center transition-all">
              <Drill strokeWidth={1.5} />
            </div>

            <div className="text-left text-sm leading-tight group-data-[state=open]/collapsible:rotate-90">
              <p className="truncate font-semibold">The powerful tools</p>
              <p className="truncate text-xs text-muted-foreground">
                by Mottinha
              </p>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent>
        <NavMain />
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  )
}
