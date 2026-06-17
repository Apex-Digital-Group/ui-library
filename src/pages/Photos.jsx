import React, { useState } from 'react';
import { Filter, Menu, X, Home, Rss, Image as ImageIcon, Video, Clock, Users, Calendar, Camera, Star } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createPageUrl } from '@/utils';
import PhotoCard from '../components/photos/PhotoCard';
import FilterSidebar from '../components/videos/FilterSidebar';
import ProfileDropdown from '../components/ProfileDropdown';
import CreditsModal from '../components/CreditsModal';

export default function Photos() {
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
    regions: []
  });

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
    { name: 'Companion', icon: Star },
    { name: 'Dominatrix', icon: Star },
    { name: 'Interests', icon: Star },
    { name: 'Marketplace', icon: Star },
    { name: 'Voodoo Shop', icon: Star },
    { name: 'Blogs', icon: Star }
  ];

  const photosData = [
    { id: 101, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/863dda57b_0e14b9f30cdbeeae7512af63a.jpeg', author: 'Premium Gallery', isLocked: false, category: 'Exclusive' },
    { id: 102, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/2970d4189_65d7a2d427380.jpeg', author: 'VIP Collection', isLocked: false, category: 'Exclusive' },
    { id: 103, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/193f7f055_65d7a4ae95291.jpeg', author: 'Elite Models', isLocked: false, category: 'Exclusive' },
    { id: 104, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/e9d345a77_65d7a5a2c312a.jpeg', author: 'Luxury Set', isLocked: false, category: 'Exclusive' },
    { id: 105, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/a82b1cf3a_65d7a5fb010a6.jpeg', author: 'Premium Shots', isLocked: false, category: 'Exclusive' },
    { id: 106, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/46d999a5d_65d7a36eb6b23.jpeg', author: 'Exclusive Set', isLocked: false, category: 'Exclusive' },
    { id: 107, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/770b9d484_65d7a38f7b04a.jpeg', author: 'VIP Gallery', isLocked: false, category: 'Exclusive' },
    { id: 108, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/3f2ff2e42_65d7a40ce6fab.jpeg', author: 'Premium Plus', isLocked: false, category: 'Exclusive' },
    { id: 109, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/815ba6e58_65d7a302d3b64.jpeg', author: 'Elite Gallery', isLocked: false, category: 'Fetish' },
    { id: 110, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/852367779_65d7a511cdc24.jpeg', author: 'Luxury Photos', isLocked: false, category: 'Exclusive' },
    { id: 111, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/ca718729d_65d7a3178ba55.jpeg', author: 'VIP Models', isLocked: false, category: 'Exclusive' },
    { id: 112, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/0db5a069b_65d7a5698cc83.jpeg', author: 'Premium Set', isLocked: false, category: 'Exclusive' },
    { id: 113, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/46f0b2c1b_65d7a48006c07.jpeg', author: 'Elite Collection', isLocked: true, lockType: 'unlock', category: 'Exclusive' },
    { id: 114, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/1c42da40c_65d8a7f5df8fc.jpeg', author: 'Luxury Models', isLocked: false, category: 'Exclusive' },
    { id: 115, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/54ae5ba0b_65d8a8a480c01.jpeg', author: 'VIP Shots', isLocked: false, category: 'Exclusive' },
    { id: 116, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/8991a40e5_65d8a8ed029ec.jpeg', author: 'Premium Gallery', isLocked: false, category: 'Exclusive' },
    { id: 117, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/c7c77460f_65d8a79f09b34.jpeg', author: 'Elite Photos', isLocked: false, category: 'Exclusive' },
    { id: 118, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/8f709147e_65d8a82aa418e.jpeg', author: 'Luxury Set', isLocked: false, category: 'Exclusive' },
    { id: 119, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/f494dc648_65d8a85ef1e19.jpeg', author: 'VIP Collection', isLocked: false, category: 'Exclusive' },
    { id: 120, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/cd85d150a_65d8a93e14786.jpeg', author: 'Premium Models', isLocked: false, category: 'Exclusive' },
    { id: 121, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/1be540eb9_65d8a97c4ff6a.jpg', author: 'Elite Set', isLocked: false, category: 'Fetish' },
    { id: 122, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/ce06f258b_65d8a749aeb5a.jpeg', author: 'Luxury Gallery', isLocked: false, category: 'Exclusive' },
    { id: 123, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/6b8eea4a7_65d8aaafd700d.jpeg', author: 'VIP Photos', isLocked: false, category: 'Exclusive' },
    { id: 124, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/ff5778dce_65d8aaff46a49.jpeg', author: 'Premium Collection', isLocked: false, category: 'Exclusive' },
    { id: 125, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/1c73ec72f_65d8ab3e8be90.jpeg', author: 'Elite Models', isLocked: false, category: 'Exclusive' },
    { id: 126, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/77703b465_65d8abdd18e64.jpeg', author: 'Luxury Shots', isLocked: false, category: 'Exclusive' },
    { id: 127, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/2a5427971_65d78c7533b02.jpeg', author: 'VIP Gallery', isLocked: false, category: 'Exclusive' },
    { id: 128, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/a08499d5d_65dbe1db7f3b9.jpeg', author: 'Premium Set', isLocked: false, category: 'Exclusive' },
    { id: 129, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/8d3e7cb71_65dbe2bf06092.jpeg', author: 'Elite Gallery', isLocked: false, category: 'Exclusive' },
    { id: 130, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/d52577123_65dbe2e474461.jpeg', author: 'Luxury Collection', isLocked: false, category: 'Exclusive' },
    { id: 131, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/59ebaa6a0_65dbe19bc0742.jpeg', author: 'VIP Models', isLocked: false, category: 'Exclusive' },
    { id: 132, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/7c2129f1e_65dbe20e75680.jpeg', author: 'Premium Photos', isLocked: false, category: 'Exclusive' },
    { id: 133, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/3cc2704f8_65dbe22fb2f00.jpeg', author: 'Elite Set', isLocked: false, category: 'Exclusive' },
    { id: 134, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/70603060f_65dbe29fc34e4.jpeg', author: 'Luxury Gallery', isLocked: false, category: 'Exclusive' },
    { id: 135, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/850b16af7_65dbe250f09f5.jpeg', author: 'VIP Collection', isLocked: false, category: 'Exclusive' },
    { id: 136, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/4114805a7_65dbe279e0062.jpeg', author: 'Premium Models', isLocked: false, category: 'Exclusive' },
    { id: 137, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/2104208ac_65dbf8f5dd099.jpeg', author: 'Elite Photos', isLocked: false, category: 'Exclusive' },
    { id: 138, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/23154cab3_65dbf8f6273fb.jpeg', author: 'Luxury Set', isLocked: false, category: 'Exclusive' },
    { id: 139, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/66c742e7b_65dbf8996d3df.jpeg', author: 'VIP Gallery', isLocked: false, category: 'Exclusive' },
    { id: 140, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/fd4d0248d_65dc9d2469f3b.jpeg', author: 'Premium Set', isLocked: false, category: 'Exclusive' },
    { id: 141, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/84057d5c9_65df6c51f3e27.jpeg', author: 'Elite Collection', isLocked: true, lockType: 'unlock', category: 'Exclusive' },
    { id: 142, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/ca46d0f6c_94c5dedb4b89576101f300f74.jpeg', author: 'Luxury Models', isLocked: false, category: 'Exclusive' },
    { id: 143, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/8e339325e_221b86a23df300b123a9aac3d.jpeg', author: 'VIP Photos', isLocked: false, category: 'Exclusive' },
    { id: 144, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/11935ac02_679a0e47e7392.png', author: 'Premium Gallery', isLocked: true, lockType: 'unlock', category: 'Exclusive' },
    { id: 145, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/2562427a0_658308caa7489.jpeg', author: 'Elite Set', isLocked: false, category: 'Exclusive' },
    { id: 146, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/8a9d9cc3c_a8ef21dc9dc3ba4b5b94295e0.jpg', author: 'Luxury Photos', isLocked: false, category: 'Exclusive' },
    { id: 147, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/bded2aad8_aea574bf9159a2711d8726551.jpeg', author: 'VIP Models', isLocked: true, lockType: 'unlock', category: 'Exclusive' },
    { id: 1, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/5bbab6525_0a375a0a705a1f1052460dd069d2953f_erotic_576x324.jpeg', author: 'Ahri', isLocked: false, category: 'Exclusive' },
    { id: 2, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/cb4bc0b07_1bda7eff495213fc3276fdb20e0cfa72_erotic_576x324.jpeg', author: 'Candy Crush', isLocked: false, category: 'Girl' },
    { id: 3, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/2e0ba5e86_1d9d1209acd6526158ccd1ba9d6753cd_erotic_576x324.jpeg', author: 'Naughty Natasha', isLocked: true, lockType: 'unlock', category: 'Hot Flirt' },
    { id: 4, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/fc6e5695e_1f76584d5bcc5f95f5fe078d407416f1_erotic_576x324.jpeg', author: 'Sassy Sarah', isLocked: false, category: 'Girl' },
    { id: 5, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/5adbdfca7_02ad7aa0108c98fac7ff17b4bb4da429_erotic_576x324.jpeg', author: 'Lola Lollipop', isLocked: true, lockType: 'subscribe', category: 'Exclusive' },
    { id: 6, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/868fadefc_2b04cab87096b6db71a221078c75d6d2_erotic_576x324.jpeg', author: 'Vixen Victoria', isLocked: false, category: 'Soul Mate' },
    { id: 7, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/df70ae66f_2cde84c396bc0995741d005b75d4fa43_erotic_576x324.jpeg', author: 'Bella Bombshell', isLocked: true, lockType: 'unlock', category: 'Hot Flirt' },
    { id: 8, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/1f40724e2_2db87992bb845f854f53fa8117d7cdb3_erotic_576x324.jpeg', author: 'Misty Mischief', isLocked: false, category: 'Girl' },
    { id: 9, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/2ad34be5e_2df005f71d92610399c40e171ae816be_erotic_576x324.jpeg', author: 'Ruby Ravish', isLocked: false, category: 'Hot Flirt' },
    { id: 10, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/1f4cbbace_3a1f5fb962cd52fe63acd6e753085fa7_erotic_576x324.jpeg', author: 'Peaches Paradise', isLocked: true, lockType: 'unlock', category: 'Mature' },
    { id: 11, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/accccad24_3cf988944d4f851aa9fb76a68682858c_erotic_576x324.jpeg', author: 'Kiki Curves', isLocked: false, category: 'Girl' },
    { id: 12, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/efb8651b9_3d86f4a25c11d28c4f34674864e750c9_erotic_576x324.jpeg', author: 'Scarlett Sin', isLocked: true, lockType: 'subscribe', category: 'Exclusive' },
    { id: 13, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/72315c7c0_3e26e44247cd2dd94440cf25737147de_erotic_576x324.jpeg', author: 'Ginger Spice', isLocked: false, category: 'Girl' },
    { id: 14, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/b945b2292_3e53c33383a0623d312d97afb9f7ed15_erotic_576x324.jpeg', author: 'Diva Diamond', isLocked: true, lockType: 'unlock', category: 'Exclusive' },
    { id: 15, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/46e088356_3f464eaf5c4d35e56e57b3dd94e05aea_erotic_576x324.jpeg', author: 'Luna Luxe', isLocked: false, category: 'Soul Mate' },
    { id: 16, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/61bc58b23_3fdf753de38e4e80cea508ab49037c9c_erotic_576x324.jpeg', author: 'Angel Aphrodite', isLocked: false, category: 'Girl' },
    { id: 17, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/d45e56233_d200a807e28a78074dabae311610ebf1_erotic_576x324.jpeg', author: 'Eva Elegance', isLocked: true, lockType: 'unlock', category: 'Mature' },
    { id: 18, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/5b4b35771_1151b9b62274a670fb1a3aa4216314d0_erotic_576x324.jpeg', author: 'Ivy Venom', isLocked: false, category: 'Fetish' },
    { id: 19, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/d2d4d4569_4f836a6b1cf44ce48c2bbe1072fdd3fa_erotic_576x324.jpeg', author: 'Chloe Charm', isLocked: true, lockType: 'subscribe', category: 'Couple' },
    { id: 20, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/1da2ec12c_d73fefa77fb25260a828be745bd5dba5_erotic_576x324.jpeg', author: 'Zoe Zenith', isLocked: false, category: 'Girl' },
    { id: 21, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/1ade095a8_59917b9f130f27103fbb2ae730f31840_erotic_576x324.jpeg', author: 'Fiona Fire', isLocked: true, lockType: 'unlock', category: 'Hot Flirt' },
    { id: 22, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/ff4757540_3c277f3b8777b3d673c67d0660f474c9_erotic_576x324.jpeg', author: 'Gia Gemstone', isLocked: false, category: 'Exclusive' },
    { id: 23, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/61cf8d691_ac8b1c0a263dfe00c1b908f4efa2b9e9_erotic_576x324.jpeg', author: 'Heidi Honey', isLocked: false, category: 'Mature' },
    { id: 24, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/b74b431f1_17b54c9e4f88aa5f34b04054c5fc49ac_erotic_576x324.jpeg', author: 'Jasmine Jewel', isLocked: true, lockType: 'unlock', category: 'Girl' },
    { id: 25, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/3dee030a3_7b0afec1f089859b113ed943d99dd8e6_erotic_576x324.jpeg', author: 'Nina Nightfall', isLocked: false, category: 'Hot Flirt' },
    { id: 26, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/41a9ed4e6_ac46e7b0c764b3e46e3d98945c70f346_erotic_576x324.jpeg', author: 'Olivia Opal', isLocked: true, lockType: 'subscribe', category: 'Exclusive' },
    { id: 27, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/41450c4c0_2efe28b0922f3e12b47848397e3ca8a3_erotic_576x324.jpeg', author: 'Crystal Queen', isLocked: false, category: 'Exclusive' },
    { id: 28, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/206a62a56_9ec89e0ea26d31ad58b5c910a40e5013_erotic_576x324.jpeg', author: 'Passion Couple', isLocked: false, category: 'Couple' },
    { id: 29, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/51d4db45e_406af5ef6702a98470d2ae3a7aa07c5a_erotic_576x324.jpeg', author: 'Androgyne Alex', isLocked: true, lockType: 'unlock', category: 'Transgirl' },
    { id: 30, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/af76d1610_c15973ef0e9120e71e8a4f5abdc5a5e5_erotic_576x324.jpeg', author: 'Dark Desire', isLocked: false, category: 'Fetish' }
  ];

  const filteredPhotos = photosData.filter(photo => {
    const { genderTab, categories } = filters;
    if (genderTab === 'guys') return false;
    if (categories.length && !categories.includes(photo.category)) return false;
    return true;
  });

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

        <div className={`fixed top-0 left-0 h-full w-[80%] max-w-sm bg-[#2E2249] z-50 shadow-2xl transition-transform duration-300 overflow-y-auto ${filterOpen ? 'translate-x-0' : '-translate-x-full'}`}>
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
                  <a href="/" className="flex items-center gap-2 md:gap-3">
                    <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/b248bfd91_gemini_logo_white.png" alt="LiveGemini Logo" className="w-6 h-6 md:w-8 md:h-8 object-contain" />
                    <span className="font-bold text-base md:text-lg hidden md:inline">LiveGemini</span>
                  </a>
                  <div className="hidden lg:flex items-center gap-6 text-sm">
                    <a href="/" className="text-white/90 hover:text-white transition-colors">Home</a>
                    <a href={createPageUrl('Feed')} className="text-white/90 hover:text-white transition-colors">Feed</a>
                    <a href={createPageUrl('Photos')} className="text-white hover:text-white transition-colors font-semibold">Photos</a>
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
          <div className="max-w-[1800px] mx-auto">
            <h1 className="text-2xl font-bold mb-4">Photo Galleries</h1>
            
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
                    <SelectItem value="new">Newest</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <span>{filteredPhotos.length} photo galleries</span>
              </div>
            </div>

            <div className="flex gap-6">
              <FilterSidebar filters={filters} setFilters={setFilters} isMobile={false} />
              
              <div className="flex-1">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredPhotos.map((photo) => (
                    <PhotoCard key={photo.id} data={photo} onUnlock={() => setCreditsModalOpen(true)} />
                  ))}
                </div>
                {filteredPhotos.length === 0 && (
                  <div className="text-center py-12 text-white/60">
                    <p>No photos match your filters.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        <CreditsModal isOpen={creditsModalOpen} onClose={() => setCreditsModalOpen(false)} />
      </div>
    </>
  );
}