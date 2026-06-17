import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import Agency from './Agency'

export default {
  title: 'Pages/Agency',
  component: Agency,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}

export const Default = {
  name: 'Agency',
  render: (args) => <Agency {...args} />,
  args: {},
}
