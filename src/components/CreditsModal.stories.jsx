import * as React from 'react'
import CreditsModal from './CreditsModal'

export default {
  title: 'Components/CreditsModal',
  component: CreditsModal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'CreditsModal',
  render: (args) => <CreditsModal {...args} />,
  args: { open: true, onOpenChange: () => {}, onClose: () => {} },
}
