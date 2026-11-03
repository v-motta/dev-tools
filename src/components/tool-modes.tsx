'use client'

import { type ReactNode, useState } from 'react'
import { SegmentedControl } from '@/components/segmented-control'

interface Mode {
  value: string
  label: string
  content: ReactNode
}

interface ToolModesProps {
  /** The first mode starts selected */
  modes: Mode[]
}

/** Switches a tool page between what it can do, e.g. generate and validate. */
export function ToolModes({ modes }: ToolModesProps) {
  const [current, setCurrent] = useState(modes[0].value)

  return (
    <div className="space-y-8">
      <SegmentedControl
        label="O que você quer fazer?"
        value={current}
        onChange={setCurrent}
        options={modes}
      />

      {/* Every mode stays mounted so switching keeps what was generated or
          typed in the others */}
      {modes.map((mode) => (
        <div
          key={mode.value}
          hidden={mode.value !== current}
          className="space-y-8"
        >
          {mode.content}
        </div>
      ))}
    </div>
  )
}
