import * as React from 'react'
import PostDetailModal from './PostDetailModal'

export default {
  title: 'Components/PostDetailModal',
  component: PostDetailModal,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'PostDetailModal',
  render: (args) => <PostDetailModal {...args} />,
  args: { isOpen: true, onOpenChange: () => {}, onClose: () => {} },
}
