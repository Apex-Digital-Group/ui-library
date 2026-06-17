import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button, buttonVariants } from './button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('exposes a CVA helper', () => {
    expect(typeof buttonVariants).toBe('function')
    expect(buttonVariants({ variant: 'destructive' })).toMatch(/destructive/)
  })

  it('fires onClick', async () => {
    const user = userEvent.setup()
    let count = 0
    render(<Button onClick={() => count++}>Tap</Button>)
    await user.click(screen.getByRole('button'))
    expect(count).toBe(1)
  })

  it('honors variant + size', () => {
    render(<Button variant="outline" size="lg">Big</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toMatch(/border-input/)
    expect(btn.className).toMatch(/h-10/)
  })
})
