import * as React from 'react'
import PostDetailModal from './PostDetailModal'

export default {
  title: 'Components/PostDetailModal',
  component: PostDetailModal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'PostDetailModal',
  render: (args) => <PostDetailModal {...args} />,
  args: { open: true, onOpenChange: () => {}, onClose: () => {} },
}
