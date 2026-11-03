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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { pluralize } from '@/lib/locale'

export function AgeCalculator() {
  const [calculatedAge, setCalculatedAge] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    // A date input's value is always yyyy-MM-dd, whatever the display locale
    const date = parseISO(String(data.get('birthdate')))
    const now = new Date()

    if (!isValid(date)) {
      setCalculatedAge('')
      setErrorMessage('Digite uma data válida.')
      return
    }

    if (isAfter(date, now)) {
      setCalculatedAge('')
      setErrorMessage('A data de nascimento não pode estar no futuro.')
      return
    }

    const years = differenceInYears(now, date)

    const afterYears = subYears(now, years)
    const months = differenceInMonths(afterYears, date)

    const afterMonths = subMonths(afterYears, months)
    const days = differenceInDays(afterMonths, date)

    setErrorMessage('')
    setCalculatedAge(
      `${pluralize(years, 'ano', 'anos')}, ${pluralize(months, 'mês', 'meses')} e ${pluralize(days, 'dia', 'dias')}`
    )
  }

  return (
    <div className="space-y-8 w-full lg:w-1/2 2xl:w-1/3">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">Calculadora de idade</h1>

        <p className="text-muted-foreground text-balance">
          Descubra a idade exata a partir da data de nascimento.
        </p>
      </div>

      <div className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="birthdate">Data de nascimento</Label>
            <Input
              type="date"
              id="birthdate"
              name="birthdate"
              min="1900-01-01"
              required
              aria-invalid={errorMessage !== ''}
              aria-describedby="birthdate-error"
              className="w-fit dark:scheme-dark"
            />
            <p
              id="birthdate-error"
              role="alert"
              className="min-h-5 text-sm font-medium text-red-500"
            >
              {errorMessage}
            </p>
          </div>

          <Button className="w-full">Calcular idade</Button>
        </form>

        <ResultCard>
          {calculatedAge && (
            <p className="text-2xl font-mono">{calculatedAge}</p>
          )}
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
