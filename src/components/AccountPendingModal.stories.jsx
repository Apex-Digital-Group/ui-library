import * as React from 'react'
import AccountPendingModal from './AccountPendingModal'

export default {
  title: 'Components/AccountPendingModal',
  component: AccountPendingModal,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    title: { control: 'text' },
    description: { control: 'text' },
    status: { control: 'text' },
    estimatedTime: { control: 'text' },
    note: { control: 'text' },
    approveLabel: { control: 'text' },
    onClose: { action: 'close' },
    onApprove: { action: 'approve' },
  },
}

export const Default = {
  name: 'AccountPendingModal',
  render: (args) => <AccountPendingModal {...args} />,
  args: {
    isOpen: true,
    title: 'Account Pending Approval',
    status: 'Pending Review',
    estimatedTime: '1-24 hours',
    approveLabel: 'Simulate Admin Approval',
  },
}
