import * as React from 'react'
import KycModal from './KycModal'

export default {
  title: 'Components/KycModal',
  component: KycModal,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    title: { control: 'text' },
    description: { control: 'text' },
    logoSrc: { control: 'text' },
    uploadLabel: { control: 'text' },
    uploadImageSrc: { control: 'text' },
    verifyLabel: { control: 'text' },
    fields: {
      control: 'object',
      description: 'Simulated input fields. Each: { type, placeholder }.',
    },
    onClose: { action: 'close' },
    onVerify: { action: 'verify' },
    onComplete: { action: 'complete' },
  },
}

export const Default = {
  name: 'KycModal',
  render: (args) => <KycModal {...args} />,
  args: {
    isOpen: true,
    title: 'Secure Age Verification',
    description: 'Please verify your identity to continue. This is a demo simulation.',
    verifyLabel: 'KYC Pass',
    fields: [
      { type: 'text', placeholder: 'Full Name (simulation)' },
      { type: 'email', placeholder: 'Email Address (simulation)' },
    ],
  },
}
