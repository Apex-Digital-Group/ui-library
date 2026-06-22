import * as React from 'react'
import CancelLeaveModal from './CancelLeaveModal'

export default {
  title: 'Components/CancelLeaveModal',
  component: CancelLeaveModal,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'CancelLeaveModal',
  render: (args) => <CancelLeaveModal {...args} />,
  args: { open: true, onOpenChange: () => {}, onClose: () => {} },
}
