import * as React from 'react'
import FilterSidebar from './FilterSidebar'

const defaultFilters = {
  genderTab: 'girls',
  categories: [],
  liveStatus: [],
  showTypes: [],
  priceRanges: [],
  languages: [],
  ageGroups: [],
  ethnicities: [],
  appearances: [],
  breastSizes: [],
  buttSizes: [],
  builds: [],
  heightRanges: [],
  hairTypes: [],
  regions: [],
  tags: [],
  willingness: [],
  fetishes: [],
}

export default { title: 'Components/Videos/FilterSidebar', component: FilterSidebar, tags: ['autodocs'], parameters: { layout: 'fullscreen' } }

export const Default = {
  render: function Render() {
    const [filters, setFilters] = React.useState(defaultFilters)
    return (
      <div className="bg-[#1a0e2e] min-h-screen p-6 text-white">
        <FilterSidebar filters={filters} setFilters={setFilters} />
      </div>
    )
  },
}
