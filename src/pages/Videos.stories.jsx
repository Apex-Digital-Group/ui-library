import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import Videos from './Videos'

export default {
  title: 'Pages/Videos',
  component: Videos,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}

export const Default = {
  name: 'Videos',
  render: (args) => <Videos {...args} />,
  args: {},
}
