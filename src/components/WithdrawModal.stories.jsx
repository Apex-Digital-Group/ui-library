import * as React from 'react'
import WithdrawModal from './WithdrawModal'

export default {
  title: 'Components/WithdrawModal',
  component: WithdrawModal,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    amount: { control: 'number', description: 'Withdrawal amount shown above the options.' },
    options: {
      control: 'object',
      description: 'Withdrawal speed options. Each: { id, title, subtitle, fee, feePercent, color, icon }.',
    },
    onClose: { action: 'close' },
    onWithdraw: { action: 'withdraw', description: 'Called on Proceed with { amount, option, optionId }.' },
  },
}

export const Default = {
  name: 'WithdrawModal',
  render: (args) => <WithdrawModal {...args} />,
  args: { isOpen: true, amount: 250 },
}
