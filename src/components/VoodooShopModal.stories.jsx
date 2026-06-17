import * as React from 'react'
import VoodooShopModal from './VoodooShopModal'

export default {
  title: 'Components/VoodooShopModal',
  component: VoodooShopModal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'VoodooShopModal',
  render: (args) => <VoodooShopModal {...args} />,
  args: { open: true, onOpenChange: () => {}, onClose: () => {} },
}
