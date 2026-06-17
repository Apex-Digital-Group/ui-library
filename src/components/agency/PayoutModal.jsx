import React from 'react';
import { X, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PayoutModal({ payout, isOpen, onClose }) {
  if (!payout) return null;

  const events = [
    { time: '2025-12-23 10:30 AM', event: 'Payout requested', icon: Clock, color: 'text-blue-400' },
    { time: '2025-12-23 10:32 AM', event: 'Request validated', icon: CheckCircle, color: 'text-green-400' },
    { time: '2025-12-23 10:35 AM', event: 'Pending agency approval', icon: AlertCircle, color: 'text-yellow-400' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gradient-to-br from-[#2E2249] to-[#1a0e2e] border border-white/10 rounded-2xl p-6 max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Payout Details</h2>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Payout Summary */}
              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6 mb-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-white/60 mb-1">Creator</p>
                    <p className="text-xl font-bold">{payout.creator}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/60 mb-1">Amount</p>
                    <p className="text-xl font-bold">{payout.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/60 mb-1">Method</p>
                    <p className="text-lg font-semibold">{payout.method}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/60 mb-1">Status</p>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                      payout.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'
                    }`}>
                      {payout.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Breakdown */}
              <div className="bg-white/5 rounded-xl p-4 mb-6">
                <h3 className="font-semibold mb-4">Payout Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Gross Earnings</span>
                    <span className="font-semibold">$28,450</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Platform Fee (5%)</span>
                    <span className="font-semibold text-red-400">-$1,422.50</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Agency Share (20%)</span>
                    <span className="font-semibold text-purple-400">-$5,690</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Processing Fee</span>
                    <span className="font-semibold text-red-400">-$25</span>
                  </div>
                  <div className="h-px bg-white/10 my-2"></div>
                  <div className="flex justify-between font-bold">
                    <span>Creator Net Payout</span>
                    <span className="text-green-400">{payout.amount}</span>
                  </div>
                </div>
              </div>

              {/* Event Log */}
              <div className="bg-white/5 rounded-xl p-4">
                <h3 className="font-semibold mb-4">Event Log</h3>
                <div className="space-y-3">
                  {events.map((event, idx) => {
                    const Icon = event.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3">
                        <Icon className={`w-5 h-5 mt-0.5 ${event.color}`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{event.event}</p>
                          <p className="text-xs text-white/40">{event.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}