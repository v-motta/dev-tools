import { GeneratePassword } from './generate-password'

export default function PasswordGeneratorPage() {
  return (
    <div className="space-y-8 w-full lg:w-1/2 2xl:w-1/3">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">Password Generator</h1>

        <p className="text-muted-foreground text-balance">
          Use our password generator to create a secure password.
        </p>
      </div>

      <GeneratePassword />

      <div>
        <h2 className="text-lg font-medium mb-2">How it works</h2>

        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>
            The password is generated on the server and is not stored anywhere.
          </li>
          <li>
            The password generator creates a random password based on the
            selected options.
          </li>
          <li>
            The password will have at least 4 characters (1 lowercase letter, 1
            uppercase letter, 1 number, and 1 symbol).
          </li>
          <li>
            There will always be one lowercase letter, one uppercase letter, one
            number, and one symbol if the options are selected.
          </li>
          <li>
            By default, the password contains only lowercase letters if no
            additional options are selected.
          </li>
          <li>
            You can copy the generated password by clicking the copy icon next
            to it.
          </li>
        </ul>
      </div>
    </div>
  )
}
