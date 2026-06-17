import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import GroupMessenger from './GroupMessenger'

export default {
  title: 'Pages/GroupMessenger',
  component: GroupMessenger,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}

export const Default = {
  name: 'GroupMessenger',
  render: (args) => <GroupMessenger {...args} />,
  args: {},
}
