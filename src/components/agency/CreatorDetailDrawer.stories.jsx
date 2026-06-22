import * as React from 'react'
import CreatorDetailDrawer from './CreatorDetailDrawer'

export default {
  title: 'Components/CreatorDetailDrawer',
  component: CreatorDetailDrawer,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'CreatorDetailDrawer',
  render: (args) => <CreatorDetailDrawer {...args} />,
  args: { isOpen: true, onOpenChange: () => {}, onClose: () => {} },
}
