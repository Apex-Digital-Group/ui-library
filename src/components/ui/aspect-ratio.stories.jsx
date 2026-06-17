import * as React from 'react'
import { AspectRatio } from './aspect-ratio'

export default {
  title: 'Components/aspect-ratio',
  component: AspectRatio,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const AspectRatioExample = {
  name: 'AspectRatio',
  render: (args) => <AspectRatio {...args} />,
  args: {},
}
