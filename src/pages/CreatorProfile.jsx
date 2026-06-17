import React, { useState } from 'react'
import {
  Heart,
  MessageCircle,
  Share2,
  Lock,
  Play,
  Image as ImageIcon,
  Star,
  Users,
  Menu,
  X,
  Home,
  Rss,
  Video,
  Clock,
  Calendar,
  Camera,
  Cake,
  User2,
  Dumbbell,
  Maximize2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createPageUrl } from '@/utils'
import ProfileDropdown from '../components/ProfileDropdown'
import TreatModal from '../components/TreatModal'
import { creators, suggestionsFor } from '../data/creators'

/**
 * Parameterized creator-profile page. Replaces the 26 hand-copied profile
 * files that base44 shipped — every profile shared the same layout, only the
 * creator's name, tagline, bio, imagery, stats, and 6-field detail strip
 * varied. Data lives in src/data/creators.js; pass a single entry as the
 * `creator` prop, or pass nothing and the page falls back to the first
 * creator so the default Storybook render isn't blank.
 */
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const TABS = [
  { id: 'feed', label: 'Feed' },
  { id: 'photos', label: 'Photos' },
  { id: 'videos', label: 'Videos' },
  { id: 'selling', label: 'Selling' },
  { id: 'wishlist', label: 'Wishlist' },
]

const FILTERS = [
  { id: 'all', label: 'All Posts', icon: Users },
  { id: 'public', label: 'Public', icon: Users },
  { id: 'subscribers', label: 'Subscribers', icon: Lock },
  { id: 'videos', label: 'Videos', icon: Play },
  { id: 'photos', label: 'Photos', icon: ImageIcon },
  { id: 'interests', label: 'Interests', icon: Star },
]

const MENU_ITEMS = [
  { name: 'Companion', icon: Heart },
  { name: 'Dominatrix', icon: Heart },
  { name: 'Interests', icon: Star },
  { name: 'Marketplace', icon: Heart },
  { name: 'Voodoo Shop', icon: Star },
  { name: 'Blogs', icon: Heart },
]

const buildMainNav = () => [
  { name: 'Home', icon: Home, url: '/' },
  { name: 'Feed', icon: Rss, url: createPageUrl('Feed') },
  { name: 'Photos', icon: ImageIcon, url: createPageUrl('Photos') },
  { name: 'Videos', icon: Video, url: createPageUrl('Videos') },
  { name: 'Stories', icon: Clock, url: '#' },
  { name: 'Groups', icon: Users, url: '#' },
  { name: 'Events', icon: Calendar, url: '#' },
  { name: 'Fans', icon: Users, url: '#' },
  { name: 'Live Cams', icon: Camera, url: createPageUrl('LiveCams') },
  { name: 'Cam Stars', icon: Star, url: '#' },
]

export default function CreatorProfile({ creator = creators[0] }) {
  const [activeTab, setActiveTab] = useState('feed')
  const [isFollowing, setIsFollowing] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState('Monday')
  const [treatModalOpen, setTreatModalOpen] = useState(false)

  const suggestions = suggestionsFor(creator.slug)
  const mainNavItems = buildMainNav()
  const heroSchedule = creator.schedule?.[selectedDay] || []

  const handlePrev = () => {
    const i = DAYS.indexOf(selectedDay)
    setSelectedDay(DAYS[(i - 1 + DAYS.length) % DAYS.length])
  }
  const handleNext = () => {
    const i = DAYS.indexOf(selectedDay)
    setSelectedDay(DAYS[(i + 1) % DAYS.length])
  }

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
        {(menuOpen || profileMenuOpen) && (
          <div
            className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
            onClick={() => { setMenuOpen(false); setProfileMenuOpen(false) }}
          />
        )}

        <div
          className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-[#2E2249] z-50 shadow-2xl transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6">
              <h2 className="text-xl font-bold">Menu</h2>
              <button onClick={() => setMenuOpen(false)} className="p-2 hover:bg-white/10 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6">
              <nav className="space-y-1">
                {mainNavItems.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={i}
                      href={item.url}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-4 p-2.5 rounded-lg hover:bg-white/10 transition-colors group"
                    >
                      <Icon className="w-4 h-4 text-purple-400 group-hover:text-pink-400 transition-colors" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </a>
                  )
                })}
              </nav>
            </div>
            <div className="p-6 border-t border-white/10">
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-full text-sm font-medium transition-all">
                Get Credits
              </button>
            </div>
          </div>
        </div>

        <header className="fixed-header">
          <nav className="bg-[#2E2249] border-b border-white/10">
            <div className="px-4 md:px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 md:gap-8">
                  <div className="flex items-center gap-2 md:gap-3">
                    <img
                      src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/b248bfd91_gemini_logo_white.png"
                      alt="LiveGemini Logo"
                      className="w-6 h-6 md:w-8 md:h-8 object-contain flex-shrink-0"
                    />
                    <span className="font-bold text-base md:text-lg hidden md:inline">LiveGemini</span>
                  </div>
                  <div className="hidden lg:flex items-center gap-6 text-sm">
                    {mainNavItems.slice(0, 9).map((item) => (
                      <a key={item.name} href={item.url} className="text-white/90 hover:text-white transition-colors">
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="relative z-[55]">
                    <button
                      onClick={(e) => { e.stopPropagation(); setProfileMenuOpen(!profileMenuOpen) }}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-purple-500 hover:border-pink-500 transition-colors"
                    >
                      <img src={creator.avatarImage} alt={creator.name} className="w-full h-full object-cover" />
                    </button>
                    <div className="absolute top-full right-0 mt-2 z-[60]">
                      <ProfileDropdown isOpen={profileMenuOpen} onClose={() => setProfileMenuOpen(false)} />
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-3 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap">
                    Get Credits
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen) }}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors lg:hidden"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </nav>

          <div className="bg-[#251a3a] border-b border-white/10">
            <div className="overflow-x-auto scroll-container">
              <div className="flex items-center gap-2 px-4 md:px-6 py-3 min-w-max">
                {MENU_ITEMS.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={i}
                      className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-all whitespace-nowrap text-sm"
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </header>

        <main className="main-content">
          {/* Hero: banner image or autoplay video */}
          <div className="relative h-[400px] overflow-hidden">
            {creator.bannerIsVideo ? (
              <video
                src={creator.bannerImage}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img src={creator.bannerImage} alt={`${creator.name} banner`} className="w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a0e2e] via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 px-4 md:px-6 pb-4">
              <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
                <div className="relative">
                  <img
                    src={creator.avatarImage}
                    alt={creator.name}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover border-4 border-[#1a0e2e] shadow-2xl"
                  />
                  <div className="absolute top-3 right-3 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                  <button
                    onClick={() => setTreatModalOpen(true)}
                    className="absolute bottom-2 right-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg transition-all"
                  >
                    Treat
                  </button>
                </div>

                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">{creator.name}</h2>
                  <p className="text-white/90 mb-3">{creator.tagline}</p>
                  <div className="flex items-center gap-6 text-sm">
                    <div><span className="font-bold text-lg">{creator.stats.followers}</span><span className="text-white/80 ml-1">Followers</span></div>
                    <div><span className="font-bold text-lg">{creator.stats.following}</span><span className="text-white/80 ml-1">Following</span></div>
                    <div><span className="font-bold text-lg">{creator.stats.posts}</span><span className="text-white/80 ml-1">Posts</span></div>
                  </div>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                  <Button
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`flex-1 md:flex-none ${
                      isFollowing
                        ? 'bg-white/10 hover:bg-white/20 border border-white/20'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                    }`}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isFollowing ? 'fill-pink-500' : ''}`} />
                    {isFollowing ? 'Following' : 'Follow'}
                  </Button>
                  <Button className="flex-1 md:flex-none bg-white/10 hover:bg-white/20 border border-white/20">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Detail strip: rating + schedule + bio */}
          <div className="bg-gradient-to-br from-[#2E2249] to-[#1a0e2e] border-b border-white/10">
            <div className="w-full px-4 md:px-8 py-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="bg-[#3a2d58]/50 backdrop-blur-xl rounded-2xl p-4 border border-white/10 text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`w-6 h-6 ${s <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} />
                    ))}
                  </div>
                  <p className="text-xl font-bold">{creator.stats.ratings} ratings</p>
                </div>

                <div className="bg-[#3a2d58]/50 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold">I'm usually online:</h3>
                    <div className="flex items-center gap-2">
                      <button onClick={handlePrev} className="p-1 hover:bg-white/10 rounded">‹</button>
                      <span className="font-medium text-sm min-w-[80px] text-center">{selectedDay}</span>
                      <button onClick={handleNext} className="p-1 hover:bg-white/10 rounded">›</button>
                    </div>
                  </div>
                  <div className="flex items-end justify-between gap-1" style={{ height: 80 }}>
                    {['12AM', '3AM', '6AM', '9AM', '12PM', '3PM', '6PM', '9PM'].map((time, i) => {
                      const h = heroSchedule[i] || 0
                      const highlight = h > 70
                      return (
                        <div key={time} className="flex flex-col items-center justify-end flex-1" style={{ height: '100%' }}>
                          <div
                            className={`w-full rounded-t transition-all duration-300 ${
                              highlight
                                ? 'bg-gradient-to-t from-yellow-500 to-yellow-400'
                                : 'bg-gradient-to-t from-purple-600 to-pink-500'
                            }`}
                            style={{ height: `${h}%` }}
                          />
                          <span className="text-[10px] text-white/60 mt-1 whitespace-nowrap">{time}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="bg-[#3a2d58]/50 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
                  <p className="text-sm text-white/90 leading-relaxed line-clamp-4">{creator.bio}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                <DetailCell icon={Cake}    label="Age"          value={creator.details.age} />
                <DetailCell icon={Star}    label="Breast size"  value={creator.details.breast} />
                <DetailCell icon={User2}   label="Gender"       value={creator.details.gender} />
                <DetailCell icon={Maximize2} label="Height" value={<>{creator.details.height}<span className="text-base">cm</span></>} />
                <DetailCell icon={Star}    label="Butt size"    value={creator.details.butt} />
                <DetailCell icon={Dumbbell} label="Build"       value={creator.details.build} />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="sticky top-[140px] z-40 bg-[#251a3a] border-b border-white/10">
            <div className="flex overflow-x-auto scroll-container px-4 md:px-8">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-all relative ${
                    activeTab === tab.id ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Body */}
          <div className="px-4 md:px-6 py-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
              <aside className="hidden lg:block lg:col-span-3">
                <div className="bg-[#2E2249]/50 backdrop-blur-xl rounded-2xl p-4 border border-white/10 sticky top-[220px]">
                  <h3 className="font-semibold mb-4 text-sm text-white/60">FILTER POSTS</h3>
                  <nav className="space-y-1">
                    {FILTERS.map((f) => {
                      const Icon = f.icon
                      return (
                        <button
                          key={f.id}
                          onClick={() => setActiveFilter(f.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                            activeFilter === f.id
                              ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white border border-purple-500/30'
                              : 'text-white/70 hover:bg-white/5'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {f.label}
                        </button>
                      )
                    })}
                  </nav>
                </div>
              </aside>

              <div className="lg:col-span-6">
                {activeTab === 'feed' ? (
                  <div className="space-y-4">
                    <SamplePost creator={creator} caption="Just finished an amazing photoshoot! Can't wait to share these exclusive shots with my subscribers 💜✨" />
                    <LockedPost creator={creator} />
                  </div>
                ) : (
                  <div className="bg-[#2E2249]/50 backdrop-blur-xl rounded-2xl p-12 text-center border border-white/10">
                    <p className="text-white/60">No content available in this section yet.</p>
                  </div>
                )}
              </div>

              <aside className="lg:col-span-3">
                <div className="bg-[#2E2249]/50 backdrop-blur-xl rounded-2xl p-4 border border-white/10 sticky top-[220px]">
                  <h3 className="font-semibold mb-4">You Might Like To Follow</h3>
                  <div className="space-y-3">
                    {suggestions.map((s, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <img src={s.image} alt={s.name} className="w-12 h-12 rounded-full object-cover" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{s.name}</h4>
                          <p className="text-xs text-white/60 truncate">{s.handle}</p>
                        </div>
                        <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 text-xs px-3">
                          Follow
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>

        <TreatModal
          isOpen={treatModalOpen}
          onClose={() => setTreatModalOpen(false)}
          modelName={creator.name}
          modelImage={creator.avatarImage}
          modelVideo={creator.bannerIsVideo ? creator.bannerImage : undefined}
          userBalance={10.0}
        />
      </div>
    </>
  )
}

function DetailCell({ icon: Icon, label, value }) {
  return (
    <div className="bg-[#3a2d58]/50 backdrop-blur-xl rounded-xl p-3 border border-white/10 text-center">
      <Icon className="w-5 h-5 mx-auto mb-2 text-purple-400" />
      <p className="text-2xl font-bold mb-1">{value}</p>
      <p className="text-xs text-white/60">{label}</p>
    </div>
  )
}

function SamplePost({ creator, caption }) {
  return (
    <div className="bg-[#2E2249]/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10">
      <div className="p-4 flex items-center gap-3">
        <img src={creator.avatarImage} alt={creator.name} className="w-10 h-10 rounded-full object-cover" />
        <div className="flex-1">
          <h4 className="font-semibold text-sm">{creator.name}</h4>
          <p className="text-xs text-white/60">2 hours ago</p>
        </div>
        <Button variant="ghost" size="icon" className="text-white/60">
          <Share2 className="w-4 h-4" />
        </Button>
      </div>
      <div className="px-4 pb-3">
        <p className="text-sm text-white/90">{caption}</p>
      </div>
      <img src={creator.bannerIsVideo ? creator.avatarImage : creator.bannerImage} alt="Post" className="w-full aspect-video object-cover" />
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-white/70 hover:text-pink-500 transition-colors">
            <Heart className="w-5 h-5" /> <span className="text-sm font-medium">1.2K</span>
          </button>
          <button className="flex items-center gap-2 text-white/70 hover:text-blue-500 transition-colors">
            <MessageCircle className="w-5 h-5" /> <span className="text-sm font-medium">89</span>
          </button>
        </div>
        <button className="text-white/70 hover:text-white transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

function LockedPost({ creator }) {
  return (
    <div className="bg-[#2E2249]/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-purple-500/30 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 backdrop-blur-xl flex items-center justify-center z-10">
        <div className="text-center">
          <Lock className="w-12 h-12 mx-auto mb-3 text-purple-400" />
          <h3 className="font-semibold text-lg mb-2">Exclusive Content</h3>
          <p className="text-sm text-white/70 mb-4">Subscribe to unlock premium photos & videos</p>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
            Subscribe Now — 100 Credits/month
          </Button>
        </div>
      </div>
      <img src={creator.avatarImage} alt="Locked" className="w-full aspect-video object-cover blur-xl opacity-50" />
    </div>
  )
}
