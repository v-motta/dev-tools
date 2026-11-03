import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { SidebarSubMenuItem } from '@/app/tools'
import { cn } from '@/lib/utils'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'

/** Responsive grid for a list of tool cards */
export const TOOL_GRID =
  'grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'

interface ToolCardProps {
  tool: SidebarSubMenuItem
  /** A larger card, with the icon above the title, for the home highlights */
  featured?: boolean
}

export function ToolCard({ tool, featured = false }: ToolCardProps) {
  return (
    // The whole card is the link; nesting a <button> inside an <a> is invalid
    // HTML and adds a redundant stop when navigating with the keyboard
    <Link
      href={tool.url}
      className="group rounded-xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      <Card
        className={cn(
          'h-full transition-colors group-hover:border-primary/40 group-hover:bg-accent/40',
          featured ? 'py-6' : 'py-5'
        )}
      >
        <CardHeader
          className={cn(
            'items-start',
            featured
              ? 'grid-cols-[1fr_auto] gap-y-4 px-6'
              : 'grid-cols-[auto_1fr_auto] grid-rows-1 gap-x-4 px-5'
          )}
        >
          <div
            className={cn(
              'flex items-center justify-center rounded-lg bg-primary/10 text-primary',
              featured ? 'size-12' : 'size-10'
            )}
          >
            <tool.icon className={featured ? 'size-6' : 'size-5'} aria-hidden />
          </div>

          <div
            className={cn('space-y-1', featured && 'col-span-2 row-start-2')}
          >
            <CardTitle className={cn(featured && 'text-lg')}>
              {tool.title}
            </CardTitle>
            <CardDescription>{tool.description}</CardDescription>
          </div>

          <ArrowRight
            className="mt-0.5 size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
            aria-hidden
          />
        </CardHeader>
      </Card>
    </Link>
  )
}
