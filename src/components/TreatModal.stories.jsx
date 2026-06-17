import * as React from 'react'
import TreatModal from './TreatModal'

export default {
  title: 'Components/TreatModal',
  component: TreatModal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'TreatModal',
  render: (args) => <TreatModal {...args} />,
  args: { open: true, onOpenChange: () => {}, onClose: () => {} },
}
