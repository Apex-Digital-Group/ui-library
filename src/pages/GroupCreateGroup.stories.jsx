import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import GroupCreateGroup from './GroupCreateGroup'

export default {
  title: 'Pages/GroupCreateGroup',
  component: GroupCreateGroup,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}

export const Default = {
  name: 'GroupCreateGroup',
  render: (args) => <GroupCreateGroup {...args} />,
  args: {},
}
