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
        <SidebarMenuButton size="lg" asChild>
          <Link href="/" className="gap-3">
            <div className="flex aspect-square items-center justify-center transition-all">
              <Drill strokeWidth={1.5} />
            </div>

            <div className="text-left text-sm leading-tight">
              <p className="truncate font-semibold">Dev Tools</p>
              <p className="truncate text-xs text-muted-foreground">
                Ferramentas poderosas
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
