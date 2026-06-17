import * as React from 'react'
import { Mail, Trash2, ArrowRight } from 'lucide-react'
import { Button } from './button'

export default {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: { control: 'select', options: ['default', 'sm', 'lg', 'icon'] },
    disabled: { control: 'boolean' },
  },
}

export const Default = { args: { children: 'Button' } }
export const Secondary = { args: { variant: 'secondary', children: 'Secondary' } }
export const Outline = { args: { variant: 'outline', children: 'Outline' } }
export const Destructive = { args: { variant: 'destructive', children: 'Delete' } }
export const Ghost = { args: { variant: 'ghost', children: 'Ghost' } }
export const Link = { args: { variant: 'link', children: 'Link' } }

export const WithIcon = {
  render: () => (
    <Button>
      <Mail /> Email
    </Button>
  ),
}

export const IconOnly = {
  render: () => (
    <Button size="icon" variant="outline" aria-label="Delete">
      <Trash2 />
    </Button>
  ),
}

export const AllVariants = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link <ArrowRight /></Button>
    </div>
  ),
}
