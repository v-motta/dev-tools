'use client'

import { History } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRecentTools } from '@/hooks/use-recent-tools'
import { clearRecentTools } from '@/lib/recent-tools'
import { SectionHeading } from './section-heading'
import { TOOL_GRID, ToolCard } from './tool-card'
import { Button } from './ui/button'

export function RecentTools() {
  const t = useTranslations('home')
  const recentTools = useRecentTools()

  if (recentTools.length === 0) return null

  return (
    <section aria-labelledby="recent-tools" className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <SectionHeading id="recent-tools" icon={History}>
          {t('recent')}
        </SectionHeading>

        <Button variant="ghost" size="sm" onClick={clearRecentTools}>
          {t('clearHistory')}
        </Button>
      </div>

      <div className={TOOL_GRID}>
        {recentTools.map((tool) => (
          <ToolCard key={tool.url} tool={tool} />
        ))}
      </div>
    </section>
  )
}
