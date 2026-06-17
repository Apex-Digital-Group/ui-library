import * as React from 'react'
import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem,
  DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent,
  DropdownMenuSubTrigger, DropdownMenuTrigger,
} from './dropdown-menu'
import { Button } from './button'

export default { title: 'UI/DropdownMenu', component: DropdownMenu, tags: ['autodocs'], parameters: { layout: 'centered' } }

export const Default = {
  render: function Render() {
    const [bookmark, setBookmark] = React.useState(true)
    const [pos, setPos] = React.useState('bottom')
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild><Button variant="outline">Open menu</Button></DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Profile <DropdownMenuShortcut>⌘P</DropdownMenuShortcut></DropdownMenuItem>
            <DropdownMenuItem>Billing <DropdownMenuShortcut>⌘B</DropdownMenuShortcut></DropdownMenuItem>
            <DropdownMenuItem>Settings <DropdownMenuShortcut>⌘,</DropdownMenuShortcut></DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem checked={bookmark} onCheckedChange={setBookmark}>Bookmarks</DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={pos} onValueChange={setPos}>
            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>More tools</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuItem>Print</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}
