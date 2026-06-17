import * as React from 'react'
import SignInModal from './SignInModal'

export default {
  title: 'Components/SignInModal',
  component: SignInModal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'SignInModal',
  render: (args) => <SignInModal {...args} />,
  args: { open: true, onOpenChange: () => {}, onClose: () => {} },
}
