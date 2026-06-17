import React, { useState } from 'react';
import { Users, Radio, DollarSign, TrendingUp, Percent, Clock } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function OverviewScreen({ onCreatorClick }) {
  const [revenueView, setRevenueView] = useState('gross');

  const stats = [
    { label: 'Total Creators', value: '47', icon: Users, trend: '+3 this month', color: 'from-blue-500 to-cyan-500' },
    { label: 'Creators Online Now', value: '23', icon: Radio, trend: '49% online rate', color: 'from-green-500 to-emerald-500' },
    { label: 'Monthly Gross Revenue', value: '$284,519', icon: DollarSign, trend: '+18% vs last month', color: 'from-purple-500 to-pink-500' },
    { label: 'Agency Share This Month', value: '$56,904', icon: Percent, trend: '20% average', color: 'from-orange-500 to-red-500' },
    { label: 'Avg Revenue Per Creator', value: '$6,053', icon: TrendingUp, trend: '+12% growth', color: 'from-indigo-500 to-purple-500' },
    { label: 'Pending Payouts', value: '$14,250', icon: Clock, trend: '8 requests', color: 'from-pink-500 to-rose-500' },
  ];

  const revenueData = [
    { month: 'Jan', gross: 180000, creator: 144000, agency: 36000 },
    { month: 'Feb', gross: 205000, creator: 164000, agency: 41000 },
    { month: 'Mar', gross: 228000, creator: 182400, agency: 45600 },
    { month: 'Apr', gross: 250000, creator: 200000, agency: 50000 },
    { month: 'May', gross: 265000, creator: 212000, agency: 53000 },
    { month: 'Jun', gross: 284519, creator: 227615, agency: 56904 },
  ];

  const streamData = [
    { name: 'Subscriptions', value: 85000 },
    { name: 'Live Cam', value: 72000 },
    { name: 'Video Sales', value: 45000 },
    { name: 'Chat', value: 38000 },
    { name: 'Tips', value: 28000 },
    { name: 'Fund Me', value: 10519 },
    { name: 'Shop Sales', value: 6000 },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <button
              key={idx}
              className="group relative bg-gradient-to-br from-[#2E2249] to-[#1a0e2e] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all hover:shadow-lg hover:shadow-purple-500/20"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs text-green-400 font-medium">{stat.trend}</span>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-white/60">{stat.label}</div>
            </button>
          );
        })}
      </div>

      {/* Revenue Chart */}
      <div className="bg-gradient-to-br from-[#2E2249] to-[#1a0e2e] border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Revenue Over Time</h2>
          <div className="flex gap-2">
            {['gross', 'creator', 'agency'].map((view) => (
              <button
                key={view}
                onClick={() => setRevenueView(view)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  revenueView === view
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis dataKey="month" stroke="#ffffff60" />
            <YAxis stroke="#ffffff60" />
            <Tooltip contentStyle={{ backgroundColor: '#2E2249', border: '1px solid rgba(255,255,255,0.1)' }} />
            <Legend />
            {revenueView === 'gross' && <Line type="monotone" dataKey="gross" stroke="#a855f7" strokeWidth={3} dot={{ fill: '#a855f7', r: 4 }} />}
            {revenueView === 'creator' && <Line type="monotone" dataKey="creator" stroke="#22c55e" strokeWidth={3} dot={{ fill: '#22c55e', r: 4 }} />}
            {revenueView === 'agency' && <Line type="monotone" dataKey="agency" stroke="#ec4899" strokeWidth={3} dot={{ fill: '#ec4899', r: 4 }} />}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue by Stream */}
      <div className="bg-gradient-to-br from-[#2E2249] to-[#1a0e2e] border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-6">Revenue by Stream</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={streamData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis dataKey="name" stroke="#ffffff60" angle={-45} textAnchor="end" height={80} />
            <YAxis stroke="#ffffff60" />
            <Tooltip contentStyle={{ backgroundColor: '#2E2249', border: '1px solid rgba(255,255,255,0.1)' }} />
            <Bar dataKey="value" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}