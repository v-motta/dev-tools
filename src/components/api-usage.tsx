interface ApiUsageProps {
  /** Name of the tool, e.g. "CPF validator" */
  name: string
  /** HTTP method and path, e.g. "POST /api/validators/cpf" */
  endpoint: string
  request: unknown
  response: unknown
}

export function ApiUsage({ name, endpoint, request, response }: ApiUsageProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-bold font-mono">How to use the API</h2>
        <p className="text-muted-foreground text-balance">
          You can integrate our {name} into your application using our REST API.
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Endpoint</p>
        <pre className="p-4 rounded-lg bg-sidebar font-mono text-sm">
          {endpoint}
        </pre>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Request example</p>
        <pre className="p-4 rounded-lg bg-sidebar font-mono text-sm">
          {JSON.stringify(request, null, 2)}
        </pre>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Response</p>
        <pre className="p-4 rounded-lg bg-sidebar font-mono text-sm">
          {JSON.stringify(response, null, 2)}
        </pre>
      </div>
    </div>
  )
}
