import { useTranslations } from 'next-intl'
import { SITE_URL } from '@/lib/site'
import { CopyButton } from './copy-button'

interface ApiUsageProps {
  /**
   * Name of the tool as it fits the intro sentence, with its article and
   * case, e.g. "o validador de CPF" or "den CPF-Validator"
   */
  name: string
  method: 'GET' | 'POST'
  /** e.g. "/api/validators/cpf" */
  path: string
  /** Query string used in the example request */
  query?: Record<string, string>
  /** JSON body used in the example request */
  body?: unknown
  response: unknown
  parameters?: { name: string; description: string }[]
}

function CodeBlock({ label, code }: { label: string; code: string }) {
  const t = useTranslations('apiUsage')

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{label}</p>
      <div className="relative">
        <pre className="overflow-x-auto rounded-lg bg-sidebar p-4 pr-14 font-mono text-sm">
          {code}
        </pre>
        <CopyButton
          value={code}
          label={t('copy', { label })}
          className="absolute right-2 top-2 size-8"
        />
      </div>
    </div>
  )
}

function buildCurl({ method, path, query, body }: ApiUsageProps) {
  const search = query ? `?${new URLSearchParams(query)}` : ''
  const url = `${SITE_URL}${path}${search}`

  if (method === 'GET') return `curl "${url}"`

  return [
    `curl -X POST ${url} \\`,
    `  -H "Content-Type: application/json" \\`,
    `  -d '${JSON.stringify(body)}'`,
  ].join('\n')
}

export function ApiUsage(props: ApiUsageProps) {
  const { name, method, path, body, response, parameters } = props
  const t = useTranslations('apiUsage')

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-bold font-mono">{t('title')}</h2>
        <p className="text-muted-foreground text-balance">
          {t('intro', { name })}
        </p>
      </div>

      <CodeBlock label={t('endpoint')} code={`${method} ${path}`} />

      {parameters && parameters.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">
            {method === 'GET' ? t('queryParameters') : t('requestBody')}
          </p>
          <dl className="divide-y rounded-lg border text-sm">
            {parameters.map((parameter) => (
              <div
                key={parameter.name}
                className="grid gap-1 p-3 sm:grid-cols-[10rem_1fr]"
              >
                <dt className="font-mono">{parameter.name}</dt>
                <dd className="text-muted-foreground">
                  {parameter.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <CodeBlock label={t('curlExample')} code={buildCurl(props)} />

      {body !== undefined && (
        <CodeBlock
          label={t('exampleBody')}
          code={JSON.stringify(body, null, 2)}
        />
      )}

      <CodeBlock
        label={t('response')}
        code={JSON.stringify(response, null, 2)}
      />
    </div>
  )
}
