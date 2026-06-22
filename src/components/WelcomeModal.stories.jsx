import * as React from 'react'
import WelcomeModal from './WelcomeModal'

export default {
  title: 'Components/WelcomeModal',
  component: WelcomeModal,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'WelcomeModal',
  render: (args) => <WelcomeModal {...args} />,
  args: { isOpen: true, onOpenChange: () => {}, onClose: () => {} },
}
