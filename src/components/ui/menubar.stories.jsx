import * as React from 'react'
import {
  Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarMenu,
  MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarShortcut,
  MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger,
} from './menubar'

export default { title: 'UI/Menubar', component: Menubar, tags: ['autodocs'], parameters: { layout: 'centered' } }

export const Default = {
  render: function Render() {
    const [profile, setProfile] = React.useState('compact')
    const [autosave, setAutosave] = React.useState(true)
    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New tab <MenubarShortcut>⌘T</MenubarShortcut></MenubarItem>
            <MenubarItem>New window <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Share</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Email link</MenubarItem>
                <MenubarItem>Copy link</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem checked={autosave} onCheckedChange={setAutosave}>Autosave</MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarRadioGroup value={profile} onValueChange={setProfile}>
              <MenubarRadioItem value="compact">Compact</MenubarRadioItem>
              <MenubarRadioItem value="comfortable">Comfortable</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
  },
}
