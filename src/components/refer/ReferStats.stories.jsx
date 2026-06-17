import * as React from 'react'
import ReferStats from './ReferStats'

export default {
  title: 'Components/ReferStats',
  component: ReferStats,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'ReferStats',
  render: (args) => <ReferStats {...args} />,
  args: {},
}
