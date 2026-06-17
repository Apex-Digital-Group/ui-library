import * as React from 'react'
import UserNotRegisteredError from './UserNotRegisteredError'

export default {
  title: 'Components/UserNotRegisteredError',
  component: UserNotRegisteredError,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const Default = {
  name: 'UserNotRegisteredError',
  render: (args) => <UserNotRegisteredError {...args} />,
  args: {},
}
