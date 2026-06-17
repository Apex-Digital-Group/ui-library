import * as React from 'react'
import ReferLegalFooter from './ReferLegalFooter'

export default {
  title: 'Components/ReferLegalFooter',
  component: ReferLegalFooter,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'ReferLegalFooter',
  render: (args) => <ReferLegalFooter {...args} />,
  args: {},
}
