import React from 'react';
import { motion } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import BaseModal from './BaseModal';

export default function WelcomeModal({ isOpen, onClose, onSelectType }) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} lockScroll backdrop="bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-6xl max-h-[90vh] bg-[#1a0e2e] rounded-3xl shadow-2xl overflow-hidden relative"
          style={{ position: 'relative' }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Join LiveGemini</h2>
              <p className="text-white/70 text-lg">Choose how you want to experience our platform</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* Content Creator Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group relative bg-gradient-to-br from-[#2E2249] to-[#1a0e2e] rounded-3xl overflow-hidden border-2 border-white/10 hover:border-purple-500 transition-all cursor-pointer"
                onClick={() => onSelectType('creator')}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/b7fd77888_e9d345a77_65d7a5a2c312a.jpeg"
                    alt="Content Creator"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                  <h3 className="text-3xl font-bold text-white mb-6">CONTENT CREATOR</h3>
                  <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-full flex items-center justify-center gap-2 mx-auto transition-all group-hover:scale-105 shadow-lg">
                    Sign Up
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>

              {/* Member Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group relative bg-gradient-to-br from-[#2E2249] to-[#1a0e2e] rounded-3xl overflow-hidden border-2 border-white/10 hover:border-pink-500 transition-all cursor-pointer"
                onClick={() => onSelectType('member')}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/cb4bc0b07_1bda7eff495213fc3276fdb20e0cfa72_erotic_576x324.jpeg"
                    alt="Member"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                  <h3 className="text-3xl font-bold text-white mb-6">MEMBER</h3>
                  <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-full flex items-center justify-center gap-2 mx-auto transition-all group-hover:scale-105 shadow-lg">
                    Sign Up
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
    </BaseModal>
  );
}