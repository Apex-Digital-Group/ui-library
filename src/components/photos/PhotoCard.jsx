import React from 'react';
import { Lock, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PhotoCard({ data, onUnlock }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={() => onUnlock && onUnlock()}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#2E2249]">
        <img 
          src={data.image} 
          alt={data.author}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${data.isLocked ? 'blur-lg' : ''}`}
        />
        
        {data.isLocked && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center">
            {data.lockType === 'unlock' ? (
              <>
                <Lock className="w-12 h-12 text-white mb-3" />
                <span className="text-white font-semibold text-lg">Unlock Me</span>
                <button className="mt-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-2 rounded-full text-sm font-medium transition-all">
                  Unlock
                </button>
              </>
            ) : (
              <>
                <Crown className="w-12 h-12 text-yellow-400 mb-3" />
                <span className="text-white font-semibold text-lg">Subscribe</span>
                <button className="mt-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 px-6 py-2 rounded-full text-sm font-medium transition-all">
                  Subscribe
                </button>
              </>
            )}
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform">
          <p className="text-white font-semibold text-sm truncate">{data.author}</p>
          <p className="text-white/70 text-xs">{data.category}</p>
        </div>
      </div>
    </motion.div>
  );
}