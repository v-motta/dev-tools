'use client'

import { House } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { findNavItemByUrl } from '@/app/tools'

export function useBreadcrumb() {
  const pathname = usePathname()

  const breadcrumb = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean)

    // Match each cumulative URL (/a, /a/b, /a/b/c) so that segments with the
    // same name in different sections (e.g. generators/cpf and validators/cpf)
    // resolve to the right tool
    return segments.flatMap((_, index) => {
      const url = `/${segments.slice(0, index + 1).join('/')}`
      const menuItem = findNavItemByUrl(url)

      return menuItem ? [{ menuItem }] : []
    })
  }, [pathname])

  const homeItem = { title: 'Início', icon: House, url: '/' }

  return { breadcrumb: [{ menuItem: homeItem }, ...breadcrumb] }
}
