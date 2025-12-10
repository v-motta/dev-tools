export function generateCNPJ() {
  const base = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10))

  let sum = 0
  let weight = 5
  for (let i = 0; i < 12; i++) {
    sum += base[i] * weight
    weight = weight === 2 ? 9 : weight - 1
  }
  const firstDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  base.push(firstDigit)

  sum = 0
  weight = 6
  for (let i = 0; i < 13; i++) {
    sum += base[i] * weight
    weight = weight === 2 ? 9 : weight - 1
  }
  const secondDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  base.push(secondDigit)

  return base
    .join('')
    .replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')
}
