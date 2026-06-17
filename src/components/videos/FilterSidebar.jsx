import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Heart } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

export default function FilterSidebar({ filters, setFilters, isMobile = false }) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    liveStatus: true,
    showType: false,
    price: false,
    language: false,
    age: false,
    ethnicity: false,
    appearance: false,
    breast: false,
    butt: false,
    build: false,
    height: false,
    hair: false,
    region: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleFilter = (filterType, value) => {
    setFilters(prev => {
      const current = prev[filterType] || [];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [filterType]: updated };
    });
  };

  const FilterSection = ({ title, section, items, filterKey }) => (
    <div className="border-b border-white/10 pb-3 mb-3">
      <button 
        onClick={() => toggleSection(section)}
        className="w-full flex items-center justify-between text-sm font-semibold mb-2 hover:text-purple-400 transition-colors"
      >
        <span>{title}</span>
        {expandedSections[section] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {expandedSections[section] && (
        <div className="space-y-2 mt-2">
          {items.map((item) => (
            <label key={item.value || item} className="flex items-center gap-2 cursor-pointer group/item hover:bg-white/5 p-1 rounded transition-colors">
              <Checkbox
                checked={filters[filterKey]?.includes(item.value || item)}
                onCheckedChange={() => toggleFilter(filterKey, item.value || item)}
                className="border-white/30"
              />
              <span className="text-xs text-white/80 group-hover/item:text-white">{item.label || item}</span>
              {item.icon && <item.icon className="w-3 h-3 ml-auto text-pink-500" />}
            </label>
          ))}
        </div>
      )}
    </div>
  );

  const containerClass = isMobile 
    ? "w-full" 
    : "hidden lg:block w-64 flex-shrink-0";

  const innerClass = isMobile
    ? "w-full"
    : "bg-[#2E2249]/50 backdrop-blur-xl rounded-2xl p-4 border border-white/10 sticky top-[220px] max-h-[calc(100vh-240px)] overflow-y-auto scroll-container";

  return (
    <div className={containerClass}>
      <div className={innerClass}>
        <h3 className="font-bold mb-4 text-white/90">FILTERS</h3>

        {/* Gender Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setFilters(prev => ({ ...prev, genderTab: 'girls' }))}
            className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${filters.genderTab === 'girls' ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-white/5 hover:bg-white/10'}`}
          >
            Girls
          </button>
          <button
            onClick={() => setFilters(prev => ({ ...prev, genderTab: 'guys' }))}
            className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${filters.genderTab === 'guys' ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-white/5 hover:bg-white/10'}`}
          >
            Guys
          </button>
        </div>

        <FilterSection 
          title="Category" 
          section="category" 
          filterKey="categories"
          items={[
            { value: 'Exclusive', label: 'Exclusive' },
            { value: 'LiveG Certified', label: 'LiveG Certified', icon: Heart },
            { value: 'Girl', label: 'Girl' },
            { value: 'Hot Flirt', label: 'Hot Flirt' },
            { value: 'Soul Mate', label: 'Soul Mate' },
            { value: 'Mature', label: 'Mature' },
            { value: 'New LiveG Models', label: 'New LiveG Models' },
            { value: 'Fetish', label: 'Fetish' },
            { value: 'Transgirl', label: 'Transgirl' },
            { value: 'Lesbian', label: 'Lesbian' },
            { value: 'Couple', label: 'Couple' }
          ]}
        />

        <FilterSection 
          title="Live Status" 
          section="liveStatus" 
          filterKey="liveStatus"
          items={[
            { value: 'private', label: 'Live in Private Shows' },
            { value: 'free', label: 'Live in Free Chat' }
          ]}
        />

        <FilterSection 
          title="Show Type" 
          section="showType" 
          filterKey="showTypes"
          items={['Free chat', 'Private show', 'Video call', 'Mobile Live', 'VIP show']}
        />

        <FilterSection 
          title="Price" 
          section="price" 
          filterKey="priceRanges"
          items={[
            { value: '0.01–0.98', label: '$0.01 – $0.98' },
            { value: '0.98–1.99', label: '$0.98 – $1.99' },
            { value: '1.99–2.99', label: '$1.99 – $2.99' },
            { value: '2.99+', label: '$2.99+' },
            { value: 'hot-deal', label: 'Hot Deal' }
          ]}
        />

        <FilterSection 
          title="Language" 
          section="language" 
          filterKey="languages"
          items={['English', 'Spanish', 'German', 'Italian', 'French', 'Chinese']}
        />

        <FilterSection 
          title="Age" 
          section="age" 
          filterKey="ageGroups"
          items={['18–22', '22–30', '30–40', '40+']}
        />

        <FilterSection 
          title="Ethnicity" 
          section="ethnicity" 
          filterKey="ethnicities"
          items={['Asian', 'Ebony', 'Latina', 'White']}
        />

        <FilterSection 
          title="Appearance" 
          section="appearance" 
          filterKey="appearances"
          items={['Petite', 'Natural', 'Shaved', 'Stockings', 'Tattoos', 'Glamorous', 'Gothic', 'Boots', 'Leather', 'Vintage']}
        />

        <FilterSection 
          title="Breast Size" 
          section="breast" 
          filterKey="breastSizes"
          items={['Tiny', 'Normal', 'Big', 'Huge']}
        />

        <FilterSection 
          title="Butt Size" 
          section="butt" 
          filterKey="buttSizes"
          items={['Small', 'Normal', 'Big', 'Huge']}
        />

        <FilterSection 
          title="Build" 
          section="build" 
          filterKey="builds"
          items={['Skinny', 'Athletic', 'Slim', 'Medium', 'Curvy', 'BBW']}
        />

        <FilterSection 
          title="Height" 
          section="height" 
          filterKey="heightRanges"
          items={['150–160cm', '160–170cm', '165–175cm', '175–185cm']}
        />

        <FilterSection 
          title="Hair" 
          section="hair" 
          filterKey="hairTypes"
          items={['Black', 'Blonde', 'Brunette', 'Redhead', 'Long', 'Short']}
        />

        <FilterSection 
          title="Region" 
          section="region" 
          filterKey="regions"
          items={['North America', 'Europe', 'South America', 'Asia', 'Africa']}
        />
      </div>
    </div>
  );
}