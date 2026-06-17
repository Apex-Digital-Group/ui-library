import React from 'react';
import { Heart, Flame, Star, ShoppingBag, Sparkles, BookOpen, Home, Rss, Image, Video, Clock, Users, Calendar, Camera, Menu, X, Sun, Moon, Play, Lock, Shield, Check, MessageCircle } from 'lucide-react';
import KycModal from '../components/KycModal';
import ProfileDropdown from '../components/ProfileDropdown';
import GeminiAI from '../components/GeminiAI';
import RegisterModal from '../components/RegisterModal';
import WelcomeModal from '../components/WelcomeModal';
import CreditsModal from '../components/CreditsModal';
import SignInModal from '../components/SignInModal';
import AccountPendingModal from '../components/AccountPendingModal';
import VoodooShopModal from '../components/VoodooShopModal';
import { createPageUrl } from '@/utils';

const girls = [
  { name: 'Ahri', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/5bbab6525_0a375a0a705a1f1052460dd069d2953f_erotic_576x324.jpeg', viewers: '1.2K' },
  { name: 'Candy Crush', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/cb4bc0b07_1bda7eff495213fc3276fdb20e0cfa72_erotic_576x324.jpeg', viewers: '842' },
  { name: 'Sassy Sarah', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/fc6e5695e_1f76584d5bcc5f95f5fe078d407416f1_erotic_576x324.jpeg', viewers: '679' },
  { name: 'Lola Lollipop', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/5adbdfca7_02ad7aa0108c98fac7ff17b4bb4da429_erotic_576x324.jpeg', viewers: '1.1K' },
  { name: 'Ruby Ravish', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/2ad34be5e_2df005f71d92610399c40e171ae816be_erotic_576x324.jpeg', viewers: '533' },
  { name: 'Kiki Curves', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/accccad24_3cf988944d4f851aa9fb76a68682858c_erotic_576x324.jpeg', viewers: '891' },
  { name: 'Vixen Victoria', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/868fadefc_2b04cab87096b6db71a221078c75d6d2_erotic_576x324.jpeg', viewers: '445' },
  { name: 'Luna Luxe', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/46e088356_3f464eaf5c4d35e56e57b3dd94e05aea_erotic_576x324.jpeg', viewers: '712' },
];

const planFeatures = [
  '24/7 Access to All Live Rooms',
  'Exclusive HD House Streams',
  'Behind the Scenes Content',
  'Members Only Photos & Videos',
  'Priority in Fan Chat',
  'Cancel Anytime',
];

const rooms = [
  { name: 'Main Lounge Live', desc: 'The heart of the house. Non-stop live shows and real-time fun.', live: true, locked: false, image: 'https://media.base44.com/images/public/68f5a0cfe97e644ca7434f9b/f05ddea97_MainLoungeLive.png' },
  { name: 'Poolside Live', desc: 'Bikini vibes, poolside chats and sunset sessions.', live: true, locked: false, image: 'https://media.base44.com/images/public/68f5a0cfe97e644ca7434f9b/b8572d739_Pool-side.png' },
  { name: 'Behind the Scenes', desc: 'Go behind closed doors with exclusive BTS content.', live: false, locked: true, image: 'https://media.base44.com/images/public/68f5a0cfe97e644ca7434f9b/9c7819339_Behind-scenes.png' },
  { name: 'Late Night Chat', desc: 'Intimate late night convos and members only hangouts.', live: false, locked: true, image: 'https://media.base44.com/images/public/68f5a0cfe97e644ca7434f9b/c911dc6dc_LateNightChat.png' },
];

const features = [
  { icon: Clock, title: '24/7 Live Access', desc: 'The house never sleeps. Live rooms online around the clock.' },
  { icon: Star, title: 'Exclusive House Streams', desc: "Premium HD streams and special events you won't find anywhere else." },
  { icon: MessageCircle, title: 'Fan Chat', desc: 'Talk directly with your favorite creators in real time.' },
  { icon: Lock, title: 'Members Only Content', desc: 'Unlock exclusive photos, videos and content made just for members.' },
];

export default function CamHouse() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);
  const [welcomeModalOpen, setWelcomeModalOpen] = React.useState(false);
  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);
  const [creditsModalOpen, setCreditsModalOpen] = React.useState(false);
  const [userType] = React.useState('member');
  const [signInModalOpen, setSignInModalOpen] = React.useState(false);
  const [voodooShopModalOpen, setVoodooShopModalOpen] = React.useState(false);
  const [subscribed, setSubscribed] = React.useState(false);

  const menuItems = [
    { name: 'Companion', icon: Heart },
    { name: 'Dominatrix', icon: Flame },
    { name: 'Interests', icon: Star },
    { name: 'Marketplace', icon: ShoppingBag },
    { name: 'Voodoo Shop', icon: Sparkles },
    { name: 'Blogs', icon: BookOpen },
  ];

  const mainNavItems = [
    { name: 'Home', icon: Home, url: '/' },
    { name: 'Feed', icon: Rss, url: createPageUrl('Feed') },
    { name: 'Photos', icon: Image, url: createPageUrl('Photos') },
    { name: 'Videos', icon: Video, url: createPageUrl('Videos') },
    { name: 'Stories', icon: Clock, url: '#' },
    { name: 'Groups', icon: Users, url: '/groups' },
    { name: 'Events', icon: Calendar, url: '#' },
    { name: 'Fans', icon: Users, url: '#' },
    { name: 'Live Cams', icon: Camera, url: createPageUrl('LiveCams') },
    { name: 'Cam Stars', icon: Star, url: '#' },
  ];

  return (
    <>
      <style>{`
        /* Inter loaded globally via @bond/lib/typography.css — local @import removed. */
        * { box-sizing: border-box; }
        html { overflow-x: hidden; }
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #1a0e2e; margin: 0; padding: 0; overflow-x: hidden; }
        .scroll-container { scrollbar-width: none; -ms-overflow-style: none; }
        .scroll-container::-webkit-scrollbar { display: none; }
        header.ch-header { position: fixed; top: 0; left: 0; right: 0; width: 100%; z-index: 9999; background: #1a0e2e; }
        main.ch-main { padding-top: 140px; }
        @media (max-width: 768px) { main.ch-main { padding-top: 120px; } }
      `}</style>

      <div className="min-h-screen bg-[#1a0e2e] text-white">

        {/* Overlay */}
        {(menuOpen || profileMenuOpen) && (
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => { setMenuOpen(false); setProfileMenuOpen(false); }} />
        )}

        {/* Mobile Slide-out Menu */}
        <div className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-[#2E2249] z-50 shadow-2xl transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`} onClick={e => e.stopPropagation()}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <a href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/b248bfd91_gemini_logo_white.png" alt="Home" className="w-8 h-8 object-contain" />
                <h2 className="text-xl font-bold">LiveGemini</h2>
              </a>
              <button onClick={() => setMenuOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors"><X className="w-6 h-6" /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-6">
              <nav className="space-y-1">
                {mainNavItems.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <a key={i} href={item.url} className="flex items-center gap-4 p-2.5 rounded-lg hover:bg-white/10 transition-colors group" onClick={() => setMenuOpen(false)}>
                      <Icon className="w-4 h-4 text-purple-400 group-hover:text-pink-400 transition-colors" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </a>
                  );
                })}
                <a href="/cam-house" className="flex items-center gap-4 p-2.5 rounded-lg bg-purple-600/20 border border-purple-500/30 group" onClick={() => setMenuOpen(false)}>
                  <span className="text-purple-300 text-sm font-semibold">🏠 Cam House</span>
                </a>
              </nav>
            </div>
            <div className="p-6 border-t border-white/10">
              <button onClick={() => setCreditsModalOpen(true)} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-full text-sm font-medium transition-all">Get Credits</button>
            </div>
          </div>
        </div>

        {/* HEADER */}
        <header className="ch-header">
          <nav className="bg-[#2E2249] border-b border-white/10">
            <div className="px-4 md:px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 md:gap-8">
                  <div className="flex items-center gap-2">
                    <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/b248bfd91_gemini_logo_white.png" alt="LiveGemini Logo" className="w-6 h-6 md:w-8 md:h-8 object-contain flex-shrink-0" />
                  </div>
                  <div className="hidden lg:flex items-center gap-6 text-sm">
                    <a href="/" className="text-white/90 hover:text-white transition-colors">Home</a>
                    <a href={createPageUrl('Feed')} className="text-white/90 hover:text-white transition-colors">Feed</a>
                    <a href={createPageUrl('Photos')} className="text-white/90 hover:text-white transition-colors">Photos</a>
                    <a href={createPageUrl('Videos')} className="text-white/90 hover:text-white transition-colors">Videos</a>
                    <a href="#" className="text-white/90 hover:text-white transition-colors">Stories</a>
                    <a href="/groups" className="text-white/90 hover:text-white transition-colors">Groups</a>
                    <a href="#" className="text-white/90 hover:text-white transition-colors">Events</a>
                    <a href="#" className="text-white/90 hover:text-white transition-colors">Fans</a>
                    <a href={createPageUrl('LiveCams')} className="text-white/90 hover:text-white transition-colors">Live Cams</a>
                    <a href="/cam-house" className="relative font-semibold text-purple-300 hover:text-white transition-colors px-3 py-1 rounded-full"
                      style={{ boxShadow: '0 0 12px rgba(168,85,247,0.6)', background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(168,85,247,0.4)' }}>
                      <span className="absolute inset-0 rounded-full animate-pulse" style={{ boxShadow: '0 0 16px rgba(168,85,247,0.5)' }} />
                      <span className="relative">🏠 Cam House</span>
                    </a>
                    <a href="#" className="text-white/90 hover:text-white transition-colors">Cam Stars</a>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors hidden md:block">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors relative">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors relative">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  <div className="relative z-[55]">
                    <button onClick={e => { e.stopPropagation(); setProfileMenuOpen(!profileMenuOpen); }} className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-purple-500 hover:border-pink-500 transition-colors flex-shrink-0">
                      <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/0794a4326_Screenshot2025-10-20at055030.png" alt="Profile" className="w-full h-full object-cover" />
                    </button>
                    <div className="absolute top-full right-0 mt-2 z-[60]">
                      <ProfileDropdown isOpen={profileMenuOpen} onClose={() => setProfileMenuOpen(false)} />
                    </div>
                  </div>
                  <button onClick={() => setCreditsModalOpen(true)} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-3 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap">Get Credits</button>
                  <button onClick={() => setSignInModalOpen(true)} className="border border-white/30 hover:bg-white/10 px-3 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap">Sign In</button>
                  <button onClick={() => setWelcomeModalOpen(true)} className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 px-3 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap">Join Free</button>
                  <button onClick={e => { e.stopPropagation(); setMenuOpen(!menuOpen); }} className="p-2 rounded-lg transition-colors lg:hidden hover:bg-white/10 text-white">
                    <Menu className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </nav>
          {/* Secondary Menu */}
          <div className="bg-[#251a3a] border-b border-white/10">
            <div className="overflow-x-auto scroll-container">
              <div className="flex items-center gap-2 px-4 md:px-6 py-3 min-w-max">
                {menuItems.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <button key={i} onClick={() => item.name === 'Voodoo Shop' && setVoodooShopModalOpen(true)}
                      className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full transition-all whitespace-nowrap text-sm bg-white/5 hover:bg-white/10 text-white">
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="ch-main">

          {/* ── HERO ── */}
          <section className="relative overflow-hidden bg-[#0d0820]">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-blue-900/20 pointer-events-none" />
            <div className="relative max-w-[1400px] mx-auto px-4 md:px-8 py-10 md:py-16 grid lg:grid-cols-[380px_1fr_300px] gap-6 items-start">

              {/* Left: Copy */}
              <div className="space-y-5 self-center">
                <div className="text-xs font-bold tracking-widest text-purple-400 uppercase">Live. Exclusive. 24/7.</div>
                <h1 className="text-4xl md:text-5xl font-black leading-tight">
                  Step Inside<br />
                  <span className="text-4xl md:text-5xl font-black italic" style={{ background: 'linear-gradient(135deg, #a78bfa, #60a5fa, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Cam House
                  </span>
                </h1>
                <p className="text-white/60 text-sm leading-relaxed">
                  Your all-access pass to the most exciting creators, live around the clock. Join now for exclusive live rooms, behind the scenes content, and a 24/7 house experience like no other.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => setSubscribed(true)}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', boxShadow: '0 0 24px rgba(124,58,237,0.5)' }}>
                    <Star className="w-4 h-4" /> Get Monthly Access
                  </button>
                  <button className="flex items-center gap-2 px-5 py-3 border border-white/20 hover:bg-white/10 rounded-xl font-medium text-sm transition-all">
                    <Play className="w-4 h-4" /> View Live Preview
                  </button>
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-white/40">
                  <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Secure & Private</span>
                  <span className="flex items-center gap-1"><Check className="w-3 h-3" /> Cancel Anytime</span>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" /> Thousands of Members</span>
                </div>
              </div>

              {/* Centre: Live Grid — matches screenshot 2-col layout */}
              <div className="grid grid-cols-2 gap-3">
                {/* Large top-left */}
                <div className="relative rounded-2xl overflow-hidden row-span-2 group cursor-pointer" style={{ aspectRatio: '3/4' }}>
                  <img src={girls[0].image} alt={girls[0].name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-600 px-2 py-0.5 rounded text-xs font-bold">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> LIVE
                  </div>
                  <div className="absolute bottom-2 right-2 text-xs text-white/80 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">👁 {girls[0].viewers}</div>
                </div>
                {/* Top-right */}
                <div className="relative rounded-2xl overflow-hidden group cursor-pointer" style={{ aspectRatio: '4/3' }}>
                  <img src={girls[1].image} alt={girls[1].name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-600 px-2 py-0.5 rounded text-xs font-bold">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> LIVE
                  </div>
                  <div className="absolute bottom-2 right-2 text-xs text-white/80 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">👁 {girls[1].viewers}</div>
                </div>
                {/* Bottom-right */}
                <div className="relative rounded-2xl overflow-hidden group cursor-pointer" style={{ aspectRatio: '4/3' }}>
                  <img src={girls[2].image} alt={girls[2].name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-600 px-2 py-0.5 rounded text-xs font-bold">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> LIVE
                  </div>
                  <div className="absolute bottom-2 right-2 text-xs text-white/80 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">👁 {girls[2].viewers}</div>
                </div>
                {/* Bottom row spanning both columns — 3 small side by side */}
                <div className="col-span-2 grid grid-cols-3 gap-3">
                  {girls.slice(3, 6).map((g, i) => (
                    <div key={i} className="relative rounded-2xl overflow-hidden group cursor-pointer" style={{ aspectRatio: '3/4' }}>
                      <img src={g.image} alt={g.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-600 px-1.5 py-0.5 rounded text-xs font-bold">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> LIVE
                      </div>
                      <div className="absolute bottom-2 right-1 text-xs text-white/80 bg-black/40 backdrop-blur-sm px-1.5 py-0.5 rounded-full">👁 {g.viewers}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Pricing Card */}
              <div className="bg-[#0d0920] border border-purple-500/30 rounded-2xl p-6 space-y-5 self-start"
                style={{ boxShadow: '0 0 40px rgba(139,92,246,0.15)' }}>
                <div className="text-center">
                  <div className="text-xs font-bold tracking-widest text-purple-400 uppercase mb-1">Monthly Plan</div>
                  <div className="text-base font-bold text-white">Monthly Access</div>
                  <div className="mt-2">
                    <span className="text-4xl font-black text-white">£29.99</span>
                    <span className="text-white/50 text-sm">/month</span>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {planFeatures.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-white/80">
                      <Check className="w-4 h-4 text-purple-400 flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => setSubscribed(true)}
                  className="w-full py-3 rounded-xl font-bold text-sm transition-all"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', boxShadow: '0 0 20px rgba(124,58,237,0.4)' }}>
                  {subscribed ? '✓ Subscribed!' : 'Get Monthly Access'}
                </button>
                <div className="flex items-center justify-center gap-1 text-xs text-white/40">
                  <Shield className="w-3 h-3" /> Secure Checkout
                </div>
              </div>
            </div>
          </section>

          {/* ── WHAT'S INSIDE ── */}
          <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
            <div className="text-center mb-8">
              <span className="text-xs font-bold tracking-widest text-purple-400 uppercase">What's Inside Cam House</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {rooms.map((room, i) => (
                <div key={i} className="relative rounded-2xl overflow-hidden group cursor-pointer" style={{ aspectRatio: '3/4' }}>
                  <img src={room.image} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  {room.live && (
                    <div className="absolute top-3 left-3 flex items-center gap-1 bg-red-600 px-2 py-0.5 rounded text-xs font-bold">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> LIVE
                    </div>
                  )}
                  {room.locked && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Lock className="w-10 h-10 text-white/50" />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-bold text-white text-base mb-1">{room.name}</h3>
                    <p className="text-xs text-white/60 mb-3">{room.desc}</p>
                    {room.locked && (
                      <span className="text-xs border border-white/30 px-3 py-1 rounded-full text-white/60">MEMBERS ONLY</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── FEATURES BAR ── */}
          <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 border-t border-white/10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 py-6">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={i} className="flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 rounded-full border border-purple-500/40 bg-purple-500/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm mb-1">{f.title}</div>
                      <div className="text-xs text-white/50 leading-relaxed">{f.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── CTA BANNER ── */}
          <section className="mx-4 md:mx-8 mb-12 rounded-2xl overflow-hidden relative">
            <img src={girls[7].image} alt="CamHouse" className="absolute inset-0 w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(88,28,135,0.85), rgba(30,58,138,0.85))' }} />
            <div className="absolute inset-0 rounded-2xl border border-purple-500/30" style={{ boxShadow: '0 0 60px rgba(139,92,246,0.2), inset 0 0 40px rgba(139,92,246,0.05)' }} />
            <div className="relative z-10 text-center py-14 px-6 space-y-4">
              <h2 className="text-3xl md:text-4xl font-black text-white">Unlock the Full Cam House Experience</h2>
              <p className="text-white/60 text-sm">One subscription. Unlimited access. Join thousands of members inside.</p>
              <button onClick={() => setSubscribed(true)}
                className="px-8 py-3.5 rounded-full font-bold text-sm transition-all inline-flex items-center gap-2"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', boxShadow: '0 0 30px rgba(124,58,237,0.5)' }}>
                {subscribed ? '✓ You\'re In!' : 'Get Monthly Access →'}
              </button>
              <div className="text-xs text-white/30 flex items-center justify-center gap-1">
                <Shield className="w-3 h-3" /> Cancel anytime. Secure & private.
              </div>
            </div>
          </section>

        </main>

        {/* FOOTER */}
        <footer className="bg-[#2E2249] border-t border-white/10 py-12 px-6 mt-4">
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
                <select className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm w-full hover:bg-white/15 transition-colors cursor-pointer text-white">
                  <option>English</option>
                  <option>Español</option>
                  <option>Français</option>
                  <option>Deutsch</option>
                  <option>Italiano</option>
                </select>
              </div>
            </div>
            <div className="text-center text-sm text-white/50 pt-8 border-t border-white/10">
              <p>© 2025 Live Gemini. All Rights Reserved.</p>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6">
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/c51fb3398_icra-logo-CvEUY-qz.jpg" alt="ICRA" className="h-8 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/b2e278942_rta-logo-BuVza8AD.jpg" alt="RTA" className="h-8 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/36071e0b3_asacp-logo-BKJALCQV.jpg" alt="ASACP" className="h-8 object-contain opacity-80 hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </footer>

        <AccountPendingModal />
        <KycModal />
        <WelcomeModal isOpen={welcomeModalOpen} onClose={() => setWelcomeModalOpen(false)} onSelectType={() => { setWelcomeModalOpen(false); setRegisterModalOpen(true); }} />
        <RegisterModal isOpen={registerModalOpen} onClose={() => setRegisterModalOpen(false)} userType={userType} />
        <CreditsModal isOpen={creditsModalOpen} onClose={() => setCreditsModalOpen(false)} />
        <SignInModal isOpen={signInModalOpen} onClose={() => setSignInModalOpen(false)} />
        <VoodooShopModal isOpen={voodooShopModalOpen} onClose={() => setVoodooShopModalOpen(false)} />
        <GeminiAI />
      </div>
    </>
  );
}