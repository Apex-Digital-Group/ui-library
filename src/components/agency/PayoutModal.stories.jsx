import * as React from 'react'
import PayoutModal from './PayoutModal'

export default {
  title: 'Components/PayoutModal',
  component: PayoutModal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'PayoutModal',
  render: (args) => <PayoutModal {...args} />,
  args: { open: true, onOpenChange: () => {}, onClose: () => {} },
}
