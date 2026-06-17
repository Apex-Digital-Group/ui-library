import { describe, it, expect } from 'vitest'
import { ScrollArea, ScrollBar } from './scroll-area'

describe('ScrollArea, ScrollBar', () => {
  it('exports ScrollArea', () => {
    expect(ScrollArea).toBeDefined()
  })

  it('exports ScrollBar', () => {
    expect(ScrollBar).toBeDefined()
  })
})
