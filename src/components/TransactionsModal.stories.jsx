import * as React from 'react'
import TransactionsModal from './TransactionsModal'

export default {
  title: 'Components/TransactionsModal',
  component: TransactionsModal,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'TransactionsModal',
  render: (args) => <TransactionsModal {...args} />,
  args: { isOpen: true, onOpenChange: () => {}, onClose: () => {} },
}
