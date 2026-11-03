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
import { useState } from 'react'
import { ResultCard } from '@/components/result-card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { pluralize } from '@/lib/locale'

const MIN_YEAR = 1900

function calculateAge(value: string): { age?: string; error?: string } {
  // A date input's value is always yyyy-MM-dd, whatever the display locale
  const date = parseISO(value)

  // While the year is being typed the browser reports e.g. 0019-05-15, which
  // is incomplete rather than wrong
  if (!isValid(date) || date.getFullYear() < MIN_YEAR) return {}

  const now = new Date()
  if (isAfter(date, now)) {
    return { error: 'A data de nascimento não pode estar no futuro.' }
  }

  const years = differenceInYears(now, date)

  const afterYears = subYears(now, years)
  const months = differenceInMonths(afterYears, date)

  const afterMonths = subMonths(afterYears, months)
  const days = differenceInDays(afterMonths, date)

  return {
    age: `${pluralize(years, 'ano', 'anos')}, ${pluralize(months, 'mês', 'meses')} e ${pluralize(days, 'dia', 'dias')}`,
  }
}

export function AgeCalculator() {
  const [birthdate, setBirthdate] = useState('')
  const { age, error = '' } = calculateAge(birthdate)

  return (
    <div className="w-full max-w-2xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">Calculadora de idade</h1>

        <p className="text-muted-foreground text-balance">
          Descubra a idade exata a partir da data de nascimento.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="birthdate">Data de nascimento</Label>
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
          {age && <p className="text-2xl font-mono">{age}</p>}
        </ResultCard>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-2">Como funciona</h2>

        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>
            A idade é a diferença entre a data de nascimento e a data de hoje.
          </li>
          <li>O resultado mostra os anos, meses e dias exatos.</li>
          <li>
            Anos bissextos e meses de tamanhos diferentes são considerados.
          </li>
          <li>
            O cálculo é feito no seu navegador: a data não é enviada nem
            armazenada.
          </li>
        </ul>
      </div>
    </div>
  )
}
