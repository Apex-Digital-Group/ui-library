import React from 'react';
import { motion } from 'framer-motion';
import { X, Lock, Sparkles } from 'lucide-react';
import BaseModal from './BaseModal';

export default function UnlockContentModal({ isOpen, onClose, post }) {
  if (!post) return null;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} backdrop="bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md bg-gradient-to-br from-[#3a2d58] to-[#2E2249] rounded-2xl shadow-2xl overflow-hidden border border-purple-500/30"
        >
          {/* Header */}
          <div className="relative">
            <div className="aspect-video relative">
              <img 
                src={post.authorImage} 
                alt={post.author} 
                className="w-full h-full object-cover blur-xl scale-110"
              />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Lock className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={post.authorImage} 
                alt={post.author} 
                className="w-12 h-12 rounded-full object-cover border-2 border-purple-500"
              />
              <div>
                <h3 className="font-bold text-white">{post.authorName}</h3>
                <p className="text-sm text-white/60">@{post.author}</p>
              </div>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span className="font-semibold text-white">Premium Content</span>
              </div>
              <p className="text-sm text-white/70">
                Unlock this exclusive video and get access to premium content from {post.authorName}.
              </p>
            </div>

            <div className="flex items-center justify-between mb-6 p-4 bg-white/5 rounded-xl">
              <span className="text-white/70">Price</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">50</span>
                <span className="text-purple-400 font-medium">Credits</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-white font-bold text-lg transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-5 h-5" />
              Unlock Now
            </button>

            <p className="text-center text-white/50 text-xs mt-4">
              Your purchase supports the creator directly
            </p>
          </div>
        </motion.div>
    </BaseModal>
  );
}