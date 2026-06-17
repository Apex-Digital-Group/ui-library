import * as React from 'react'
import {
  NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem,
  NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport,
} from './navigation-menu'

export default { title: 'UI/NavigationMenu', component: NavigationMenu, tags: ['autodocs'], parameters: { layout: 'centered' } }

export const Default = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 p-4 w-[400px]">
              <li><NavigationMenuLink className="block rounded-md p-2 hover:bg-accent" href="#">Introduction</NavigationMenuLink></li>
              <li><NavigationMenuLink className="block rounded-md p-2 hover:bg-accent" href="#">Installation</NavigationMenuLink></li>
              <li><NavigationMenuLink className="block rounded-md p-2 hover:bg-accent" href="#">Typography</NavigationMenuLink></li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className="px-4 py-2" href="#">Docs</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuIndicator />
      </NavigationMenuList>
      <NavigationMenuViewport />
    </NavigationMenu>
  ),
}
