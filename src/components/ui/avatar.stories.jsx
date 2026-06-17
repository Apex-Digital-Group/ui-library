import * as React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'

export default { title: 'UI/Avatar', component: Avatar, tags: ['autodocs'], parameters: { layout: 'centered' } }

export const Default = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/80?img=12" alt="Avatar" />
      <AvatarFallback>FA</AvatarFallback>
    </Avatar>
  ),
}

export const FallbackOnly = {
  render: () => (
    <Avatar>
      <AvatarFallback>BM</AvatarFallback>
    </Avatar>
  ),
}
