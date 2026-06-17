import * as React from 'react'
import { Textarea } from './textarea'

export default {
  title: 'Components/textarea',
  component: Textarea,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const TextareaExample = {
  name: 'Textarea',
  render: (args) => <Textarea {...args} />,
  args: {},
}
