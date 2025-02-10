'use client'

import { tools } from '@/app/tools'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'
import {
  Breadcrumb as BreadcrumbComponent,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../ui/breadcrumb'

export function Breadcrumb() {
  const pathname = usePathname()
  const paths = pathname.split('/').filter(Boolean)

  const isDesktop = useMediaQuery('(min-width: 768px)')

  return (
    <BreadcrumbComponent>
      <BreadcrumbList>
        {isDesktop
          ? paths.map((path, index) => {
              const href = `/${paths.slice(0, index + 1).join('/')}`

              const item =
                tools.find((group) => group.href === href) ||
                tools
                  .flatMap((group) => group.items)
                  .find((item) => item.href === href)

              return (
                <Fragment key={path}>
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
                </Fragment>
              )
            })
          : paths.map((path, index) => {
              const href = `/${paths.slice(0, index + 1).join('/')}`

              const item =
                tools.find((group) => group.href === href) ||
                tools
                  .flatMap((group) => group.items)
                  .find((item) => item.href === href)

              return (
                <Fragment key={path}>
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

                  {index < paths.length - 1 && (
                    <>
                      <BreadcrumbEllipsis />
                      <BreadcrumbSeparator />
                    </>
                  )}

                  {index === paths.length - 1 && (
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link href={href} className="flex items-center gap-2">
                          {item && <item.icon className="size-4" />}
                          <span className="text-base">{item?.title}</span>
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  )}
                </Fragment>
              )
            })}
      </BreadcrumbList>
    </BreadcrumbComponent>
  )
}
