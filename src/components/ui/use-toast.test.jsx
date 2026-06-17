import { describe, it, expect } from 'vitest'
import * as Mod from './use-toast'

describe('./use-toast', () => {
  it('module loads', () => {
    expect(Mod).toBeTypeOf('object')
  })
})
