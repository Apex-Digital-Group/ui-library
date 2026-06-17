import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import GroupActivityHistory from './GroupActivityHistory'

export default {
  title: 'Pages/GroupActivityHistory',
  component: GroupActivityHistory,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}

export const Default = {
  name: 'GroupActivityHistory',
  render: (args) => <GroupActivityHistory {...args} />,
  args: {},
}
