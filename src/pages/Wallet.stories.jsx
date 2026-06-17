import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import Wallet from './Wallet'

export default {
  title: 'Pages/Wallet',
  component: Wallet,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}

export const Default = {
  name: 'Wallet',
  render: (args) => <Wallet {...args} />,
  args: {},
}
