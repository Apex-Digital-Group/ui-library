import * as React from 'react'
import { Progress } from './progress'

export default {
  title: 'Components/progress',
  component: Progress,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const ProgressExample = {
  name: 'Progress',
  render: (args) => <Progress {...args} />,
  args: {},
}
