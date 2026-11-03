interface ResultCardProps {
  title?: string
  children?: React.ReactNode
}

/** Shows a tool's result below its form, in the same place on every tool. */
export function ResultCard({ title = 'Resultado', children }: ResultCardProps) {
  return (
    // The live region has to exist before the result shows up, otherwise
    // screen readers don't announce it
    <div role="status">
      {children ? (
        <div className="space-y-3 rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">{title}</p>
          {children}
        </div>
      ) : null}
    </div>
  )
}
