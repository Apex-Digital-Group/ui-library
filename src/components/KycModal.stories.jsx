import * as React from 'react'
import KycModal from './KycModal'

export default {
  title: 'Components/KycModal',
  component: KycModal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'KycModal',
  render: (args) => <KycModal {...args} />,
  args: { open: true, onOpenChange: () => {}, onClose: () => {} },
}
