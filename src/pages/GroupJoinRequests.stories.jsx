import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import GroupJoinRequests from './GroupJoinRequests'

export default {
  title: 'Pages/GroupJoinRequests',
  component: GroupJoinRequests,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}

export const Default = {
  name: 'GroupJoinRequests',
  render: (args) => <GroupJoinRequests {...args} />,
  args: {},
}
