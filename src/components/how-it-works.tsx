import type { ReactNode } from 'react'

/** The "Como funciona" list every tool page has below the tool. */
export function HowItWorks({ items }: { items: ReactNode[] }) {
  return (
    <div>
      <h2 className="text-lg font-medium mb-2">Como funciona</h2>

      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
        {items.map((item, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static content
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
