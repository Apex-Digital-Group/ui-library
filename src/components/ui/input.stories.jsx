import * as React from 'react'
import { Input } from './input'
import { Label } from './label'

export default {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
}

export const Default = { args: { placeholder: 'Type here…' } }
export const Email = { args: { type: 'email', placeholder: 'you@bondmedia.ae' } }
export const Disabled = { args: { disabled: true, placeholder: 'Read only' } }

export const WithLabel = {
  render: () => (
    <div className="flex w-72 flex-col gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@bondmedia.ae" />
    </div>
  ),
}
