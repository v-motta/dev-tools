import { GenerateCNPJ } from './generate-cnpj'

export default function CNPJGeneratorPage() {
  return (
    <div className="space-y-8 w-full lg:w-1/2 2xl:w-1/3">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">CNPJ Generator</h1>

        <p className="text-muted-foreground text-balance">
          Use our CNPJ generator! Just click on "Generate CNPJ" and, in a few
          moments, a new valid number will be created.
        </p>
      </div>

      <GenerateCNPJ />

      <div>
        <h2 className="text-lg font-medium mb-2">How it works</h2>

        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>
            The CNPJ is generated on the server and is not stored anywhere.
          </li>
          <li>
            The generator creates a valid CNPJ number following the rules of the
            Federal Revenue Service.
          </li>
          <li>The generated CNPJ has correctly calculated check digits.</li>
          <li>
            The generated number is for testing purposes only and does not
            belong to any real person.
          </li>
          <li>
            You can copy the generated CNPJ by clicking the copy icon next to
            it.
          </li>
        </ul>
      </div>
    </div>
  )
}
