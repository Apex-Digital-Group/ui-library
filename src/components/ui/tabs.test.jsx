import { describe, it, expect } from 'vitest'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs'

describe('Tabs, TabsList, TabsTrigger, TabsContent', () => {
  it('exports Tabs', () => {
    expect(Tabs).toBeDefined()
  })

  it('exports TabsList', () => {
    expect(TabsList).toBeDefined()
  })

  it('exports TabsTrigger', () => {
    expect(TabsTrigger).toBeDefined()
  })

  it('exports TabsContent', () => {
    expect(TabsContent).toBeDefined()
  })
})
