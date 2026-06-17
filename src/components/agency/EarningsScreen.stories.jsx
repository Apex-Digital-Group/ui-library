import * as React from 'react'
import EarningsScreen from './EarningsScreen'

export default {
  title: 'Components/EarningsScreen',
  component: EarningsScreen,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'EarningsScreen',
  render: (args) => <EarningsScreen {...args} />,
  args: {},
}
