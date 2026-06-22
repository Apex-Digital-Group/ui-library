import * as React from 'react'
import { Video, User } from 'lucide-react'
import SignInModal from './SignInModal'

export default {
  title: 'Components/SignInModal',
  component: SignInModal,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    options: {
      control: 'object',
      description: 'Role cards on the select screen. Each: { type, icon, title, description }.',
    },
    onClose: { action: 'close' },
    onSelectType: { action: 'selectType', description: "Called with the chosen role ('creator' | 'member')." },
  },
}

export const Default = {
  name: 'SignInModal',
  render: (args) => <SignInModal {...args} />,
  args: {
    isOpen: true,
    options: [
      { type: 'creator', icon: Video, title: 'Content Creator', description: 'Stream, create content & earn' },
      { type: 'member', icon: User, title: 'Member', description: 'Watch, interact & support creators' },
    ],
  },
}
