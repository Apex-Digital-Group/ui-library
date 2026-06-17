import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import CreatorProfile from './CreatorProfile'
import { creators } from '../data/creators'

export default {
  title: 'Pages/CreatorProfile',
  component: CreatorProfile,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
  argTypes: {
    creator: {
      control: 'select',
      options: creators.map((c) => c.slug),
      mapping: Object.fromEntries(creators.map((c) => [c.slug, c])),
      description: 'Pick one of the 26 creators baked into the design.',
    },
  },
}

export const Default = {
  name: 'Ahri (default)',
  args: { creator: creators[0] },
}

export const RandomFromDataset = {
  name: 'Random pick',
  render: () => {
    const pick = creators[Math.floor(Math.random() * creators.length)]
    return <CreatorProfile creator={pick} />
  },
}

export const Gallery = {
  name: '26 creator gallery',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="min-h-screen bg-[#1a0e2e] text-white p-6">
      <h1 className="t-display-md mb-2">Creator profiles ({creators.length})</h1>
      <p className="t-body-sm mb-6 text-white/70">
        One <code className="t-code">CreatorProfile</code> template, parameterized by data in
        <code className="t-code"> src/data/creators.js</code>.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {creators.map((c) => (
          <div key={c.slug} className="bg-[#2E2249] rounded-xl overflow-hidden border border-white/10">
            <img src={c.avatarImage} alt={c.name} className="w-full aspect-square object-cover" />
            <div className="p-3">
              <p className="font-semibold text-sm truncate">{c.name}</p>
              <p className="text-xs text-white/60 truncate">{c.handle}</p>
              <p className="text-[10px] text-white/50 mt-1 line-clamp-2">{c.tagline}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
}
