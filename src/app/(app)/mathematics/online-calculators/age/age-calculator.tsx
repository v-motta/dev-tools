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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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
      setErrorMessage('Enter a valid date.')
      return
    }

    if (isAfter(date, now)) {
      setCalculatedAge('')
      setErrorMessage('The birthdate cannot be in the future.')
      return
    }

    const years = differenceInYears(now, date)

    const afterYears = subYears(now, years)
    const months = differenceInMonths(afterYears, date)

    const afterMonths = subMonths(afterYears, months)
    const days = differenceInDays(afterMonths, date)

    setErrorMessage('')
    setCalculatedAge(`${years} years, ${months} months and ${days} days`)
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
          <Label htmlFor="birthdate">Enter your birthdate</Label>
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

        <Button className="w-full">Calculate age</Button>
      </form>

      {calculatedAge && (
        <div className="space-y-2 p-4 border rounded-lg" role="status">
          <p className="text-sm text-muted-foreground">Result</p>
          <p className="font-mono">{calculatedAge}</p>
        </div>
      )}

      <div>
        <h2 className="text-lg font-medium mb-2">How it works</h2>

        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>
            The age is calculated based on the difference between the selected
            birthdate and today's date.
          </li>
          <li>
            The calculator provides a precise result showing years, months, and
            days.
          </li>
          <li>
            Calculations are performed in real-time using the browser's date
            functions.
          </li>
          <li>
            The result automatically adjusts for leap years and varying month
            lengths.
          </li>
          <li>
            All calculations are done locally and no date information is stored
            or transmitted.
          </li>
        </ul>
      </div>
    </div>
  )
}
