import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import PostCard from './PostCard'

describe('PostCard', () => {
  it('exports PostCard', () => {
    expect(PostCard).toBeDefined()
  })

  it('renders the caption inline when no background is set', () => {
    const { container } = render(<PostCard author={{ name: 'Emily' }} caption="Hello World" />)
    expect(container.querySelector('.bond-post-card__caption')).not.toBeNull()
    expect(container.querySelector('.bond-post-card__color-tile')).toBeNull()
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('renders a colored tile instead of the caption line when background is set', () => {
    const { container } = render(
      <PostCard author={{ name: 'Emily' }} caption="Hello World" background="#f5576c" />
    )
    const tile = container.querySelector('.bond-post-card__color-tile')
    expect(tile).not.toBeNull()
    expect(tile.style.background).toContain('rgb(245, 87, 108)')
    expect(tile.textContent).toContain('Hello World')
    expect(container.querySelector('.bond-post-card__caption')).toBeNull()
  })

  it('accepts gradient backgrounds', () => {
    const gradient = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    const { container } = render(<PostCard caption="Gradient post" background={gradient} />)
    const tile = container.querySelector('.bond-post-card__color-tile')
    expect(tile).not.toBeNull()
    expect(tile.style.background).toContain('linear-gradient')
  })

  it('media wins over background — no tile, caption returns inline', () => {
    const media = [{ url: 'https://example.test/a.jpg', file_type: 'image' }]
    const { container } = render(
      <PostCard caption="With media" background="#f5576c" media={media} />
    )
    expect(container.querySelector('.bond-post-card__color-tile')).toBeNull()
    expect(container.querySelector('.bond-post-card__caption')).not.toBeNull()
  })
  it('renders a plain <video> for video media by default', () => {
    const media = [{ url: 'https://example.test/a.mp4', type: 'video' }]
    const { container } = render(<PostCard caption="v" media={media} />)
    const video = container.querySelector('.bond-post-card__media video')
    expect(video).not.toBeNull()
    expect(video.getAttribute('src')).toBe('https://example.test/a.mp4')
  })

  it('lets the host render video media via renderVideo', () => {
    const media = [{ url: 'https://example.test/a.mp4', type: 'video', id: 7 }]
    const { container } = render(
      <PostCard caption="v" media={media}
        renderVideo={(item, props) => <div data-testid="host-video" data-id={item.id} data-autoplay={String(props.autoPlay)} />} />
    )
    const hostVideo = screen.getByTestId('host-video')
    expect(hostVideo.dataset.id).toBe('7')
    expect(hostVideo.dataset.autoplay).toBe('true')
    expect(container.querySelector('.bond-post-card__media video')).toBeNull()
  })
})
