import React from 'react';
import { AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

export default function EarningsScreen({ onCreatorClick }) {
  const earningsOverTime = [
    { month: 'Jan', subscriptions: 60000, liveCam: 45000, videos: 30000, chat: 25000, tips: 15000, other: 5000 },
    { month: 'Feb', subscriptions: 68000, liveCam: 48000, videos: 35000, chat: 28000, tips: 18000, other: 8000 },
    { month: 'Mar', subscriptions: 75000, liveCam: 52000, videos: 40000, chat: 30000, tips: 20000, other: 11000 },
    { month: 'Apr', subscriptions: 82000, liveCam: 58000, videos: 42000, chat: 32000, tips: 24000, other: 12000 },
    { month: 'May', subscriptions: 85000, liveCam: 65000, videos: 45000, chat: 35000, tips: 25000, other: 10000 },
    { month: 'Jun', subscriptions: 90000, liveCam: 72000, videos: 48000, chat: 38000, tips: 28000, other: 8519 },
  ];

  const earningsByCountry = [
    { name: 'USA', value: 120000, color: '#a855f7' },
    { name: 'UK', value: 85000, color: '#ec4899' },
    { name: 'Canada', value: 42000, color: '#3b82f6' },
    { name: 'Australia', value: 25000, color: '#22c55e' },
    { name: 'Other', value: 12519, color: '#f59e0b' },
  ];

  const creatorBreakdown = [
    { name: 'Ahri', total: 28450, agency: 5690, creator: 22760, chargebacks: 120, refunds: 80 },
    { name: 'Candy Crush', total: 24200, agency: 4356, creator: 19844, chargebacks: 85, refunds: 45 },
    { name: 'Sassy Sarah', total: 19800, agency: 4356, creator: 15444, chargebacks: 65, refunds: 35 },
    { name: 'Vixen Victoria', total: 22350, agency: 4470, creator: 17880, chargebacks: 95, refunds: 55 },
    { name: 'Ruby Ravish', total: 18900, agency: 3591, creator: 15309, chargebacks: 70, refunds: 40 },
  ];

  return (
    <div className="space-y-6">
      {/* Earnings Over Time */}
      <div className="bg-gradient-to-br from-[#2E2249] to-[#1a0e2e] border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-6">Earnings by Stream Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={earningsOverTime}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis dataKey="month" stroke="#ffffff60" />
            <YAxis stroke="#ffffff60" />
            <Tooltip contentStyle={{ backgroundColor: '#2E2249', border: '1px solid rgba(255,255,255,0.1)' }} />
            <Legend />
            <Area type="monotone" dataKey="subscriptions" stackId="1" stroke="#a855f7" fill="#a855f7" fillOpacity={0.8} />
            <Area type="monotone" dataKey="liveCam" stackId="1" stroke="#ec4899" fill="#ec4899" fillOpacity={0.8} />
            <Area type="monotone" dataKey="videos" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.8} />
            <Area type="monotone" dataKey="chat" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.8} />
            <Area type="monotone" dataKey="tips" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.8} />
            <Area type="monotone" dataKey="other" stackId="1" stroke="#6b7280" fill="#6b7280" fillOpacity={0.8} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Earnings by Country */}
      <div className="bg-gradient-to-br from-[#2E2249] to-[#1a0e2e] border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-6">Earnings by Country</h2>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={earningsByCountry}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {earningsByCountry.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#2E2249', border: '1px solid rgba(255,255,255,0.1)' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Creator Breakdown */}
      <div className="bg-gradient-to-br from-[#2E2249] to-[#1a0e2e] border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold">Creator Breakdown</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-sm font-medium text-white/60">Creator</th>
                <th className="text-right p-4 text-sm font-medium text-white/60">Total Earnings</th>
                <th className="text-right p-4 text-sm font-medium text-white/60">Agency Share</th>
                <th className="text-right p-4 text-sm font-medium text-white/60">Creator Share</th>
                <th className="text-right p-4 text-sm font-medium text-white/60">Chargebacks</th>
                <th className="text-right p-4 text-sm font-medium text-white/60">Refunds</th>
              </tr>
            </thead>
            <tbody>
              {creatorBreakdown.map((creator, idx) => (
                <tr
                  key={idx}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => onCreatorClick({ name: creator.name })}
                >
                  <td className="p-4 font-medium">{creator.name}</td>
                  <td className="p-4 text-right font-semibold">${creator.total.toLocaleString()}</td>
                  <td className="p-4 text-right text-purple-400">${creator.agency.toLocaleString()}</td>
                  <td className="p-4 text-right text-green-400">${creator.creator.toLocaleString()}</td>
                  <td className="p-4 text-right text-red-400">${creator.chargebacks}</td>
                  <td className="p-4 text-right text-orange-400">${creator.refunds}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}