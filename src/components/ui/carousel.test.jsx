import { describe, it, expect } from 'vitest'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from './carousel'

describe('Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext', () => {
  it('exports Carousel', () => {
    expect(Carousel).toBeDefined()
  })

  it('exports CarouselContent', () => {
    expect(CarouselContent).toBeDefined()
  })

  it('exports CarouselItem', () => {
    expect(CarouselItem).toBeDefined()
  })

  it('exports CarouselPrevious', () => {
    expect(CarouselPrevious).toBeDefined()
  })

  it('exports CarouselNext', () => {
    expect(CarouselNext).toBeDefined()
  })
})
