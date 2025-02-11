import { tools } from '@/app/tools'
import { ToolCard } from '@/components/tool-card'

export default function ValidatorsPage() {
  const validators = tools.filter((tools) => tools.category === 'validators')[0]
    .items

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold font-mono">Validators</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {validators.map((tool) => (
          <ToolCard key={tool.title} {...tool} />
        ))}
      </div>
    </div>
  )
}
