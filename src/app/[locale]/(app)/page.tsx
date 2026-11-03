import { TrendingUp } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { tools } from '@/app/tools'
import { RecentTools } from '@/components/recent-tools'
import { SectionHeading } from '@/components/section-heading'
import { TOOL_GRID, ToolCard } from '@/components/tool-card'
import type { Locale } from '@/i18n/routing'
import { getPopularTools } from '@/lib/popular-tools'

// Keep in sync with POPULAR_TOOLS_REVALIDATE; segment config must be a literal
export const revalidate = 3600

export default async function Home({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params
  // The layout already checked that the locale is supported
  setRequestLocale(locale as Locale)

  const t = await getTranslations()
  const popularTools = await getPopularTools()

  return (
    <div className="flex flex-col gap-y-10">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">{t('home.title')}</h1>

        <p className="text-muted-foreground text-balance">
          {t.rich('home.intro', {
            kbd: (chunks) => (
              <kbd className="rounded border bg-muted px-1.5 font-mono text-xs">
                {chunks}
              </kbd>
            ),
          })}
        </p>
      </div>

      <RecentTools />

      <section aria-labelledby="popular-tools" className="space-y-4">
        <SectionHeading id="popular-tools" icon={TrendingUp}>
          {t('home.popular')}
        </SectionHeading>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {popularTools.map((tool) => (
            <ToolCard key={tool.url} tool={tool} featured />
          ))}
        </div>
      </section>

      {tools.map((group) => (
        <section
          key={group.id}
          aria-labelledby={`group-${group.id}`}
          className="space-y-6"
        >
          <SectionHeading
            id={`group-${group.id}`}
            icon={group.icon}
            className="border-b pb-2"
          >
            {t(`tools.groups.${group.id}`)}
          </SectionHeading>

          {group.menuItems.map((menuItem) => (
            <div key={menuItem.id} className="space-y-3">
              <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <menuItem.icon className="size-4" aria-hidden />
                {t(`tools.menus.${menuItem.id}`)}
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
