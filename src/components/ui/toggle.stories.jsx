import * as React from 'react'
import { Toggle } from './toggle'

export default {
  title: 'Components/toggle',
  component: Toggle,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const ToggleExample = {
  name: 'Toggle',
  render: (args) => <Toggle {...args} />,
  args: {},
}
