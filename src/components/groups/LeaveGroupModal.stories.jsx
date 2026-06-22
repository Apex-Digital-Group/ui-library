import * as React from 'react'
import LeaveGroupModal from './LeaveGroupModal'

export default {
  title: 'Components/LeaveGroupModal',
  component: LeaveGroupModal,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'LeaveGroupModal',
  render: (args) => <LeaveGroupModal {...args} />,
  args: { open: true, onOpenChange: () => {}, onClose: () => {} },
}
