import * as React from 'react'
import AccountPendingModal from './AccountPendingModal'

export default {
  title: 'Components/AccountPendingModal',
  component: AccountPendingModal,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'AccountPendingModal',
  render: (args) => <AccountPendingModal {...args} />,
  args: { isOpen: true, onOpenChange: () => {}, onClose: () => {} },
}
