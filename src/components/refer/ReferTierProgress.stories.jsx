import * as React from 'react'
import ReferTierProgress from './ReferTierProgress'

export default {
  title: 'Components/ReferTierProgress',
  component: ReferTierProgress,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'ReferTierProgress',
  render: (args) => <ReferTierProgress {...args} />,
  args: {},
}
