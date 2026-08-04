import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ModalHeader from './ModalHeader'

describe('ModalHeader', () => {
  it('renders the title in its own casing (no CSS uppercasing)', () => {
    render(<ModalHeader title="Start Video Call" />)
    const h = screen.getByRole('heading', { name: 'Start Video Call' })
    expect(h).toBeDefined()
    expect(h.className).not.toMatch(/uppercase/)
  })

  it('renders an optional subtitle', () => {
    render(<ModalHeader title="Payout" subtitle="Monthly summary" />)
    expect(screen.getByText('Monthly summary')).toBeDefined()
  })

  it('fires onClose from the ghost close button', () => {
    const onClose = vi.fn()
    render(<ModalHeader title="T" onClose={onClose} />)
    fireEvent.click(screen.getByLabelText('Close'))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('omits the close button when onClose is not provided', () => {
    render(<ModalHeader title="Processing…" />)
    expect(screen.queryByLabelText('Close')).toBeNull()
  })
})
