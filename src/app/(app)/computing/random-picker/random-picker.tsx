'use client'

import ky from 'ky'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function RandomPicker() {
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([])

  async function drawNumbers(formData: FormData) {
    const rawFormData = Object.fromEntries(formData.entries())

    const res = await ky
      .post('/api/random-picker', {
        json: rawFormData,
      })
      .json<{ randomNumber: number[] }>()

    setDrawnNumbers(res.randomNumber)
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
            <Input id="random_count" name="random_count" defaultValue="1" />
          </div>
          number between
          <div>
            <Label htmlFor="random_min" className="sr-only">
              Min
            </Label>
            <Input id="random_min" name="random_min" defaultValue="1" />
          </div>
          and
          <div>
            <Label htmlFor="random_max" className="sr-only">
              Max
            </Label>
            <Input id="random_max" name="random_max" defaultValue="100" />
          </div>
        </div>

        <Button className="w-full">Pick Random Number(s)</Button>
      </form>

      <Card className="mt-4 p-4">
        {drawnNumbers.length > 0 ? (
          <div className="text-2xl font-mono">{drawnNumbers.join(', ')}</div>
        ) : (
          <div className="text-muted-foreground">No numbers drawn yet.</div>
        )}
      </Card>
    </div>
  )
}
