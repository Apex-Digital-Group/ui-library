import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import GroupSettings from './GroupSettings'

export default {
  title: 'Pages/GroupSettings',
  component: GroupSettings,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}

export const Default = {
  name: 'GroupSettings',
  render: (args) => <GroupSettings {...args} />,
  args: {},
}
