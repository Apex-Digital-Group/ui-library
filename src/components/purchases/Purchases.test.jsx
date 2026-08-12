import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PurchaseStatCard, SubscriptionCard, PurchaseItemCard } from './Purchases'

describe('PurchaseStatCard', () => {
  it('renders label, value, suffix and fires the action', () => {
    const onAction = vi.fn()
    render(<PurchaseStatCard label="Credit balance" value="620" suffix="credits"
      actionLabel="Top up" onAction={onAction} />)
    expect(screen.getByText('Credit balance')).toBeInTheDocument()
    expect(screen.getByText('620')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Top up'))
    expect(onAction).toHaveBeenCalled()
  })

  it('omits the action without a handler', () => {
    render(<PurchaseStatCard label="Items owned" value="37" actionLabel="Top up" />)
    expect(screen.queryByText('Top up')).toBeNull()
  })
})

describe('SubscriptionCard', () => {
  it('renders identity, status pill, renew row and CTA', () => {
    const onAction = vi.fn()
    render(<SubscriptionCard name="Aurora Vane" handle="@auroravane" tierText="Tier 2"
      status="active" statusText="Active" renewsLabel="RENEWS 3 SEP"
      priceText="25 credits / mo" actionLabel="Manage" onAction={onAction} />)
    expect(screen.getByText('Aurora Vane')).toBeInTheDocument()
    expect(screen.getByText('@auroravane · Tier 2')).toBeInTheDocument()
    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getByText('RENEWS 3 SEP')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Manage'))
    expect(onAction).toHaveBeenCalled()
  })

  it('ending status uses the primary CTA styling and fallback avatar shows the initial', () => {
    const { container } = render(<SubscriptionCard name="Nova Lane" status="ending"
      statusText="Ending" actionLabel="Resume" onAction={() => {}} />)
    expect(container.querySelector('.bond-pur-status--ending')).not.toBeNull()
    expect(container.querySelector('.bond-pur-btn-primary')).not.toBeNull()
    expect(container.querySelector('.bond-pur-avatar--fallback').textContent).toBe('N')
  })
})

describe('PurchaseItemCard', () => {
  it('renders thumb badges, title, author, price and actions', () => {
    const watch = vi.fn()
    render(<PurchaseItemCard title="Midnight Rooftop" durationText="4:12"
      typeBadge="Custom clip" authorName="Aurora Vane" dateText="2 Aug 2026"
      priceText="120 credits" actions={[{ label: 'Watch', onClick: watch, primary: true }]} />)
    expect(screen.getByText('Midnight Rooftop')).toBeInTheDocument()
    expect(screen.getByText('4:12')).toBeInTheDocument()
    expect(screen.getByText('Custom clip')).toBeInTheDocument()
    expect(screen.getByText('120 credits')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Watch'))
    expect(watch).toHaveBeenCalled()
  })

  it('status badge replaces the type badge; note and count render', () => {
    const { container } = render(<PurchaseItemCard title="Beach Mornings" statusBadge="In progress"
      typeBadge="Custom clip" note="Due in 2 days" countText="3 videos" />)
    expect(container.querySelector('.bond-pur-pill--status')).not.toBeNull()
    expect(container.querySelector('.bond-pur-pill--type')).toBeNull()
    expect(screen.getByText('Due in 2 days')).toBeInTheDocument()
    expect(screen.getByText('3 videos')).toBeInTheDocument()
  })

  it('fires onOpen from the thumbnail', () => {
    const onOpen = vi.fn()
    const { container } = render(<PurchaseItemCard title="V" thumbUrl="x.jpg" onOpen={onOpen} />)
    fireEvent.click(container.querySelector('.bond-pur-item__thumb'))
    expect(onOpen).toHaveBeenCalled()
  })
})
