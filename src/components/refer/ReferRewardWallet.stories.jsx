import * as React from 'react'
import ReferRewardWallet from './ReferRewardWallet'

export default {
  title: 'Components/ReferRewardWallet',
  component: ReferRewardWallet,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'ReferRewardWallet',
  render: (args) => <ReferRewardWallet {...args} />,
  args: {},
}
