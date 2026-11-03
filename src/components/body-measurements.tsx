'use client'

import { useTranslations } from 'next-intl'
import { useId, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { formatNumber, parseDecimal } from '@/lib/locale'
import { SegmentedControl } from './segmented-control'

type MeasurementSystem = 'metric' | 'imperial'

const KG_PER_LB = 0.45359237
const CM_PER_IN = 2.54

const WEIGHT_RANGE_KG = { min: 30, max: 300 }
const HEIGHT_RANGE_CM = { min: 100, max: 250 }

function round(value: number, digits = 1) {
  const factor = 10 ** digits
  return Math.round(value * factor) / factor
}

function toInput(value: number) {
  return Number.isFinite(value) ? formatNumber(round(value)) : ''
}

/** Keeps weight and height as typed and exposes them in kg and cm. */
export function useBodyMeasurements() {
  const t = useTranslations('bodyMeasurements')
  const [system, setSystemState] = useState<MeasurementSystem>('metric')
  const [weight, setWeight] = useState('')
  const [heightCm, setHeightCm] = useState('')
  const [heightFt, setHeightFt] = useState('')
  const [heightIn, setHeightIn] = useState('')

  const weightKg =
    system === 'metric'
      ? parseDecimal(weight)
      : parseDecimal(weight) * KG_PER_LB
  const totalInches =
    (parseDecimal(heightFt) || 0) * 12 + (parseDecimal(heightIn) || 0)
  const height =
    system === 'metric'
      ? parseDecimal(heightCm)
      : heightFt === '' && heightIn === ''
        ? Number.NaN
        : totalInches * CM_PER_IN

  // Converts what was typed so switching units doesn't lose it
  function setSystem(next: MeasurementSystem) {
    if (next === system) return

    if (next === 'imperial') {
      setWeight(toInput(weightKg / KG_PER_LB))
      const inches = height / CM_PER_IN
      setHeightFt(
        Number.isFinite(inches) ? String(Math.floor(inches / 12)) : ''
      )
      setHeightIn(Number.isFinite(inches) ? toInput(inches % 12) : '')
    } else {
      setWeight(toInput(weightKg))
      setHeightCm(Number.isFinite(height) ? String(Math.round(height)) : '')
    }

    setSystemState(next)
  }

  const isWeightValid =
    weightKg >= WEIGHT_RANGE_KG.min && weightKg <= WEIGHT_RANGE_KG.max
  const isHeightValid =
    height >= HEIGHT_RANGE_CM.min && height <= HEIGHT_RANGE_CM.max

  return {
    system,
    setSystem,
    weight,
    setWeight,
    heightCm,
    setHeightCm,
    heightFt,
    setHeightFt,
    heightIn,
    setHeightIn,
    weightError:
      Number.isNaN(weightKg) || isWeightValid
        ? ''
        : system === 'metric'
          ? t('weightRange', {
              min: WEIGHT_RANGE_KG.min,
              max: WEIGHT_RANGE_KG.max,
              unit: 'kg',
            })
          : t('weightRange', {
              min: Math.ceil(WEIGHT_RANGE_KG.min / KG_PER_LB),
              max: Math.floor(WEIGHT_RANGE_KG.max / KG_PER_LB),
              unit: 'lb',
            }),
    heightError:
      Number.isNaN(height) || isHeightValid
        ? ''
        : system === 'metric'
          ? t('heightRangeMetric', {
              min: HEIGHT_RANGE_CM.min,
              max: HEIGHT_RANGE_CM.max,
            })
          : t('heightRangeImperial'),
    /** `undefined` until both values are filled in and within range */
    values:
      isWeightValid && isHeightValid
        ? { weightKg, heightCm: height }
        : undefined,
  }
}

type BodyMeasurementsFieldsProps = ReturnType<typeof useBodyMeasurements>

export function BodyMeasurementsFields(props: BodyMeasurementsFieldsProps) {
  const id = useId()
  const { system, setSystem, weightError, heightError } = props
  const t = useTranslations('bodyMeasurements')

  return (
    <>
      <div className="pb-4">
        <SegmentedControl
          label={t('units')}
          value={system}
          onChange={setSystem}
          options={[
            { value: 'metric', label: t('metric') },
            { value: 'imperial', label: t('imperial') },
          ]}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor={`${id}-weight`}>
          {t('weight', { unit: system === 'metric' ? 'kg' : 'lb' })}
        </Label>
        <Input
          id={`${id}-weight`}
          inputMode="decimal"
          value={props.weight}
          onChange={(event) => props.setWeight(event.target.value)}
          aria-invalid={weightError !== ''}
          aria-describedby={`${id}-weight-error`}
        />
        <p
          id={`${id}-weight-error`}
          className="min-h-5 text-sm font-medium text-red-500"
        >
          {weightError}
        </p>
      </div>

      <div className="space-y-1">
        {system === 'metric' ? (
          <>
            <Label htmlFor={`${id}-height`}>{t('heightCm')}</Label>
            <Input
              id={`${id}-height`}
              inputMode="numeric"
              value={props.heightCm}
              onChange={(event) => props.setHeightCm(event.target.value)}
              aria-invalid={heightError !== ''}
              aria-describedby={`${id}-height-error`}
            />
          </>
        ) : (
          <fieldset aria-describedby={`${id}-height-error`}>
            <legend className="mb-1 text-sm font-medium">{t('height')}</legend>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Input
                  id={`${id}-height-ft`}
                  inputMode="numeric"
                  value={props.heightFt}
                  onChange={(event) => props.setHeightFt(event.target.value)}
                  aria-label={t('heightFt')}
                  aria-invalid={heightError !== ''}
                />
                <Label htmlFor={`${id}-height-ft`} className="font-normal">
                  ft
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  id={`${id}-height-in`}
                  inputMode="decimal"
                  value={props.heightIn}
                  onChange={(event) => props.setHeightIn(event.target.value)}
                  aria-label={t('heightIn')}
                  aria-invalid={heightError !== ''}
                />
                <Label htmlFor={`${id}-height-in`} className="font-normal">
                  in
                </Label>
              </div>
            </div>
          </fieldset>
        )}
        <p
          id={`${id}-height-error`}
          className="min-h-5 text-sm font-medium text-red-500"
        >
          {heightError}
        </p>
      </div>
    </>
  )
}
