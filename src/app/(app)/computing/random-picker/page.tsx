import type { Metadata } from 'next'
import { RandomPicker } from './random-picker'

export const metadata: Metadata = {
  title: 'Random Picker',
  description:
    "Tools to help you make random selections, whether it's picking a random item from a list or drawing a random number within a specified range.",
}

export default function RandomPickerPage() {
  return (
    <div className="space-y-8 w-full lg:w-1/2 2xl:w-1/3">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">Random Picker</h1>

        <p className="text-muted-foreground text-balance">
          Tools to help you make random selections, whether it's picking a
          random item from a list or drawing a random number within a specified
          range.
        </p>
      </div>

      <RandomPicker />

      <div>
        <h2 className="text-lg font-medium mb-2">How it works</h2>

        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li></li>
        </ul>
      </div>
    </div>
  )
}
