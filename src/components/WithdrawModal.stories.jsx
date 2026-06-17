import * as React from 'react'
import WithdrawModal from './WithdrawModal'

export default {
  title: 'Components/WithdrawModal',
  component: WithdrawModal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'WithdrawModal',
  render: (args) => <WithdrawModal {...args} />,
  args: { open: true, onOpenChange: () => {}, onClose: () => {} },
}
