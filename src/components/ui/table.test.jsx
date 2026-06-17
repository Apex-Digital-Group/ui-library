import { describe, it, expect } from 'vitest'
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from './table'

describe('Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption', () => {
  it('exports Table', () => {
    expect(Table).toBeDefined()
  })

  it('exports TableHeader', () => {
    expect(TableHeader).toBeDefined()
  })

  it('exports TableBody', () => {
    expect(TableBody).toBeDefined()
  })

  it('exports TableFooter', () => {
    expect(TableFooter).toBeDefined()
  })

  it('exports TableHead', () => {
    expect(TableHead).toBeDefined()
  })

  it('exports TableRow', () => {
    expect(TableRow).toBeDefined()
  })

  it('exports TableCell', () => {
    expect(TableCell).toBeDefined()
  })

  it('exports TableCaption', () => {
    expect(TableCaption).toBeDefined()
  })
})
