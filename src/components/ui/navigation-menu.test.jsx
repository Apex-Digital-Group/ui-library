import { describe, it, expect } from 'vitest'
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuContent, NavigationMenuTrigger, NavigationMenuLink, NavigationMenuIndicator, NavigationMenuViewport } from './navigation-menu'

describe('NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuContent, NavigationMenuTrigger, NavigationMenuLink, NavigationMenuIndicator, NavigationMenuViewport', () => {
  it('exports NavigationMenu', () => {
    expect(NavigationMenu).toBeDefined()
  })

  it('exports NavigationMenuList', () => {
    expect(NavigationMenuList).toBeDefined()
  })

  it('exports NavigationMenuItem', () => {
    expect(NavigationMenuItem).toBeDefined()
  })

  it('exports NavigationMenuContent', () => {
    expect(NavigationMenuContent).toBeDefined()
  })

  it('exports NavigationMenuTrigger', () => {
    expect(NavigationMenuTrigger).toBeDefined()
  })

  it('exports NavigationMenuLink', () => {
    expect(NavigationMenuLink).toBeDefined()
  })

  it('exports NavigationMenuIndicator', () => {
    expect(NavigationMenuIndicator).toBeDefined()
  })

  it('exports NavigationMenuViewport', () => {
    expect(NavigationMenuViewport).toBeDefined()
  })
})
