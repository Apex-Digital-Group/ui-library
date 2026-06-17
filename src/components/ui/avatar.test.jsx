import { describe, it, expect } from 'vitest'
import { Avatar, AvatarImage, AvatarFallback } from './avatar'

describe('Avatar, AvatarImage, AvatarFallback', () => {
  it('exports Avatar', () => {
    expect(Avatar).toBeDefined()
  })

  it('exports AvatarImage', () => {
    expect(AvatarImage).toBeDefined()
  })

  it('exports AvatarFallback', () => {
    expect(AvatarFallback).toBeDefined()
  })
})
