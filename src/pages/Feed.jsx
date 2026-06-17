import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Menu, X, Home, Rss, Image as ImageIcon, Video, Clock, Users, Calendar, Camera, Star, Search, Compass, PlusSquare, BarChart3, User, Lock } from 'lucide-react';
import { createPageUrl } from '@/utils';
import ProfileDropdown from '../components/ProfileDropdown';
import CreditsModal from '../components/CreditsModal';
import UnlockContentModal from '../components/UnlockContentModal';
import PostDetailModal from '../components/PostDetailModal';

export default function Feed() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [creditsModalOpen, setCreditsModalOpen] = useState(false);
  const [likedPosts, setLikedPosts] = useState({});
  const [savedPosts, setSavedPosts] = useState({});
  const [expandedComments, setExpandedComments] = useState({});
  const [postComments, setPostComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [unlockModalOpen, setUnlockModalOpen] = useState(false);
  const [selectedLockedPost, setSelectedLockedPost] = useState(null);
  const [postDetailModalOpen, setPostDetailModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const mainNavItems = [
    { name: 'Home', icon: Home, url: '/' },
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

  // Stories data from featured fans
  const storiesData = [
    { id: 1, username: 'ahri_official', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/5bbab6525_0a375a0a705a1f1052460dd069d2953f_erotic_576x324.jpeg', hasNew: true },
    { id: 2, username: 'candy_crush', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/cb4bc0b07_1bda7eff495213fc3276fdb20e0cfa72_erotic_576x324.jpeg', hasNew: true },
    { id: 3, username: 'sassy_sarah', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/fc6e5695e_1f76584d5bcc5f95f5fe078d407416f1_erotic_576x324.jpeg', hasNew: true },
    { id: 4, username: 'lola_lollipop', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/5adbdfca7_02ad7aa0108c98fac7ff17b4bb4da429_erotic_576x324.jpeg', hasNew: false },
    { id: 5, username: 'vixen_vic', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/868fadefc_2b04cab87096b6db71a221078c75d6d2_erotic_576x324.jpeg', hasNew: true },
    { id: 6, username: 'bella_bomb', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/df70ae66f_2cde84c396bc0995741d005b75d4fa43_erotic_576x324.jpeg', hasNew: false },
    { id: 7, username: 'ruby_ravish', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/2ad34be5e_2df005f71d92610399c40e171ae816be_erotic_576x324.jpeg', hasNew: true },
  ];

  // Left sidebar navigation
  const leftNavItems = [
    { name: 'Home', icon: Home, url: createPageUrl('Champions'), active: false },
    { name: 'Reels', icon: Video, url: createPageUrl('Videos'), active: false },
    { name: 'Messages', icon: Send, url: '#', active: false },
    { name: 'Search', icon: Search, url: '#', active: false },
    { name: 'Explore', icon: Compass, url: createPageUrl('Photos'), active: false },
    { name: 'Notifications', icon: Heart, url: '#', active: false, badge: 1 },
    { name: 'Create', icon: PlusSquare, url: '#', active: false },
    { name: 'Dashboard', icon: BarChart3, url: createPageUrl('Wallet'), active: false },
    { name: 'Profile', icon: User, url: '#', active: false },
  ];

  // Posts data
  const postsData = [
    {
                id: -1,
                author: 'crystal_queen',
                authorName: 'Crystal Queen',
                authorImage: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/69963aefe_aac589363ce3f81679fbb7e94def6159_erotic_576x324.jpeg',
                verified: true,
                timestamp: '5m',
                video: 'https://vco.bonddemo.co.uk/wp-content/uploads/2026/02/1122.mp4',
                isVideo: true,
                isPremium: true,
                price: 50,
                likes: 89,
                likedBy: 'bella_bombshell',
                caption: 'Just went live! Come join me 💜👑 Link in bio!',
                comments: 12
              },
    {
                id: 0,
                author: 'ruby_ravish',
                authorName: 'Ruby Ravish',
                authorImage: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/2ad34be5e_2df005f71d92610399c40e171ae816be_erotic_576x324.jpeg',
                verified: true,
                timestamp: '20m',
                image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/2ad34be5e_2df005f71d92610399c40e171ae816be_erotic_576x324.jpeg',
                likes: 342,
                likedBy: 'ahri_official',
                caption: 'Good morning loves! Starting the day with some positive energy ❤️🔥 Live stream in 2 hours!',
                comments: 28,
                isClickable: true
              },
    {
      id: 1,
      author: 'ahri_official',
      authorName: 'Ahri',
      authorImage: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/5bbab6525_0a375a0a705a1f1052460dd069d2953f_erotic_576x324.jpeg',
      verified: true,
      timestamp: '45m',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/5bbab6525_0a375a0a705a1f1052460dd069d2953f_erotic_576x324.jpeg',
      likes: 1248,
      likedBy: 'candy_crush',
      caption: 'Just finished an amazing stream! Thank you all for joining me tonight 💜✨',
      comments: 89
    },
    {
      id: 2,
      author: 'misty_mischief',
      authorName: 'Misty Mischief',
      authorImage: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/1f40724e2_2db87992bb845f854f53fa8117d7cdb3_erotic_576x324.jpeg',
      verified: false,
      timestamp: '1h',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/1f40724e2_2db87992bb845f854f53fa8117d7cdb3_erotic_576x324.jpeg',
      likes: 567,
      likedBy: 'vixen_victoria',
      caption: 'Trouble is my middle name 😈 New exclusive content just dropped!',
      comments: 43
    },
    {
      id: 3,
      author: 'candy_crush',
      authorName: 'Candy Crush',
      authorImage: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/cb4bc0b07_1bda7eff495213fc3276fdb20e0cfa72_erotic_576x324.jpeg',
      verified: true,
      timestamp: '2h',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/cb4bc0b07_1bda7eff495213fc3276fdb20e0cfa72_erotic_576x324.jpeg',
      likes: 2341,
      likedBy: 'sassy_sarah',
      caption: 'New photoset dropping tonight! Who\'s ready? 🍭💕',
      comments: 156
    },
    {
      id: 4,
      author: 'kiki_curves',
      authorName: 'Kiki Curves',
      authorImage: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/accccad24_3cf988944d4f851aa9fb76a68682858c_erotic_576x324.jpeg',
      verified: true,
      timestamp: '3h',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/accccad24_3cf988944d4f851aa9fb76a68682858c_erotic_576x324.jpeg',
      likes: 1823,
      likedBy: 'luna_luxe',
      caption: 'Curves for days 💋 Thank you for 50K followers! Celebration stream tonight!',
      comments: 201
    },
    {
      id: 5,
      author: 'sassy_sarah',
      authorName: 'Sassy Sarah',
      authorImage: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/fc6e5695e_1f76584d5bcc5f95f5fe078d407416f1_erotic_576x324.jpeg',
      verified: false,
      timestamp: '5h',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/fc6e5695e_1f76584d5bcc5f95f5fe078d407416f1_erotic_576x324.jpeg',
      likes: 987,
      likedBy: 'ahri_official',
      caption: 'Behind the scenes of today\'s photoshoot 📸',
      comments: 45
    },
    {
      id: 6,
      author: 'scarlett_sin',
      authorName: 'Scarlett Sin',
      authorImage: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/efb8651b9_3d86f4a25c11d28c4f34674864e750c9_erotic_576x324.jpeg',
      verified: true,
      timestamp: '8h',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/efb8651b9_3d86f4a25c11d28c4f34674864e750c9_erotic_576x324.jpeg',
      likes: 2156,
      likedBy: 'bella_bombshell',
      caption: 'Sin never looked so good 😈🖤 New video dropping at midnight!',
      comments: 178
    },
    {
      id: 7,
      author: 'vixen_victoria',
      authorName: 'Vixen Victoria',
      authorImage: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/868fadefc_2b04cab87096b6db71a221078c75d6d2_erotic_576x324.jpeg',
      verified: true,
      timestamp: '12h',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/868fadefc_2b04cab87096b6db71a221078c75d6d2_erotic_576x324.jpeg',
      likes: 3456,
      likedBy: 'bella_bomb',
      caption: 'Feeling enchanted tonight ✨🌙 Sometimes the best moments happen when the camera is rolling...',
      comments: 234
    },
    {
      id: 8,
      author: 'bella_bombshell',
      authorName: 'Bella Bombshell',
      authorImage: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/df70ae66f_2cde84c396bc0995741d005b75d4fa43_erotic_576x324.jpeg',
      verified: true,
      timestamp: '1d',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/df70ae66f_2cde84c396bc0995741d005b75d4fa43_erotic_576x324.jpeg',
      likes: 4521,
      likedBy: 'ruby_ravish',
      caption: 'Fire and desire 🔥💋 New exclusive content coming this weekend!',
      comments: 312
    },
    {
      id: 9,
      author: 'diva_diamond',
      authorName: 'Diva Diamond',
      authorImage: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/b945b2292_3e53c33383a0623d312d97afb9f7ed15_erotic_576x324.jpeg',
      verified: true,
      timestamp: '1d',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/b945b2292_3e53c33383a0623d312d97afb9f7ed15_erotic_576x324.jpeg',
      likes: 2987,
      likedBy: 'candy_crush',
      caption: 'Diamonds are forever 💎✨ Special announcement coming soon!',
      comments: 245
    },
    {
      id: 10,
      author: 'luna_luxe',
      authorName: 'Luna Luxe',
      authorImage: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/46e088356_3f464eaf5c4d35e56e57b3dd94e05aea_erotic_576x324.jpeg',
      verified: false,
      timestamp: '2d',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/46e088356_3f464eaf5c4d35e56e57b3dd94e05aea_erotic_576x324.jpeg',
      likes: 1876,
      likedBy: 'kiki_curves',
      caption: 'Midnight magic ✨🌙 Who else loves late night vibes?',
      comments: 98
    },
    {
      id: 11,
      author: 'lola_lollipop',
      authorName: 'Lola Lollipop',
      authorImage: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/5adbdfca7_02ad7aa0108c98fac7ff17b4bb4da429_erotic_576x324.jpeg',
      verified: true,
      timestamp: '3d',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/5adbdfca7_02ad7aa0108c98fac7ff17b4bb4da429_erotic_576x324.jpeg',
      likes: 3421,
      likedBy: 'sassy_sarah',
      caption: 'Sweet like candy 🍭💕 New merch available in my store!',
      comments: 289
    },
    {
      id: 12,
      author: 'premium_gallery',
      authorName: 'Premium Gallery',
      authorImage: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/863dda57b_0e14b9f30cdbeeae7512af63a.jpeg',
      verified: true,
      timestamp: '3d',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/863dda57b_0e14b9f30cdbeeae7512af63a.jpeg',
      likes: 4521,
      likedBy: 'vixen_victoria',
      caption: 'Exclusive drop 🔥 Only for premium members!',
      comments: 312
    },
    {
      id: 13,
      author: 'vip_collection',
      authorName: 'VIP Collection',
      authorImage: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/2970d4189_65d7a2d427380.jpeg',
      verified: true,
      timestamp: '4d',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/2970d4189_65d7a2d427380.jpeg',
      likes: 2876,
      likedBy: 'ruby_ravish',
      caption: 'VIP access unlocked 👑✨',
      comments: 198
    },
    {
      id: 14,
      author: 'elite_models',
      authorName: 'Elite Models',
      authorImage: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/193f7f055_65d7a4ae95291.jpeg',
      verified: false,
      timestamp: '4d',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/193f7f055_65d7a4ae95291.jpeg',
      likes: 1654,
      likedBy: 'candy_crush',
      caption: 'Elite vibes only 💎',
      comments: 87
    },
    {
      id: 15,
      author: 'luxury_set',
      authorName: 'Luxury Set',
      authorImage: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/e9d345a77_65d7a5a2c312a.jpeg',
      verified: true,
      timestamp: '5d',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/e9d345a77_65d7a5a2c312a.jpeg',
      likes: 3210,
      likedBy: 'bella_bombshell',
      caption: 'Luxury never goes out of style 💋',
      comments: 245
    },
    {
      id: 16,
      author: 'premium_shots',
      authorName: 'Premium Shots',
      authorImage: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/a82b1cf3a_65d7a5fb010a6.jpeg',
      verified: true,
      timestamp: '5d',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/a82b1cf3a_65d7a5fb010a6.jpeg',
      likes: 2543,
      likedBy: 'luna_luxe',
      caption: 'Behind the lens 📸✨',
      comments: 176
    },
    {
      id: 17,
      author: 'exclusive_set',
      authorName: 'Exclusive Set',
      authorImage: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/46d999a5d_65d7a36eb6b23.jpeg',
      verified: false,
      timestamp: '6d',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/46d999a5d_65d7a36eb6b23.jpeg',
      likes: 1987,
      likedBy: 'kiki_curves',
      caption: 'Exclusive content dropping soon 🔥',
      comments: 134
    },
    {
      id: 18,
      author: 'vip_gallery',
      authorName: 'VIP Gallery',
      authorImage: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/770b9d484_65d7a38f7b04a.jpeg',
      verified: true,
      timestamp: '1w',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/770b9d484_65d7a38f7b04a.jpeg',
      likes: 4123,
      likedBy: 'scarlett_sin',
      caption: 'Gallery updated! Check it out 💜',
      comments: 298
    },
    {
      id: 19,
      author: 'premium_plus',
      authorName: 'Premium Plus',
      authorImage: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/3f2ff2e42_65d7a40ce6fab.jpeg',
      verified: true,
      timestamp: '1w',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/3f2ff2e42_65d7a40ce6fab.jpeg',
      likes: 3654,
      likedBy: 'diva_diamond',
      caption: 'Premium content for premium fans 👑',
      comments: 267
    },
    {
      id: 20,
      author: 'elite_gallery',
      authorName: 'Elite Gallery',
      authorImage: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/815ba6e58_65d7a302d3b64.jpeg',
      verified: false,
      timestamp: '1w',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/815ba6e58_65d7a302d3b64.jpeg',
      likes: 2198,
      likedBy: 'misty_mischief',
      caption: 'Elite content 🖤',
      comments: 156
    }
  ];

  // Suggested users
  const suggestedUsers = [
    { id: 1, username: 'ruby_ravish', name: 'Ruby Ravish', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/2ad34be5e_2df005f71d92610399c40e171ae816be_erotic_576x324.jpeg', followedBy: 'ahri_official' },
    { id: 2, username: 'misty_mischief', name: 'Misty Mischief', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/1f40724e2_2db87992bb845f854f53fa8117d7cdb3_erotic_576x324.jpeg', followedBy: 'candy_crush' },
    { id: 3, username: 'kiki_curves', name: 'Kiki Curves', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/accccad24_3cf988944d4f851aa9fb76a68682858c_erotic_576x324.jpeg', followedBy: 'sassy_sarah' },
    { id: 4, username: 'scarlett_sin', name: 'Scarlett Sin', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/efb8651b9_3d86f4a25c11d28c4f34674864e750c9_erotic_576x324.jpeg', followedBy: 'vixen_victoria' },
    { id: 5, username: 'diva_diamond', name: 'Diva Diamond', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/b945b2292_3e53c33383a0623d312d97afb9f7ed15_erotic_576x324.jpeg', followedBy: 'bella_bomb' },
  ];

  const toggleLike = (postId) => {
    setLikedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const toggleSave = (postId) => {
    setSavedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const toggleComments = (postId) => {
    setExpandedComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const addComment = (postId) => {
    const commentText = newComment[postId];
    if (!commentText?.trim()) return;
    
    setPostComments(prev => ({
      ...prev,
      [postId]: [
        ...(prev[postId] || []),
        { id: Date.now(), username: 'antman_fan', text: commentText.trim(), timestamp: 'now' }
      ]
    }));
    setNewComment(prev => ({ ...prev, [postId]: '' }));
  };

  const getDefaultComments = (post) => [
    { id: 1, username: post.likedBy, text: 'Amazing! 🔥', timestamp: '2h' },
    { id: 2, username: 'fan_account', text: 'Love this content!', timestamp: '1h' },
    { id: 3, username: 'vip_member', text: 'Stunning as always 💜', timestamp: '45m' }
  ];

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
        {(menuOpen || profileMenuOpen) && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => { setMenuOpen(false); setProfileMenuOpen(false); }} />}

        {/* Mobile menu */}
        <div className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-[#2E2249] z-50 shadow-2xl transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <a href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
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
                  <a href="/" className="flex items-center gap-2 md:gap-3">
                    <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/b248bfd91_gemini_logo_white.png" alt="LiveGemini Logo" className="w-6 h-6 md:w-8 md:h-8 object-contain" />
                    <span className="font-bold text-base md:text-lg hidden md:inline">LiveGemini</span>
                  </a>
                  <div className="hidden lg:flex items-center gap-6 text-sm">
                    <a href="/" className="text-white/90 hover:text-white transition-colors">Home</a>
                    <a href={createPageUrl('Feed')} className="text-white hover:text-white transition-colors font-semibold">Feed</a>
                    <a href={createPageUrl('Photos')} className="text-white/90 hover:text-white transition-colors">Photos</a>
                    <a href={createPageUrl('Videos')} className="text-white/90 hover:text-white transition-colors">Videos</a>
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

        <main className="main-content px-4 md:px-6 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-8">
              {/* Left Sidebar - Desktop Only */}
              <div className="hidden xl:block w-56 flex-shrink-0">
                <div className="fixed top-[160px] w-56">
                  <nav className="space-y-1">
                    {leftNavItems.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={index}
                          href={item.url}
                          className={`flex items-center gap-4 p-3 rounded-lg hover:bg-white/10 transition-colors group ${item.active ? 'font-bold' : ''}`}
                        >
                          <div className="relative">
                            <Icon className="w-6 h-6" strokeWidth={item.active ? 2.5 : 1.5} />
                            {item.badge && (
                              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-base">{item.name}</span>
                        </a>
                      );
                    })}
                  </nav>
                </div>
              </div>

              {/* Main Feed Column */}
              <div className="flex-1 w-full max-w-[470px] mx-auto xl:mx-0 px-0">
                {/* Stories Row */}
                <div className="mb-6 mt-4 overflow-x-auto scroll-container -mx-4 px-4">
                  <div className="flex gap-4 pb-2">
                    {storiesData.map((story) => (
                      <div key={story.id} className="flex flex-col items-center gap-1 cursor-pointer">
                        <div className={`w-16 h-16 rounded-full p-[2px] ${story.hasNew ? 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600' : 'bg-gray-600'}`}>
                          <div className="w-full h-full rounded-full p-[2px] bg-[#1a0e2e]">
                            <img src={story.image} alt={story.username} className="w-full h-full rounded-full object-cover" />
                          </div>
                        </div>
                        <span className="text-xs text-white/80 truncate w-16 text-center">{story.username.slice(0, 10)}...</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Posts */}
                <div className="space-y-6">
                  {postsData.map((post) => (
                    <article key={post.id} className="bg-[#2E2249] rounded-lg border border-white/10 overflow-hidden w-full">
                      {/* Post Header */}
                      <div className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            <img src={post.authorImage} alt={post.author} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-semibold text-sm">{post.author}</span>
                            {post.verified && (
                              <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                              </svg>
                            )}
                            <span className="text-white/50 text-sm">• {post.timestamp}</span>
                          </div>
                        </div>
                        <button className="p-1 hover:bg-white/10 rounded-full">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Post Image/Video */}
                                                  <div 
                                                    className={`aspect-square bg-black w-full relative ${post.isPremium || post.isClickable ? 'cursor-pointer' : ''}`}
                                                    onClick={() => {
                                                      if (post.isPremium) {
                                                        setSelectedLockedPost(post);
                                                        setUnlockModalOpen(true);
                                                      } else if (post.isClickable) {
                                                        setSelectedPost(post);
                                                        setPostDetailModalOpen(true);
                                                      }
                                                    }}
                                                  >
                                                    {post.isVideo ? (
                                                      <video 
                                                        src={post.video} 
                                                        className={`w-full h-full object-cover ${post.isPremium ? 'blur-xl' : ''}`}
                                                        autoPlay 
                                                        muted 
                                                        loop 
                                                        playsInline
                                                      />
                                                    ) : (
                                                      <img src={post.image} alt="" className={`w-full h-full object-cover ${post.isPremium ? 'blur-xl' : ''}`} />
                                                    )}
                                                    {post.isPremium && (
                                                      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
                                                        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-3">
                                                          <Lock className="w-8 h-8 text-white" />
                                                        </div>
                                                        <span className="text-white font-semibold text-lg">Premium Content</span>
                                                        <span className="text-white/70 text-sm mt-1">Tap to unlock • {post.price} Credits</span>
                                                      </div>
                                                    )}
                                                  </div>

                      {/* Post Actions */}
                      <div className="p-3">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-4">
                            <button onClick={() => toggleLike(post.id)} className="hover:opacity-70 transition-opacity">
                              <Heart className={`w-6 h-6 ${likedPosts[post.id] ? 'fill-red-500 text-red-500' : ''}`} />
                            </button>
                            <button className="hover:opacity-70 transition-opacity">
                              <MessageCircle className="w-6 h-6" />
                            </button>
                            <button className="hover:opacity-70 transition-opacity">
                              <Send className="w-6 h-6" />
                            </button>
                          </div>
                          <button onClick={() => toggleSave(post.id)} className="hover:opacity-70 transition-opacity">
                            <Bookmark className={`w-6 h-6 ${savedPosts[post.id] ? 'fill-white' : ''}`} />
                          </button>
                        </div>

                        {/* Likes */}
                        <div className="text-sm mb-1">
                          <span className="text-white/70">Liked by </span>
                          <span className="font-semibold">{post.likedBy}</span>
                          <span className="text-white/70"> and </span>
                          <span className="font-semibold">{(likedPosts[post.id] ? post.likes + 1 : post.likes).toLocaleString()} others</span>
                        </div>

                        {/* Caption */}
                        <div className="text-sm">
                          <span className="font-semibold">{post.author}</span>{' '}
                          <span className="text-white/90">{post.caption.slice(0, 80)}{post.caption.length > 80 && '...'}</span>
                          {post.caption.length > 80 && (
                            <button className="text-white/50 ml-1">more</button>
                          )}
                        </div>

                        {/* Comments link */}
                        <button 
                          onClick={() => toggleComments(post.id)}
                          className="text-white/50 text-sm mt-1 hover:text-white/70 transition-colors"
                        >
                          {expandedComments[post.id] ? 'Hide comments' : `View all ${post.comments + (postComments[post.id]?.length || 0)} comments`}
                        </button>

                        {/* Expanded Comments */}
                        {expandedComments[post.id] && (
                          <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
                            {getDefaultComments(post).map((comment) => (
                              <div key={comment.id} className="text-sm">
                                <span className="font-semibold">{comment.username}</span>{' '}
                                <span className="text-white/90">{comment.text}</span>
                                <span className="text-white/40 text-xs ml-2">{comment.timestamp}</span>
                              </div>
                            ))}
                            {postComments[post.id]?.map((comment) => (
                              <div key={comment.id} className="text-sm">
                                <span className="font-semibold">{comment.username}</span>{' '}
                                <span className="text-white/90">{comment.text}</span>
                                <span className="text-white/40 text-xs ml-2">{comment.timestamp}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Add comment */}
                        <div className="mt-2 pt-2 border-t border-white/10 flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Add a comment..." 
                            value={newComment[post.id] || ''}
                            onChange={(e) => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                            onKeyDown={(e) => e.key === 'Enter' && addComment(post.id)}
                            className="flex-1 bg-transparent text-sm placeholder:text-white/40 focus:outline-none"
                          />
                          {newComment[post.id]?.trim() && (
                            <button 
                              onClick={() => addComment(post.id)}
                              className="text-blue-400 text-sm font-semibold hover:text-blue-300"
                            >
                              Post
                            </button>
                          )}
                        </div>
                        </div>
                        </article>
                  ))}
                </div>
              </div>

              {/* Right Sidebar - Desktop Only */}
              <div className="hidden lg:block w-80 flex-shrink-0">
                <div className="sticky top-[160px]">
                  {/* Current User */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/0794a4326_Screenshot2025-10-20at055030.png" alt="You" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">antman_fan</p>
                        <p className="text-white/50 text-sm">AntMan</p>
                      </div>
                    </div>
                    <button className="text-blue-400 text-xs font-semibold hover:text-white">Switch</button>
                  </div>

                  {/* Suggested */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-white/50 font-semibold text-sm">Suggested for you</span>
                      <button className="text-white text-xs font-semibold hover:text-white/70">See All</button>
                    </div>

                    <div className="space-y-3">
                      {suggestedUsers.map((user) => (
                        <div key={user.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                              <img src={user.image} alt={user.username} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="font-semibold text-sm">{user.username}</p>
                              <p className="text-white/50 text-xs">Followed by {user.followedBy}</p>
                            </div>
                          </div>
                          <button className="text-blue-400 text-xs font-semibold hover:text-white">Follow</button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Links */}
                  <div className="text-xs text-white/30 space-y-3 mt-8">
                    <div className="flex flex-wrap gap-x-2 gap-y-1">
                      <a href="#" className="hover:underline">About</a>
                      <span>·</span>
                      <a href="#" className="hover:underline">Help</a>
                      <span>·</span>
                      <a href="#" className="hover:underline">Press</a>
                      <span>·</span>
                      <a href="#" className="hover:underline">API</a>
                      <span>·</span>
                      <a href="#" className="hover:underline">Jobs</a>
                      <span>·</span>
                      <a href="#" className="hover:underline">Privacy</a>
                      <span>·</span>
                      <a href="#" className="hover:underline">Terms</a>
                    </div>
                    <p>© 2025 LIVEGEMINI</p>
                  </div>
                </div>
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
                    <UnlockContentModal 
                                  isOpen={unlockModalOpen} 
                                  onClose={() => {
                                    setUnlockModalOpen(false);
                                    setSelectedLockedPost(null);
                                  }} 
                                  post={selectedLockedPost}
                                />
                                <PostDetailModal
                                  isOpen={postDetailModalOpen}
                                  onClose={() => {
                                    setPostDetailModalOpen(false);
                                    setSelectedPost(null);
                                  }}
                                  post={selectedPost}
                                />
                              </div>
    </>
  );
}