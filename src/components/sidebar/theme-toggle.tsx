'use client'

import { ChevronsUpDown, Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '../ui/sidebar'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const { open } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <span className="sr-only">Toggle theme</span>
              <div className="flex aspect-square size-6 pl-2 items-center justify-center rounded-md text-foreground">
                {theme && theme === 'system' ? (
                  <Monitor className="absolute size-6" />
                ) : (
                  <>
                    <Sun className="size-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute size-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  </>
                )}
              </div>

              <span className="hidden dark:block">Dark</span>
              <span className="block dark:hidden">Light</span>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] rounded-lg"
            align="end"
            side="top"
            sideOffset={12}
          >
            <DropdownMenuItem onClick={() => setTheme('light')}>
              <Sun /> Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              <Moon /> Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>
              <Monitor /> System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
