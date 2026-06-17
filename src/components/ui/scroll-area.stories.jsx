import * as React from 'react'
import { ScrollArea } from './scroll-area'

const tags = Array.from({ length: 50 }).map((_, i) => `v1.2.${i}`)

export default { title: 'UI/ScrollArea', component: ScrollArea, tags: ['autodocs'], parameters: { layout: 'centered' } }

export const Default = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {tags.map((tag) => (
          <div key={tag} className="text-sm py-1 border-b last:border-0">{tag}</div>
        ))}
      </div>
    </ScrollArea>
  ),
}
