import { describe, it, expect } from 'vitest'
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction } from './toast'

describe('ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction', () => {
  it('exports ToastProvider', () => {
    expect(ToastProvider).toBeDefined()
  })

  it('exports ToastViewport', () => {
    expect(ToastViewport).toBeDefined()
  })

  it('exports Toast', () => {
    expect(Toast).toBeDefined()
  })

  it('exports ToastTitle', () => {
    expect(ToastTitle).toBeDefined()
  })

  it('exports ToastDescription', () => {
    expect(ToastDescription).toBeDefined()
  })

  it('exports ToastClose', () => {
    expect(ToastClose).toBeDefined()
  })

  it('exports ToastAction', () => {
    expect(ToastAction).toBeDefined()
  })
})
