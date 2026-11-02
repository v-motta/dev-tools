import type { SidebarSubMenuItem } from '@/app/tools'
import { ToolCard } from './tool-card'

interface ToolGridProps {
  title: string
  tools: SidebarSubMenuItem[]
}

export function ToolGrid({ title, tools }: ToolGridProps) {
  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="text-2xl font-bold font-mono">{title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {tools.map((tool) => (
          <ToolCard key={tool.url} {...tool} />
        ))}
      </div>
    </div>
  )
}
