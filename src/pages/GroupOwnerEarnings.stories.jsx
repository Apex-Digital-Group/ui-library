import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import GroupOwnerEarnings from './GroupOwnerEarnings'

export default {
  title: 'Pages/GroupOwnerEarnings',
  component: GroupOwnerEarnings,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}

export const Default = {
  name: 'GroupOwnerEarnings',
  render: (args) => <GroupOwnerEarnings {...args} />,
  args: {},
}
