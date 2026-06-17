import * as React from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './resizable'

export default { title: 'UI/Resizable', component: ResizablePanelGroup, tags: ['autodocs'], parameters: { layout: 'centered' } }

export const Default = {
  render: () => (
    <ResizablePanelGroup direction="horizontal" className="max-w-md rounded-lg border w-[420px]">
      <ResizablePanel defaultSize={50}>
        <div className="flex h-40 items-center justify-center p-4 text-sm">Left</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-40 items-center justify-center p-4 text-sm">Right</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}
