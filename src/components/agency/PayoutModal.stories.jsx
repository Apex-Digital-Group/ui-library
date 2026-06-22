import * as React from 'react'
import PayoutModal from './PayoutModal'

export default {
  title: 'Components/PayoutModal',
  component: PayoutModal,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'PayoutModal',
  render: (args) => <PayoutModal {...args} />,
  args: { isOpen: true, onOpenChange: () => {}, onClose: () => {} },
}
