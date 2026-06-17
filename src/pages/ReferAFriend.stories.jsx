import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import ReferAFriend from './ReferAFriend'

export default {
  title: 'Pages/ReferAFriend',
  component: ReferAFriend,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}

export const Default = {
  name: 'ReferAFriend',
  render: (args) => <ReferAFriend {...args} />,
  args: {},
}
