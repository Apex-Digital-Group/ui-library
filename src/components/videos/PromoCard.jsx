import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PromoCard({ data }) {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-xl aspect-video bg-gradient-to-br from-blue-600 to-purple-600 border-2 border-blue-500/50 hover:border-blue-400 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30">
        <img 
          src={data.thumbnail} 
          alt={data.promoTitle}
          className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity"
        />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <Sparkles className="w-12 h-12 text-yellow-400 mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">{data.promoTitle}</h3>
          <p className="text-sm text-white/80 mb-4">{data.promoSubtitle}</p>
          <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white font-semibold">
            {data.promoCtaLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}