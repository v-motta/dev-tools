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
        {breadcrumb.map((entry, index) => {
          const content = (
            <>
              <entry.icon className="size-4" />

              {entry.title}
            </>
          )

          if (index === breadcrumb.length - 1) {
            return (
              <BreadcrumbItem key={entry.title}>
                <BreadcrumbPage className="flex items-center gap-2">
                  {content}
                </BreadcrumbPage>
              </BreadcrumbItem>
            )
          }

          return (
            <Fragment key={entry.title}>
              <BreadcrumbItem>
                {entry.url ? (
                  <BreadcrumbLink
                    href={entry.url}
                    className="flex items-center gap-2"
                  >
                    {content}
                  </BreadcrumbLink>
                ) : (
                  <span className="flex items-center gap-2">{content}</span>
                )}
              </BreadcrumbItem>

              <BreadcrumbSeparator />
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
