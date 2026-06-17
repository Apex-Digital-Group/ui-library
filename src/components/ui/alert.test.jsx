import { describe, it, expect } from 'vitest'
import { Alert, AlertTitle, AlertDescription } from './alert'

describe('Alert, AlertTitle, AlertDescription', () => {
  it('exports Alert', () => {
    expect(Alert).toBeDefined()
  })

  it('exports AlertTitle', () => {
    expect(AlertTitle).toBeDefined()
  })

  it('exports AlertDescription', () => {
    expect(AlertDescription).toBeDefined()
  })
})
