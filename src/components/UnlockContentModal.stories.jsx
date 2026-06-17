import * as React from 'react'
import UnlockContentModal from './UnlockContentModal'

export default {
  title: 'Components/UnlockContentModal',
  component: UnlockContentModal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'UnlockContentModal',
  render: (args) => <UnlockContentModal {...args} />,
  args: { open: true, onOpenChange: () => {}, onClose: () => {} },
}
