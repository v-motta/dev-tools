import { validateCNPJ } from '@/lib/validate-cnpj'
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

describe('Validate CNPJ', () => {
  it('should returns false for CNPJ with incorrect length', () => {
    const validatedCNPJ = validateCNPJ('123')

    expect(validatedCNPJ).toBe(false)
  })

  it('should returns false for CNPJ with all same digits', () => {
    expect(validateCNPJ('00000000000000')).toBe(false)
    expect(validateCNPJ('11111111111111')).toBe(false)
    expect(validateCNPJ('22222222222222')).toBe(false)
    expect(validateCNPJ('33333333333333')).toBe(false)
    expect(validateCNPJ('44444444444444')).toBe(false)
    expect(validateCNPJ('55555555555555')).toBe(false)
    expect(validateCNPJ('66666666666666')).toBe(false)
    expect(validateCNPJ('77777777777777')).toBe(false)
    expect(validateCNPJ('88888888888888')).toBe(false)
    expect(validateCNPJ('99999999999999')).toBe(false)
  })

  it('should returns false for an invalid CNPJ', () => {
    const validatedCNPJ = validateCNPJ('12792888095001')

    expect(validatedCNPJ).toBe(false)
  })

  it('should returns false for an invalid CNPJ with mask', () => {
    const validatedCNPJ = validateCNPJ('12.792.888/0001-95')

    expect(validatedCNPJ).toBe(false)
  })

  it('should returns true for a valid CNPJ', () => {
    const validatedCNPJ = validateCNPJ('04252011000110')

    expect(validatedCNPJ).toBe(true)
  })

  it('should returns true for a valid CNPJ with mask', () => {
    const validatedCNPJ = validateCNPJ('04.252.011/0001-10')

    expect(validatedCNPJ).toBe(true)
  })
})
