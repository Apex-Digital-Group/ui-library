import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CreatorProfile from './CreatorProfile'
import { creators, creatorBySlug, suggestionsFor } from '../data/creators'

const renderWith = (creator) =>
  render(
    <MemoryRouter>
      <CreatorProfile creator={creator} />
    </MemoryRouter>,
  )

describe('CreatorProfile', () => {
  it('exposes 26 creators in the dataset', () => {
    expect(creators).toHaveLength(26)
  })

  it('renders the supplied creator name + tagline', () => {
    const ahri = creatorBySlug.ahriprofile
    renderWith(ahri)
    expect(screen.getAllByText(ahri.name).length).toBeGreaterThan(0)
    expect(screen.getByText(ahri.tagline)).toBeInTheDocument()
  })

  it('falls back to the first creator when no prop is given', () => {
    render(
      <MemoryRouter>
        <CreatorProfile />
      </MemoryRouter>,
    )
    expect(screen.getAllByText(creators[0].name).length).toBeGreaterThan(0)
  })

  it('renders every creator without crashing', () => {
    for (const c of creators) {
      expect(() => renderWith(c)).not.toThrow()
    }
  })

  it('suggestionsFor excludes the current creator and returns 4 picks', () => {
    const s = suggestionsFor('ahriprofile')
    expect(s).toHaveLength(4)
    for (const sug of s) expect(sug.handle).not.toBe('@ahri')
  })
})
