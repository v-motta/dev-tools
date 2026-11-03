import { generateApplePassword } from '../src/utils/generate-password'

const iterations = 100000
const start = performance.now()

for (let i = 0; i < iterations; i++) {
  generateApplePassword()
}

const end = performance.now()
const totalTime = end - start
const avgTime = totalTime / iterations

console.log(`Benchmarking generateApplePassword:`)
console.log(`Total iterations: ${iterations}`)
console.log(`Total time: ${totalTime.toFixed(2)}ms`)
console.log(`Average time per call: ${avgTime.toFixed(4)}ms`)
console.log(`Operations per second: ${(1000 / avgTime).toFixed(2)}`)
