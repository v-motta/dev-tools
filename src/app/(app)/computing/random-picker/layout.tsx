import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Random Picker',
  description:
    "Tools to help you make random selections, whether it's picking a random item from a list or drawing a random number within a specified range.",
}

export default function RandomPickerLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
