import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import GroupAccountActivity from './GroupAccountActivity'

export default {
  title: 'Pages/GroupAccountActivity',
  component: GroupAccountActivity,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}

export const Default = {
  name: 'GroupAccountActivity',
  render: (args) => <GroupAccountActivity {...args} />,
  args: {},
}
