import { describe, it, expect } from 'vitest'
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle } from './chart'

describe('ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle', () => {
  it('exports ChartContainer', () => {
    expect(ChartContainer).toBeDefined()
  })

  it('exports ChartTooltip', () => {
    expect(ChartTooltip).toBeDefined()
  })

  it('exports ChartTooltipContent', () => {
    expect(ChartTooltipContent).toBeDefined()
  })

  it('exports ChartLegend', () => {
    expect(ChartLegend).toBeDefined()
  })

  it('exports ChartLegendContent', () => {
    expect(ChartLegendContent).toBeDefined()
  })

  it('exports ChartStyle', () => {
    expect(ChartStyle).toBeDefined()
  })
})
