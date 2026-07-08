import * as React from 'react'
import UnlockContentModal from './UnlockContentModal'

export default {
  title: 'Components/UnlockContentModal',
  component: UnlockContentModal,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'UnlockContentModal',
  render: (args) => <UnlockContentModal {...args} />,
  args: {
    isOpen: true,
    onOpenChange: () => {},
    onClose: () => {},
    post: {
      author: 'lunavex',
      authorName: 'Luna Vex',
      authorImage: 'https://i.pravatar.cc/300?img=47',
    },
  },
}
