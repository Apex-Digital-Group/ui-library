import * as React from 'react'
import PayoutsScreen from './PayoutsScreen'

export default {
  title: 'Components/PayoutsScreen',
  component: PayoutsScreen,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'PayoutsScreen',
  render: (args) => <PayoutsScreen {...args} />,
  args: {},
}
