import * as React from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible'
import { Button } from './button'

export default { title: 'UI/Collapsible', component: Collapsible, tags: ['autodocs'], parameters: { layout: 'centered' } }

export const Default = {
  render: function Render() {
    const [open, setOpen] = React.useState(true)
    return (
      <Collapsible open={open} onOpenChange={setOpen} className="w-[320px] space-y-2">
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">@bondmedia · starred repos</h4>
          <CollapsibleTrigger asChild><Button variant="ghost" size="sm">Toggle</Button></CollapsibleTrigger>
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm">@anthropic/claude-code</div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-2 font-mono text-sm">@radix-ui/react-collapsible</div>
          <div className="rounded-md border px-4 py-2 font-mono text-sm">tailwindlabs/tailwindcss</div>
        </CollapsibleContent>
      </Collapsible>
    )
  },
}
