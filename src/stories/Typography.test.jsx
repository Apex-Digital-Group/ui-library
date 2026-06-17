import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Scale } from './Typography.stories.jsx'

describe('Typography scale', () => {
  it('renders every documented token class', () => {
    const { container } = render(<Scale />)
    const required = [
      't-display-2xl', 't-display-xl', 't-display-lg', 't-display-md', 't-display-sm', 't-display-xs',
      't-body-xl', 't-body-lg', 't-body-md', 't-body-sm', 't-body-xs',
      't-label-lg', 't-label-md', 't-label-sm',
      't-eyebrow', 't-link',
    ]
    for (const cls of required) {
      expect(container.querySelector(`.${cls}`)).not.toBeNull()
    }
  })

  it('shows the foundations heading', () => {
    render(<Scale />)
    expect(screen.getByText('Typography')).toBeInTheDocument()
  })
})
