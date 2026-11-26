import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StoryRing } from './StoryRing'

describe('StoryRing', () => {
  it('renders the child unchanged inside the ring wrapper', () => {
    render(
      <StoryRing state="new">
        <div data-testid="avatar" className="avatar" style={{ width: 176 }} />
      </StoryRing>,
    )
    const avatar = screen.getByTestId('avatar')
    expect(avatar.className).toBe('avatar')
    expect(avatar.style.width).toBe('176px')
    expect(avatar.parentElement).toHaveClass('bond-story-ring')
  })

  it.each(['new', 'seen', 'none'])('reflects state %s in data-state', (state) => {
    const { container } = render(<StoryRing state={state}><span /></StoryRing>)
    expect(container.firstChild).toHaveAttribute('data-state', state)
  })

  it('defaults to none and treats an unknown state as none', () => {
    const { container, rerender } = render(<StoryRing><span /></StoryRing>)
    expect(container.firstChild).toHaveAttribute('data-state', 'none')
    rerender(<StoryRing state="live"><span /></StoryRing>)
    expect(container.firstChild).toHaveAttribute('data-state', 'none')
  })

  it('sets thickness and gap as CSS variables, keeping a passed style', () => {
    const { container } = render(<StoryRing state="seen" thickness={4} gap={2} style={{ margin: 5 }}><span /></StoryRing>)
    const root = container.firstChild
    expect(root.style.getPropertyValue('--bsr-thickness')).toBe('4px')
    expect(root.style.getPropertyValue('--bsr-gap')).toBe('2px')
    expect(root.style.margin).toBe('5px')
  })

  it('passes className and other props through', () => {
    const { container } = render(<StoryRing state="new" className="extra" data-testid="ring" title="t"><span /></StoryRing>)
    const root = container.firstChild
    expect(root).toHaveClass('bond-story-ring', 'extra')
    expect(root).toHaveAttribute('data-testid', 'ring')
    expect(root).toHaveAttribute('title', 't')
  })

  it('adds no role or accessible name of its own', () => {
    const { container } = render(<StoryRing state="new"><span /></StoryRing>)
    const root = container.firstChild
    expect(root).not.toHaveAttribute('role')
    expect(root).not.toHaveAttribute('aria-label')
    expect(root).not.toHaveAttribute('tabindex')
  })
})
