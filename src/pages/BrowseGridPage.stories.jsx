import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import BrowseGridPage from './BrowseGridPage'

export default {
  title: 'Pages/BrowseGridPage',
  component: BrowseGridPage,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}

export const Default = {
  name: 'BrowseGridPage',
  render: (args) => <BrowseGridPage {...args} />,
  args: {},
}
