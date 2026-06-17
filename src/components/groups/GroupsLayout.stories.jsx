import * as React from 'react'
import GroupsLayout from './GroupsLayout'

export default {
  title: 'Components/GroupsLayout',
  component: GroupsLayout,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'GroupsLayout',
  render: (args) => <GroupsLayout {...args} />,
  args: {},
}
