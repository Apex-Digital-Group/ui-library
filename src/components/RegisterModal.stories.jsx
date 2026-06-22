import * as React from 'react'
import RegisterModal from './RegisterModal'

export default {
  title: 'Components/RegisterModal',
  component: RegisterModal,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    userType: { control: 'text', description: "'member' or 'creator' — drives copy." },
    onClose: { action: 'close' },
    onRegister: {
      action: 'register',
      description: 'Called on submit with { username, email, password, confirmPassword, referralCode, userType }. Overrides default email-notification behavior.',
    },
  },
}

export const Default = {
  name: 'RegisterModal',
  render: (args) => <RegisterModal {...args} />,
  args: {
    isOpen: true,
    userType: 'member',
  },
}
