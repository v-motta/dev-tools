import { tools } from '@/app/tools'
import { ToolCard } from '@/components/tool-card'

export default function GeneratorsPage() {
  const generatorsTools =
    tools
      .flatMap(({ menuItems }) => menuItems)
      .find(({ category }) => category === 'generators')?.subMenuItems || []

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="text-2xl font-bold font-mono">Generators</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {generatorsTools.map((tool) => (
          <ToolCard key={tool.title} {...tool} />
        ))}
      </div>
    </div>
  )
}
