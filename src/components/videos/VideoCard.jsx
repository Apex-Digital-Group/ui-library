import React from 'react';
import { Play, Video, Headphones } from 'lucide-react';

export default function VideoCard({ data, onUnlock }) {
  const handleClick = () => {
    if (data.displayName === 'PinkBlonde') {
      window.location.href = '/PinkBlondeLive';
    } else if (onUnlock) {
      onUnlock();
    }
  };

  return (
    <div className="group cursor-pointer" onClick={handleClick}>
      <div className="relative overflow-hidden rounded-xl aspect-video bg-[#2E2249] border-2 border-red-500/30 hover:border-pink-500 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/20">
        <img 
          src={data.thumbnail} 
          alt={data.displayName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2 mx-auto">
              <Play className="w-8 h-8 text-white ml-1" fill="white" />
            </div>
            <p className="text-sm font-medium text-white">Watch now</p>
          </div>
        </div>

        {/* Top left features */}
        <div className="absolute top-2 left-2 flex gap-1">
          {data.features?.hd && (
            <div className="bg-purple-600/90 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-bold">HD</div>
          )}
          {data.features?.audioChat && (
            <div className="bg-blue-600/90 backdrop-blur-sm p-1 rounded">
              <Headphones className="w-3 h-3" />
            </div>
          )}
          {data.features?.cam2cam && (
            <div className="bg-pink-600/90 backdrop-blur-sm p-1 rounded">
              <Video className="w-3 h-3" />
            </div>
          )}
          {data.features?.mobileLive && (
            <div className="bg-green-600/90 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-bold">📱</div>
          )}
        </div>

        {/* Top right ribbon */}
        {data.ribbonLabel && (
          <div className="absolute top-0 right-0 bg-gradient-to-br from-red-600 to-pink-600 px-3 py-1 text-xs font-bold shadow-lg" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 15% 100%)' }}>
            {data.ribbonLabel}
          </div>
        )}

        {/* Bottom overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {data.isOnline && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>}
              <span className="text-sm font-medium text-white">{data.displayName}</span>
            </div>
            {data.statusLabel && (
              <span className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded">{data.statusLabel}</span>
            )}
          </div>
        </div>
      </div>
      
      {/* Price info below card */}
      <div className="mt-2 flex items-center justify-between px-1">
        <span className="text-xs text-white/60">{data.showTypes?.[0] || 'Live'}</span>
        <span className="text-sm font-semibold text-purple-400">${data.pricePerMinute}/min</span>
      </div>
    </div>
  );
}