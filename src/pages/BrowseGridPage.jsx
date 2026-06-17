import React, { useState } from 'react';
import { Heart, Menu, X, Home, Rss, Image as ImageIcon, Video, Clock, Users, Calendar, Camera, Star, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createPageUrl } from '@/utils';
import VideoCard from '../components/videos/VideoCard';
import PromoCard from '../components/videos/PromoCard';
import FilterSidebar from '../components/videos/FilterSidebar';
import ProfileDropdown from '../components/ProfileDropdown';
import CreditsModal from '../components/CreditsModal';

import { videoItems as defaultItems } from '../data/browseItems'

/**
 * Shared browse-grid page. Renders the global nav + filter sidebar + card
 * grid that base44 shipped twice as LiveCams.jsx and Videos.jsx (those two
 * files were byte-identical aside from the data array). Pass `items` from
 * `../data/browseItems` to pick which dataset to show; the LiveCams + Videos
 * wrappers do exactly that.
 */
export default function BrowseGridPage({ items = defaultItems }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [creditsModalOpen, setCreditsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [filters, setFilters] = useState({
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
    fetishes: []
  });

  const mainNavItems = [
    { name: 'Home', icon: Home, url: createPageUrl('Champions') },
    { name: 'Feed', icon: Rss, url: createPageUrl('Feed') },
    { name: 'Photos', icon: ImageIcon, url: createPageUrl('Photos') },
    { name: 'Videos', icon: Video, url: createPageUrl('Videos') },
    { name: 'Stories', icon: Clock, url: '#' },
    { name: 'Groups', icon: Users, url: '#' },
    { name: 'Events', icon: Calendar, url: '#' },
    { name: 'Fans', icon: Users, url: '#' },
    { name: 'Live Cams', icon: Camera, url: createPageUrl('LiveCams') },
    { name: 'Cam Stars', icon: Star, url: '#' }
  ];

  const menuItems = [
    { name: 'Companion', icon: Heart },
    { name: 'Dominatrix', icon: Heart },
    { name: 'Interests', icon: Star },
    { name: 'Marketplace', icon: Heart },
    { name: 'Voodoo Shop', icon: Star },
    { name: 'Blogs', icon: Heart }
  ];


  const filterItems = (videos) => {
    return videos.filter(video => {
      if (video.type === 'promo') return true;

      const { genderTab, categories, liveStatus, showTypes, priceRanges, languages, ageGroups, ethnicities, appearances, breastSizes, buttSizes, builds, heightRanges, hairTypes, regions } = filters;

      if (genderTab === 'girls' && video.category === 'Guys') return false;
      if (genderTab === 'guys' && video.category !== 'Guys') return false;
      if (categories.length && !categories.includes(video.category)) return false;
      if (liveStatus.length) {
        if (liveStatus.includes('private') && !video.isOnline) return false;
        if (liveStatus.includes('free') && (!video.isOnline || !video.showTypes?.includes('Free chat'))) return false;
      }
      if (showTypes.length && !showTypes.some(t => video.showTypes?.includes(t))) return false;
      if (priceRanges.length) {
        const price = video.pricePerMinute || 0;
        const inRange = priceRanges.some(range => {
          if (range === '0.01–0.98') return price <= 0.98;
          if (range === '0.98–1.99') return price > 0.98 && price <= 1.99;
          if (range === '1.99–2.99') return price > 1.99 && price <= 2.99;
          if (range === '2.99+') return price > 2.99;
          return false;
        });
        if (!inRange) return false;
      }
      if (languages.length && !languages.some(l => video.language?.includes(l))) return false;
      if (ageGroups.length && !ageGroups.includes(video.ageGroup)) return false;
      if (ethnicities.length && !ethnicities.includes(video.ethnicity)) return false;
      if (appearances.length && !appearances.some(a => video.appearance?.includes(a))) return false;
      if (breastSizes.length && !breastSizes.includes(video.breastSize)) return false;
      if (buttSizes.length && !buttSizes.includes(video.buttSize)) return false;
      if (builds.length && !builds.includes(video.build)) return false;
      if (heightRanges.length && !heightRanges.includes(video.heightRange)) return false;
      if (hairTypes.length && !hairTypes.some(h => video.hair?.includes(h))) return false;
      if (regions.length && !regions.includes(video.region)) return false;

      return true;
    });
  };

  const filteredItems = filterItems(items);

  return (
    <>
      <style>{`
        .scroll-container { scrollbar-width: none; -ms-overflow-style: none; }
        .scroll-container::-webkit-scrollbar { display: none; }
        header.fixed-header { position: fixed; top: 0; left: 0; right: 0; width: 100%; z-index: 9999; background: #1a0e2e; }
        main.main-content { padding-top: 140px; }
        @media (max-width: 768px) { main.main-content { padding-top: 120px; } }
      `}</style>

      <div className="min-h-screen bg-[#1a0e2e] text-white">
        {(menuOpen || profileMenuOpen || filterOpen) && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => { setMenuOpen(false); setProfileMenuOpen(false); setFilterOpen(false); }} />}

        {/* Mobile menu slide-out */}
        <div className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-[#2E2249] z-50 shadow-2xl transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`} onClick={(e) => e.stopPropagation()}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <a href={createPageUrl('Champions')} className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/b248bfd91_gemini_logo_white.png" alt="Home" className="w-8 h-8 object-contain" />
                <h2 className="text-xl font-bold">LiveGemini</h2>
              </a>
              <button onClick={() => setMenuOpen(false)} className="p-2 hover:bg-white/10 rounded-lg"><X className="w-6 h-6" /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-6">
              <nav className="space-y-1">
                {mainNavItems.map((item, index) => {
                  const Icon = item.icon;
                  return (<a key={index} href={item.url} className="flex items-center gap-4 p-2.5 rounded-lg hover:bg-white/10 transition-colors group" onClick={() => setMenuOpen(false)}>
                      <Icon className="w-4 h-4 text-purple-400 group-hover:text-pink-400" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </a>);
                })}
              </nav>
            </div>
            <div className="p-6 border-t border-white/10">
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-full text-sm font-medium">Get Credits</button>
            </div>
          </div>
        </div>

        {/* Mobile filter slide-out */}
        <div className={`fixed top-0 left-0 h-full w-[80%] max-w-sm bg-[#2E2249] z-50 shadow-2xl transition-transform duration-300 overflow-y-auto ${filterOpen ? 'translate-x-0' : '-translate-x-full'}`} onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-xl font-bold">Filters</h2>
            <button onClick={() => setFilterOpen(false)} className="p-2 hover:bg-white/10 rounded-lg"><X className="w-6 h-6" /></button>
          </div>
          <div className="p-4">
            <FilterSidebar filters={filters} setFilters={setFilters} isMobile={true} />
          </div>
        </div>

        <header className="fixed-header">
          <nav className="bg-[#2E2249] border-b border-white/10">
            <div className="px-4 md:px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 md:gap-8">
                  <a href={createPageUrl('Champions')} className="flex items-center gap-2 md:gap-3">
                    <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/b248bfd91_gemini_logo_white.png" alt="LiveGemini Logo" className="w-6 h-6 md:w-8 md:h-8 object-contain flex-shrink-0" />
                    <span className="font-bold text-base md:text-lg hidden md:inline">LiveGemini</span>
                  </a>
                  <div className="hidden lg:flex items-center gap-6 text-sm">
                    <a href={createPageUrl('Champions')} className="text-white/90 hover:text-white transition-colors">Home</a>
                    <a href={createPageUrl('Feed')} className="text-white/90 hover:text-white transition-colors">Feed</a>
                    <a href={createPageUrl('Photos')} className="text-white/90 hover:text-white transition-colors">Photos</a>
                    <a href={createPageUrl('Videos')} className="text-white hover:text-white transition-colors font-semibold">Videos</a>
                    <a href="#" className="text-white/90 hover:text-white transition-colors">Stories</a>
                    <a href="#" className="text-white/90 hover:text-white transition-colors">Groups</a>
                    <a href="#" className="text-white/90 hover:text-white transition-colors">Events</a>
                    <a href="#" className="text-white/90 hover:text-white transition-colors">Fans</a>
                    <a href={createPageUrl('LiveCams')} className="text-white/90 hover:text-white transition-colors">Live Cams</a>
                    <a href="#" className="text-white/90 hover:text-white transition-colors">Cam Stars</a>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors hidden md:block">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors relative">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors relative">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  <div className="relative z-[55]">
                    <button onClick={(e) => { e.stopPropagation(); setProfileMenuOpen(!profileMenuOpen); }} className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-purple-500 hover:border-pink-500 transition-colors flex-shrink-0">
                      <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/0794a4326_Screenshot2025-10-20at055030.png" alt="Profile" className="w-full h-full object-cover" />
                    </button>
                    <div className="absolute top-full right-0 mt-2 z-[60]">
                      <ProfileDropdown isOpen={profileMenuOpen} onClose={() => setProfileMenuOpen(false)} />
                    </div>
                  </div>
                  <button onClick={() => setCreditsModalOpen(true)} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-3 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap">Get Credits</button>
                  <button onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen) }} className="p-2 hover:bg-white/10 rounded-lg transition-colors lg:hidden"><Menu className="w-6 h-6" /></button>
                </div>
              </div>
            </div>
          </nav>
          <div className="bg-[#251a3a] border-b border-white/10">
            <div className="overflow-x-auto scroll-container">
              <div className="flex items-center gap-2 px-4 md:px-6 py-3 min-w-max">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  return (<button key={index} className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-all whitespace-nowrap text-sm">
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{item.name}</span>
                    </button>);
                })}
              </div>
            </div>
          </div>
        </header>

        <main className="main-content px-4 md:px-6 py-6">
          <div className="max-w-[1800px] mx-auto">
            <h1 className="text-2xl font-bold mb-4">Live Videos</h1>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button 
                  onClick={() => setFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 bg-[#2E2249] hover:bg-[#3a2d58] border border-white/10 px-4 py-2 rounded-lg transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-medium">Filters</span>
                </button>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px] bg-[#2E2249] border-white/10">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="new">New Models</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>{filteredItems.filter(v => v.type === 'model' && v.isOnline).length} models online now</span>
              </div>
            </div>

            <div className="flex gap-6">
              <FilterSidebar filters={filters} setFilters={setFilters} isMobile={false} />
              
              <div className="flex-1">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredItems.map((video) => 
                    video.type === 'promo' ? (
                      <PromoCard key={video.id} data={video} />
                    ) : (
                      <VideoCard key={video.id} data={video} onUnlock={() => setCreditsModalOpen(true)} />
                    )
                  )}
                </div>
                {filteredItems.length === 0 && (
                  <div className="text-center py-12 text-white/60">
                    <p>No models match your filters. Try adjusting your selection.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-[#2E2249] border-t border-white/10 py-12 px-6 mt-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 pb-8 border-b border-white/10">
              <p className="text-white/90 text-lg font-medium mb-2">This site contains sexually explicit material. Only enter this site if you are 18 years of age or over!</p>
              <p className="text-white/60 text-sm">18 U.S.C 2257 Record Keeping Requirements Compliance Statement</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h4 className="font-semibold mb-4 text-purple-400">Legal</h4>
                <ul className="space-y-2 text-sm text-white/70">
                  <li><a href="#" className="hover:text-white transition-colors">Terms and Conditions</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-purple-400">Compliance</h4>
                <ul className="space-y-2 text-sm text-white/70">
                  <li><a href="#" className="hover:text-white transition-colors">Compliance and Prohibited Content</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Anti-Fraud and AML Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Complaints Procedure</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-purple-400">Company</h4>
                <ul className="space-y-2 text-sm text-white/70">
                  <li><a href="#" className="hover:text-white transition-colors">Company Information</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-purple-400">Language</h4>
                <select className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm w-full hover:bg-white/15 transition-colors cursor-pointer">
                  <option>English</option>
                  <option>Español</option>
                  <option>Français</option>
                  <option>Deutsch</option>
                  <option>Italiano</option>
                </select>
              </div>
            </div>
            <div className="text-center text-sm text-white/50 pt-8 border-t border-white/10">
              <p>© 2025 Live Gemini. All Rights Reserved. Site by Bond</p>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6">
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/c51fb3398_icra-logo-CvEUY-qz.jpg" alt="ICRA" className="h-8 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/b2e278942_rta-logo-BuVza8AD.jpg" alt="RTA" className="h-8 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/36071e0b3_asacp-logo-BKJALCQV.jpg" alt="ASACP" className="h-8 object-contain opacity-80 hover:opacity-100 transition-opacity" />
            </div>
          </div>
          </footer>
          <CreditsModal isOpen={creditsModalOpen} onClose={() => setCreditsModalOpen(false)} />
          </div>
          </>
          );
          }