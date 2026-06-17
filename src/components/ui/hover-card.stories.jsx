import * as React from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import { Button } from './button'

export default { title: 'UI/HoverCard', component: HoverCard, tags: ['autodocs'], parameters: { layout: 'centered' } }

export const Default = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild><Button variant="link">@bondmedia</Button></HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="flex gap-3">
          <Avatar><AvatarImage src="https://i.pravatar.cc/40?img=22" /><AvatarFallback>BM</AvatarFallback></Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@bondmedia</h4>
            <p className="text-sm">Digital studio building tools for creators.</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}
