import { ToolCard } from '@/components/tool-card'
import { tools } from '../tools'

export default function Home() {
  const allTools = tools
    .flatMap(({ menuItems }) => menuItems)
    .flatMap(({ subMenuItems }) => subMenuItems)

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="text-2xl font-bold font-mono">Featured tools</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {allTools.map((tool) => (
          <ToolCard key={tool.url} {...tool} />
        ))}
      </div>
    </div>
  )
}
