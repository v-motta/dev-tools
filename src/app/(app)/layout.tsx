'use client'

import { tools } from '@/app/tools'
import { Breadcrumb } from '@/components/sidebar/breadcrumb'
import { ThemeToggle } from '@/components/sidebar/theme-toggle'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'
import { useQuery } from '@tanstack/react-query'
import ky from 'ky'
import { Drill, Github, Star } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type React from 'react'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const { open } = useSidebar()

  const { data, isSuccess } = useQuery({
    queryKey: ['github-stars'],
    queryFn: async () => {
      return await ky
        .get('https://api.github.com/repos/v-motta/dev-tools')
        .json<{ stargazers_count: number }>()
    },
  })

  return (
    <>
      <Sidebar collapsible="icon" variant="floating">
        <SidebarHeader>
          <SidebarMenuButton size="lg">
            <Link
              href="/"
              className="flex items-center gap-3 p-1 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]/35 rounded-lg"
            >
              <div
                className={`flex aspect-square items-center justify-center transition-all ${open ? 'size-9' : 'size-6'}`}
              >
                <Drill
                  className={`transition-all ${open ? 'size-9' : 'size-6'}`}
                  strokeWidth={1.5}
                />
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
          <SidebarGroup>
            <SidebarMenu>
              {tools.map((group) => (
                <SidebarMenuItem key={group.href} className="mb-4 last:mb-0">
                  <SidebarMenuButton asChild>
                    <Link href={group.href}>
                      <group.icon className="size-4" />
                      {group.title}
                    </Link>
                  </SidebarMenuButton>
                  {group.items.map((item) => (
                    <SidebarMenuSub key={item.href}>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <Link href={item.href}>
                            <item.icon className="size-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenuSub>
                  ))}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <Button type="button" variant="ghost" asChild>
            <a
              href="https://github.com/v-motta/dev-tools"
              className="flex self-start items-center gap-5 !px-4 py-1"
            >
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                width="24"
                height="24"
                className="size-5"
              >
                <title>GitHub</title>
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>

              <span className="flex items-center gap-1 font-mono font-bold">
                <Star className="size-4 text-yellow-600" />
                {isSuccess ? data.stargazers_count : '-'}
              </span>
            </a>
          </Button>

          <ThemeToggle />
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex shrink-0 items-center gap-2 transition-[width,height] ease-linear py-4">
          <div className="flex flex-1 items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />

            {pathname !== '/' && (
              <Separator orientation="vertical" className="mr-2 h-4" />
            )}

            <Breadcrumb />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </>
  )
}
