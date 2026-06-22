import * as React from 'react'
import TreatModal from './TreatModal'

export default {
  title: 'Components/TreatModal',
  component: TreatModal,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    modelName: { control: 'text' },
    modelImage: { control: 'text' },
    modelVideo: { control: 'text' },
    userBalance: { control: 'number' },
    treatAmounts: {
      control: 'object',
      description: 'Selectable amounts. Each: { value, label }. Keep a { value: "other" } entry to enable the custom-amount input.',
    },
    onClose: { action: 'close' },
    onTreat: { action: 'treat', description: 'Called with { amount, message, to } when "Treat Me!" is clicked.' },
  },
}

export const Default = {
  name: 'TreatModal',
  render: (args) => <TreatModal {...args} />,
  args: {
    isOpen: true,
    modelName: 'Aria',
    modelImage: 'https://i.pravatar.cc/300?img=47',
    modelVideo: '',
    userBalance: 10.0,
    treatAmounts: [
      { value: '1', label: '1 Credit' },
      { value: '5', label: '5 Credits' },
      { value: 'other', label: 'Other' },
    ],
  },
}
