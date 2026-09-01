import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { UploadCloud } from 'lucide-react'
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

  it('fires onClose from the circular close button', () => {
    const onClose = vi.fn()
    render(<ModalHeader title="T" onClose={onClose} />)
    fireEvent.click(screen.getByLabelText('Close'))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('omits the close button when onClose is not provided', () => {
    render(<ModalHeader title="Processing…" />)
    expect(screen.queryByLabelText('Close')).toBeNull()
  })

  it('renders the gradient accent strip by default and drops it with accent={false}', () => {
    const { container, rerender } = render(<ModalHeader title="T" />)
    expect(container.querySelector('.top-0.h-\\[3px\\]')).not.toBeNull()
    rerender(<ModalHeader title="T" accent={false} />)
    expect(container.querySelector('.top-0.h-\\[3px\\]')).toBeNull()
  })

  it('renders a gradient icon chip when icon is passed', () => {
    const { container } = render(<ModalHeader title="Upload Video" icon={UploadCloud} />)
    expect(container.querySelector('.rounded-\\[14px\\] svg')).not.toBeNull()
  })
})
