import { describe, it, expect } from 'vitest'
import { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField } from './form'

describe('Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField', () => {
  it('exports Form', () => {
    expect(Form).toBeDefined()
  })

  it('exports FormItem', () => {
    expect(FormItem).toBeDefined()
  })

  it('exports FormLabel', () => {
    expect(FormLabel).toBeDefined()
  })

  it('exports FormControl', () => {
    expect(FormControl).toBeDefined()
  })

  it('exports FormDescription', () => {
    expect(FormDescription).toBeDefined()
  })

  it('exports FormMessage', () => {
    expect(FormMessage).toBeDefined()
  })

  it('exports FormField', () => {
    expect(FormField).toBeDefined()
  })
})
