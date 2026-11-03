'use client'

import { useState } from 'react'
import {
  BodyMeasurementsFields,
  useBodyMeasurements,
} from '@/components/body-measurements'
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
import { formatNumber } from '@/lib/locale'

type ActivityLevel = {
  value: string
  label: string
  multiplier: number
}

const activityLevels: ActivityLevel[] = [
  {
    value: 'sedentary',
    label: 'Sedentário (pouco ou nenhum exercício)',
    multiplier: 1.2,
  },
  {
    value: 'light',
    label: 'Leve (exercício 1 a 3 vezes por semana)',
    multiplier: 1.375,
  },
  {
    value: 'moderate',
    label: 'Moderado (exercício 3 a 5 vezes por semana)',
    multiplier: 1.55,
  },
  {
    value: 'active',
    label: 'Ativo (exercício 6 a 7 vezes por semana)',
    multiplier: 1.725,
  },
  {
    value: 'very-active',
    label: 'Muito ativo (exercício intenso todos os dias)',
    multiplier: 1.9,
  },
]

function formatCalories(calories: number) {
  return `${formatNumber(Math.round(calories))} kcal/dia`
}

const AGE_RANGE = { min: 15, max: 100 }

export function BMRCalculator() {
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
  const ageError =
    age === '' || isAgeValid
      ? ''
      : `A idade deve estar entre ${AGE_RANGE.min} e ${AGE_RANGE.max} anos.`
  const activity = activityLevels.find((level) => level.value === activityValue)

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
        <h1 className="text-2xl font-bold font-mono">Calculadora de TMB</h1>

        <p className="text-muted-foreground text-balance">
          Descubra sua Taxa Metabólica Basal (TMB) e seu Gasto Energético Total
          Diário (GET).
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <BodyMeasurementsFields {...body} />

          <div className="space-y-1">
            <Label htmlFor="age">Idade</Label>
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
            <Label htmlFor="sex">Sexo</Label>
            <Select value={sex} onValueChange={setSex}>
              <SelectTrigger id="sex">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Masculino</SelectItem>
                <SelectItem value="female">Feminino</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 pb-4">
            <Label htmlFor="activity">Nível de atividade</Label>
            <Select value={activityValue} onValueChange={setActivityValue}>
              <SelectTrigger id="activity">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {activityLevels.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
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
                <dt className="text-sm text-muted-foreground">
                  Taxa Metabólica Basal
                </dt>
                <dd className="text-xl font-mono">
                  {formatCalories(results.bmr)}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">
                  Gasto Energético Total
                </dt>
                <dd className="text-xl font-mono">
                  {formatCalories(results.tdee)}
                </dd>
              </div>
            </dl>
          )}
        </ResultCard>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-2">Como funciona</h2>

        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>
            A TMB é a energia que o corpo gasta em repouso. Ela é calculada pela
            equação de Mifflin-St Jeor, que usa peso, altura, idade e sexo.
          </li>
          <li>
            O GET é a TMB multiplicada por um fator que depende do seu nível de
            atividade física.
          </li>
          <li>
            Os valores são estimativas. Para um plano alimentar, consulte um
            nutricionista.
          </li>
          <li>
            O cálculo é feito no seu navegador: nenhum dado é enviado ou
            armazenado.
          </li>
        </ul>
      </div>
    </div>
  )
}
