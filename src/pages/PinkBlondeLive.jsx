import React, { useState } from 'react';
import { Heart, Gift, MessageCircle, Crown, Star, Lock, Volume2, VolumeX, Maximize, Settings, Send, User, Menu, X, Home, Rss, Image as ImageIcon, Video, Clock, Users, Calendar, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createPageUrl } from '@/utils';
import CreditsModal from '../components/CreditsModal';
import ProfileDropdown from '../components/ProfileDropdown';

export default function PinkBlondeLive() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [creditsModalOpen, setCreditsModalOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { user: 'Anonymous123', message: 'Hi beautiful! 😍', time: '2:34 PM' },
    { user: 'VIPMember', message: 'Amazing show!', time: '2:35 PM', isVip: true },
    { user: 'PinkBlonde', message: 'Thank you darlings! 💕', time: '2:36 PM', isModel: true },
    { user: 'Guest789', message: 'Can you dance for us?', time: '2:37 PM' }
  ]);

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    setChatMessages([...chatMessages, { user: 'You', message: chatMessage, time: 'Now' }]);
    setChatMessage('');
  };

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

  const mediaGallery = [
    { id: 1, type: 'video', thumbnail: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/921920217_46742d8a8895008f0f653ef1027cea0c_erotic_576x324.jpeg', isLocked: false },
    { id: 2, type: 'photo', thumbnail: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/39935ead1_b31d2ad6612a99c66882dbe414bf03f8_erotic_576x324.jpeg', isLocked: false },
    { id: 3, type: 'photo', thumbnail: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/fde95f6ef_bb5f5f4c4b09f898e8d6ee000b317d37_erotic_576x324.jpeg', isLocked: true },
    { id: 4, type: 'video', thumbnail: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/d45e56233_d200a807e28a78074dabae311610ebf1_erotic_576x324.jpeg', isLocked: false },
    { id: 5, type: 'photo', thumbnail: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/94705d444_4ea0997bc4db19787346d25f156c557b_erotic_576x324.jpeg', isLocked: true },
    { id: 6, type: 'photo', thumbnail: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/16e4a4a03_6b9832955eb7165dded6848ca1d7e21d_erotic_576x324.jpeg', isLocked: false },
    { id: 7, type: 'video', thumbnail: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/5b4b35771_1151b9b62274a670fb1a3aa4216314d0_erotic_576x324.jpeg', isLocked: true },
    { id: 8, type: 'photo', thumbnail: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/91ebe5880_0bed47b1cd5a698d3e7bd99f50d492cf_erotic_576x324.jpeg', isLocked: false },
    { id: 9, type: 'photo', thumbnail: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/d2d4d4569_4f836a6b1cf44ce48c2bbe1072fdd3fa_erotic_576x324.jpeg', isLocked: true },
    { id: 10, type: 'video', thumbnail: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/cad8fe871_be0f7dfffab8935354ef916f7ea3bafa_erotic_576x324.jpeg', isLocked: false },
    { id: 11, type: 'photo', thumbnail: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/09812f20a_c5a840ab47dac375d7abe137a448119b_erotic_576x324.jpeg', isLocked: true },
    { id: 12, type: 'photo', thumbnail: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/60fdc1777_18e911aa48983a91768b1fe63aeb43c7_erotic_576x324.jpeg', isLocked: false }
  ];

  return (
    <>
      <style>{`
        .chat-messages::-webkit-scrollbar { width: 6px; }
        .chat-messages::-webkit-scrollbar-track { background: rgba(255,255,255,0.1); }
        .chat-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.3); border-radius: 3px; }
        .scroll-container { scrollbar-width: none; -ms-overflow-style: none; }
        .scroll-container::-webkit-scrollbar { display: none; }
        header.fixed-header { position: fixed; top: 0; left: 0; right: 0; width: 100%; z-index: 9999; background: #1a0e2e; }
        main.main-content { padding-top: 140px; }
        @media (max-width: 768px) { main.main-content { padding-top: 120px; } }
      `}</style>

      <div className="min-h-screen bg-[#1a0e2e] text-white">
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
          <nav className="bg-[#2E2249] border-b border-white/10">
            <div className="px-4 md:px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 md:gap-8">
                  <a href={createPageUrl('Champions')} className="flex items-center gap-2 md:gap-3">
                    <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/b248bfd91_gemini_logo_white.png" alt="LiveGemini Logo" className="w-6 h-6 md:w-8 md:h-8 object-contain" />
                    <span className="font-bold text-base md:text-lg hidden md:inline">LiveGemini</span>
                  </a>
                  <div className="hidden lg:flex items-center gap-6 text-sm">
                    <a href={createPageUrl('Champions')} className="text-white/90 hover:text-white transition-colors">Home</a>
                    <a href={createPageUrl('Feed')} className="text-white/90 hover:text-white transition-colors">Feed</a>
                    <a href={createPageUrl('Photos')} className="text-white/90 hover:text-white transition-colors">Photos</a>
                    <a href={createPageUrl('Videos')} className="text-white/90 hover:text-white transition-colors">Videos</a>
                    <a href="#" className="text-white/90 hover:text-white transition-colors">Stories</a>
                    <a href="#" className="text-white/90 hover:text-white transition-colors">Groups</a>
                    <a href="#" className="text-white/90 hover:text-white transition-colors">Events</a>
                    <a href="#" className="text-white/90 hover:text-white transition-colors">Fans</a>
                    <a href={createPageUrl('LiveCams')} className="text-white hover:text-white transition-colors font-semibold">Live Cams</a>
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

        <main className="main-content">
          <div className="max-w-[1800px] mx-auto p-4">
            {/* Video Player and Chat Section */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4 mb-6">
              {/* Video Player */}
              <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
                <video
                  src="https://vco.bonddemo.co.uk/wp-content/uploads/2026/02/1122.mp4"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                />
                
                {/* Live Badge */}
                <div className="absolute top-4 left-4 bg-red-600 px-3 py-1.5 rounded-lg flex items-center gap-2 font-bold text-sm">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  LIVE
                </div>

                {/* Viewer Count */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm">
                  <User className="w-4 h-4" />
                  <span>2,847</span>
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setIsMuted(!isMuted)}
                        className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                      >
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </button>
                      <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                        <Settings className="w-5 h-5" />
                      </button>
                    </div>
                    <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                      <Maximize className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-white/20 rounded-full h-1.5 mb-2">
                    <div className="bg-pink-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-white/70">
                    <span>23:45</span>
                    <span>LIVE</span>
                  </div>
                </div>
              </div>

              {/* Live Chat */}
              <div className="bg-[#2E2249] rounded-xl overflow-hidden flex flex-col h-[500px] lg:h-auto">
                <div className="bg-[#251a3a] p-4 border-b border-white/10">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-pink-400" />
                    Live Chat
                    <span className="ml-auto text-xs text-white/60">2,847 online</span>
                  </h3>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-3 chat-messages">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className="text-sm">
                      <span className={`font-semibold ${msg.isModel ? 'text-pink-400' : msg.isVip ? 'text-yellow-400' : 'text-purple-400'}`}>
                        {msg.user}
                        {msg.isVip && <Crown className="w-3 h-3 inline ml-1" />}
                      </span>
                      <span className="text-white/90 ml-2">{msg.message}</span>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t border-white/10">
                  <div className="flex gap-2">
                    <Input
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 bg-[#1a0e2e] border-white/10 text-sm"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      className="bg-pink-600 hover:bg-pink-700"
                      size="icon"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <Button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`${isFollowing ? 'bg-purple-600/50' : 'bg-gradient-to-r from-purple-600 to-pink-600'} hover:opacity-90 gap-2`}
              >
                <Heart className={`w-4 h-4 ${isFollowing ? 'fill-current' : ''}`} />
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
              <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90 gap-2">
                <MessageCircle className="w-4 h-4" />
                Private Chat
              </Button>
              <Button onClick={() => setCreditsModalOpen(true)} className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:opacity-90 gap-2">
                <Gift className="w-4 h-4" />
                Send Tip
              </Button>
              <Button onClick={() => setCreditsModalOpen(true)} className="bg-gradient-to-r from-purple-700 to-pink-700 hover:opacity-90 gap-2">
                <Crown className="w-4 h-4" />
                Start VIP Show
              </Button>
              <Button className="bg-white/10 hover:bg-white/20 gap-2">
                <Star className="w-4 h-4" />
                Add to Favorites
              </Button>
            </div>

            {/* Profile Info */}
            <div className="bg-[#2E2249] rounded-xl p-6 mb-6">
              <div className="flex items-start gap-4">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/921920217_46742d8a8895008f0f653ef1027cea0c_erotic_576x324.jpeg"
                  alt="PinkBlonde"
                  className="w-24 h-24 rounded-full object-cover border-4 border-pink-500"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold">PinkBlonde</h1>
                    <div className="flex items-center gap-1 bg-green-600 px-2 py-1 rounded text-xs font-bold">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      ONLINE
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-white/70 mb-3">
                    <span>Age: 21</span>
                    <span>Location: Europe</span>
                    <span>Languages: English</span>
                    <span>Category: Girl</span>
                  </div>
                  <p className="text-sm text-white/80 mb-4">
                    Hey there! I'm your sweet PinkBlonde, here to make your dreams come true 💕 
                    Join me for an unforgettable experience! I love meeting new people and having fun.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-pink-600/30 px-3 py-1 rounded-full text-xs">Blonde</span>
                    <span className="bg-pink-600/30 px-3 py-1 rounded-full text-xs">Natural</span>
                    <span className="bg-pink-600/30 px-3 py-1 rounded-full text-xs">Slim</span>
                    <span className="bg-pink-600/30 px-3 py-1 rounded-full text-xs">HD</span>
                    <span className="bg-pink-600/30 px-3 py-1 rounded-full text-xs">Mobile</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-pink-400 mb-1">$0.99</div>
                  <div className="text-sm text-white/60">per minute</div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-[#2E2249] rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-pink-400 mb-1">12.5K</div>
                <div className="text-xs text-white/60">Followers</div>
              </div>
              <div className="bg-[#2E2249] rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">4.8</div>
                <div className="text-xs text-white/60">Rating</div>
              </div>
              <div className="bg-[#2E2249] rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-1">847</div>
                <div className="text-xs text-white/60">Photos</div>
              </div>
              <div className="bg-[#2E2249] rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">243</div>
                <div className="text-xs text-white/60">Videos</div>
              </div>
            </div>

            {/* Media Gallery */}
            <div className="bg-[#2E2249] rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Photos & Videos</h2>
                <button className="text-sm text-pink-400 hover:text-pink-300 transition-colors">
                  View All
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                {mediaGallery.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => item.isLocked && setCreditsModalOpen(true)}
                    className="relative aspect-[3/4] rounded-lg overflow-hidden group cursor-pointer"
                  >
                    <img
                      src={item.thumbnail}
                      alt="Media"
                      className={`w-full h-full object-cover transition-transform duration-300 ${item.isLocked ? 'blur-md' : 'group-hover:scale-110'}`}
                    />
                    
                    {item.isLocked && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center">
                        <Lock className="w-8 h-8 text-white mb-2" />
                        <span className="text-xs font-medium">Unlock</span>
                      </div>
                    )}
                    
                    {!item.isLocked && item.type === 'video' && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white ml-1">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                        </div>
                      </div>
                    )}
                    
                    {item.type === 'video' && !item.isLocked && (
                      <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs">
                        5:23
                      </div>
                    )}
                  </div>
                ))}
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