import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import GroupCommissionManagement from './GroupCommissionManagement'

export default {
  title: 'Pages/GroupCommissionManagement',
  component: GroupCommissionManagement,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}

export const Default = {
  name: 'GroupCommissionManagement',
  render: (args) => <GroupCommissionManagement {...args} />,
  args: {},
}
