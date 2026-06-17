import * as React from 'react'
import CreatorsScreen from './CreatorsScreen'

export default {
  title: 'Components/CreatorsScreen',
  component: CreatorsScreen,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'CreatorsScreen',
  render: (args) => <CreatorsScreen {...args} />,
  args: {},
}
