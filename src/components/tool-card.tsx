import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { SidebarSubMenuItem } from '@/app/tools'
import { Button } from './ui/button'
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
    <Card>
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
            alt={`${tool.title} preview`}
            fill
            className="object-cover"
          />
        </div>
      </CardContent>

      <CardFooter>
        <Link href={`${tool.url}`} className="w-full">
          <Button className="w-full">
            Open tool <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
