'use client'

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
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Drill, Factory, Home, IdCard, Inbox } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const paths = pathname.split('/').filter(Boolean)

  const groups = [
    {
      title: 'Geradores',
      url: '/generators',
      items: [
        {
          title: 'Gerador de CPF',
          url: '/generators/cpf',
          icon: IdCard,
        },
        {
          title: 'Gerador de CNPJ',
          url: '/generators/cnpj',
          icon: Factory,
        },
      ],
    },
    {
      title: 'Validators',
      url: '/validators',
      items: [
        {
          title: 'Home',
          url: '#',
          icon: Home,
        },
        {
          title: 'Inbox',
          url: '#',
          icon: Inbox,
        },
      ],
    },
  ]

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenuButton size="lg" asChild>
            <Link href="/">
              <div className="flex aspect-square p-1.5 size-8 items-center justify-center text-zinc-200 rounded-md bg-blue-700">
                <Drill className="size-full" />
              </div>

              <div className="flex flex-col flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  The powerful tools
                </span>
                <span className="truncate text-xs text-zinc-600 dark:text-zinc-400">
                  by Mottinha
                </span>
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarHeader>

        <SidebarContent>
          {groups.map(({ title, items }) => (
            <SidebarGroup key={title}>
              <SidebarGroupLabel>{title}</SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
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

                  const pageTitle =
                    groups.find((group) => group.url === href)?.title ||
                    groups
                      .flatMap((group) => group.items)
                      .find((item) => item.url === href)?.title

                  return (
                    <React.Fragment key={path}>
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                          <Link href={href}>{pageTitle}</Link>
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
    </SidebarProvider>
  )
}
