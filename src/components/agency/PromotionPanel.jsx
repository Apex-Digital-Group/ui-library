import React, { useState } from 'react';
import { X, Calendar, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PromotionPanel({ isOpen, onClose, promotionData }) {
  const [selectedCreator, setSelectedCreator] = useState('');
  const [budget, setBudget] = useState(500);
  const [startDate, setStartDate] = useState('2025-12-26');
  const [endDate, setEndDate] = useState('2026-01-02');

  const creators = ['Ahri', 'Candy Crush', 'Sassy Sarah', 'Vixen Victoria', 'Ruby Ravish'];

  if (!promotionData) return null;

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
            className="fixed right-0 top-0 bottom-0 w-[500px] bg-gradient-to-br from-[#2E2249] to-[#1a0e2e] border-l border-white/10 z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{promotionData.title}</h2>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Creator Selection */}
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Select Creator</label>
                  <select
                    value={selectedCreator}
                    onChange={(e) => setSelectedCreator(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Choose a creator...</option>
                    {creators.map((creator) => (
                      <option key={creator} value={creator}>{creator}</option>
                    ))}
                  </select>
                </div>

                {/* Budget Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-white/60">Budget</label>
                    <span className="text-xl font-bold">${budget}</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="2000"
                    step="50"
                    value={budget}
                    onChange={(e) => setBudget(parseInt(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-purple-600 [&::-webkit-slider-thumb]:to-pink-600"
                  />
                  <div className="flex justify-between text-xs text-white/40 mt-1">
                    <span>$100</span>
                    <span>$2,000</span>
                  </div>
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-white/60 mb-2">
                      <Calendar className="w-4 h-4" />
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-white/60 mb-2">
                      <Calendar className="w-4 h-4" />
                      End Date
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                {/* Preview */}
                {selectedCreator && (
                  <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-4">
                    <h3 className="font-semibold mb-3">Preview</h3>
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-lg font-bold">
                          {selectedCreator[0]}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{selectedCreator}</p>
                          <span className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded-full">Promoted</span>
                        </div>
                      </div>
                      <p className="text-sm text-white/60">This content will appear in your target audience's feed</p>
                    </div>
                  </div>
                )}

                {/* Summary */}
                <div className="bg-white/5 rounded-xl p-4">
                  <h3 className="font-semibold mb-3">Campaign Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Estimated Reach</span>
                      <span className="font-semibold">{promotionData.reach}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Duration</span>
                      <span className="font-semibold">{Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Budget</span>
                      <span className="font-semibold">${budget}</span>
                    </div>
                    <div className="h-px bg-white/10 my-2"></div>
                    <div className="flex justify-between font-bold">
                      <span>Total Cost</span>
                      <span className="text-green-400">${budget}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={!selectedCreator}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Launch Campaign
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}