// Fake test data only: Math.random is enough and keeps these helpers usable on
// both the server and the client. Passwords use node:crypto instead.

/** A random integer between `min` and `max`, both included. */
export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function randomDigits(length: number) {
  return Array.from({ length }, () => randomInt(0, 9)).join('')
}

export function pick<T>(items: readonly T[]): T {
  return items[randomInt(0, items.length - 1)]
}
