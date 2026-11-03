import { useTranslations } from 'next-intl'
import { CopyButton } from '@/components/copy-button'

export interface RecordField {
  key: string
  label: string
  /** Text to show for raw values, e.g. { female: 'Weiblich' } */
  values?: Record<string, string>
}

interface RecordListProps {
  fields: RecordField[]
  record: Record<string, unknown>
}

/** Each field of a generated or looked-up record, with its own copy button. */
export function RecordList({ fields, record }: RecordListProps) {
  const t = useTranslations('recordList')

  return (
    <dl className="divide-y rounded-md border">
      {fields.map(({ key, label, values }) => {
        const raw = String(record[key] ?? '')
        if (!raw) return null

        const value = values?.[raw] ?? raw

        return (
          <div
            key={key}
            className="grid grid-cols-[1fr_auto] items-center gap-x-2 px-3 py-1.5 sm:grid-cols-[10rem_1fr_auto]"
          >
            <dt className="col-span-2 text-sm text-muted-foreground sm:col-span-1">
              {label}
            </dt>
            <dd className="break-all font-mono">{value}</dd>
            <CopyButton
              value={value}
              label={t('copy', { field: label })}
              className="size-7 border-0 shadow-none"
            />
          </div>
        )
      })}
    </dl>
  )
}
