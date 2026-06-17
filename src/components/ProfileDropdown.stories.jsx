import * as React from 'react'
import ProfileDropdown from './ProfileDropdown'

export default {
  title: 'Components/ProfileDropdown',
  component: ProfileDropdown,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'ProfileDropdown',
  render: (args) => <ProfileDropdown {...args} />,
  args: {},
}
