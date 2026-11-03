'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import {
  BodyMeasurementsFields,
  useBodyMeasurements,
} from '@/components/body-measurements'
import { HowItWorks } from '@/components/how-it-works'
import { ResultCard } from '@/components/result-card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useLocaleFormat } from '@/lib/locale'

// `value` names the label in `pages.bmr.activityLevels`
const activityLevels = [
  { value: 'sedentary', multiplier: 1.2 },
  { value: 'light', multiplier: 1.375 },
  { value: 'moderate', multiplier: 1.55 },
  { value: 'active', multiplier: 1.725 },
  { value: 'veryActive', multiplier: 1.9 },
] as const

const AGE_RANGE = { min: 15, max: 100 }

export function BMRCalculator() {
  const t = useTranslations('pages.bmr')
  const { formatNumber } = useLocaleFormat()
  const body = useBodyMeasurements()
  const [age, setAge] = useState('')
  const [sex, setSex] = useState('')
  const [activityValue, setActivityValue] = useState('')

  const ageNumber = Number(age)
  const isAgeValid =
    age !== '' &&
    Number.isInteger(ageNumber) &&
    ageNumber >= AGE_RANGE.min &&
    ageNumber <= AGE_RANGE.max
  const ageError = age === '' || isAgeValid ? '' : t('ageRange', AGE_RANGE)
  const activity = activityLevels.find((level) => level.value === activityValue)

  function formatCalories(calories: number) {
    return t('calories', { calories: formatNumber(Math.round(calories)) })
  }

  let results: { bmr: number; tdee: number } | undefined
  if (body.values && isAgeValid && sex && activity) {
    const { weightKg, heightCm } = body.values

    // Mifflin-St Jeor equation
    let bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNumber
    bmr = sex === 'male' ? bmr + 5 : bmr - 161

    results = { bmr, tdee: bmr * activity.multiplier }
  }

  return (
    <div className="w-full max-w-2xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">{t('title')}</h1>

        <p className="text-muted-foreground text-balance">{t('intro')}</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <BodyMeasurementsFields {...body} />

          <div className="space-y-1">
            <Label htmlFor="age">{t('age')}</Label>
            <Input
              id="age"
              inputMode="numeric"
              value={age}
              onChange={(event) => setAge(event.target.value.trim())}
              aria-invalid={ageError !== ''}
              aria-describedby="age-error"
            />
            <p
              id="age-error"
              className="min-h-5 text-sm font-medium text-red-500"
            >
              {ageError}
            </p>
          </div>

          <div className="space-y-1 pb-4">
            <Label htmlFor="sex">{t('sex')}</Label>
            <Select value={sex} onValueChange={setSex}>
              <SelectTrigger id="sex">
                <SelectValue placeholder={t('select')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">{t('male')}</SelectItem>
                <SelectItem value="female">{t('female')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 pb-4">
            <Label htmlFor="activity">{t('activity')}</Label>
            <Select value={activityValue} onValueChange={setActivityValue}>
              <SelectTrigger id="activity">
                <SelectValue placeholder={t('select')} />
              </SelectTrigger>
              <SelectContent>
                {activityLevels.map(({ value }) => (
                  <SelectItem key={value} value={value}>
                    {t(`activityLevels.${value}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <ResultCard>
          {results && (
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm text-muted-foreground">{t('bmr')}</dt>
                <dd className="text-xl font-mono">
                  {formatCalories(results.bmr)}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">{t('tdee')}</dt>
                <dd className="text-xl font-mono">
                  {formatCalories(results.tdee)}
                </dd>
              </div>
            </dl>
          )}
        </ResultCard>
      </div>

      <HowItWorks items={t.raw('howItWorks')} />
    </div>
  )
}
