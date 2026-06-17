import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge, badgeVariants } from './badge'

describe('Badge', () => {
  it('renders content', () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('applies the destructive variant', () => {
    render(<Badge variant="destructive">Risk</Badge>)
    expect(screen.getByText('Risk').className).toMatch(/destructive/)
  })

  it('exposes the variants helper', () => {
    expect(typeof badgeVariants).toBe('function')
  })
})
