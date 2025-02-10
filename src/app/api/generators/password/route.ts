import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const length = Math.max(
    Number.parseInt(searchParams.get('length') || '12'),
    4
  )
  const includeUppercase = searchParams.get('uppercase') === 'true'
  const includeNumbers = searchParams.get('numbers') === 'true'
  const includeSymbols = searchParams.get('symbols') === 'true'

  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'
  const numberChars = '0123456789'
  const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?'

  let allChars = lowercaseChars
  let password = getRandomChar(lowercaseChars)

  if (includeUppercase) {
    allChars += uppercaseChars
    password += getRandomChar(uppercaseChars)
  }
  if (includeNumbers) {
    allChars += numberChars
    password += getRandomChar(numberChars)
  }
  if (includeSymbols) {
    allChars += symbolChars
    password += getRandomChar(symbolChars)
  }

  const remainingLength = length - password.length
  for (let i = 0; i < remainingLength; i++) {
    password += getRandomChar(allChars)
  }

  password = shuffleString(password)

  return NextResponse.json({ password })
}

function getRandomChar(chars: string): string {
  return chars[Math.floor(Math.random() * chars.length)]
}

function shuffleString(str: string): string {
  const array = str.split('')
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array.join('')
}
