import * as React from 'react'
import { Separator } from './separator'

export default {
  title: 'Components/separator',
  component: Separator,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const SeparatorExample = {
  name: 'Separator',
  render: (args) => <Separator {...args} />,
  args: {},
}
