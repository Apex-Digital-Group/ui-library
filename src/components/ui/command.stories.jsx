import * as React from 'react'
import {
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
  CommandSeparator, CommandShortcut,
} from './command'

export default { title: 'UI/Command', component: Command, tags: ['autodocs'], parameters: { layout: 'centered' } }

export const Default = {
  render: () => (
    <Command className="rounded-lg border shadow-md w-[420px]">
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>Profile <CommandShortcut>⌘P</CommandShortcut></CommandItem>
          <CommandItem>Billing <CommandShortcut>⌘B</CommandShortcut></CommandItem>
          <CommandItem>Logout</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}
