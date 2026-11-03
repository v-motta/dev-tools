import { setRequestLocale } from 'next-intl/server'
import { LocaleSwitcher } from '@/components/locale-switcher'
import { AppSidebar } from '@/components/sidebar/app-sidebar'
import { AppBreadcrumb } from '@/components/sidebar/breadcrumb'
import { ThemeToggle } from '@/components/theme-toggle'
import { ToolSearch } from '@/components/tool-search'
import { ToolVisitTracker } from '@/components/tool-visit-tracker'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import type { Locale } from '@/i18n/routing'

export default async function AppLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
  // The root layout already checked that the locale is supported
  setRequestLocale((await params).locale as Locale)

  return (
    <SidebarProvider>
      <ToolVisitTracker />
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />

          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />

          <div className="min-w-0 flex-1">
            <AppBreadcrumb />
          </div>

          <ToolSearch />
          <LocaleSwitcher />
          <ThemeToggle />
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
