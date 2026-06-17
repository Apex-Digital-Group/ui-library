import * as React from 'react'
import { Label } from './label'

export default {
  title: 'Components/label',
  component: Label,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const LabelExample = {
  name: 'Label',
  render: (args) => <Label {...args} />,
  args: {},
}
