'use client'

import { useTranslations } from 'next-intl'
import {
  BodyMeasurementsFields,
  useBodyMeasurements,
} from '@/components/body-measurements'
import { HowItWorks } from '@/components/how-it-works'
import { ResultCard } from '@/components/result-card'
import { useLocaleFormat } from '@/lib/locale'

// WHO adult classification; `max` is exclusive. `id` names the label in
// `pages.bmi.ranges`
const bmiRanges = [
  { id: 'underweight', max: 18.5, color: 'bg-sky-400' },
  { id: 'normal', max: 25, color: 'bg-emerald-500' },
  { id: 'overweight', max: 30, color: 'bg-amber-400' },
  { id: 'obesity1', max: 35, color: 'bg-orange-500' },
  { id: 'obesity2', max: 40, color: 'bg-rose-500' },
  { id: 'obesity3', max: Number.POSITIVE_INFINITY, color: 'bg-red-600' },
] as const

// Values shown on the scale; a BMI outside them sticks to the edges
const SCALE_MIN = 15
const SCALE_MAX = 45

function toScalePosition(bmi: number) {
  const clamped = Math.min(Math.max(bmi, SCALE_MIN), SCALE_MAX)
  return ((clamped - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100
}

function BmiScale({ bmi }: { bmi: number }) {
  const { formatNumber } = useLocaleFormat()

  return (
    <div aria-hidden className="space-y-1 pt-2">
      <div className="relative">
        <div className="flex h-2 overflow-hidden rounded-full">
          {bmiRanges.map((range, index) => {
            const min = index === 0 ? SCALE_MIN : bmiRanges[index - 1].max
            const max = Math.min(range.max, SCALE_MAX)

            return (
              <div
                key={range.id}
                className={range.color}
                style={{
                  width: `${toScalePosition(max) - toScalePosition(min)}%`,
                }}
              />
            )
          })}
        </div>

        <div
          className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-foreground shadow"
          style={{ left: `${toScalePosition(bmi)}%` }}
        />
      </div>

      <div className="relative h-4 text-xs text-muted-foreground">
        {bmiRanges.slice(0, -1).map((range) => (
          <span
            key={range.max}
            className="absolute -translate-x-1/2"
            style={{ left: `${toScalePosition(range.max)}%` }}
          >
            {formatNumber(range.max)}
          </span>
        ))}
      </div>
    </div>
  )
}

export function BMICalculator() {
  const t = useTranslations('pages.bmi')
  const { formatNumber } = useLocaleFormat()
  const body = useBodyMeasurements()

  const bmi = body.values
    ? body.values.weightKg / (body.values.heightCm / 100) ** 2
    : undefined
  const range =
    bmi === undefined ? undefined : bmiRanges.find((r) => bmi < r.max)

  return (
    <div className="w-full max-w-2xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">{t('title')}</h1>

        <p className="text-muted-foreground text-balance">{t('intro')}</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <BodyMeasurementsFields {...body} />
        </div>

        <ResultCard>
          {bmi !== undefined && range && (
            <>
              <p>
                <span className="text-2xl font-mono">
                  {formatNumber(bmi, {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  })}
                </span>{' '}
                <span className="text-muted-foreground">·</span>{' '}
                <span className="font-medium">{t(`ranges.${range.id}`)}</span>
              </p>
              <BmiScale bmi={bmi} />
            </>
          )}
        </ResultCard>
      </div>

      <HowItWorks items={t.raw('howItWorks')} />
    </div>
  )
}
