import * as React from 'react'
import PromotionPanel from './PromotionPanel'

export default {
  title: 'Components/PromotionPanel',
  component: PromotionPanel,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'PromotionPanel',
  render: (args) => <PromotionPanel {...args} />,
  args: {},
}
