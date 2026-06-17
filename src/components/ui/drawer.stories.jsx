import * as React from 'react'
import {
  Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter,
  DrawerHeader, DrawerTitle, DrawerTrigger,
} from './drawer'
import { Button } from './button'

export default { title: 'UI/Drawer', component: Drawer, tags: ['autodocs'], parameters: { layout: 'centered' } }

export const Default = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild><Button variant="outline">Open drawer</Button></DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild><Button variant="outline">Cancel</Button></DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}
