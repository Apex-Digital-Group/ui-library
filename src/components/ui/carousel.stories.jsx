import * as React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './carousel'

export default { title: 'UI/Carousel', component: Carousel, tags: ['autodocs'], parameters: { layout: 'centered' } }

export const Default = {
  render: () => (
    <Carousel className="w-[320px]">
      <CarouselContent>
        {[1, 2, 3, 4, 5].map((i) => (
          <CarouselItem key={i}>
            <div className="flex aspect-square items-center justify-center rounded-md border bg-card text-4xl font-semibold">
              {i}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}
