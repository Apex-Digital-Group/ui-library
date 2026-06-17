import * as React from 'react'
import { Slider } from './slider'

export default {
  title: 'Components/slider',
  component: Slider,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const SliderExample = {
  name: 'Slider',
  render: (args) => <Slider {...args} />,
  args: {},
}
