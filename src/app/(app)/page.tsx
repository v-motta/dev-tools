import { TrendingUp } from 'lucide-react'
import { RecentTools } from '@/components/recent-tools'
import { SectionHeading } from '@/components/section-heading'
import { TOOL_GRID, ToolCard } from '@/components/tool-card'
import { getPopularTools } from '@/lib/popular-tools'
import { tools } from '../tools'

// Keep in sync with POPULAR_TOOLS_REVALIDATE; segment config must be a literal
export const revalidate = 3600

export default async function Home() {
  const popularTools = await getPopularTools()

  return (
    <div className="flex flex-col gap-y-10">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">Ferramentas</h1>

        <p className="text-muted-foreground text-balance">
          Geradores, validadores e calculadoras para o dia a dia, com uma API
          aberta em cada ferramenta. Busque qualquer uma com{' '}
          <kbd className="rounded border bg-muted px-1.5 font-mono text-xs">
            Ctrl K
          </kbd>
          .
        </p>
      </div>

      <RecentTools />

      <section aria-labelledby="popular-tools" className="space-y-4">
        <SectionHeading id="popular-tools" icon={TrendingUp}>
          Mais usadas
        </SectionHeading>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {popularTools.map((tool) => (
            <ToolCard key={tool.url} tool={tool} featured />
          ))}
        </div>
      </section>

      {tools.map((group) => (
        <section
          key={group.label}
          aria-labelledby={`group-${group.label}`}
          className="space-y-6"
        >
          <SectionHeading
            id={`group-${group.label}`}
            icon={group.icon}
            className="border-b pb-2"
          >
            {group.label}
          </SectionHeading>

          {group.menuItems.map((menuItem) => (
            <div key={menuItem.title} className="space-y-3">
              <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <menuItem.icon className="size-4" aria-hidden />
                {menuItem.title}
              </h3>

              <div className={TOOL_GRID}>
                {menuItem.subMenuItems.map((tool) => (
                  <ToolCard key={tool.url} tool={tool} />
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}
