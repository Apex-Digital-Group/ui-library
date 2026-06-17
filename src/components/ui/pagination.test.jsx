import { describe, it, expect } from 'vitest'
import { Pagination, PaginationContent, PaginationLink, PaginationItem, PaginationPrevious, PaginationNext, PaginationEllipsis } from './pagination'

describe('Pagination, PaginationContent, PaginationLink, PaginationItem, PaginationPrevious, PaginationNext, PaginationEllipsis', () => {
  it('exports Pagination', () => {
    expect(Pagination).toBeDefined()
  })

  it('exports PaginationContent', () => {
    expect(PaginationContent).toBeDefined()
  })

  it('exports PaginationLink', () => {
    expect(PaginationLink).toBeDefined()
  })

  it('exports PaginationItem', () => {
    expect(PaginationItem).toBeDefined()
  })

  it('exports PaginationPrevious', () => {
    expect(PaginationPrevious).toBeDefined()
  })

  it('exports PaginationNext', () => {
    expect(PaginationNext).toBeDefined()
  })

  it('exports PaginationEllipsis', () => {
    expect(PaginationEllipsis).toBeDefined()
  })
})
