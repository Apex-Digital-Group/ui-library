import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Separator } from './separator'

describe('Separator', () => {
  it('renders with a data-orientation attribute', () => {
    const { container } = render(<Separator />)
    expect(container.querySelector('[data-orientation]')).not.toBeNull()
  })

  it('honours vertical orientation', () => {
    const { container } = render(<Separator orientation="vertical" />)
    expect(container.querySelector('[data-orientation="vertical"]')).not.toBeNull()
  })
})
