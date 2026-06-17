import { describe, it, expect } from 'vitest'
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from './input-otp'

describe('InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator', () => {
  it('exports InputOTP', () => {
    expect(InputOTP).toBeDefined()
  })

  it('exports InputOTPGroup', () => {
    expect(InputOTPGroup).toBeDefined()
  })

  it('exports InputOTPSlot', () => {
    expect(InputOTPSlot).toBeDefined()
  })

  it('exports InputOTPSeparator', () => {
    expect(InputOTPSeparator).toBeDefined()
  })
})
