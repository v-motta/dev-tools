'use client'

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
import { useState } from 'react'

type ActivityLevel = {
  value: string
  label: string
  multiplier: number
}

const activityLevels: ActivityLevel[] = [
  {
    value: 'sedentary',
    label: 'Sedentary (little or no exercise)',
    multiplier: 1.2,
  },
  {
    value: 'light',
    label: 'Light (exercise 1-3 times/week)',
    multiplier: 1.375,
  },
  {
    value: 'moderate',
    label: 'Moderate (exercise 3-5 times/week)',
    multiplier: 1.55,
  },
  {
    value: 'active',
    label: 'Active (exercise 6-7 times/week)',
    multiplier: 1.725,
  },
  {
    value: 'very-active',
    label: 'Very Active (hard exercise daily)',
    multiplier: 1.9,
  },
]

export default function BMIPage() {
  const [results, setResults] = useState<{
    bmr?: number
    tdee?: number
  }>({})

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const result = Object.fromEntries(data)

    if (
      !result.weight ||
      !result.height ||
      !result.age ||
      !result.gender ||
      !result.activity
    ) {
      return
    }

    const weight = Number.parseFloat(result.weight as string)
    const height = Number.parseFloat(result.height as string)
    const age = Number.parseInt(result.age as string)
    const gender = result.gender as string
    const activity = result.activity as string

    let bmr = 10 * weight + 6.25 * height - 5 * age
    bmr = gender === 'male' ? bmr + 5 : bmr - 161

    const activityMultiplier =
      activityLevels.find((level) => level.value === activity)?.multiplier ||
      1.2
    const tdee = bmr * activityMultiplier

    setResults({ bmr, tdee })
  }

  return (
    <div className="space-y-8 w-full lg:w-1/2 2xl:w-1/3">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">BMR Calculator</h1>

        <p className="text-muted-foreground text-balance">
          Use our calculator to discover your Basal Metabolic Rate (BMR) and
          Total Daily Energy Expenditure (TDEE).
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="weight">Enter your weight (kg)</Label>
          <Input
            type="number"
            id="weight"
            name="weight"
            min="30"
            max="300"
            required
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="height">Enter your height (cm)</Label>
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
          <Label htmlFor="age">Enter your age</Label>
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
          <Label htmlFor="gender">Gender</Label>
          <Select name="gender" required>
            <SelectTrigger>
              <SelectValue placeholder="Select your gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label htmlFor="activity">Activity Level</Label>
          <Select name="activity" required>
            <SelectTrigger>
              <SelectValue placeholder="Select your activity level" />
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

        {results.bmr && results.tdee && (
          <div className="space-y-2 p-4 bg-muted rounded-lg">
            <p>
              BMR:{' '}
              <span className="font-bold">
                {Math.round(results.bmr)} calories/day
              </span>
            </p>
            <p>
              TDEE:{' '}
              <span className="font-bold">
                {Math.round(results.tdee)} calories/day
              </span>
            </p>
          </div>
        )}

        <Button className="w-full">Calculate BMR and TDEE</Button>
      </form>
    </div>
  )
}
