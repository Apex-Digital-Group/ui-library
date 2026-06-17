import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import Profile from './Profile'

export default {
  title: 'Pages/Profile',
  component: Profile,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}

export const Default = {
  name: 'Profile',
  render: (args) => <Profile {...args} />,
  args: {},
}
