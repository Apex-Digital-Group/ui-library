import * as React from 'react'
import { Checkbox } from './checkbox'

export default {
  title: 'Components/checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const CheckboxExample = {
  name: 'Checkbox',
  render: (args) => <Checkbox {...args} />,
  args: {},
}
