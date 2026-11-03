import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { SidebarSubMenuItem } from '@/app/tools'
import { cn } from '@/lib/utils'
import { buttonVariants } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'

export function ToolCard(tool: SidebarSubMenuItem) {
  return (
    // The whole card is the link; nesting a <button> inside an <a> is invalid
    // HTML and adds a redundant stop when navigating with the keyboard
    <Link
      href={tool.url}
      className="group rounded-xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      <Card className="h-full transition-colors group-hover:border-primary/40">
        <CardHeader className="flex-1">
          <CardTitle className="flex items-center gap-2">
            <tool.icon className="h-5 w-5" />
            {tool.title}
          </CardTitle>

          <CardDescription>{tool.description}</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="relative h-52 w-full overflow-hidden rounded-lg bg-white">
            <Image
              src={tool.image}
              alt=""
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              fill
            />
          </div>
        </CardContent>

        <CardFooter>
          <span
            className={cn(buttonVariants(), 'w-full group-hover:bg-primary/90')}
          >
            Open tool
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  )
}
