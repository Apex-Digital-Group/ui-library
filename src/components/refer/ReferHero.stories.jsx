import * as React from 'react'
import ReferHero from './ReferHero'

export default {
  title: 'Components/ReferHero',
  component: ReferHero,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'ReferHero',
  render: (args) => <ReferHero {...args} />,
  args: {},
}
