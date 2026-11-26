import { describe, it, expect, vi, beforeAll, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { Eye, Camera, ImagePlus } from 'lucide-react'
import { AvatarActionMenu } from './AvatarActionMenu'

beforeAll(() => {
  // Radix menus use pointer capture + scrollIntoView, which jsdom lacks.
  const proto = window.HTMLElement.prototype
  if (!proto.hasPointerCapture) proto.hasPointerCapture = () => false
  if (!proto.releasePointerCapture) proto.releasePointerCapture = () => {}
  if (!proto.setPointerCapture) proto.setPointerCapture = () => {}
  if (!proto.scrollIntoView) proto.scrollIntoView = () => {}
})

const makeItems = (overrides = {}) => [
  { key: 'view', label: 'View photo', icon: Eye, onSelect: vi.fn(), ...overrides.view },
  { key: 'change', label: 'Change profile picture', icon: Camera, onSelect: vi.fn(), ...overrides.change },
  { key: 'story', label: 'Add story', icon: ImagePlus, onSelect: vi.fn(), ...overrides.story },
]

// `hidden: true` — the modal sheet marks everything outside it aria-hidden.
const trigger = () => screen.getByRole('button', { name: 'Profile photo options', hidden: true })

describe('AvatarActionMenu (desktop)', () => {
  it('renders a real 44px button with an accessible name and menu popup semantics', () => {
    render(<AvatarActionMenu items={makeItems()} />)
    const btn = trigger()
    expect(btn.tagName).toBe('BUTTON')
    expect(btn).toHaveAttribute('type', 'button')
    expect(btn).toHaveAttribute('aria-haspopup', 'menu')
    expect(btn).toHaveAttribute('aria-expanded', 'false')
    expect(btn.className).toContain('bond-aam__trigger')
    expect(btn.closest('[data-bond-avatar-menu]')).not.toBeNull()
  })

  it('applies size + ring colour to the badge', () => {
    const { container } = render(<AvatarActionMenu items={makeItems()} size={30} ringColor="#123456" />)
    const badge = container.querySelector('.bond-aam__badge')
    expect(badge.style.getPropertyValue('--bond-aam-size')).toBe('30px')
    expect(badge.style.getPropertyValue('--bond-aam-ring')).toBe('#123456')
  })

  it('opens from the keyboard, lists only visible items, and toggles aria-expanded', async () => {
    const user = userEvent.setup()
    render(<AvatarActionMenu items={makeItems({ story: { hidden: true } })} />)
    trigger().focus()
    await user.keyboard('{Enter}')
    const menu = await screen.findByRole('menu', { name: 'Profile photo' })
    expect(trigger()).toHaveAttribute('aria-expanded', 'true')
    expect(menu).toHaveAttribute('data-bond-avatar-menu')
    const items = screen.getAllByRole('menuitem')
    expect(items.map((i) => i.textContent)).toEqual(['View photo', 'Change profile picture'])
    expect(screen.queryByText('Add story')).toBeNull()
  })

  it('runs onSelect once and closes', async () => {
    const user = userEvent.setup()
    const items = makeItems()
    render(<AvatarActionMenu items={items} />)
    trigger().focus()
    await user.keyboard('{Enter}')
    await user.click(await screen.findByRole('menuitem', { name: 'Change profile picture' }))
    expect(items[1].onSelect).toHaveBeenCalledTimes(1)
    expect(items[0].onSelect).not.toHaveBeenCalled()
    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull())
  })

  it('moves the highlight with ArrowDown and closes on Escape returning focus to the trigger', async () => {
    const user = userEvent.setup()
    render(<AvatarActionMenu items={makeItems()} />)
    trigger().focus()
    await user.keyboard('{Enter}')
    const items = await screen.findAllByRole('menuitem')
    await waitFor(() => expect(document.activeElement).toBe(items[0]))
    await user.keyboard('{ArrowDown}')
    expect(document.activeElement).toBe(items[1])
    expect(items[1]).toHaveAttribute('data-highlighted')
    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull())
    expect(document.activeElement).toBe(trigger())
  })

  it('does not fire a disabled item', async () => {
    const user = userEvent.setup()
    const items = makeItems({ view: { disabled: true } })
    render(<AvatarActionMenu items={items} />)
    trigger().focus()
    await user.keyboard('{Enter}')
    const view = await screen.findByRole('menuitem', { name: 'View photo' })
    expect(view).toHaveAttribute('data-disabled')
    await user.click(view)
    expect(items[0].onSelect).not.toHaveBeenCalled()
  })

  it('respects a controlled open prop and reports changes', async () => {
    const onOpenChange = vi.fn()
    const { rerender } = render(<AvatarActionMenu items={makeItems()} open={false} onOpenChange={onOpenChange} />)
    expect(screen.queryByRole('menu')).toBeNull()
    rerender(<AvatarActionMenu items={makeItems()} open onOpenChange={onOpenChange} />)
    expect(await screen.findByRole('menu')).toBeInTheDocument()
    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' })
    expect(onOpenChange).toHaveBeenCalledWith(false)
    // Still controlled: stays open until the parent flips the prop.
    expect(screen.getByRole('menu')).toBeInTheDocument()
  })
})

describe('AvatarActionMenu (phone bottom sheet)', () => {
  let originalMatchMedia
  let originalWidth
  let originalGetComputedStyle

  beforeEach(() => {
    // vaul reads the computed `transform` on release; jsdom has none.
    originalGetComputedStyle = window.getComputedStyle
    window.getComputedStyle = (el, pseudo) => {
      const style = originalGetComputedStyle(el, pseudo)
      return new Proxy(style, {
        get(target, key) {
          if (key === 'transform') return target.transform || 'none'
          const value = target[key]
          return typeof value === 'function' ? value.bind(target) : value
        },
      })
    }
    originalMatchMedia = window.matchMedia
    originalWidth = window.innerWidth
    window.matchMedia = (query) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })
    Object.defineProperty(window, 'innerWidth', { configurable: true, writable: true, value: 390 })
  })

  afterEach(() => {
    window.getComputedStyle = originalGetComputedStyle
    window.matchMedia = originalMatchMedia
    Object.defineProperty(window, 'innerWidth', { configurable: true, writable: true, value: originalWidth })
  })

  it('opens a dialog sheet holding a menu of menuitems, first item focused', async () => {
    const user = userEvent.setup()
    render(<AvatarActionMenu items={makeItems({ story: { hidden: true } })} mobileBreakpoint={651} />)
    expect(trigger()).toHaveAttribute('aria-haspopup', 'menu')
    expect(trigger()).toHaveAttribute('aria-expanded', 'false')
    await user.click(trigger())
    const dialog = await screen.findByRole('dialog')
    expect(dialog).toHaveAttribute('data-bond-avatar-menu')
    expect(trigger()).toHaveAttribute('aria-expanded', 'true')
    const menu = screen.getByRole('menu', { name: 'Profile photo' })
    expect(menu).toBeInTheDocument()
    const items = screen.getAllByRole('menuitem')
    expect(items.map((i) => i.textContent)).toEqual(['View photo', 'Change profile picture'])
    await waitFor(() => expect(document.activeElement).toBe(items[0]))
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
  })

  it('supports ArrowDown/ArrowUp/Home/End roving focus', async () => {
    const user = userEvent.setup()
    render(<AvatarActionMenu items={makeItems()} mobileBreakpoint={651} />)
    await user.click(trigger())
    const items = await screen.findAllByRole('menuitem')
    await waitFor(() => expect(document.activeElement).toBe(items[0]))
    await user.keyboard('{ArrowDown}')
    expect(document.activeElement).toBe(items[1])
    await user.keyboard('{End}')
    expect(document.activeElement).toBe(items[2])
    await user.keyboard('{ArrowDown}')
    expect(document.activeElement).toBe(items[0])
    await user.keyboard('{ArrowUp}')
    expect(document.activeElement).toBe(items[2])
    await user.keyboard('{Home}')
    expect(document.activeElement).toBe(items[0])
    expect(items[0]).toHaveAttribute('tabindex', '0')
    expect(items[1]).toHaveAttribute('tabindex', '-1')
  })

  it('runs onSelect once, then closes', async () => {
    const user = userEvent.setup()
    const items = makeItems()
    render(<AvatarActionMenu items={items} mobileBreakpoint={651} />)
    await user.click(trigger())
    await user.click(await screen.findByRole('menuitem', { name: 'Change profile picture' }))
    expect(items[1].onSelect).toHaveBeenCalledTimes(1)
    await waitFor(() => expect(trigger()).toHaveAttribute('aria-expanded', 'false'))
  })

  // Focus return after the exit animation is covered in the browser (the
  // sheet's close animation never finishes in jsdom).
  it('closes on Escape', async () => {
    const user = userEvent.setup()
    render(<AvatarActionMenu items={makeItems()} mobileBreakpoint={651} />)
    await user.click(trigger())
    const dialog = await screen.findByRole('dialog')
    await user.keyboard('{Escape}')
    await waitFor(() => expect(trigger()).toHaveAttribute('aria-expanded', 'false'))
    expect(dialog).toHaveAttribute('data-state', 'closed')
  })

  it('respects a controlled open prop', async () => {
    const onOpenChange = vi.fn()
    render(<AvatarActionMenu items={makeItems()} open onOpenChange={onOpenChange} mobileBreakpoint={651} cancelLabel="Abbrechen" />)
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Abbrechen' }))
    })
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })
})

describe('AvatarActionMenu source', () => {
  const src = readFileSync(path.resolve(__dirname, 'AvatarActionMenu.jsx'), 'utf8')

  it('uses relative imports only (no @/ alias — consumers alias @ to their own src)', () => {
    expect(src).not.toMatch(/from ["']@\//)
  })

  it('styles with bond-aam classes, not Tailwind utilities', () => {
    const classNames = [...src.matchAll(/className="([^"]+)"/g)].map((m) => m[1])
    expect(classNames.length).toBeGreaterThan(0)
    for (const cls of classNames) {
      for (const token of cls.split(/\s+/)) expect(token).toMatch(/^bond-aam/)
    }
  })
})
