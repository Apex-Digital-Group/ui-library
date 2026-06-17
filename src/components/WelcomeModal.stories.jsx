import * as React from 'react'
import WelcomeModal from './WelcomeModal'

export default {
  title: 'Components/WelcomeModal',
  component: WelcomeModal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'WelcomeModal',
  render: (args) => <WelcomeModal {...args} />,
  args: { open: true, onOpenChange: () => {}, onClose: () => {} },
}
