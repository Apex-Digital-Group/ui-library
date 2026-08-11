import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import {
  FavTabs,
  FavSectionHeader,
  FavProfileCard,
  FavAlbumCard,
  FavVideoCard,
  FavPostCard,
  FavEmptyState,
} from './Favourites'

describe('FavTabs', () => {
  const items = [
    { key: 'all', label: 'All', count: 9 },
    { key: 'post', label: 'Posts', count: 3 },
  ]

  it('renders labels with counts and fires onChange with the key', () => {
    const onChange = vi.fn()
    render(<FavTabs items={items} active="all" onChange={onChange} />)
    expect(screen.getByText('Posts')).toBeInTheDocument()
    expect(screen.getByText('9')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Posts'))
    expect(onChange).toHaveBeenCalledWith('post')
  })

  it('marks the active pill', () => {
    const { container } = render(<FavTabs items={items} active="post" />)
    const active = container.querySelector('.bond-fav-tab--active')
    expect(active.textContent).toContain('Posts')
  })
})

describe('FavSectionHeader', () => {
  it('renders title and count', () => {
    render(<FavSectionHeader title="Profiles" count={3} />)
    expect(screen.getByText('Profiles')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })
})

describe('FavProfileCard', () => {
  it('shows LIVE badge only when live and fires callbacks', () => {
    const onView = vi.fn()
    const onRemove = vi.fn()
    const { rerender } = render(
      <FavProfileCard name="Sassy-Gal" subscribersText="12.4k subscribers"
        isLive onView={onView} onRemove={onRemove} />
    )
    expect(screen.getByText('LIVE')).toBeInTheDocument()
    expect(screen.getByText('12.4k subscribers')).toBeInTheDocument()
    fireEvent.click(screen.getByText('View profile'))
    expect(onView).toHaveBeenCalled()
    fireEvent.click(screen.getByLabelText('Remove from favourites'))
    expect(onRemove).toHaveBeenCalled()

    rerender(<FavProfileCard name="Sassy-Gal" isLive={false} />)
    expect(screen.queryByText('LIVE')).toBeNull()
  })
})

describe('FavAlbumCard', () => {
  it('renders photo pill, premium badge and saved date conditionally', () => {
    const { rerender } = render(
      <FavAlbumCard title="Me and my friends" photoCountText="24 photos"
        premium authorName="HeatherAlvarez" savedAtText="Saved 3 Aug" />
    )
    expect(screen.getByText('24 photos')).toBeInTheDocument()
    expect(screen.getByText('Premium')).toBeInTheDocument()
    expect(screen.getByText('Saved 3 Aug')).toBeInTheDocument()

    rerender(<FavAlbumCard title="Public album" premium={false} />)
    expect(screen.queryByText('Premium')).toBeNull()
  })
})

describe('FavVideoCard', () => {
  it('renders duration and falls back to Free', () => {
    render(<FavVideoCard title="Bedroom" durationText="7:24" authorName="EmilyMays" />)
    expect(screen.getByText('7:24')).toBeInTheDocument()
    expect(screen.getByText('Free')).toBeInTheDocument()
  })

  it('fires onOpen from the media area', () => {
    const onOpen = vi.fn()
    const { container } = render(<FavVideoCard title="V" thumbUrl="x.jpg" onOpen={onOpen} />)
    fireEvent.click(container.querySelector('.bond-fav-video__media'))
    expect(onOpen).toHaveBeenCalled()
  })
})

describe('FavPostCard', () => {
  it('renders tags, counts and Open post', () => {
    const onOpen = vi.fn()
    render(
      <FavPostCard authorName="Nova-Lane" timeAgoText="4 months ago"
        body="I felt like dressing up" tags={['Collars', 'Lingerie']}
        reactionCount={4} commentCount={3} onOpen={onOpen} />
    )
    expect(screen.getByText('Collars')).toBeInTheDocument()
    expect(screen.getByText('Lingerie')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Open post'))
    expect(onOpen).toHaveBeenCalled()
  })

  it('accepts object tags with id/name', () => {
    render(<FavPostCard authorName="A" tags={[{ id: 1, name: 'Ice Play' }]} />)
    expect(screen.getByText('Ice Play')).toBeInTheDocument()
  })

  it('renders an image media band with the remove overlay', () => {
    const onRemove = vi.fn()
    const { container } = render(
      <FavPostCard authorName="A" body="hi" media={{ type: 'image', url: 'x.jpg' }} onRemove={onRemove} />
    )
    const band = container.querySelector('.bond-fav-post__media')
    expect(band).not.toBeNull()
    expect(band.querySelector('img')).not.toBeNull()
    // remove lives on the media overlay, not the head row
    expect(container.querySelector('.bond-fav-post__media-remove .bond-fav-remove')).not.toBeNull()
    expect(container.querySelector('.bond-fav-post__head .bond-fav-remove')).toBeNull()
  })

  it('renders a video element for video media', () => {
    const { container } = render(
      <FavPostCard authorName="A" media={{ type: 'video', url: 'x.webm' }} />
    )
    expect(container.querySelector('.bond-fav-post__media video')).not.toBeNull()
  })

  it('text-only posts have no media band and keep remove in the head', () => {
    const { container } = render(<FavPostCard authorName="A" body="text" onRemove={() => {}} />)
    expect(container.querySelector('.bond-fav-post__media')).toBeNull()
    expect(container.querySelector('.bond-fav-post__head .bond-fav-remove')).not.toBeNull()
  })
})

describe('FavEmptyState', () => {
  it('renders copy and fires the CTA', () => {
    const onCta = vi.fn()
    render(<FavEmptyState ctaLabel="Browse creators" onCta={onCta} />)
    expect(screen.getByText('Nothing saved here yet')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Browse creators'))
    expect(onCta).toHaveBeenCalled()
  })

  it('omits the CTA without a handler', () => {
    render(<FavEmptyState ctaLabel="Browse creators" />)
    expect(screen.queryByText('Browse creators')).toBeNull()
  })
})
