import * as React from 'react'
import StatusBadge from './StatusBadge'

export default {
  title: 'Components/StatusBadge',
  component: StatusBadge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'StatusBadge',
  render: (args) => <StatusBadge {...args} />,
  args: {},
}
