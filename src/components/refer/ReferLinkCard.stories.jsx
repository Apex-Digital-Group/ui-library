import * as React from 'react'
import ReferLinkCard from './ReferLinkCard'

export default {
  title: 'Components/ReferLinkCard',
  component: ReferLinkCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'ReferLinkCard',
  render: (args) => <ReferLinkCard {...args} />,
  args: {},
}
