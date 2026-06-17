import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import GroupLeaveRequests from './GroupLeaveRequests'

export default {
  title: 'Pages/GroupLeaveRequests',
  component: GroupLeaveRequests,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}

export const Default = {
  name: 'GroupLeaveRequests',
  render: (args) => <GroupLeaveRequests {...args} />,
  args: {},
}
