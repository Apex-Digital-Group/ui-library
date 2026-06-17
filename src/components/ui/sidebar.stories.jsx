import * as React from 'react'
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton,
  SidebarMenuItem, SidebarProvider, SidebarRail, SidebarTrigger,
} from './sidebar'

export default { title: 'UI/Sidebar', component: Sidebar, tags: ['autodocs'], parameters: { layout: 'fullscreen' } }

export const Default = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4 font-semibold">Workspace</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem><SidebarMenuButton>Home</SidebarMenuButton></SidebarMenuItem>
                <SidebarMenuItem><SidebarMenuButton>Search</SidebarMenuButton></SidebarMenuItem>
                <SidebarMenuItem><SidebarMenuButton>Settings</SidebarMenuButton></SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-4 text-xs text-muted-foreground">v0.0.1</SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <div className="flex items-center gap-2 border-b p-3">
          <SidebarTrigger />
          <p className="font-semibold">Main content</p>
        </div>
        <div className="p-6 text-sm text-muted-foreground">Sidebar primitive — collapsible, resizable, ARIA-correct.</div>
      </SidebarInset>
    </SidebarProvider>
  ),
}
