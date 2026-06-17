import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import PinkBlondeLive from './PinkBlondeLive'

export default {
  title: 'Pages/PinkBlondeLive',
  component: PinkBlondeLive,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}

export const Default = {
  name: 'PinkBlondeLive',
  render: (args) => <PinkBlondeLive {...args} />,
  args: {},
}
