import * as React from 'react'
import ReferFounderDiscount from './ReferFounderDiscount'

export default {
  title: 'Components/ReferFounderDiscount',
  component: ReferFounderDiscount,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'ReferFounderDiscount',
  render: (args) => <ReferFounderDiscount {...args} />,
  args: {},
}
