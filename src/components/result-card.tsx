import { useTranslations } from 'next-intl'

interface ResultCardProps {
  /** Defaults to "Result" in the page's language */
  title?: string
  children?: React.ReactNode
}

/** Shows a tool's result below its form, in the same place on every tool. */
export function ResultCard({ title, children }: ResultCardProps) {
  const t = useTranslations('common')

  return (
    // The live region has to exist before the result shows up, otherwise
    // screen readers don't announce it
    <div role="status">
      {children ? (
        <div className="space-y-3 rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">
            {title ?? t('result')}
          </p>
          {children}
        </div>
      ) : null}
    </div>
  )
}
