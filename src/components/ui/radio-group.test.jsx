import { describe, it, expect } from 'vitest'
import { RadioGroup, RadioGroupItem } from './radio-group'

describe('RadioGroup, RadioGroupItem', () => {
  it('exports RadioGroup', () => {
    expect(RadioGroup).toBeDefined()
  })

  it('exports RadioGroupItem', () => {
    expect(RadioGroupItem).toBeDefined()
  })
})
