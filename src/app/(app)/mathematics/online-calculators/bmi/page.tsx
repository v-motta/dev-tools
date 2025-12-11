'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

export default function BMIPage() {
  const [bmi, setBmi] = useState<number>()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const result = Object.fromEntries(data)

    if (!result.weight || !result.height) {
      return
    }

    const weight = Number.parseFloat(result.weight as string)
    const height = Number.parseFloat(result.height as string) / 100

    const bmi = weight / (height * height)

    setBmi(bmi)
  }

  const bmiStatus: Record<string, string> = {
    underweight: 'Underweight 🏃‍♀️🍏',
    normal: 'Normal weight ⚖️😊',
    overweight: 'Overweight 🍔🍟',
    obesity1: 'Obesity Grade 1 🍕🍦',
    obesity2: 'Obesity Grade 2 🍩🍔',
    obesity3: 'Obesity Grade 3 (morbid) 🚑⚠️',
  }

  function getBmiStatus(bmi: number): string {
    if (bmi < 18.5) return bmiStatus.underweight
    if (bmi >= 18.5 && bmi < 24.9) return bmiStatus.normal
    if (bmi >= 25 && bmi < 29.9) return bmiStatus.overweight
    if (bmi >= 30 && bmi < 34.9) return bmiStatus.obesity1
    if (bmi >= 35 && bmi < 39.9) return bmiStatus.obesity2

    return bmiStatus.obesity3
  }

  return (
    <div className="space-y-8 w-full lg:w-1/2 2xl:w-1/3">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">BMI Calculator</h1>

        <p className="text-muted-foreground text-balance">
          Use our calculator to discover your Body Mass Index.
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

        {bmi && (
          <p>
            IMC: <span className="font-bold">( {bmi.toFixed(2)} )</span> -{' '}
            <span className="font-bold">
              ( {getBmiStatus(Number(bmi.toFixed(2)))} )
            </span>
          </p>
        )}

        <Button className="w-full">Calculate BMI</Button>
      </form>
    </div>
  )
}
