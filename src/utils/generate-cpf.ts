function calculateDigit(partialCPF: string) {
  let sum = 0
  let weight = partialCPF.length + 1

  for (const num of partialCPF) {
    sum += Number.parseInt(num, 10) * weight--
  }

  const remained = sum % 11
  return remained < 2 ? '0' : (11 - remained).toString()
}

export function generateCPF(formatted = true) {
  const partialCPF = Array.from({ length: 9 }, () =>
    Math.floor(Math.random() * 10)
  ).join('')

  const firstDigit = calculateDigit(partialCPF)
  const secondDigit = calculateDigit(partialCPF + firstDigit)

  const cpfCompleto = partialCPF + firstDigit + secondDigit

  return formatted
    ? `${cpfCompleto.slice(0, 3)}.${cpfCompleto.slice(3, 6)}.${cpfCompleto.slice(6, 9)}-${cpfCompleto.slice(9)}`
    : cpfCompleto
}
