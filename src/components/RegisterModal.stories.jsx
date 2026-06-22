import * as React from 'react'
import RegisterModal from './RegisterModal'

export default {
  title: 'Components/RegisterModal',
  component: RegisterModal,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'RegisterModal',
  render: (args) => <RegisterModal {...args} />,
  args: { isOpen: true, onOpenChange: () => {}, onClose: () => {} },
}
