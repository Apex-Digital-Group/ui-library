import * as React from 'react'
import { Toaster } from './sonner'

export default {
  title: 'Components/sonner',
  component: Toaster,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const ToasterExample = {
  name: 'Toaster',
  render: (args) => <Toaster {...args} />,
  args: {},
}
