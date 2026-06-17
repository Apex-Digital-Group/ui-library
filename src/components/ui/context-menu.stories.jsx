import * as React from 'react'
import {
  ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuGroup,
  ContextMenuItem, ContextMenuLabel, ContextMenuRadioGroup, ContextMenuRadioItem,
  ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent,
  ContextMenuSubTrigger, ContextMenuTrigger,
} from './context-menu'

export default { title: 'UI/ContextMenu', component: ContextMenu, tags: ['autodocs'], parameters: { layout: 'centered' } }

export const Default = {
  render: function Render() {
    const [bookmark, setBookmark] = React.useState(false)
    const [pos, setPos] = React.useState('bottom')
    return (
      <ContextMenu>
        <ContextMenuTrigger className="flex h-48 w-72 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
          Right-click here
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuLabel>Actions</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuItem>Back <ContextMenuShortcut>⌘[</ContextMenuShortcut></ContextMenuItem>
            <ContextMenuItem>Forward <ContextMenuShortcut>⌘]</ContextMenuShortcut></ContextMenuItem>
            <ContextMenuItem>Reload <ContextMenuShortcut>⌘R</ContextMenuShortcut></ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem checked={bookmark} onCheckedChange={setBookmark}>Show bookmarks</ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuRadioGroup value={pos} onValueChange={setPos}>
            <ContextMenuRadioItem value="top">Top</ContextMenuRadioItem>
            <ContextMenuRadioItem value="bottom">Bottom</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
          <ContextMenuSeparator />
          <ContextMenuSub>
            <ContextMenuSubTrigger>More</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Help</ContextMenuItem>
              <ContextMenuItem>About</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
    )
  },
}
