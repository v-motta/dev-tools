'use client'

import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  isAfter,
  isValid,
  parseISO,
  subMonths,
  subYears,
} from 'date-fns'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { HowItWorks } from '@/components/how-it-works'
import { ResultCard } from '@/components/result-card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const MIN_YEAR = 1900

type Age = { years: number; months: number; days: number }

function calculateAge(value: string): { age?: Age; isFuture?: boolean } {
  // A date input's value is always yyyy-MM-dd, whatever the display locale
  const date = parseISO(value)

  // While the year is being typed the browser reports e.g. 0019-05-15, which
  // is incomplete rather than wrong
  if (!isValid(date) || date.getFullYear() < MIN_YEAR) return {}

  const now = new Date()
  if (isAfter(date, now)) {
    return { isFuture: true }
  }

  const years = differenceInYears(now, date)

  const afterYears = subYears(now, years)
  const months = differenceInMonths(afterYears, date)

  const afterMonths = subMonths(afterYears, months)
  const days = differenceInDays(afterMonths, date)

  return { age: { years, months, days } }
}

export function AgeCalculator() {
  const t = useTranslations('pages.age')
  const [birthdate, setBirthdate] = useState('')
  const { age, isFuture } = calculateAge(birthdate)
  const error = isFuture ? t('future') : ''

  return (
    <div className="w-full max-w-2xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">{t('title')}</h1>

        <p className="text-muted-foreground text-balance">{t('intro')}</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="birthdate">{t('birthdate')}</Label>
          <Input
            type="date"
            id="birthdate"
            min={`${MIN_YEAR}-01-01`}
            value={birthdate}
            onChange={(event) => setBirthdate(event.target.value)}
            aria-invalid={error !== ''}
            aria-describedby="birthdate-error"
            className="w-fit dark:scheme-dark"
          />
          <p
            id="birthdate-error"
            role="alert"
            className="min-h-5 text-sm font-medium text-red-500"
          >
            {error}
          </p>
        </div>

        <ResultCard>
          {age && <p className="text-2xl font-mono">{t('result', age)}</p>}
        </ResultCard>
      </div>

      <HowItWorks items={t.raw('howItWorks')} />
    </div>
  )
}
