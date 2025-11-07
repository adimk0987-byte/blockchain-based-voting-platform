import { describe, it, expect } from 'vitest'
import { validation } from '../utils/validation'

describe('Validation Utilities', () => {
  it('validates email correctly', () => {
    expect(validation.email('test@example.com')).toBe(true)
    expect(validation.email('invalid-email')).toBe(false)
  })

  it('validates OTP correctly', () => {
    expect(validation.otp('123456')).toBe(true)
    expect(validation.otp('12345')).toBe(false)
    expect(validation.otp('abc123')).toBe(false)
  })
})
