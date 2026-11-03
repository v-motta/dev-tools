'use client'

import { useState } from 'react'
import { ResultCard } from '@/components/result-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatNumber, parseDecimal } from '@/lib/locale'

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

export function BMRCalculator() {
  const [results, setResults] = useState<{ bmr: number; tdee: number }>()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const weight = parseDecimal(String(data.get('weight')))
    const height = parseDecimal(String(data.get('height')))
    const age = Number.parseInt(String(data.get('age')), 10)
    const sex = data.get('sex')
    const activity = activityLevels.find(
      (level) => level.value === data.get('activity')
    )

    if (
      Number.isNaN(weight) ||
      Number.isNaN(height) ||
      Number.isNaN(age) ||
      !sex ||
      !activity
    ) {
      return
    }

    // Mifflin-St Jeor equation
    let bmr = 10 * weight + 6.25 * height - 5 * age
    bmr = sex === 'male' ? bmr + 5 : bmr - 161

    setResults({ bmr, tdee: bmr * activity.multiplier })
  }

  return (
    <div className="space-y-8 w-full lg:w-1/2 2xl:w-1/3">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">Calculadora de TMB</h1>

        <p className="text-muted-foreground text-balance">
          Descubra sua Taxa Metabólica Basal (TMB) e seu Gasto Energético Total
          Diário (GET).
        </p>
      </div>

      <div className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="weight">Peso (kg)</Label>
            <Input
              type="number"
              id="weight"
              name="weight"
              min="30"
              max="300"
              step="0.1"
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="height">Altura (cm)</Label>
            <Input
              type="number"
              id="height"
              name="height"
              min="100"
              max="250"
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="age">Idade</Label>
            <Input
              type="number"
              id="age"
              name="age"
              min="15"
              max="100"
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="sex">Sexo</Label>
            <Select name="sex" required>
              <SelectTrigger id="sex">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Masculino</SelectItem>
                <SelectItem value="female">Feminino</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="activity">Nível de atividade</Label>
            <Select name="activity" required>
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

          <Button className="w-full">Calcular TMB e GET</Button>
        </form>

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
