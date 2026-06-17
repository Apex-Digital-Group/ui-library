import * as React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import {
  ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent,
} from './chart'

const data = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
  { month: 'Apr', desktop: 173, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'Jun', desktop: 214, mobile: 140 },
]

const config = {
  desktop: { label: 'Desktop', color: 'hsl(var(--chart-1))' },
  mobile:  { label: 'Mobile',  color: 'hsl(var(--chart-2))' },
}

export default { title: 'UI/Chart', component: ChartContainer, tags: ['autodocs'], parameters: { layout: 'centered' } }

export const Default = {
  render: () => (
    <ChartContainer config={config} className="h-[260px] w-[480px]">
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  ),
}
