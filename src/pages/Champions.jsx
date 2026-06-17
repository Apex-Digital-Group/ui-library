import React from 'react';
import { Heart, Flame, Star, ShoppingBag, Sparkles, BookOpen, Home, Rss, Image, Video, Clock, Users, Calendar, Camera, Menu, X, Sun, Moon } from 'lucide-react';
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

export default function Champions() {
  const [activeSection, setActiveSection] = React.useState('fans');
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(true); // Renamed for consistency
  const [welcomeModalOpen, setWelcomeModalOpen] = React.useState(false);
  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);
  const [creditsModalOpen, setCreditsModalOpen] = React.useState(false);
  const [userType, setUserType] = React.useState('member');
  const [signInModalOpen, setSignInModalOpen] = React.useState(false);
  const [voodooShopModalOpen, setVoodooShopModalOpen] = React.useState(false);
  const [hoveredFan, setHoveredFan] = React.useState(null); // New state for tracking hovered fan for video autoplay
  const [hoveredCam, setHoveredCam] = React.useState(null); // New state for tracking hovered cam for video autoplay
  const [visibleCards, setVisibleCards] = React.useState(new Set()); // New state for tracking visible cards for mobile autoplay
  const fansScrollRef = React.useRef(null);
  const isHoveringFans = React.useRef(false);

  React.useEffect(() => {
    const scrollContainer = fansScrollRef.current;
    if (!scrollContainer) return;

    const intervalId = setInterval(() => {
      if (isHoveringFans.current) return;

      // Determine card width based on current screen size (matching Tailwind classes)
      const cardWidth = window.innerWidth < 768 ? 300 : 400; // 300px for mobile, 400px for md and up
      const gap = 16; // gap-4 is 16px

      if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 10) {
        // If near the end, reset to beginning
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Scroll by one card width + gap
        scrollContainer.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
      }
    }, 3000); // Scroll every 3 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  // Intersection Observer for mobile viewport detection
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardId = entry.target.getAttribute('data-card-id');
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set([...prev, cardId]));
          } else {
            setVisibleCards(prev => {
              const newSet = new Set(prev);
              newSet.delete(cardId);
              return newSet;
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    const cards = document.querySelectorAll('[data-card-id]');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const scrollSection = (sectionId, direction) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Determine card width based on sectionId for consistent manual scrolling
      let scrollAmount = 400; // Default for fans
      if (sectionId === 'fans-scroll') {
        scrollAmount = window.innerWidth < 768 ? 300 : 400;
      } else if (sectionId === 'cams-scroll') {
        scrollAmount = 200; // w-[200px]
      } else if (sectionId === 'videos-scroll') {
        scrollAmount = 280; // w-[280px]
      } else if (sectionId === 'galleries-scroll') {
        scrollAmount = 240; // w-[240px]
      } else if (sectionId === 'products-scroll') {
        scrollAmount = 240; // w-[240px] - UPDATED
      }

      scrollAmount = direction === 'left' ? -(scrollAmount + 16) : scrollAmount + 16; // Add gap-4 (16px)

      section.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const menuItems = [
  { name: 'Companion', icon: Heart },
  { name: 'Dominatrix', icon: Flame },
  { name: 'Interests', icon: Star },
  { name: 'Marketplace', icon: ShoppingBag },
  { name: 'Voodoo Shop', icon: Sparkles },
  { name: 'Blogs', icon: BookOpen }];

  const StarIcon = Star; // Alias Star as StarIcon for mainNavItems

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
  { name: 'Cam Stars', icon: StarIcon, url: '#' }];

  const champions = [
  { name: 'Ahri', title: 'The Nine-Tailed Fox', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/5bbab6525_0a375a0a705a1f1052460dd069d2953f_erotic_576x324.jpeg', credits: 100, online: true },
  { name: 'Candy Crush', title: 'Sweet Temptation', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/cb4bc0b07_1bda7eff495213fc3276fdb20e0cfa72_erotic_576x324.jpeg', credits: 150, online: true },
  { name: 'Naughty Natasha', title: 'The Playful One', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/2e0ba5e86_1d9d1209acd6526158ccd1ba9d6753cd_erotic_576x324.jpeg', credits: 120, online: false },
  { name: 'Sassy Sarah', title: 'Full of Surprises', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/fc6e5695e_1f76584d5bcc5f95f5fe078d407416f1_erotic_576x324.jpeg', credits: 200, online: true },
  { name: 'Lola Lollipop', title: 'Eye Candy', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/5adbdfca7_02ad7aa0108c98fac7ff17b4bb4da429_erotic_576x324.jpeg', credits: 180, online: true },
  { name: 'Vixen Victoria', title: 'The Enchantress', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/868fadefc_2b04cab87096b6db71a221078c75d6d2_erotic_576x324.jpeg', credits: 90, online: true },
  { name: 'Bella Bombshell', title: 'Pure Fire', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/df70ae66f_2cde84c396bc0995741d005b75d4fa43_erotic_576x324.jpeg', credits: 140, online: false },
  { name: 'Misty Mischief', title: 'Trouble Maker', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/1f40724e2_2db87992bb845f854f53fa8117d7cdb3_erotic_576x324.jpeg', credits: 110, online: true },
  { name: 'Ruby Ravish', title: 'Red Hot', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/2ad34be5e_2df005f71d92610399c40e171ae816be_erotic_576x324.jpeg', credits: 130, online: true },
  { name: 'Peaches Paradise', title: 'Juicy & Sweet', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/1f4cbbace_3a1f5fb962cd52fe63acd6e753085fa7_erotic_576x324.jpeg', credits: 165, online: false },
  { name: 'Kiki Curves', title: 'Dangerously Hot', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/accccad24_3cf988944d4f851aa9fb76a68682858c_erotic_576x324.jpeg', credits: 195, online: true },
  { name: 'Scarlett Sin', title: 'The Seductress', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/efb8651b9_3d86f4a25c11d28c4f34674864e750c9_erotic_576x324.jpeg', credits: 105, online: true },
  { name: 'Ginger Spice', title: 'Hot & Sassy', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/72315c7c0_3e26e44247cd2dd94440cf25737147de_erotic_576x324.jpeg', credits: 125, online: false },
  { name: 'Diva Diamond', title: 'Precious & Rare', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/b945b2292_3e53c33383a0623d312d97afb9f7ed15_erotic_576x324.jpeg', credits: 185, online: true },
  { name: 'Luna Luxe', title: 'Midnight Magic', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/46e088356_3f464eaf5c4d35e56e57b3dd94e05aea_erotic_576x324.jpeg', credits: 155, online: true },
  { name: 'Angel Aphrodite', title: 'Heavenly Body', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/61bc58b23_3fdf753de38e4e80cea508ab49037c9c_erotic_576x324.jpeg', credits: 170, online: false },
  { name: 'Eva Elegance', title: 'Timeless Beauty', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/cb4bc0b07_1bda7eff495213fc3276fdb20e0cfa72_erotic_576x324.jpeg', credits: 145, online: false },
  { name: 'Ivy Venom', title: 'Toxic Kiss', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/2e0ba5e86_1d9d1209acd6526158ccd1ba9d6753cd_erotic_576x324.jpeg', credits: 175, online: true },
  { name: 'Chloe Charm', title: 'Sweet & Spicy', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/fc6e5695e_1f76584d5bcc5f95f5fe078d407416f1_erotic_576x324.jpeg', credits: 115, online: true },
  { name: 'Zoe Zenith', title: 'Peak Performance', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/5adbdfca7_02ad7aa0108c98fac7ff17b4bb4da429_erotic_576x324.jpeg', credits: 190, online: false },
  { name: 'Fiona Fire', title: 'Burning Desire', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/868fadefc_2b04cab87096b6db71a221078c75d6d2_erotic_576x324.jpeg', credits: 160, online: true },
  { name: 'Gia Gemstone', title: 'A Rare Find', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/df70ae66f_2cde84c396bc0995741d005b75d4fa43_erotic_576x324.jpeg', credits: 210, online: true },
  { name: 'Heidi Honey', title: 'Sweet as Can Be', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/1f40724e2_2db87992bb845f854f53fa8117d7cdb3_erotic_576x324.jpeg', credits: 135, online: false },
  { name: 'Jasmine Jewel', title: 'Precious Moments', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/2ad34be5e_2df005f71d92610399c40e171ae816be_erotic_576x324.jpeg', credits: 125, online: true },
  { name: 'Nina Nightfall', title: 'Secrets of the Dark', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/1f4cbbace_3a1f5fb962cd52fe63acd6e753085fa7_erotic_576x324.jpeg', credits: 150, online: false },
  { name: 'Olivia Opal', title: 'Shimmering Mystery', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/accccad24_3cf988944d4f851aa9fb76a68682858c_erotic_576x324.jpeg', credits: 180, online: true },
  ];

  const products = [
    { name: 'YesX YX864 Fishnet Sparkly Bodystocking', category: 'Clubwear', brand: 'YesX', price: '$29.99', status: 'In Stock', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/37682d239_YX864_studio2.png' },
    { name: 'Black Secret BS132 Crotchless Tights', category: 'Bedroom Wear', brand: 'Black Secret', price: '$14.99', status: 'In Stock', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/5df774a67_ART-BS132-C.jpg' },
    { name: 'Black Secret BS131 Crotchless Tights', category: 'Hosiery', brand: 'Black Secret', price: '$13.99', status: 'In Stock', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/411c222fd_ART-BS131-C.jpg' },
    { name: 'Beauty Night BN6735 Monserrat', category: 'Bedroom Wear', brand: 'Beauty Night', price: '$39.99', status: 'In Stock', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/9384b168a_BN6735_2.jpg' },
    { name: 'Ballerina 583 Ivory Tights', category: 'Bridal', brand: 'Ballerina', price: '$16.99', status: 'In Stock', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/78a455df2_ballerina_583-8-ivory.jpg' },
    { name: 'Black Secret BS114 Hold Ups', category: 'Hosiery', brand: 'Black Secret', price: '$11.99', status: 'In Stock', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/220238672_BS114_bw.jpg' },
    { name: 'Black Secret BS102 Crotchless Tights', category: 'Bedroom Wear', brand: 'Black Secret', price: '$13.49', status: 'In Stock', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/7fd519ede_BS102_W2.jpg' },
    { name: 'Black Secret BS101 Crotchless Tights', category: 'Bedroom Wear', brand: 'Black Secret', price: '$12.99', status: 'In Stock', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/dcb994eb4_BS101_W1.jpg' },
    { name: 'YesX YX830Q Blue Bra Set', category: 'Plus Sizes', brand: 'YesX', price: '$34.99', status: 'In Stock', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/37801cb03_yx830Q_11.jpg' },
    { name: 'YesX YX822Q Plus Size Hearts & Handcuffs!', category: 'Bedroom Wear', brand: 'YesX', price: '$36.99', status: 'In Stock', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/7144bbd13_YX822Q_11.jpg' },
  ];

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <>
      <style>{`
        /* Inter loaded globally via @bond/lib/typography.css — local @import removed. */

        * {
          box-sizing: border-box;
        }

        html {
          overflow-x: hidden;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: #1a0e2e;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        .scroll-container {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .scroll-container::-webkit-scrollbar {
          display: none;
        }

        @keyframes pulse-online {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .video-transition {
          transition: opacity 0.4s ease-in-out;
        }

        .video-transition.fade-in {
          opacity: 1;
        }

        .video-transition.fade-out {
          opacity: 0;
        }

        /* Fixed sticky header */
        header.fixed-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          z-index: 9999;
          background: #1a0e2e;
        }

        /* Add padding to main content to prevent it from going under the header */
        main.main-content {
          padding-top: 140px; /* Adjust based on actual header height */
        }

        @media (max-width: 768px) {
          main.main-content {
            padding-top: 120px; /* Adjust for mobile header height */
          }
        }
      `}</style>

      <div className={`min-h-screen ${darkMode ? 'bg-[#1a0e2e] text-white' : 'bg-gray-50 text-gray-900'}`}>
        {/* Overlay for closing menus */}
        {(menuOpen || profileMenuOpen) &&
          <div
            className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
            onClick={() => {
              setMenuOpen(false);
              setProfileMenuOpen(false);
            }}
          />
        }

        {/* Slide-out Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-[#2E2249] z-50 shadow-2xl transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'}`
          }
          onClick={(e) => e.stopPropagation()}
        >

          <div className="flex flex-col h-full">
              {/* Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <a href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                  <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/b248bfd91_gemini_logo_white.png" alt="Home" className="w-8 h-8 object-contain" />
                  <h2 className="text-xl font-bold">LiveGemini</h2>
                </a>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors">

                  <X className="w-6 h-6" />
                </button>
              </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto px-6">
              <nav className="space-y-1">
                {mainNavItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={index}
                      href={item.url}
                      className="flex items-center gap-4 p-2.5 rounded-lg hover:bg-white/10 transition-colors group"
                      onClick={() => setMenuOpen(false)}>

                      <Icon className="w-4 h-4 text-purple-400 group-hover:text-pink-400 transition-colors" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </a>);

                })}
              </nav>
            </div>

            {/* Menu Footer */}
            <div className="p-6 border-t border-white/10">
              <button onClick={() => setCreditsModalOpen(true)} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-full text-sm font-medium transition-all">
                Get Credits
              </button>
            </div>
          </div>
        </div>
        
        <header className="fixed-header">
            {/* Top Navigation Bar */}
            <nav className={`${darkMode ? 'bg-[#2E2249] border-white/10' : 'bg-white border-gray-200'} border-b`}>
              <div className="px-4 md:px-6 py-3">
                <div className="flex items-center justify-between">
                  {/* Left: Logo & Main Navigation */}
                  <div className="flex items-center gap-4 md:gap-8">
                    <div className="flex items-center gap-2 md:gap-3">
                      <img
                      src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/b248bfd91_gemini_logo_white.png"
                      alt="LiveGemini Logo"
                      className={`w-6 h-6 md:w-8 md:h-8 object-contain flex-shrink-0 ${!darkMode ? 'invert' : ''}`} />


                    </div>
                    
                    <div className="hidden lg:flex items-center gap-6 text-sm">
                      <a href="/" className={`${darkMode ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>Home</a>
                      <a href={createPageUrl('Feed')} className={`${darkMode ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>Feed</a>
                      <a href={createPageUrl('Photos')} className={`${darkMode ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>Photos</a>
                      <a href={createPageUrl('Videos')} className={`${darkMode ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>Videos</a>
                      <a href="#" className={`${darkMode ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>Stories</a>
                      <a href="/groups" className={`${darkMode ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>Groups</a>
                      <a href="#" className={`${darkMode ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>Events</a>
                      <a href="#" className={`${darkMode ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>Fans</a>
                      <a href={createPageUrl('LiveCams')} className={`${darkMode ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>Live Cams</a>
                      <a href="/cam-house" className="relative font-semibold text-purple-300 hover:text-white transition-colors px-3 py-1 rounded-full"
                        style={{ boxShadow: '0 0 12px rgba(168,85,247,0.6)', background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(168,85,247,0.4)' }}>
                        <span className="absolute inset-0 rounded-full animate-pulse" style={{ boxShadow: '0 0 16px rgba(168,85,247,0.5)' }} />
                        <span className="relative">🏠 Cam House</span>
                      </a>
                      <a href="#" className={`${darkMode ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>Cam Stars</a>
                    </div>
                  </div>

                  {/* Right: Utility Icons */}
                  <div className="flex items-center gap-2 md:gap-4">
                    <button 
                      onClick={() => setDarkMode(!darkMode)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors hidden md:block"
                    >
                      {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors hidden md:block">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                      </svg>
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors relative">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </svg>
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors relative">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                      </svg>
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <div className="relative z-[55]">
                      <button 
                        onClick={(e) => {
                           e.stopPropagation();
                           setProfileMenuOpen(!profileMenuOpen);
                        }}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-purple-500 hover:border-pink-500 transition-colors flex-shrink-0"
                      >
                        <img
                          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/0794a4326_Screenshot2025-10-20at055030.png"
                          alt="Profile"
                          className="w-full h-full object-cover" />
                      </button>
                      <div className="absolute top-full right-0 mt-2 z-[60]">
                        <ProfileDropdown isOpen={profileMenuOpen} onClose={() => setProfileMenuOpen(false)} />
                      </div>
                    </div>
                    <button onClick={() => setCreditsModalOpen(true)} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-3 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap">
                      Get Credits
                    </button>
                    <button 
                      onClick={() => setSignInModalOpen(true)}
                      className="border border-white/30 hover:bg-white/10 px-3 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap"
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={() => setWelcomeModalOpen(true)}
                      className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 px-3 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap"
                    >
                      Join Free
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(!menuOpen)
                      }}
                      className={`p-2 rounded-lg transition-colors lg:hidden ${darkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-200 text-gray-900'}`}
                      >
                      <Menu className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </nav>

            {/* Secondary Menu */}
            <div className={`${darkMode ? 'bg-[#251a3a] border-white/10' : 'bg-gray-100 border-gray-200'} border-b`}>
              <div className="overflow-x-auto scroll-container">
                <div className="flex items-center gap-2 px-4 md:px-6 py-3 min-w-max">
                  {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => item.name === 'Voodoo Shop' && setVoodooShopModalOpen(true)}
                      className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-full transition-all whitespace-nowrap text-sm ${darkMode ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'}`}>

                        <Icon className="w-4 h-4" />
                        <span className="font-medium">{item.name}</span>
                      </button>);

                })}
                </div>
              </div>
            </div>
        </header>

        {/* Main Content */}
        <main className="main-content relative z-10">
            <div className="px-4 md:px-6 py-6 md:py-8">
            {/* Featured Fans Section */}
            <div className="mb-12">
                <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Featured Fans</h2>
                <div
                className="relative group"
                onMouseEnter={() => isHoveringFans.current = true}
                onMouseLeave={() => isHoveringFans.current = false}>

                <button
                  onClick={() => scrollSection('fans-scroll', 'left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/10 backdrop-blur-xl hover:bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6"></path>
                    </svg>
                </button>
                
                <div id="fans-scroll" ref={fansScrollRef} className="flex gap-4 overflow-x-auto scroll-container pb-4">
                    {champions.map((champion, index) => {
                      const shouldShowVideo = (champion.name === 'Ahri' || champion.name === 'Candy Crush' || champion.name === 'Sassy Sarah' || champion.name === 'Lola Lollipop') && 
                                             (hoveredFan === champion.name || (isMobile && visibleCards.has(`fan-${champion.name}`)));
                      const videoUrl = champion.name === 'Ahri' 
                        ? 'https://vco.bonddemo.co.uk/wp-content/uploads/2026/02/lg1.mp4'
                        : champion.name === 'Candy Crush'
                            ? 'https://vco.bonddemo.co.uk/wp-content/uploads/2026/02/lg3.mp4'
                            : champion.name === 'Sassy Sarah'
                                ? 'https://vco.bonddemo.co.uk/wp-content/uploads/2026/02/lg4.mp4'
                                : champion.name === 'Lola Lollipop'
                                    ? 'https://vco.bonddemo.co.uk/wp-content/uploads/2026/02/lg5.mp4'
                                    : '';
                      
                      let profileUrl = '#';
                      if (champion.name === 'Ahri') {
                        profileUrl = createPageUrl('AhriProfile');
                      } else if (champion.name === 'Candy Crush') {
                        profileUrl = createPageUrl('CandyCrushProfile');
                      } else if (champion.name === 'Naughty Natasha') {
                        profileUrl = createPageUrl('NaughtyNatashaProfile');
                      } else if (champion.name === 'Sassy Sarah') {
                        profileUrl = createPageUrl('SassySarahProfile');
                      } else if (champion.name === 'Lola Lollipop') {
                        profileUrl = createPageUrl('LolaLollipopProfile');
                      } else if (champion.name === 'Vixen Victoria') {
                        profileUrl = createPageUrl('VixenVictoriaProfile');
                      } else if (champion.name === 'Bella Bombshell') {
                        profileUrl = createPageUrl('BellaBombshellProfile');
                      } else if (champion.name === 'Misty Mischief') {
                        profileUrl = createPageUrl('MistyMischiefProfile');
                      } else if (champion.name === 'Ruby Ravish') {
                        profileUrl = createPageUrl('RubyRavishProfile');
                      } else if (champion.name === 'Peaches Paradise') {
                        profileUrl = createPageUrl('PeachesParadiseProfile');
                      } else if (champion.name === 'Kiki Curves') {
                        profileUrl = createPageUrl('KikiCurvesProfile');
                      } else if (champion.name === 'Scarlett Sin') {
                        profileUrl = createPageUrl('ScarlettSinProfile');
                      } else if (champion.name === 'Ginger Spice') {
                        profileUrl = createPageUrl('GingerSpiceProfile');
                      } else if (champion.name === 'Diva Diamond') {
                        profileUrl = createPageUrl('DivaDiamondProfile');
                      } else if (champion.name === 'Luna Luxe') {
                        profileUrl = createPageUrl('LunaLuxeProfile');
                      } else if (champion.name === 'Angel Aphrodite') {
                        profileUrl = createPageUrl('AngelAphroditeProfile');
                      } else if (champion.name === 'Eva Elegance') {
                        profileUrl = createPageUrl('EvaEleganceProfile');
                      } else if (champion.name === 'Ivy Venom') {
                        profileUrl = createPageUrl('IvyVenomProfile');
                      } else if (champion.name === 'Chloe Charm') {
                        profileUrl = createPageUrl('ChloeCharmProfile');
                      } else if (champion.name === 'Zoe Zenith') {
                        profileUrl = createPageUrl('ZoeZenithProfile');
                      } else if (champion.name === 'Fiona Fire') {
                        profileUrl = createPageUrl('FionaFireProfile');
                      } else if (champion.name === 'Gia Gemstone') {
                        profileUrl = createPageUrl('GiaGemstoneProfile');
                      } else if (champion.name === 'Heidi Honey') {
                        profileUrl = createPageUrl('HeidiHoneyProfile');
                      } else if (champion.name === 'Jasmine Jewel') {
                        profileUrl = createPageUrl('JasmineJewelProfile');
                      } else if (champion.name === 'Nina Nightfall') {
                        profileUrl = createPageUrl('NinaNightfallProfile');
                      } else if (champion.name === 'Olivia Opal') {
                        profileUrl = createPageUrl('OliviaOpalProfile');
                      }
                      
                      return (
                        <a 
                          key={`fan-${index}`}
                          href={profileUrl}
                          data-card-id={`fan-${champion.name}`}
                          className="flex-shrink-0 w-[300px] md:w-[400px] group/card cursor-pointer"
                          onMouseEnter={() => setHoveredFan(champion.name)}
                          onMouseLeave={() => setHoveredFan(null)}
                        >
                          <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-[#2E2249]">
                            <img 
                              src={champion.image} 
                              alt={champion.name} 
                              className={`w-full h-full object-cover transition-all duration-500 ${shouldShowVideo ? 'opacity-0' : 'opacity-100 group-hover/card:scale-110'}`}
                            />
                            {shouldShowVideo && (
                              <video
                                src={videoUrl}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover video-transition fade-in"
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                            {champion.online && (
                              <div className="absolute top-3 right-3 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <h3 className="font-semibold text-white text-lg mb-1">{champion.name}</h3>
                              <p className="text-sm text-white/70">{champion.title}</p>
                            </div>
                          </div>
                        </a>
                      );
                    })}
                </div>

                <button
                  onClick={() => scrollSection('fans-scroll', 'right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/10 backdrop-blur-xl hover:bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"></path>
                    </svg>
                </button>
                </div>
            </div>

            {/* Featured Cams Section */}
            <div className="mb-12">
                <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Featured Cams</h2>
                <div className="relative group">
                <button
                  onClick={() => scrollSection('cams-scroll', 'left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/10 backdrop-blur-xl hover:bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6"></path>
                    </svg>
                </button>
                
                <div id="cams-scroll" className="flex gap-4 overflow-x-auto scroll-container pb-4">
                    {champions.slice().reverse().map((champion, index) => {
                      const shouldShowVideo = champion.name === 'Olivia Opal' && (hoveredCam === 'Olivia Opal' || (isMobile && visibleCards.has(`cam-${champion.name}`)));
                      return (
                        <div 
                          key={`cam-${index}`}
                          data-card-id={`cam-${champion.name}`}
                          className="flex-shrink-0 w-[200px] group/card cursor-pointer"
                          onMouseEnter={() => setHoveredCam(champion.name)}
                          onMouseLeave={() => setHoveredCam(null)}
                        >
                          <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-[#2E2249]">
                            <img 
                              src={champion.image} 
                              alt={champion.name} 
                              className={`w-full h-full object-cover transition-all duration-500 ${shouldShowVideo ? 'opacity-0' : 'opacity-100 group-hover/card:scale-110'}`}
                            />
                            {shouldShowVideo && (
                              <video
                                src="https://vco.bonddemo.co.uk/wp-content/uploads/2026/02/lg2.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover video-transition fade-in"
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                            {champion.online && (
                              <div className="absolute top-3 left-3 bg-red-600 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                                <span className="w-2 h-2 bg-white rounded-full" style={{ animation: 'pulse-online 2s ease-in-out infinite' }}></span>
                                LIVE
                              </div>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
                                <h3 className="font-semibold text-white text-sm">{champion.name}</h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>

                <button
                  onClick={() => scrollSection('cams-scroll', 'right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/10 backdrop-blur-xl hover:bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"></path>
                    </svg>
                </button>
                </div>
            </div>

            {/* Featured Videos Section */}
            <div className="mb-12">
                <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Featured Videos</h2>
                <div className="relative group">
                <button
                  onClick={() => scrollSection('videos-scroll', 'left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/10 backdrop-blur-xl hover:bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6"></path>
                    </svg>
                </button>

                <div id="videos-scroll" className="flex gap-4 overflow-x-auto scroll-container pb-4">
                    {[
                      { ...champions[0], badge: 'NEW' },
                      { ...champions[1], badge: '50% OFF', badgeColor: 'bg-green-600/80' },
                      { ...champions[3], badge: 'NEW' },
                      { name: 'RedheadRebel', title: 'Fiery & Wild', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/96c6f6c32_0f0206fc707fdec71477d2b362b3a3a3_erotic_576x324.jpeg', credits: 140, badge: 'HOT' },
                      { name: 'TanGoddess', title: 'Sun Kissed', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/39935ead1_b31d2ad6612a99c66882dbe414bf03f8_erotic_576x324.jpeg', credits: 160, badge: '50% OFF', badgeColor: 'bg-green-600/80' },
                      { name: 'PurpleDiva', title: 'Luxury & Style', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/435835c92_2d70587b96e47872447ab29f8bd5ccee_erotic_576x324.jpeg', credits: 190, badge: 'VIP' },
                      { name: 'GoldenGoddess', title: 'Pure Elegance', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/09812f20a_c5a840ab47dac375d7abe137a448119b_erotic_576x324.jpeg', credits: 150, badge: '50% OFF', badgeColor: 'bg-green-600/80' },
                      { name: 'LeatherLuxe', title: 'Fetish Fantasy', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/60fdc1777_18e911aa48983a91768b1fe63aeb43c7_erotic_576x324.jpeg', credits: 125, badge: 'NEW' },
                      { name: 'RosyRomance', title: 'Sweet Dreams', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/91ebe5880_0bed47b1cd5a698d3e7bd99f50d492cf_erotic_576x324.jpeg', credits: 135, badge: 'HOT' },
                      { name: 'PinkDreams', title: 'Bedroom Eyes', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/fde95f6ef_bb5f5f4c4b09f898e8d6ee000b317d37_erotic_576x324.jpeg', credits: 145, badge: '50% OFF', badgeColor: 'bg-green-600/80' },
                      { name: 'RedCarpet', title: 'Glamorous Star', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/94705d444_4ea0997bc4db19787346d25f156c557b_erotic_576x324.jpeg', credits: 175, badge: 'VIP' }
                    ].map((video, index) =>
                  <div key={`video-${index}`} className="flex-shrink-0 w-[280px] group/card cursor-pointer">
                        <div className="relative overflow-hidden rounded-2xl aspect-video bg-[#2E2249] mb-3">
                        <img src={video.image} alt={video.name} className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center group-hover/card:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white ml-1">
                                <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                            </div>
                        </div>
                        <div className={`absolute top-3 left-3 ${video.badgeColor || 'bg-red-600/80'} backdrop-blur-sm px-2 py-1 rounded text-xs font-medium`}>
                            {video.badge || 'NEW'}
                        </div>
                        </div>
                        <h3 className="font-medium text-sm mb-1">{video.title}</h3>
                        <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
                            <span className="text-xs text-white/70">{video.name}</span>
                        </div>
                        <span className="text-xs text-purple-400 font-medium">{video.credits} Credits</span>
                        </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => scrollSection('videos-scroll', 'right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/10 backdrop-blur-xl hover:bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"></path>
                    </svg>
                </button>
                </div>
            </div>

            {/* Featured Galleries Section */}
            <div className="mb-12">
                <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Featured Galleries</h2>
                <div className="relative group">
                <button
                  onClick={() => scrollSection('galleries-scroll', 'left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/10 backdrop-blur-xl hover:bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6"></path>
                    </svg>
                </button>
                
                <div id="galleries-scroll" className="flex gap-4 overflow-x-auto scroll-container pb-4">
                    {champions.slice(0, 16).map((champion, index) =>
                  <div key={`gallery-${index}`} className="flex-shrink-0 w-[240px] group/card cursor-pointer">
                        <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-[#2E2249] mb-3">
                        <img src={champion.image} alt={champion.name} className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500 blur-sm group-hover/card:blur-none" />
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-md flex flex-col items-center justify-center group-hover/card:bg-black/20 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white mb-3">
                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                            <span className="text-white font-medium">Unlock Me</span>
                        </div>
                        <div className="absolute top-3 left-3 bg-purple-600/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                            PREMIUM
                        </div>
                        </div>
                        <h3 className="font-medium text-sm mb-1">{champion.name}</h3>
                        <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
                        <span className="text-xs text-white/70">{champion.title}</span>
                        </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => scrollSection('galleries-scroll', 'right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/10 backdrop-blur-xl hover:bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"></path>
                    </svg>
                </button>
                </div>
            </div>

            {/* Featured Products Section */}
            <div className="mb-12">
                <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Featured Products</h2>
                <div className="relative group">
                <button
                  onClick={() => scrollSection('products-scroll', 'left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/10 backdrop-blur-xl hover:bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6"></path>
                    </svg>
                </button>
                
                <div id="products-scroll" className="flex gap-4 overflow-x-auto scroll-container pb-4">
                    {products.map((product, index) => (
                      <div key={`product-${index}`} className="flex-shrink-0 w-[240px] group/card cursor-pointer">
                        <div className="relative overflow-hidden rounded-2xl aspect-square bg-[#2E2249] mb-3">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500" />
                        </div>
                        <h3 className="font-medium text-white text-sm mb-1 truncate">{product.name}</h3>
                        <p className="text-xs text-white/70 mb-2">{product.brand}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-purple-400">{product.price}</span>
                          <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap">
                            BUY NOW
                          </button>
                        </div>
                      </div>
                    ))}
                </div>

                <button
                  onClick={() => scrollSection('products-scroll', 'right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/10 backdrop-blur-xl hover:bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"></path>
                    </svg>
                </button>
                </div>
            </div>
            </div>
        </main>

        {/* Footer */}
        <footer className="bg-[#2E2249] border-t border-white/10 py-12 px-6 mt-12 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Warning Notice */}
            <div className="text-center mb-8 pb-8 border-b border-white/10">
              <p className="text-white/90 text-lg font-medium mb-2">
                This site contains sexually explicit material. Only enter this site if you are 18 years of age or over!
              </p>
              <p className="text-white/60 text-sm">
                18 U.S.C 2257 Record Keeping Requirements Compliance Statement
              </p>
            </div>

            {/* Footer Links */}
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

            {/* Copyright */}
            <div className="text-center text-sm text-white/50 pt-8 border-t border-white/10">
              <p>© 2025 Live Gemini. All Rights Reserved.</p>
            </div>

            {/* Compliance Logos */}
            <div className="mt-8 flex items-center justify-center gap-6">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/c51fb3398_icra-logo-CvEUY-qz.jpg"
                alt="ICRA Labeled"
                className="h-8 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/b2e278942_rta-logo-BuVza8AD.jpg"
                alt="RTA - Restricted To Adults"
                className="h-8 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/36071e0b3_asacp-logo-BKJALCQV.jpg"
                alt="ASACP Member"
                className="h-8 object-contain opacity-80 hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </footer>
        <AccountPendingModal />
        <KycModal />
        <WelcomeModal 
          isOpen={welcomeModalOpen} 
          onClose={() => setWelcomeModalOpen(false)}
          onSelectType={(type) => {
            setWelcomeModalOpen(false);
            setRegisterModalOpen(true);
          }}
        />
        <RegisterModal isOpen={registerModalOpen} onClose={() => setRegisterModalOpen(false)} userType={userType} />
        <CreditsModal isOpen={creditsModalOpen} onClose={() => setCreditsModalOpen(false)} />
        <SignInModal isOpen={signInModalOpen} onClose={() => setSignInModalOpen(false)} />
        <VoodooShopModal isOpen={voodooShopModalOpen} onClose={() => setVoodooShopModalOpen(false)} />
        <GeminiAI />
        </div>
        </>);
}