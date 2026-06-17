import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import Champions from './Champions'

export default {
  title: 'Pages/Champions',
  component: Champions,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}

export const Default = {
  name: 'Champions',
  render: (args) => <Champions {...args} />,
  args: {},
}
