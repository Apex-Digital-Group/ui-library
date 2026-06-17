import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Label } from './label'

describe('Label', () => {
  it('renders text and links to a control via htmlFor', () => {
    render(<Label htmlFor="email">Email address</Label>)
    const lbl = screen.getByText('Email address')
    expect(lbl).toBeInTheDocument()
    expect(lbl).toHaveAttribute('for', 'email')
  })
})
