import * as React from 'react'
import ReferTable from './ReferTable'

export default {
  title: 'Components/ReferTable',
  component: ReferTable,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'ReferTable',
  render: (args) => <ReferTable {...args} />,
  args: {},
}
