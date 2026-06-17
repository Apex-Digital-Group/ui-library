import * as React from 'react'
import ReferTokenWallet from './ReferTokenWallet'

export default {
  title: 'Components/ReferTokenWallet',
  component: ReferTokenWallet,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'ReferTokenWallet',
  render: (args) => <ReferTokenWallet {...args} />,
  args: {},
}
