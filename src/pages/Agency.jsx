import React, { useState } from 'react';
import { Search, Bell, ChevronDown, LayoutDashboard, Users, DollarSign, Wallet, Megaphone, Settings } from 'lucide-react';
import OverviewScreen from '../components/agency/OverviewScreen';
import CreatorsScreen from '../components/agency/CreatorsScreen';
import EarningsScreen from '../components/agency/EarningsScreen';
import PayoutsScreen from '../components/agency/PayoutsScreen';
import PromotionsScreen from '../components/agency/PromotionsScreen';
import AgencySettingsScreen from '../components/agency/AgencySettingsScreen';
import CreatorDetailDrawer from '../components/agency/CreatorDetailDrawer';
import PayoutModal from '../components/agency/PayoutModal';
import PromotionPanel from '../components/agency/PromotionPanel';

export default function Agency() {
  const [activeScreen, setActiveScreen] = useState('overview');
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [selectedPayout, setSelectedPayout] = useState(null);
  const [promotionPanelOpen, setPromotionPanelOpen] = useState(false);
  const [promotionData, setPromotionData] = useState(null);
  const [dateRange, setDateRange] = useState('Last 30 days');
  const [searchQuery, setSearchQuery] = useState('');

  React.useEffect(() => {
    document.title = 'Live Gemini Agency Portal';
  }, []);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'creators', label: 'Creators', icon: Users },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
    { id: 'payouts', label: 'Payouts', icon: Wallet },
    { id: 'promotions', label: 'Promotions', icon: Megaphone },
    { id: 'settings', label: 'Agency Settings', icon: Settings },
  ];

  const renderScreen = () => {
    const props = { onCreatorClick: setSelectedCreator, onPayoutClick: setSelectedPayout, onPromoteClick: (data) => { setPromotionData(data); setPromotionPanelOpen(true); } };
    
    switch(activeScreen) {
      case 'overview': return <OverviewScreen {...props} />;
      case 'creators': return <CreatorsScreen {...props} />;
      case 'earnings': return <EarningsScreen {...props} />;
      case 'payouts': return <PayoutsScreen {...props} />;
      case 'promotions': return <PromotionsScreen {...props} />;
      case 'settings': return <AgencySettingsScreen />;
      default: return <OverviewScreen {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0e2e] via-[#2E2249] to-[#1a0e2e] text-white">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-[#2E2249]/95 backdrop-blur-xl border-b border-white/10 z-50">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/b248bfd91_gemini_logo_white.png" alt="Logo" className="w-8 h-8" />
              <span className="font-bold text-lg">Agency Portal</span>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search creators and fans..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-80 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm transition-colors flex items-center gap-2">
              {dateRange}
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500">
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/0794a4326_Screenshot2025-10-20at055030.png" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Left Navigation */}
      <div className="fixed left-0 top-16 bottom-0 w-64 bg-[#2E2249]/50 backdrop-blur-xl border-r border-white/10 z-40">
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveScreen(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeScreen === item.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30'
                    : 'hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 mt-16 p-6">
        {renderScreen()}
      </div>

      {/* Drawers and Modals */}
      <CreatorDetailDrawer
        creator={selectedCreator}
        isOpen={!!selectedCreator}
        onClose={() => setSelectedCreator(null)}
      />
      <PayoutModal
        payout={selectedPayout}
        isOpen={!!selectedPayout}
        onClose={() => setSelectedPayout(null)}
      />
      <PromotionPanel
        isOpen={promotionPanelOpen}
        onClose={() => setPromotionPanelOpen(false)}
        promotionData={promotionData}
      />
    </div>
  );
}