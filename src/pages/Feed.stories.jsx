import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import Feed from './Feed'

export default {
  title: 'Pages/Feed',
  component: Feed,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}

export const Default = {
  name: 'Feed',
  render: (args) => <Feed {...args} />,
  args: {},
}
