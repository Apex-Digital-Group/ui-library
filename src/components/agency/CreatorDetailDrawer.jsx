import React, { useState } from 'react';
import { X, User, DollarSign, TrendingUp, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CreatorDetailDrawer({ creator, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [splits, setSplits] = useState({
    subscriptions: 80,
    liveCam: 80,
    videoSales: 80,
    chat: 80,
    tips: 85,
    shop: 75,
  });

  if (!creator) return null;

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'revenue', label: 'Revenue Split', icon: DollarSign },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'compliance', label: 'Compliance', icon: FileText },
  ];

  const calculateShares = () => {
    const total = Object.values(splits).reduce((a, b) => a + b, 0);
    const avgCreator = total / Object.keys(splits).length;
    const avgAgency = 100 - avgCreator;
    return { creator: avgCreator.toFixed(1), agency: avgAgency.toFixed(1) };
  };

  const shares = calculateShares();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-[600px] bg-gradient-to-br from-[#2E2249] to-[#1a0e2e] border-l border-white/10 z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#2E2249]/95 backdrop-blur-xl border-b border-white/10 p-6 z-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Creator Details</h2>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex gap-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <img src={creator.avatar} alt={creator.name} className="w-24 h-24 rounded-full object-cover" />
                    <div>
                      <h3 className="text-2xl font-bold">{creator.name}</h3>
                      <p className="text-white/60">{creator.country}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-4">
                      <p className="text-sm text-white/60 mb-1">Status</p>
                      <p className="text-lg font-semibold capitalize">{creator.status}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <p className="text-sm text-white/60 mb-1">Total Earnings</p>
                      <p className="text-lg font-semibold">{creator.earnings}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <p className="text-sm text-white/60 mb-1">Agency %</p>
                      <p className="text-lg font-semibold">{creator.percentage}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <p className="text-sm text-white/60 mb-1">Last Payout</p>
                      <p className="text-lg font-semibold">{creator.lastPayout}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'revenue' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white/60 mb-1">Creator Share</p>
                        <p className="text-2xl font-bold text-green-400">{shares.creator}%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-white/60 mb-1">Agency Share</p>
                        <p className="text-2xl font-bold text-purple-400">{shares.agency}%</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {Object.entries(splits).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                          <span className="text-sm font-semibold">{value}% / {100 - value}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={value}
                          onChange={(e) => setSplits({...splits, [key]: parseInt(e.target.value)})}
                          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-purple-600 [&::-webkit-slider-thumb]:to-pink-600"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setSplits({ subscriptions: 80, liveCam: 80, videoSales: 80, chat: 80, tips: 85, shop: 75 })}
                      className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-all"
                    >
                      Reset to Default
                    </button>
                    <button className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-medium transition-all">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'performance' && (
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-sm text-white/60 mb-1">Monthly Growth</p>
                    <p className="text-2xl font-bold text-green-400">+18%</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-sm text-white/60 mb-1">Avg. Session Duration</p>
                    <p className="text-2xl font-bold">42 min</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-sm text-white/60 mb-1">Fan Retention Rate</p>
                    <p className="text-2xl font-bold text-green-400">87%</p>
                  </div>
                </div>
              )}

              {activeTab === 'compliance' && (
                <div className="space-y-4">
                  <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4">
                    <p className="text-sm font-medium text-green-400 mb-1">✓ ID Verified</p>
                    <p className="text-xs text-white/60">Verified on 2024-11-15</p>
                  </div>
                  <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4">
                    <p className="text-sm font-medium text-green-400 mb-1">✓ Age Verified</p>
                    <p className="text-xs text-white/60">18+ confirmed</p>
                  </div>
                  <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4">
                    <p className="text-sm font-medium text-green-400 mb-1">✓ Contract Signed</p>
                    <p className="text-xs text-white/60">Signed on 2024-11-20</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}