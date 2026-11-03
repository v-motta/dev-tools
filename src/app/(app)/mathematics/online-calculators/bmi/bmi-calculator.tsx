'use client'

import {
  BodyMeasurementsFields,
  useBodyMeasurements,
} from '@/components/body-measurements'
import { ResultCard } from '@/components/result-card'
import { formatNumber } from '@/lib/locale'

// WHO adult classification; `max` is exclusive
const bmiRanges = [
  { label: 'Abaixo do peso', max: 18.5, color: 'bg-sky-400' },
  { label: 'Peso normal', max: 25, color: 'bg-emerald-500' },
  { label: 'Sobrepeso', max: 30, color: 'bg-amber-400' },
  { label: 'Obesidade grau I', max: 35, color: 'bg-orange-500' },
  { label: 'Obesidade grau II', max: 40, color: 'bg-rose-500' },
  {
    label: 'Obesidade grau III',
    max: Number.POSITIVE_INFINITY,
    color: 'bg-red-600',
  },
]

// Values shown on the scale; a BMI outside them sticks to the edges
const SCALE_MIN = 15
const SCALE_MAX = 45

function toScalePosition(bmi: number) {
  const clamped = Math.min(Math.max(bmi, SCALE_MIN), SCALE_MAX)
  return ((clamped - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100
}

function formatBmi(bmi: number) {
  return formatNumber(bmi, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })
}

function BmiScale({ bmi }: { bmi: number }) {
  return (
    <div aria-hidden className="space-y-1 pt-2">
      <div className="relative">
        <div className="flex h-2 overflow-hidden rounded-full">
          {bmiRanges.map((range, index) => {
            const min = index === 0 ? SCALE_MIN : bmiRanges[index - 1].max
            const max = Math.min(range.max, SCALE_MAX)

            return (
              <div
                key={range.label}
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
  const body = useBodyMeasurements()

  const bmi = body.values
    ? body.values.weightKg / (body.values.heightCm / 100) ** 2
    : undefined
  const range =
    bmi === undefined ? undefined : bmiRanges.find((r) => bmi < r.max)

  return (
    <div className="w-full max-w-2xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">Calculadora de IMC</h1>

        <p className="text-muted-foreground text-balance">
          Descubra seu Índice de Massa Corporal a partir do peso e da altura.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <BodyMeasurementsFields {...body} />
        </div>

        <ResultCard>
          {bmi !== undefined && range && (
            <>
              <p>
                <span className="text-2xl font-mono">{formatBmi(bmi)}</span>{' '}
                <span className="text-muted-foreground">·</span>{' '}
                <span className="font-medium">{range.label}</span>
              </p>
              <BmiScale bmi={bmi} />
            </>
          )}
        </ResultCard>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-2">Como funciona</h2>

        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>O IMC é o peso (kg) dividido pela altura (m) ao quadrado.</li>
          <li>
            As faixas seguem a classificação da Organização Mundial da Saúde
            para adultos.
          </li>
          <li>
            O IMC não diferencia massa muscular de gordura nem vale para
            crianças, gestantes e idosos. Para uma avaliação completa, consulte
            um profissional de saúde.
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
