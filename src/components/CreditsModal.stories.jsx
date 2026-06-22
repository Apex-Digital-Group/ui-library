import * as React from 'react'
import CreditsModal from './CreditsModal'

export default {
  title: 'Components/CreditsModal',
  component: CreditsModal,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    packages: {
      control: 'object',
      description: 'Credit packages shown under "Choose a package". Each: { credits, price, popular? }.',
    },
    isOpen: { control: 'boolean' },
    onClose: { action: 'close' },
    onPurchase: { action: 'purchase', description: 'Called on final payment with { credits, price, paymentMethod }.' },
  },
}

export const Default = {
  name: 'CreditsModal',
  render: (args) => <CreditsModal {...args} />,
  args: {
    isOpen: true,
    packages: [
      { credits: 20, price: 24.99 },
      { credits: 50, price: 59.99 },
      { credits: 100, price: 114.99, popular: true },
      { credits: 200, price: 209.99 },
      { credits: 500, price: 499.99 },
    ],
  },
}

/** A different package set proves the list is fully data-driven. */
export const CustomPackages = {
  name: 'Custom packages',
  render: (args) => <CreditsModal {...args} />,
  args: {
    isOpen: true,
    packages: [
      { credits: 10, price: 9.99 },
      { credits: 250, price: 199.99, popular: true },
      { credits: 1000, price: 749.99 },
    ],
  },
}
