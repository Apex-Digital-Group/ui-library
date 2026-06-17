import * as React from 'react'
import ReferTokenRules from './ReferTokenRules'

export default {
  title: 'Components/ReferTokenRules',
  component: ReferTokenRules,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'ReferTokenRules',
  render: (args) => <ReferTokenRules {...args} />,
  args: {},
}
