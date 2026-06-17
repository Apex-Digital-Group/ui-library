import * as React from 'react'
import { Switch } from './switch'

export default {
  title: 'Components/switch',
  component: Switch,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const SwitchExample = {
  name: 'Switch',
  render: (args) => <Switch {...args} />,
  args: {},
}
