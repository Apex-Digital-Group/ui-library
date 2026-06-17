import * as React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Button } from './button'
import { Input } from './input'
import { Label } from './label'

export default { title: 'UI/Popover', component: Popover, tags: ['autodocs'], parameters: { layout: 'centered' } }

export const Default = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild><Button variant="outline">Open</Button></PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="grid gap-3">
          <h4 className="font-medium leading-none">Dimensions</h4>
          <p className="text-sm text-muted-foreground">Set the canvas size.</p>
          <div className="grid grid-cols-3 items-center gap-3">
            <Label htmlFor="w">Width</Label>
            <Input id="w" defaultValue="100%" className="col-span-2 h-8" />
          </div>
          <div className="grid grid-cols-3 items-center gap-3">
            <Label htmlFor="h">Height</Label>
            <Input id="h" defaultValue="25px" className="col-span-2 h-8" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}
