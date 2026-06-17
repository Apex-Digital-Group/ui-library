import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import GroupMembers from './GroupMembers'

export default {
  title: 'Pages/GroupMembers',
  component: GroupMembers,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}

export const Default = {
  name: 'GroupMembers',
  render: (args) => <GroupMembers {...args} />,
  args: {},
}
