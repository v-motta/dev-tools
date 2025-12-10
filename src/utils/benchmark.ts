import { generatePassword } from './generate-password'

if (require.main === module) {
  const iterations = 100000
  const start = performance.now()

  for (let i = 0; i < iterations; i++) {
    generatePassword()
  }

  const end = performance.now()
  const totalTime = end - start
  const avgTime = totalTime / iterations

  console.log(`Benchmarking generatePasswordV2:`)
  console.log(`Total iterations: ${iterations}`)
  console.log(`Total time: ${totalTime.toFixed(2)}ms`)
  console.log(`Average time per call: ${avgTime.toFixed(4)}ms`)
  console.log(`Operations per second: ${(1000 / avgTime).toFixed(2)}`)
}
