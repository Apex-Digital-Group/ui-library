import * as React from 'react'
import { Badge } from './badge'

export default {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'secondary', 'destructive', 'outline'] },
  },
}

export const Default = { args: { children: 'New' } }
export const Secondary = { args: { variant: 'secondary', children: 'Beta' } }
export const Outline = { args: { variant: 'outline', children: 'Draft' } }
export const Destructive = { args: { variant: 'destructive', children: 'Failed' } }

export const Row = {
  render: () => (
    <div className="flex gap-2">
      <Badge>Active</Badge>
      <Badge variant="secondary">Pending</Badge>
      <Badge variant="outline">Archived</Badge>
      <Badge variant="destructive">Banned</Badge>
    </div>
  ),
}
