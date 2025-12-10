'use client'

import { Fragment } from 'react/jsx-runtime'
import { useBreadcrumb } from '@/hooks/use-breadcrumb'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb'

export function AppBreadcrumb() {
  const { breadcrumb } = useBreadcrumb()

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumb.map(({ menuItem }) => {
          if (!menuItem) return null

          const isLast = breadcrumb[breadcrumb.length - 1].menuItem === menuItem
          if (isLast) {
            return (
              <BreadcrumbItem key={menuItem.url}>
                <BreadcrumbPage className="flex items-center gap-2">
                  <menuItem.icon className="size-4" />
                  {menuItem.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            )
          }

          return (
            <Fragment key={menuItem.url}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={menuItem.url}
                  className="flex items-center gap-2"
                >
                  <menuItem.icon className="size-4" />

                  {menuItem.title}
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
