import { describe, it, expect } from 'vitest'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './resizable'

describe('ResizablePanelGroup, ResizablePanel, ResizableHandle', () => {
  it('exports ResizablePanelGroup', () => {
    expect(ResizablePanelGroup).toBeDefined()
  })

  it('exports ResizablePanel', () => {
    expect(ResizablePanel).toBeDefined()
  })

  it('exports ResizableHandle', () => {
    expect(ResizableHandle).toBeDefined()
  })
})
