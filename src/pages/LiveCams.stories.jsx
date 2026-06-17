import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import LiveCams from './LiveCams'

export default {
  title: 'Pages/LiveCams',
  component: LiveCams,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}

export const Default = {
  name: 'LiveCams',
  render: (args) => <LiveCams {...args} />,
  args: {},
}
