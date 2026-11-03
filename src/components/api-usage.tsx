interface ApiUsageProps {
  /** Name of the tool, e.g. "validador de CPF" */
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
        <h2 className="text-xl font-bold font-mono">Como usar a API</h2>
        <p className="text-muted-foreground text-balance">
          Você pode integrar o {name} à sua aplicação pela nossa API REST.
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Endpoint</p>
        <pre className="p-4 rounded-lg bg-sidebar font-mono text-sm">
          {endpoint}
        </pre>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Exemplo de requisição</p>
        <pre className="p-4 rounded-lg bg-sidebar font-mono text-sm">
          {JSON.stringify(request, null, 2)}
        </pre>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Resposta</p>
        <pre className="p-4 rounded-lg bg-sidebar font-mono text-sm">
          {JSON.stringify(response, null, 2)}
        </pre>
      </div>
    </div>
  )
}
