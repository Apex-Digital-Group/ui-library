import * as React from 'react'
import OverviewScreen from './OverviewScreen'

export default {
  title: 'Components/OverviewScreen',
  component: OverviewScreen,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'OverviewScreen',
  render: (args) => <OverviewScreen {...args} />,
  args: {},
}
