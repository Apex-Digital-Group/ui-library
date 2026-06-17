import * as React from 'react'
import { Toaster } from './toaster'

export default {
  title: 'Components/toaster',
  component: Toaster,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const ToasterExample = {
  name: 'Toaster',
  render: (args) => <Toaster {...args} />,
  args: {},
}
