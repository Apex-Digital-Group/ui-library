import * as React from 'react'
import ReferInvestorCard from './ReferInvestorCard'

export default {
  title: 'Components/ReferInvestorCard',
  component: ReferInvestorCard,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'ReferInvestorCard',
  render: (args) => <ReferInvestorCard {...args} />,
  args: {},
}
