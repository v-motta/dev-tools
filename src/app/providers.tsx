'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { getQueryClient } from '@/lib/react-query'

// next-themes sets the theme with an inline script, which only has to run in
// the server HTML. Switching locales re-renders the root layout in the
// browser, where React warns about any script it creates, so there the
// script is marked as data instead.
const themeScriptProps =
  typeof window === 'undefined' ? undefined : { type: 'application/json' }

export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const queryClient = getQueryClient()

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      scriptProps={themeScriptProps}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  )
}
