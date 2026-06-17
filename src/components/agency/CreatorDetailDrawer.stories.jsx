import * as React from 'react'
import CreatorDetailDrawer from './CreatorDetailDrawer'

export default {
  title: 'Components/CreatorDetailDrawer',
  component: CreatorDetailDrawer,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'CreatorDetailDrawer',
  render: (args) => <CreatorDetailDrawer {...args} />,
  args: { open: true, onOpenChange: () => {}, onClose: () => {} },
}
