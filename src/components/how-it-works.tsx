import { useTranslations } from 'next-intl'
import type { ReactNode } from 'react'

/** The "How it works" list every tool page has below the tool. */
export function HowItWorks({ items }: { items: ReactNode[] }) {
  const t = useTranslations('common')

  return (
    <div>
      <h2 className="text-lg font-medium mb-2">{t('howItWorks')}</h2>

      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
        {items.map((item, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static content
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
