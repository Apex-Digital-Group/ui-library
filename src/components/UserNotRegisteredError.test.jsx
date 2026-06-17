import { describe, it, expect } from 'vitest'
import UserNotRegisteredError from './UserNotRegisteredError'

describe('UserNotRegisteredError', () => {
  it('exports UserNotRegisteredError', () => {
    expect(UserNotRegisteredError).toBeDefined()
  })
})
