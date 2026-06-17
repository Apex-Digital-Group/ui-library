import * as React from 'react'
import TransactionsModal from './TransactionsModal'

export default {
  title: 'Components/TransactionsModal',
  component: TransactionsModal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'TransactionsModal',
  render: (args) => <TransactionsModal {...args} />,
  args: { open: true, onOpenChange: () => {}, onClose: () => {} },
}
