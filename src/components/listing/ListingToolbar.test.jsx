import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import ListingToolbar from './ListingToolbar'

const SORTS = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
]

describe('ListingToolbar', () => {
  it('exports the shell and all sub-components', () => {
    expect(ListingToolbar).toBeDefined()
    expect(ListingToolbar.Search).toBeDefined()
    expect(ListingToolbar.Select).toBeDefined()
    expect(ListingToolbar.ViewToggle).toBeDefined()
    expect(ListingToolbar.Button).toBeDefined()
    expect(ListingToolbar.IconButton).toBeDefined()
    expect(ListingToolbar.Slot).toBeDefined()
    expect(ListingToolbar.Spacer).toBeDefined()
  })

  it('renders arbitrary children in order (open slots)', () => {
    render(
      <ListingToolbar>
        <ListingToolbar.Search placeholder="Search Groups" onCommit={() => {}} />
        <span data-testid="injected">anything</span>
        <ListingToolbar.Button>Create</ListingToolbar.Button>
      </ListingToolbar>
    )
    expect(screen.getByRole('toolbar')).toBeTruthy()
    expect(screen.getByTestId('injected')).toBeTruthy()
    expect(screen.getByText('Create')).toBeTruthy()
  })

  describe('Search', () => {
    beforeEach(() => vi.useFakeTimers())

    it('debounces onCommit while typing and commits immediately on Enter', () => {
      const onCommit = vi.fn()
      render(<ListingToolbar.Search placeholder="Search" onCommit={onCommit} />)
      const input = screen.getByPlaceholderText('Search')
      fireEvent.change(input, { target: { value: 'kit' } })
      expect(onCommit).not.toHaveBeenCalled()
      act(() => vi.advanceTimersByTime(350))
      expect(onCommit).toHaveBeenCalledWith('kit')
      fireEvent.change(input, { target: { value: 'kitten' } })
      fireEvent.keyDown(input, { key: 'Enter' })
      expect(onCommit).toHaveBeenLastCalledWith('kitten')
      vi.useRealTimers()
    })

    it('clear button commits an empty search immediately', () => {
      const onCommit = vi.fn()
      render(<ListingToolbar.Search placeholder="Search" onCommit={onCommit} />)
      fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: 'x' } })
      fireEvent.click(screen.getByLabelText('Clear search'))
      expect(onCommit).toHaveBeenLastCalledWith('')
      vi.useRealTimers()
    })
  })

  describe('Select', () => {
    it('opens, selects an option, closes', () => {
      const onChange = vi.fn()
      render(<ListingToolbar.Select ariaLabel="Sort" value="newest" options={SORTS} onChange={onChange} />)
      fireEvent.click(screen.getByRole('button', { name: 'Sort' }))
      const option = screen.getByRole('option', { name: 'Oldest' })
      fireEvent.click(option)
      expect(onChange).toHaveBeenCalledWith('oldest')
      expect(screen.queryByRole('listbox')).toBeNull()
    })

    it('marks the current value as selected', () => {
      render(<ListingToolbar.Select ariaLabel="Sort" value="oldest" options={SORTS} onChange={() => {}} />)
      fireEvent.click(screen.getByRole('button', { name: 'Sort' }))
      expect(screen.getByRole('option', { name: 'Oldest' }).getAttribute('aria-selected')).toBe('true')
    })
  })

  describe('ViewToggle', () => {
    it('reflects value via aria-pressed and reports changes', () => {
      const onChange = vi.fn()
      render(<ListingToolbar.ViewToggle value="standard" onChange={onChange} />)
      expect(screen.getByTitle('Grid').getAttribute('aria-pressed')).toBe('true')
      fireEvent.click(screen.getByTitle('Large'))
      expect(onChange).toHaveBeenCalledWith('featured')
    })

    it('persists the chosen mode under persistKey', () => {
      // jsdom's localStorage here is a partial stub — install a real-enough mock
      const store = new Map()
      vi.stubGlobal('localStorage', {
        getItem: (k) => (store.has(k) ? store.get(k) : null),
        setItem: (k, v) => store.set(k, String(v)),
        removeItem: (k) => store.delete(k),
      })
      render(<ListingToolbar.ViewToggle value="standard" onChange={() => {}} persistKey="t" />)
      fireEvent.click(screen.getByTitle('Compact'))
      expect(store.get('bond-ltb-view:t')).toBe('compact')
      vi.unstubAllGlobals()
    })
  })
})
