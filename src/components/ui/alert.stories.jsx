import * as React from 'react'
import { Alert, AlertTitle, AlertDescription } from './alert'

export default {
  title: 'Components/alert',
  component: Alert,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export const AlertExample = {
  name: 'Alert',
  render: (args) => <Alert {...args} />,
  args: {},
}

export const AlertTitleExample = {
  name: 'AlertTitle',
  render: (args) => <AlertTitle {...args} />,
  args: {},
}

export const AlertDescriptionExample = {
  name: 'AlertDescription',
  render: (args) => <AlertDescription {...args} />,
  args: {},
}
