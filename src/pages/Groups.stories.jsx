import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import Groups from './Groups'

export default {
  title: 'Pages/Groups',
  component: Groups,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}

export const Default = {
  name: 'Groups',
  render: (args) => <Groups {...args} />,
  args: {},
}
