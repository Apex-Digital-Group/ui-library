import * as React from 'react'
import {
  Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter,
  SheetHeader, SheetTitle, SheetTrigger,
} from './sheet'
import { Button } from './button'
import { Input } from './input'
import { Label } from './label'

export default { title: 'UI/Sheet', component: Sheet, tags: ['autodocs'], parameters: { layout: 'centered' } }

export const Default = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild><Button variant="outline">Open</Button></SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>Make changes to your profile here.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="sheet-name">Name</Label>
            <Input id="sheet-name" defaultValue="Fazle" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild><Button>Save</Button></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}
