import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import CamHouse from './CamHouse'

export default {
  title: 'Pages/CamHouse',
  component: CamHouse,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}

export const Default = {
  name: 'CamHouse',
  render: (args) => <CamHouse {...args} />,
  args: {},
}
