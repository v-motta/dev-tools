'use client'

import ky from 'ky'
import { LoaderCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { ResultCard } from '@/components/result-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLocaleFormat } from '@/lib/locale'

// Same limits as the API, so the browser rejects out-of-range values before
// the request is sent
const MAX_COUNT = 1000
const MAX_ABSOLUTE_VALUE = 1_000_000_000

// useFormStatus only reads the status of a parent <form>, so the button
// needs to be its own component
function SubmitButton() {
  const t = useTranslations('pages.numbers')
  const { pending } = useFormStatus()

  return (
    <Button className="w-full" disabled={pending}>
      {pending ? (
        <LoaderCircle className="animate-spin" aria-label={t('drawing')} />
      ) : (
        t('draw')
      )}
    </Button>
  )
}

export function RandomPicker() {
  const t = useTranslations('pages.numbers')
  const { formatNumber } = useLocaleFormat()
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([])
  const [errorMessage, setErrorMessage] = useState('')

  async function drawNumbers(formData: FormData) {
    const rawFormData = Object.fromEntries(formData.entries())

    // The API answers in English for integrations, so the messages shown on
    // the page come from the page itself
    if (Number(rawFormData.random_min) > Number(rawFormData.random_max)) {
      setDrawnNumbers([])
      setErrorMessage(t('minAboveMax'))
      return
    }

    try {
      const res = await ky
        .post('/api/random-picker', {
          json: rawFormData,
        })
        .json<{ randomNumber: number[] }>()

      setDrawnNumbers(res.randomNumber)
      setErrorMessage('')
    } catch {
      setDrawnNumbers([])
      setErrorMessage(t('error'))
    }
  }

  return (
    <div className="space-y-4">
      <form action={drawNumbers} className="space-y-4">
        <div className="space-y-1">
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label htmlFor="random_count">{t('quantity')}</Label>
              <Input
                id="random_count"
                name="random_count"
                type="number"
                min="1"
                max={MAX_COUNT}
                defaultValue="1"
                required
                aria-describedby="random-error"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="random_min">{t('min')}</Label>
              <Input
                id="random_min"
                name="random_min"
                type="number"
                min={-MAX_ABSOLUTE_VALUE}
                max={MAX_ABSOLUTE_VALUE}
                defaultValue="1"
                required
                aria-describedby="random-error"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="random_max">{t('max')}</Label>
              <Input
                id="random_max"
                name="random_max"
                type="number"
                min={-MAX_ABSOLUTE_VALUE}
                max={MAX_ABSOLUTE_VALUE}
                defaultValue="100"
                required
                aria-describedby="random-error"
              />
            </div>
          </div>

          <p
            id="random-error"
            role="alert"
            className="min-h-5 text-sm font-medium text-red-500"
          >
            {errorMessage}
          </p>
        </div>

        <SubmitButton />
      </form>

      <ResultCard title={t('result', { count: drawnNumbers.length })}>
        {drawnNumbers.length > 0 && (
          <p className="text-2xl font-mono wrap-break-word">
            {drawnNumbers.map((number) => formatNumber(number)).join(', ')}
          </p>
        )}
      </ResultCard>
    </div>
  )
}
