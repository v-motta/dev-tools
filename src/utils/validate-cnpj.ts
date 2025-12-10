export function validateCNPJ(cnpj: string): boolean {
  const cleanCNPJ = cnpj.replace(/[^\d]/g, '')

  if (cleanCNPJ.length !== 14) return false
  if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false

  return validateDigits(cleanCNPJ)
}

function calculateDigit(numbers: string, length: number): number {
  let sum = 0
  let position = length - 7

  for (let i = length; i >= 1; i--) {
    sum += Number(numbers.charAt(length - i)) * position--
    if (position < 2) position = 9
  }

  return sum % 11 < 2 ? 0 : 11 - (sum % 11)
}

function validateDigits(cnpj: string): boolean {
  const length = cnpj.length - 2
  const numbers = cnpj.substring(0, length)
  const digits = cnpj.substring(length)

  const firstDigit = calculateDigit(numbers, length)
  if (firstDigit !== Number(digits.charAt(0))) return false

  const secondDigit = calculateDigit(cnpj.substring(0, length + 1), length + 1)
  if (secondDigit !== Number(digits.charAt(1))) return false

  return true
}
