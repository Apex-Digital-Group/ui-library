import React from 'react';
import { TrendingUp, Home, MapPin, Sparkles } from 'lucide-react';

export default function PromotionsScreen({ onPromoteClick }) {
  const promotions = [
    {
      id: 1,
      icon: TrendingUp,
      title: 'Timeline Boost',
      description: 'Boost creator content in fan timelines',
      reach: '50,000-100,000 impressions',
      duration: '7 days',
      price: '$499',
      color: 'from-purple-600 to-pink-600',
    },
    {
      id: 2,
      icon: Home,
      title: 'Home Page Feature',
      description: 'Feature creator on platform homepage',
      reach: '200,000+ impressions',
      duration: '3 days',
      price: '$899',
      color: 'from-blue-600 to-cyan-600',
    },
    {
      id: 3,
      icon: MapPin,
      title: 'Geo Feature',
      description: 'Target specific geographic regions',
      reach: '30,000-75,000 impressions',
      duration: '5 days',
      price: '$349',
      color: 'from-green-600 to-emerald-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        {promotions.map((promo) => {
          const Icon = promo.icon;
          return (
            <div
              key={promo.id}
              className="bg-gradient-to-br from-[#2E2249] to-[#1a0e2e] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${promo.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{promo.title}</h3>
              <p className="text-white/60 text-sm mb-6">{promo.description}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Estimated Reach</span>
                  <span className="font-semibold">{promo.reach}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Duration</span>
                  <span className="font-semibold">{promo.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Price</span>
                  <span className="text-2xl font-bold">{promo.price}</span>
                </div>
              </div>

              <button
                onClick={() => onPromoteClick(promo)}
                className={`w-full py-3 bg-gradient-to-r ${promo.color} hover:shadow-lg hover:shadow-purple-500/30 rounded-xl font-semibold transition-all`}
              >
                Promote
              </button>
            </div>
          );
        })}
      </div>

      {/* Success Stories */}
      <div className="bg-gradient-to-br from-[#2E2249] to-[#1a0e2e] border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          <h2 className="text-xl font-bold">Recent Success Stories</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-sm text-white/60 mb-2">Timeline Boost for Ahri</p>
            <p className="text-2xl font-bold mb-1">+$8,450</p>
            <p className="text-xs text-green-400">+42% revenue increase</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-sm text-white/60 mb-2">Home Feature for Candy</p>
            <p className="text-2xl font-bold mb-1">+$12,200</p>
            <p className="text-xs text-green-400">+68% revenue increase</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-sm text-white/60 mb-2">Geo Feature for Ruby</p>
            <p className="text-2xl font-bold mb-1">+$5,890</p>
            <p className="text-xs text-green-400">+35% revenue increase</p>
          </div>
        </div>
      </div>
    </div>
  );
}