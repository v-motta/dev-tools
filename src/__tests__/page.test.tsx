import { validateCPF } from '@/lib/validate-cpf'
import '@testing-library/jest-dom'

describe('Validate CPF', () => {
  it('should returns false for CPF with incorrect length', () => {
    const validatedCPF = validateCPF('123')

    expect(validatedCPF).toBe(false)
  })

  it('should returns false for CPF with all same digits', () => {
    expect(validateCPF('00000000000')).toBe(false)
    expect(validateCPF('11111111111')).toBe(false)
    expect(validateCPF('22222222222')).toBe(false)
    expect(validateCPF('33333333333')).toBe(false)
    expect(validateCPF('44444444444')).toBe(false)
    expect(validateCPF('55555555555')).toBe(false)
    expect(validateCPF('66666666666')).toBe(false)
    expect(validateCPF('77777777777')).toBe(false)
    expect(validateCPF('88888888888')).toBe(false)
    expect(validateCPF('99999999999')).toBe(false)
  })

  it('should returns false for an invalid CPF', () => {
    const validatedCPF = validateCPF('12792888095')

    expect(validatedCPF).toBe(false)
  })

  it('should returns false for an invalid CPF with mask', () => {
    const validatedCPF = validateCPF('127.928.880-95')

    expect(validatedCPF).toBe(false)
  })

  it('should returns true for a valid CPF', () => {
    const validatedCPF = validateCPF('19733773069')

    expect(validatedCPF).toBe(true)
  })

  it('should returns true for a valid CPF with mask', () => {
    const validatedCPF = validateCPF('197.337.730-69')

    expect(validatedCPF).toBe(true)
  })
})
