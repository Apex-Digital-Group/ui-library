import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import GroupCreatorEarnings from './GroupCreatorEarnings'

export default {
  title: 'Pages/GroupCreatorEarnings',
  component: GroupCreatorEarnings,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}

export const Default = {
  name: 'GroupCreatorEarnings',
  render: (args) => <GroupCreatorEarnings {...args} />,
  args: {},
}
