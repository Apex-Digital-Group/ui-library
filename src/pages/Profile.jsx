import React, { useState } from 'react';
import { Menu, X, Home, Rss, Image as ImageIcon, Video, Clock, Users, Calendar, Camera, Star, User, Mail, MapPin, Link as LinkIcon, Edit, Save } from 'lucide-react';
import { createPageUrl } from '@/utils';
import ProfileDropdown from '../components/ProfileDropdown';
import CreditsModal from '../components/CreditsModal';

export default function Profile() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [creditsModalOpen, setCreditsModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: 'AntMan',
    email: 'user@example.com',
    bio: 'Just a fan enjoying great content on LiveGemini',
    location: 'New York, USA',
    website: '',
    joinDate: 'January 2025'
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
    { name: 'Companion', icon: Star },
    { name: 'Dominatrix', icon: Star },
    { name: 'Interests', icon: Star },
    { name: 'Marketplace', icon: Star },
    { name: 'Voodoo Shop', icon: Star },
    { name: 'Blogs', icon: Star }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to the backend
  };

  return (
    <>
      <style>{`
        .scroll-container { scrollbar-width: none; -ms-overflow-style: none; }
        .scroll-container::-webkit-scrollbar { display: none; }
        header.fixed-header { position: fixed; top: 0; left: 0; right: 0; width: 100%; z-index: 9999; background: #1a0e2e; }
        main.main-content { padding-top: 140px; }
        @media (max-width: 768px) { main.main-content { padding-top: 120px; } }
      `}</style>

      <div className={`min-h-screen ${darkMode ? 'bg-[#1a0e2e] text-white' : 'bg-gray-50 text-gray-900'}`}>
        {(menuOpen || profileMenuOpen) && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => { setMenuOpen(false); setProfileMenuOpen(false); }} />}

        {/* Mobile menu */}
        <div className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-[#2E2249] z-50 shadow-2xl transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
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
                  return (<a key={index} href={item.url} className="flex items-center gap-4 p-2.5 rounded-lg hover:bg-white/10 transition-colors group">
                      <Icon className="w-4 h-4 text-purple-400 group-hover:text-pink-400" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </a>);
                })}
              </nav>
            </div>
          </div>
        </div>

        <header className="fixed-header">
          <nav className={`${darkMode ? 'bg-[#2E2249] border-white/10' : 'bg-white border-gray-200'} border-b`}>
            <div className="px-4 md:px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 md:gap-8">
                  <a href={createPageUrl('Champions')} className="flex items-center gap-2 md:gap-3">
                    <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/b248bfd91_gemini_logo_white.png" alt="LiveGemini Logo" className={`w-6 h-6 md:w-8 md:h-8 object-contain ${!darkMode ? 'invert' : ''}`} />
                    <span className={`font-bold text-base md:text-lg hidden md:inline ${darkMode ? 'text-white' : 'text-gray-900'}`}>LiveGemini</span>
                  </a>
                  <div className="hidden lg:flex items-center gap-6 text-sm">
                    <a href={createPageUrl('Champions')} className={`${darkMode ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>Home</a>
                    <a href={createPageUrl('Feed')} className={`${darkMode ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>Feed</a>
                    <a href={createPageUrl('Photos')} className={`${darkMode ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>Photos</a>
                    <a href={createPageUrl('Videos')} className={`${darkMode ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>Videos</a>
                    <a href="#" className={`${darkMode ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>Stories</a>
                    <a href="#" className={`${darkMode ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>Groups</a>
                    <a href="#" className={`${darkMode ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>Events</a>
                    <a href="#" className={`${darkMode ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>Fans</a>
                    <a href={createPageUrl('LiveCams')} className={`${darkMode ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>Live Cams</a>
                    <a href="#" className={`${darkMode ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>Cam Stars</a>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                  <button className={`p-2 hover:bg-white/10 rounded-lg transition-colors hidden md:block ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>
                  </button>
                  <button className={`p-2 hover:bg-white/10 rounded-lg transition-colors relative ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                  </button>
                  <button className={`p-2 hover:bg-white/10 rounded-lg transition-colors relative ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  <div className="relative z-[55]">
                    <button onClick={(e) => { e.stopPropagation(); setProfileMenuOpen(!profileMenuOpen); }} className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-purple-500 hover:border-pink-500 transition-colors">
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
          <div className={`${darkMode ? 'bg-[#251a3a] border-white/10' : 'bg-gray-100 border-gray-200'} border-b`}>
            <div className="overflow-x-auto scroll-container">
              <div className="flex items-center gap-2 px-4 md:px-6 py-3 min-w-max">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  return (<button key={index} className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-full transition-all whitespace-nowrap text-sm ${darkMode ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'}`}>
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{item.name}</span>
                    </button>);
                })}
              </div>
            </div>
          </div>
        </header>

        <main className="main-content px-4 md:px-6 py-6">
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className={`${darkMode ? 'bg-[#2E2249]' : 'bg-white'} rounded-2xl overflow-hidden border ${darkMode ? 'border-white/10' : 'border-gray-200'} mb-6`}>
              <div className="h-32 bg-gradient-to-r from-purple-600 to-pink-600"></div>
              <div className="px-6 pb-6">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 -mt-16 md:-mt-12">
                  <div className="flex items-end gap-4">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-[#2E2249] bg-[#2E2249]">
                      <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/0794a4326_Screenshot2025-10-20at055030.png" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <div className="pb-2">
                      <h1 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{profileData.username}</h1>
                      <p className={`${darkMode ? 'text-white/60' : 'text-gray-600'} text-sm`}>Member since {profileData.joinDate}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full transition-all font-medium"
                  >
                    {isEditing ? <><Save className="w-4 h-4" /> Save Profile</> : <><Edit className="w-4 h-4" /> Edit Profile</>}
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className={`${darkMode ? 'bg-[#2E2249]' : 'bg-white'} rounded-2xl border ${darkMode ? 'border-white/10' : 'border-gray-200'} p-6`}>
              <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Profile Information</h2>
              
              <div className="space-y-6">
                <div>
                  <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-gray-700'}`}>
                    <User className="w-4 h-4" />
                    Username
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.username}
                      onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                      className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                  ) : (
                    <p className={`px-4 py-3 rounded-lg ${darkMode ? 'bg-white/5 text-white' : 'bg-gray-50 text-gray-900'}`}>{profileData.username}</p>
                  )}
                </div>

                <div>
                  <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-gray-700'}`}>
                    <Mail className="w-4 h-4" />
                    Email
                  </label>
                  <p className={`px-4 py-3 rounded-lg ${darkMode ? 'bg-white/5 text-white/60' : 'bg-gray-50 text-gray-600'}`}>{profileData.email}</p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-white/40' : 'text-gray-500'}`}>Email cannot be changed</p>
                </div>

                <div>
                  <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-gray-700'}`}>
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      rows={3}
                      className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                  ) : (
                    <p className={`px-4 py-3 rounded-lg ${darkMode ? 'bg-white/5 text-white' : 'bg-gray-50 text-gray-900'}`}>{profileData.bio}</p>
                  )}
                </div>

                <div>
                  <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-gray-700'}`}>
                    <MapPin className="w-4 h-4" />
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                  ) : (
                    <p className={`px-4 py-3 rounded-lg ${darkMode ? 'bg-white/5 text-white' : 'bg-gray-50 text-gray-900'}`}>{profileData.location}</p>
                  )}
                </div>

                <div>
                  <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-gray-700'}`}>
                    <LinkIcon className="w-4 h-4" />
                    Website
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.website}
                      onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                      placeholder="https://your-website.com"
                      className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                  ) : (
                    <p className={`px-4 py-3 rounded-lg ${darkMode ? 'bg-white/5 text-white' : 'bg-gray-50 text-gray-900'}`}>
                      {profileData.website || 'Not set'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        <CreditsModal isOpen={creditsModalOpen} onClose={() => setCreditsModalOpen(false)} />
      </div>
    </>
  );
}