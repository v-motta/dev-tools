'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

export default function DiscountPage() {
  const [price, setPrice] = useState('')
  const [percentage, setPercentage] = useState('')
  const [result, setResult] = useState<{
    discountAmount: number
    finalPrice: number
  } | null>(null)

  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digitsOnly = e.target.value.replace(/[^0-9.]/g, '')

    if (digitsOnly.includes('.')) {
      const [whole, decimal] = digitsOnly.split('.')
      if (whole.length > 8) return
      if (decimal && decimal.length > 2) return
      setPrice(digitsOnly)
      return
    }

    if (digitsOnly.length > 8) {
      const formatted = `${digitsOnly.slice(0, 8)}.${digitsOnly.slice(8, 10)}`
      setPrice(formatted)
      return
    }

    setPrice(digitsOnly)
  }

  function handlePercentageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digitsOnly = e.target.value.replace(/[^0-9.]/g, '')

    if (digitsOnly.includes('.')) {
      const [_, decimal] = digitsOnly.split('.')
      if (decimal && decimal.length > 2) return
      const numValue = Number(digitsOnly)
      if (numValue >= 0 && numValue <= 100) {
        setPercentage(digitsOnly)
      }
      return
    }

    if (digitsOnly.length > 2) {
      const formatted = `${digitsOnly.slice(0, 2)}.${digitsOnly.slice(2, 4)}`
      setPercentage(formatted)
      return
    }

    const numValue = Number(digitsOnly)
    if (digitsOnly === '' || (numValue >= 0 && numValue <= 100)) {
      setPercentage(digitsOnly)
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const priceNum = Number.parseFloat(price)
    const percentageNum = Number.parseFloat(percentage)

    if (Number.isNaN(priceNum) || Number.isNaN(percentageNum)) {
      return
    }

    const discountAmount = (priceNum * percentageNum) / 100
    const finalPrice = priceNum - discountAmount

    setResult({
      discountAmount: Number(discountAmount.toFixed(2)),
      finalPrice: Number(finalPrice.toFixed(2)),
    })
  }

  return (
    <div className="space-y-8 w-full lg:w-1/2 2xl:w-1/3">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">Discount Calculator</h1>

        <p className="text-muted-foreground text-balance">
          Use our discount calculator to calculate the discount amount and the
          final price after applying the discount.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex *:flex-1 gap-4">
          <div className="space-y-1">
            <Label htmlFor="price">Enter the price</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                id="price"
                inputMode="decimal"
                value={price}
                onChange={handlePriceChange}
                className="pl-6"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="percentage">Enter the percentage</Label>
            <div className="relative">
              <Input
                id="percentage"
                inputMode="decimal"
                value={percentage}
                onChange={handlePercentageChange}
                className="pr-6"
                placeholder="0"
                required
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                %
              </span>
            </div>
          </div>
        </div>

        <Button className="w-full">Calculate discount</Button>
      </form>

      {result && (
        <div className="space-y-2 p-4 border rounded-lg">
          <p className="text-sm text-muted-foreground">Results</p>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm text-muted-foreground">Discount amount:</p>
              <p className="font-mono">${result.discountAmount}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Final price:</p>
              <p className="font-mono">${result.finalPrice}</p>
            </div>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-lg font-medium mb-2">How it works</h2>

        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>
            Enter the original price and the discount percentage you want to
            calculate.
          </li>
          <li>
            The price input accepts up to 10 digits and automatically formats
            the decimal places after the first 8 digits.
          </li>
          <li>
            The percentage input only accepts values between 0 and 100 inclusive
            decimal places.
          </li>
          <li>
            The calculator multiplies the price by the percentage and divides by
            100 to get the discount amount.
          </li>
          <li>
            The final price is calculated by subtracting the discount amount
            from the original price.
          </li>
          <li>
            All monetary values are rounded to 2 decimal places for accuracy.
          </li>
        </ul>
      </div>
    </div>
  )
}
