import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import GroupNotifications from './GroupNotifications'

export default {
  title: 'Pages/GroupNotifications',
  component: GroupNotifications,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}

export const Default = {
  name: 'GroupNotifications',
  render: (args) => <GroupNotifications {...args} />,
  args: {},
}
