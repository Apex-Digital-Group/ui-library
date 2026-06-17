import * as React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs'

export default { title: 'UI/Tabs', component: Tabs, tags: ['autodocs'], parameters: { layout: 'centered' } }

export const Default = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="rounded-md border p-4 mt-2 text-sm">
        Make changes to your account here. Click save when you're done.
      </TabsContent>
      <TabsContent value="password" className="rounded-md border p-4 mt-2 text-sm">
        Change your password. After saving, you'll be logged out.
      </TabsContent>
    </Tabs>
  ),
}
