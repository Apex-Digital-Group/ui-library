import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import GroupOwnerDashboard from './GroupOwnerDashboard'

export default {
  title: 'Pages/GroupOwnerDashboard',
  component: GroupOwnerDashboard,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}

export const Default = {
  name: 'GroupOwnerDashboard',
  render: (args) => <GroupOwnerDashboard {...args} />,
  args: {},
}
