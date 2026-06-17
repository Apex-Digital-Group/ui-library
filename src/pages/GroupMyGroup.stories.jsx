import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import GroupMyGroup from './GroupMyGroup'

export default {
  title: 'Pages/GroupMyGroup',
  component: GroupMyGroup,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}

export const Default = {
  name: 'GroupMyGroup',
  render: (args) => <GroupMyGroup {...args} />,
  args: {},
}
