import React, { useState } from 'react';
import { Filter, Search } from 'lucide-react';

export default function CreatorsScreen({ onCreatorClick }) {
  const [filters, setFilters] = useState({ status: 'all', location: 'all', revenue: 'all' });

  const creators = [
    { id: 1, avatar: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/5bbab6525_0a375a0a705a1f1052460dd069d2953f_erotic_576x324.jpeg', name: 'Ahri', status: 'online', country: 'USA', earnings: '$28,450', percentage: '20%', lastPayout: '2025-12-20' },
    { id: 2, avatar: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/cb4bc0b07_1bda7eff495213fc3276fdb20e0cfa72_erotic_576x324.jpeg', name: 'Candy Crush', status: 'online', country: 'UK', earnings: '$24,200', percentage: '18%', lastPayout: '2025-12-18' },
    { id: 3, avatar: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/fc6e5695e_1f76584d5bcc5f95f5fe078d407416f1_erotic_576x324.jpeg', name: 'Sassy Sarah', status: 'offline', country: 'Canada', earnings: '$19,800', percentage: '22%', lastPayout: '2025-12-15' },
    { id: 4, avatar: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/868fadefc_2b04cab87096b6db71a221078c75d6d2_erotic_576x324.jpeg', name: 'Vixen Victoria', status: 'online', country: 'USA', earnings: '$22,350', percentage: '20%', lastPayout: '2025-12-22' },
    { id: 5, avatar: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/2ad34be5e_2df005f71d92610399c40e171ae816be_erotic_576x324.jpeg', name: 'Ruby Ravish', status: 'online', country: 'Australia', earnings: '$18,900', percentage: '19%', lastPayout: '2025-12-19' },
  ];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-gradient-to-br from-[#2E2249] to-[#1a0e2e] border border-white/10 rounded-2xl p-4">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-white/60" />
          <select
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Status</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
          <select
            value={filters.location}
            onChange={(e) => setFilters({...filters, location: e.target.value})}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Locations</option>
            <option value="usa">USA</option>
            <option value="uk">UK</option>
            <option value="canada">Canada</option>
          </select>
          <select
            value={filters.revenue}
            onChange={(e) => setFilters({...filters, revenue: e.target.value})}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Revenue</option>
            <option value="high">$20k+</option>
            <option value="medium">$10k-$20k</option>
            <option value="low">Under $10k</option>
          </select>
        </div>
      </div>

      {/* Creators Table */}
      <div className="bg-gradient-to-br from-[#2E2249] to-[#1a0e2e] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-sm font-medium text-white/60">Creator</th>
                <th className="text-left p-4 text-sm font-medium text-white/60">Status</th>
                <th className="text-left p-4 text-sm font-medium text-white/60">Country</th>
                <th className="text-left p-4 text-sm font-medium text-white/60">Total Earnings</th>
                <th className="text-left p-4 text-sm font-medium text-white/60">Agency %</th>
                <th className="text-left p-4 text-sm font-medium text-white/60">Last Payout</th>
                <th className="text-left p-4 text-sm font-medium text-white/60">Action</th>
              </tr>
            </thead>
            <tbody>
              {creators.map((creator) => (
                <tr
                  key={creator.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => onCreatorClick(creator)}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={creator.avatar} alt={creator.name} className="w-10 h-10 rounded-full object-cover" />
                      <span className="font-medium">{creator.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                      creator.status === 'online' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${creator.status === 'online' ? 'bg-green-400' : 'bg-gray-400'}`}></span>
                      {creator.status}
                    </span>
                  </td>
                  <td className="p-4 text-white/80">{creator.country}</td>
                  <td className="p-4 font-semibold">{creator.earnings}</td>
                  <td className="p-4 text-purple-400">{creator.percentage}</td>
                  <td className="p-4 text-white/60">{creator.lastPayout}</td>
                  <td className="p-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onCreatorClick(creator);
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-sm font-medium transition-all"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}