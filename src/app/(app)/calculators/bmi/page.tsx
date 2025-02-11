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

    const weight = Number.parseFloat(result.weight as string)
    const height = Number.parseFloat(result.height as string) / 100

    const bmi = weight / (height * height)

    setBmi(bmi)
  }

  const bmiStatus: Record<string, string> = {
    underweight: 'Abaixo do peso 🏃‍♀️🍏',
    normal: 'Peso normal ⚖️😊',
    overweight: 'Sobrepeso 🍔🍟',
    obesity1: 'Obesidade Grau 1 🍕🍦',
    obesity2: 'Obesidade Grau 2 🍩🍔',
    obesity3: 'Obesidade Grau 3 (mórbida) 🚑⚠️',
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
        <h1 className="text-2xl font-bold font-mono">Calculador de IMC</h1>

        <p className="text-muted-foreground text-balance">
          Use nossa calculadora para descobrir seu Índice de Massa Corporal.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="weight">Digite o seu peso (kg)</Label>
          <Input type="text" id="weight" name="weight" maxLength={3} />
        </div>

        <div className="space-y-1">
          <Label htmlFor="height">Digite a sua altura (cm)</Label>
          <Input type="text" id="height" name="height" maxLength={3} />
        </div>

        {bmi && (
          <p>
            IMC: <span className="font-bold">( {bmi.toFixed(2)} )</span> -{' '}
            <span className="font-bold">
              ( {getBmiStatus(Number(bmi.toFixed(2)))} )
            </span>
          </p>
        )}

        <Button className="w-full">Calcular IMC</Button>
      </form>
    </div>
  )
}
