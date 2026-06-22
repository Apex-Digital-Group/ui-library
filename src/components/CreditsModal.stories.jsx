import * as React from 'react'
import CreditsModal from './CreditsModal'

export default {
  title: 'Components/CreditsModal',
  component: CreditsModal,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'CreditsModal',
  render: (args) => <CreditsModal {...args} />,
  args: { isOpen: true, onOpenChange: () => {}, onClose: () => {} },
}
