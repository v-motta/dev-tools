import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { SidebarSubMenuItem } from '@/app/tools'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'

export function ToolCard(tool: SidebarSubMenuItem) {
  return (
    // The whole card is the link; nesting a <button> inside an <a> is invalid
    // HTML and adds a redundant stop when navigating with the keyboard
    <Link
      href={tool.url}
      className="group rounded-xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      <Card className="h-full py-5 transition-colors group-hover:border-primary/40 group-hover:bg-accent/40">
        <CardHeader className="grid-cols-[auto_1fr_auto] grid-rows-1 items-start gap-x-4 px-5">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <tool.icon className="size-5" aria-hidden />
          </div>

          <div className="space-y-1">
            <CardTitle>{tool.title}</CardTitle>
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
