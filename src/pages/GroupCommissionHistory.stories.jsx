import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import GroupCommissionHistory from './GroupCommissionHistory'

export default {
  title: 'Pages/GroupCommissionHistory',
  component: GroupCommissionHistory,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}

export const Default = {
  name: 'GroupCommissionHistory',
  render: (args) => <GroupCommissionHistory {...args} />,
  args: {},
}
