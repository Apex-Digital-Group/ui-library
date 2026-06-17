import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Send, Gift, Menu, X, Home, Rss, Image as ImageIcon, Video, Clock, Users, Calendar, Camera, Star, TrendingUp, DollarSign, ShoppingCart, BarChart3, Wallet as WalletIcon } from 'lucide-react';
import { createPageUrl } from '@/utils';
import ProfileDropdown from '../components/ProfileDropdown';
import CreditsModal from '../components/CreditsModal';
import WithdrawModal from '../components/WithdrawModal';
import TransactionsModal from '../components/TransactionsModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function Wallet() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [creditsModalOpen, setCreditsModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [dateRange, setDateRange] = useState('30days');
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [transactionsModalOpen, setTransactionsModalOpen] = useState(false);

  // Mock data for revenue chart
  const revenueData = [
    { date: '1 Nov', credits: 120, orders: 8 },
    { date: '3 Nov', credits: 145, orders: 12 },
    { date: '5 Nov', credits: 132, orders: 9 },
    { date: '7 Nov', credits: 158, orders: 14 },
    { date: '9 Nov', credits: 142, orders: 11 },
    { date: '11 Nov', credits: 165, orders: 15 },
    { date: '13 Nov', credits: 138, orders: 10 },
    { date: '15 Nov', credits: 152, orders: 13 },
    { date: '17 Nov', credits: 128, orders: 9 },
    { date: '19 Nov', credits: 178, orders: 16 },
    { date: '21 Nov', credits: 185, orders: 18 },
    { date: '23 Nov', credits: 142, orders: 11 },
    { date: '25 Nov', credits: 168, orders: 15 },
    { date: '27 Nov', credits: 192, orders: 19 },
    { date: '29 Nov', credits: 155, orders: 13 },
    { date: '30 Nov', credits: 205, orders: 21 }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-xl border border-purple-200 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-semibold text-gray-900 mb-1">{payload[0].payload.date}</p>
          <p className="text-sm text-green-600">Credits: {payload[0].value}</p>
          <p className="text-sm text-blue-600">Orders: {payload[0].payload.orders}</p>
        </div>
      );
    }
    return null;
  };

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

  const stamps = Array.from({ length: 20 }, (_, i) => i + 1);
  const collectedStamps = 7; // Example: user has collected 7 stamps

  return (
    <>
      <style>{`
        .scroll-container { scrollbar-width: none; -ms-overflow-style: none; }
        .scroll-container::-webkit-scrollbar { display: none; }
        header.fixed-header { position: fixed; top: 0; left: 0; right: 0; width: 100%; z-index: 9999; background: #1a0e2e; }
        main.main-content { padding-top: 140px; min-height: calc(100vh - 140px); }
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
                    <a href={createPageUrl('Feed')} className="text-white/90 hover:text-white transition-colors">Feed</a>
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

        <main className="main-content px-4 md:px-6 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <button onClick={() => window.history.back()} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-3xl md:text-4xl font-bold">My Wallet</h1>
              </div>
              <div className="flex items-center gap-3">
                <select 
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm hover:bg-white/15 transition-colors cursor-pointer"
                >
                  <option value="7days">Last 7 days</option>
                  <option value="30days">Last 30 days</option>
                  <option value="90days">Last 90 days</option>
                  <option value="year">This year</option>
                </select>
                <Button 
                  onClick={() => setTransactionsModalOpen(true)}
                  className="bg-white/10 hover:bg-white/20 border border-white/20"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Transactions
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {/* Total Orders */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-white/60 mb-1">Total Orders</p>
                    <h3 className="text-3xl font-bold">328</h3>
                    <p className="text-xs text-green-400 mt-1">143 completed</p>
                  </div>
                  <div className="bg-blue-500/20 p-3 rounded-xl">
                    <ShoppingCart className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </div>

              {/* Total Credits Earned */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-white/60 mb-1">Total Credits Earned</p>
                    <h3 className="text-3xl font-bold">1428.57</h3>
                    <p className="text-xs text-white/40 mt-1">All time</p>
                  </div>
                  <div className="bg-green-500/20 p-3 rounded-xl">
                    <DollarSign className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </div>

              {/* Available Balance */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-white/60 mb-1">Available Balance</p>
                    <h3 className="text-3xl font-bold text-green-400">1000.00</h3>
                    <p className="text-xs text-green-400 mt-1">87.3% collected</p>
                  </div>
                  <div className="bg-green-500/20 p-3 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </div>

              {/* Avg Order Value */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-white/60 mb-1">Avg Order Value</p>
                    <h3 className="text-3xl font-bold">4.35</h3>
                    <p className="text-xs text-white/40 mt-1">Per transaction</p>
                  </div>
                  <div className="bg-purple-500/20 p-3 rounded-xl">
                    <BarChart3 className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Revenue Performance Chart */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 mb-8">
              <h2 className="text-2xl font-bold mb-6">Credits Performance Over Time</h2>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="date" 
                      stroke="rgba(255,255,255,0.5)"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      stroke="rgba(255,255,255,0.5)"
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                      wrapperStyle={{ paddingTop: '20px' }}
                      iconType="circle"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="credits" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      dot={{ fill: '#10b981', r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Credits Earned"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="orders" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', r: 3 }}
                      name="Number of Orders"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Action Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Withdraw Card */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
                <h2 className="text-xl font-bold mb-6">Withdraw Credits</h2>
                
                <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-sm text-white/60 mb-1">Available Balance</p>
                  <p className="text-3xl font-bold text-green-400">1000.00</p>
                  <p className="text-xs text-white/40 mt-1">Gemini Credits</p>
                </div>

                <div className="space-y-4">
                  <Input
                    type="number"
                    placeholder="Amount to withdraw"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-12"
                  />
                  <Button 
                    onClick={() => setWithdrawModalOpen(true)}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 h-12"
                  >
                    <WalletIcon className="w-4 h-4 mr-2" />
                    Withdraw Now
                  </Button>
                  <p className="text-xs text-white/50 text-center">Processing time: 1-3 business days</p>
                </div>
              </div>

              {/* Transfer Card */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
                <h2 className="text-xl font-bold mb-6">Transfer credits to a friend</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-white/80 mb-2 block">recipient</label>
                    <Input
                      type="text"
                      placeholder="Select User"
                      value={selectedUser}
                      onChange={(e) => setSelectedUser(e.target.value)}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-white/80 mb-2 block">Amount</label>
                    <Input
                      type="number"
                      placeholder="Amount of credits $"
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(e.target.value)}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                    />
                  </div>

                  <Button className="w-full bg-purple-500 hover:bg-purple-600">
                    <Send className="w-4 h-4 mr-2" />
                    Transfer Credits
                  </Button>
                </div>
              </div>

              {/* Rewards Card */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
                <h2 className="text-xl font-bold mb-6">Rewards</h2>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Gemini Coins Balance</h3>
                  <div className="flex items-center gap-2 mb-6">
                    <Gift className="w-5 h-5 text-purple-400" />
                    <span className="text-2xl font-bold">0</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* 5 Stamps */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {stamps.slice(0, 5).map((stamp) => (
                        <div
                          key={stamp}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                            stamp <= collectedStamps
                              ? 'bg-purple-500 text-white'
                              : 'bg-white/10 text-white/40'
                          }`}
                        >
                          {stamp}
                        </div>
                      ))}
                    </div>
                    <span className="text-sm font-medium">5 Stamps</span>
                  </div>

                  {/* 10 Stamps */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {stamps.slice(5, 10).map((stamp) => (
                        <div
                          key={stamp}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                            stamp <= collectedStamps
                              ? 'bg-purple-500 text-white'
                              : 'bg-white/10 text-white/40'
                          }`}
                        >
                          {stamp}
                        </div>
                      ))}
                    </div>
                    <span className="text-sm font-medium">10 Stamps</span>
                  </div>

                  {/* 15 Stamps */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {stamps.slice(10, 15).map((stamp) => (
                        <div
                          key={stamp}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                            stamp <= collectedStamps
                              ? 'bg-purple-500 text-white'
                              : 'bg-white/10 text-white/40'
                          }`}
                        >
                          {stamp}
                        </div>
                      ))}
                    </div>
                    <span className="text-sm font-medium">15 Stamps</span>
                  </div>

                  {/* 20 Stamps */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {stamps.slice(15, 20).map((stamp) => (
                        <div
                          key={stamp}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                            stamp <= collectedStamps
                              ? 'bg-purple-500 text-white'
                              : 'bg-white/10 text-white/40'
                          }`}
                        >
                          {stamp}
                        </div>
                      ))}
                    </div>
                    <span className="text-sm font-medium">20 Stamps</span>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-white/10 hover:bg-white/20 border border-white/20">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Get Credits
                </Button>
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
        <WithdrawModal isOpen={withdrawModalOpen} onClose={() => setWithdrawModalOpen(false)} amount={withdrawAmount} />
        <TransactionsModal isOpen={transactionsModalOpen} onClose={() => setTransactionsModalOpen(false)} />
      </div>
    </>
  );
}