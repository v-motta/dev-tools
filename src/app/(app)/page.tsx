import { tools } from '@/app/tools'
import { ToolCard } from '@/components/tool-card'

export default function Home() {
  const allItems = tools.flatMap((tool) => tool.items)

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold font-mono">Featured tools</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {allItems.map((tool) => (
          <ToolCard key={tool.href} {...tool} />
        ))}
      </div>
    </div>
  )
}
