'use client'

import ky, { HTTPError } from 'ky'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// useFormStatus only reads the status of a parent <form>, so the button
// needs to be its own component
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button className="w-full" disabled={pending}>
      {pending ? (
        <LoaderCircle className="animate-spin" aria-label="Drawing" />
      ) : (
        'Pick Random Number(s)'
      )}
    </Button>
  )
}

export function RandomPicker() {
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([])
  const [errorMessage, setErrorMessage] = useState<string>()

  async function drawNumbers(formData: FormData) {
    const rawFormData = Object.fromEntries(formData.entries())

    try {
      const res = await ky
        .post('/api/random-picker', {
          json: rawFormData,
        })
        .json<{ randomNumber: number[] }>()

      setDrawnNumbers(res.randomNumber)
      setErrorMessage(undefined)
    } catch (error) {
      const data = error instanceof HTTPError ? error.data : undefined
      const message =
        typeof data === 'object' && data !== null && 'message' in data
          ? String(data.message)
          : 'Something went wrong. Please try again.'

      setDrawnNumbers([])
      setErrorMessage(message)
    }
  }

  return (
    <div>
      <form action={drawNumbers} className="flex flex-col gap-y-4">
        <div className="flex items-baseline gap-2 flex-wrap">
          Draw
          <div>
            <Label htmlFor="random_count" className="sr-only">
              Count
            </Label>
            <Input
              id="random_count"
              name="random_count"
              type="number"
              min="1"
              max="1000"
              defaultValue="1"
              required
            />
          </div>
          number between
          <div>
            <Label htmlFor="random_min" className="sr-only">
              Min
            </Label>
            <Input
              id="random_min"
              name="random_min"
              type="number"
              defaultValue="1"
              required
            />
          </div>
          and
          <div>
            <Label htmlFor="random_max" className="sr-only">
              Max
            </Label>
            <Input
              id="random_max"
              name="random_max"
              type="number"
              defaultValue="100"
              required
            />
          </div>
        </div>

        <SubmitButton />
      </form>

      <Card className="mt-4 p-4" role="status">
        {errorMessage ? (
          <div className="text-red-500">{errorMessage}</div>
        ) : drawnNumbers.length > 0 ? (
          <div className="text-2xl font-mono">{drawnNumbers.join(', ')}</div>
        ) : (
          <div className="text-muted-foreground">No numbers drawn yet.</div>
        )}
      </Card>
    </div>
  )
}
