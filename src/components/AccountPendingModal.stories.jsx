import * as React from 'react'
import AccountPendingModal from './AccountPendingModal'

export default {
  title: 'Components/AccountPendingModal',
  component: AccountPendingModal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'AccountPendingModal',
  render: (args) => <AccountPendingModal {...args} />,
  args: { open: true, onOpenChange: () => {}, onClose: () => {} },
}
