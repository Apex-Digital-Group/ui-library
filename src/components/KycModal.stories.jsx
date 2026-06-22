import * as React from 'react'
import KycModal from './KycModal'

export default {
  title: 'Components/KycModal',
  component: KycModal,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'KycModal',
  render: (args) => <KycModal {...args} />,
  args: { isOpen: true, onOpenChange: () => {}, onClose: () => {} },
}
