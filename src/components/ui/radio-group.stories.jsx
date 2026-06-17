import * as React from 'react'
import { RadioGroup, RadioGroupItem } from './radio-group'
import { Label } from './label'

export default { title: 'UI/RadioGroup', component: RadioGroup, tags: ['autodocs'], parameters: { layout: 'centered' } }

export const Default = {
  render: () => (
    <RadioGroup defaultValue="comfortable" className="space-y-2">
      <div className="flex items-center space-x-2"><RadioGroupItem value="default" id="r1" /><Label htmlFor="r1">Default</Label></div>
      <div className="flex items-center space-x-2"><RadioGroupItem value="comfortable" id="r2" /><Label htmlFor="r2">Comfortable</Label></div>
      <div className="flex items-center space-x-2"><RadioGroupItem value="compact" id="r3" /><Label htmlFor="r3">Compact</Label></div>
    </RadioGroup>
  ),
}
