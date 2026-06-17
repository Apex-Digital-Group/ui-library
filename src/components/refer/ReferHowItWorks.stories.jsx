import * as React from 'react'
import ReferHowItWorks from './ReferHowItWorks'

export default {
  title: 'Components/ReferHowItWorks',
  component: ReferHowItWorks,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'ReferHowItWorks',
  render: (args) => <ReferHowItWorks {...args} />,
  args: {},
}
