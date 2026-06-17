import * as React from 'react'
import GeminiAI from './GeminiAI'

export default {
  title: 'Components/GeminiAI',
  component: GeminiAI,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'GeminiAI',
  render: (args) => <GeminiAI {...args} />,
  args: {},
}
