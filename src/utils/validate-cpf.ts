/**
 * Validates a Brazilian CPF number.
 *
 * A CPF (Cadastro de Pessoas Físicas) is an 11-digit number that is used for tax purposes in Brazil.
 * This function checks if the provided CPF number is valid by performing the following steps:
 * 1. Removes any non-digit characters.
 * 2. Checks if the length of the number is 11 digits.
 * 3. Checks if all digits are the same (invalid CPF).
 * 4. Calculates the first verification digit and checks if it matches.
 * 5. Calculates the second verification digit and checks if it matches.
 *
 * @param {string} cpf - The CPF number to be validated.
 * @returns {boolean} - Returns true if the CPF is valid, otherwise false.
 */
export function validateCPF(cpf: string): boolean {
  const cpfNumbers = cpf.replace(/\D/g, '')

  if (cpfNumbers.length !== 11) return false
  if (/^(\d)\1+$/.test(cpfNumbers)) return false // Check for repeated digits

  let sum = 0
  let weight = 10

  for (let i = 0; i < 9; i++) {
    sum += Number.parseInt(cpfNumbers[i]) * weight
    weight--
  }

  let firstDigitResult = (sum * 10) % 11
  if (firstDigitResult === 10 || firstDigitResult === 11) firstDigitResult = 0

  if (firstDigitResult !== Number.parseInt(cpfNumbers[9])) return false

  sum = 0
  weight = 11

  for (let i = 0; i < 10; i++) {
    sum += Number.parseInt(cpfNumbers[i]) * weight
    weight--
  }

  let secondDigitResult = (sum * 10) % 11
  if (secondDigitResult === 10 || secondDigitResult === 11)
    secondDigitResult = 0

  if (secondDigitResult !== Number.parseInt(cpfNumbers[10])) return false

  return true
}
