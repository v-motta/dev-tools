import type { Metadata } from 'next'
import { RandomPicker } from './random-picker'

export const metadata: Metadata = {
  title: 'Random Picker',
  description: 'Draw one or more random numbers within a specified range.',
}

export default function RandomPickerPage() {
  return (
    <div className="space-y-8 w-full lg:w-1/2 2xl:w-1/3">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">Random Picker</h1>

        <p className="text-muted-foreground text-balance">
          Use our random picker! Choose how many numbers you want and the range
          to draw them from.
        </p>
      </div>

      <RandomPicker />

      <div>
        <h2 className="text-lg font-medium mb-2">How it works</h2>

        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>
            The numbers are drawn on the server and are not stored anywhere.
          </li>
          <li>
            Both the min and the max are included in the range, and negative
            numbers are allowed.
          </li>
          <li>You can draw up to 1000 numbers at once.</li>
          <li>Each number is drawn independently, so numbers may repeat.</li>
          <li>
            The draw is not cryptographically secure, so don't use it for
            passwords, security tokens or prize draws with real stakes.
          </li>
        </ul>
      </div>
    </div>
  )
}
