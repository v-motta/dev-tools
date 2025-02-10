'use client'

import { tools } from '@/app/tools'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'
import {
  Calculator,
  CheckCircle,
  Drill,
  Dumbbell,
  Factory,
  Home,
  IdCard,
  Inbox,
  ServerCog,
  UserRoundCheck,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const paths = pathname.split('/').filter(Boolean)

  const { open } = useSidebar()

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
          <ThemeToggle />
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex shrink-0 items-center gap-2 transition-[width,height] ease-linear py-4">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />

            {pathname !== '/' && (
              <Separator orientation="vertical" className="mr-2 h-4" />
            )}

            <Breadcrumb>
              <BreadcrumbList>
                {paths.map((path, index) => {
                  const href = `/${paths.slice(0, index + 1).join('/')}`

                  const item =
                    tools.find((group) => group.href === href) ||
                    tools
                      .flatMap((group) => group.items)
                      .find((item) => item.href === href)

                  return (
                    <React.Fragment key={path}>
                      {index === 0 && (
                        <>
                          <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                              <Link href="/">
                                <Home className="size-4" />
                              </Link>
                            </BreadcrumbLink>
                          </BreadcrumbItem>

                          <BreadcrumbSeparator />
                        </>
                      )}
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                          <Link href={href} className="flex items-center gap-2">
                            {item && <item.icon className="size-4" />}
                            <span className="text-base">{item?.title}</span>
                          </Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      {index < paths.length - 1 && <BreadcrumbSeparator />}
                    </React.Fragment>
                  )
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </>
  )
}
