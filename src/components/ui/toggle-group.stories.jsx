import * as React from 'react'
import { Bold, Italic, Underline } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from './toggle-group'

export default { title: 'UI/ToggleGroup', component: ToggleGroup, tags: ['autodocs'], parameters: { layout: 'centered' } }

export const Default = {
  render: () => (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold" aria-label="Bold"><Bold className="h-4 w-4" /></ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic"><Italic className="h-4 w-4" /></ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline"><Underline className="h-4 w-4" /></ToggleGroupItem>
    </ToggleGroup>
  ),
}
