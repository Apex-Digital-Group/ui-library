import * as React from 'react'
import SignInModal from './SignInModal'

export default {
  title: 'Components/SignInModal',
  component: SignInModal,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'SignInModal',
  render: (args) => <SignInModal {...args} />,
  args: { isOpen: true, onOpenChange: () => {}, onClose: () => {} },
}
