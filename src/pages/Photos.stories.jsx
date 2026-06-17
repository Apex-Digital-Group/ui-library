import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import Photos from './Photos'

export default {
  title: 'Pages/Photos',
  component: Photos,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}

export const Default = {
  name: 'Photos',
  render: (args) => <Photos {...args} />,
  args: {},
}
