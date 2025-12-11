import { GenerateCPF } from './generate-cpf'
export default async function CPFGeneratorPage() {
  return (
    <div className="space-y-8 w-full lg:w-1/2 2xl:w-1/3">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">CPF Generator</h1>

        <p className="text-muted-foreground text-balance">
          Use our CPF generator! Just click on 'Generate CPF' and, in moments, a
          new valid CPF will be created.
        </p>
      </div>

      <GenerateCPF />

      <div>
        <h2 className="text-lg font-medium mb-2">How it works</h2>

        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>
            The CPF is generated on the server and is not stored anywhere.
          </li>
          <li>
            The generator creates a valid CPF number following the rules of the
            Federal Revenue Service.
          </li>
          <li>The generated CPF has correctly calculated check digits.</li>
          <li>
            The generated number is for testing purposes only and does not
            belong to any real person.
          </li>
          <li>
            You can copy the generated CPF by clicking the copy icon next to it.
          </li>
        </ul>
      </div>
    </div>
  )
}
