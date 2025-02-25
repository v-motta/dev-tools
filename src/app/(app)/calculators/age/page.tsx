'use client'

import { DatePicker } from '@/components/date-picker'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  subMonths,
  subYears,
} from 'date-fns'
import { useState } from 'react'

export default function AgePage() {
  const [date, setDate] = useState<Date>()
  const [calculatedAge, setCalculatedAge] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (date) {
      const now = new Date()
      const years = differenceInYears(now, date)

      const afterYears = subYears(now, years)
      const months = differenceInMonths(afterYears, date)

      const afterMonths = subMonths(afterYears, months)
      const days = differenceInDays(afterMonths, date)

      const formattedPhrase = `${years} years, ${months} months and ${days} days`

      setCalculatedAge(formattedPhrase)
    }
  }

  return (
    <div className="space-y-8 w-full lg:w-1/2 2xl:w-1/3">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">Age Calculator</h1>

        <p className="text-muted-foreground text-balance">
          Use our calculator to discover an age based on a birthdate.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="age">Enter your birthdate</Label>
          <DatePicker date={date} setDate={setDate} />
        </div>

        {calculatedAge && (
          <div className="p-4 bg-muted rounded-md space-y-2">
            <p className="text-lg font-semibold">Calculated age:</p>
            <p>{calculatedAge}</p>
          </div>
        )}

        <Button className="w-full">Calculate age</Button>
      </form>
    </div>
  )
}
