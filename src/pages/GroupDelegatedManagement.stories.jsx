import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import GroupDelegatedManagement from './GroupDelegatedManagement'

export default {
  title: 'Pages/GroupDelegatedManagement',
  component: GroupDelegatedManagement,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}

export const Default = {
  name: 'GroupDelegatedManagement',
  render: (args) => <GroupDelegatedManagement {...args} />,
  args: {},
}
