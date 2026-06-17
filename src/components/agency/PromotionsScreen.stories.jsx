import * as React from 'react'
import PromotionsScreen from './PromotionsScreen'

export default {
  title: 'Components/PromotionsScreen',
  component: PromotionsScreen,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'PromotionsScreen',
  render: (args) => <PromotionsScreen {...args} />,
  args: {},
}
