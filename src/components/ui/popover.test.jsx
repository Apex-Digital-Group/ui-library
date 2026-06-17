import { describe, it, expect } from 'vitest'
import { Popover, PopoverTrigger, PopoverContent, PopoverAnchor } from './popover'

describe('Popover, PopoverTrigger, PopoverContent, PopoverAnchor', () => {
  it('exports Popover', () => {
    expect(Popover).toBeDefined()
  })

  it('exports PopoverTrigger', () => {
    expect(PopoverTrigger).toBeDefined()
  })

  it('exports PopoverContent', () => {
    expect(PopoverContent).toBeDefined()
  })

  it('exports PopoverAnchor', () => {
    expect(PopoverAnchor).toBeDefined()
  })
})
