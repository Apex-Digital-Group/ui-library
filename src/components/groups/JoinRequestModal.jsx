import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

export default function JoinRequestModal({ group, onClose }) {
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (agreed) setSubmitted(true);
  };

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 z-[10000] flex items-center justify-center p-4"
        onClick={onClose}>
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-md bg-[#2E2249] border border-white/20 rounded-2xl overflow-hidden"
          onClick={e => e.stopPropagation()}>

          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <h2 className="text-lg font-bold text-white">Request to Join</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg"><X className="w-5 h-5" /></button>
          </div>

          <div className="p-6">
            {!submitted ? (
              <div className="space-y-5">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="font-semibold text-white text-lg">{group.name}</div>
                  <div className="text-sm text-purple-400">{group.owner}</div>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-white/60 text-sm">Advertised commission:</span>
                    <span className="text-green-400 font-bold text-lg">{group.commission}%</span>
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white/70">
                    By joining this group, the Group Owner will receive a commission from your earnings. Your actual commission rate may be adjusted after joining.
                  </p>
                </div>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <div
                    onClick={() => setAgreed(!agreed)}
                    className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors cursor-pointer
                      ${agreed ? 'bg-purple-600 border-purple-600' : 'border-white/30 hover:border-purple-400'}`}>
                    {agreed && <CheckCircle className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-sm text-white/70">
                    I understand that this group charges a <strong className="text-white">{group.commission}% commission</strong> and that my net earnings will be calculated after the platform fee and this group commission.
                  </span>
                </label>

                <div className="flex gap-3">
                  <button onClick={onClose} className="flex-1 py-3 border border-white/20 hover:border-white/40 rounded-xl text-sm font-medium text-white/70 hover:text-white transition-all">
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!agreed}
                    className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-sm font-bold text-white transition-all">
                    Submit Request
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Request Sent!</h3>
                  <p className="text-white/60">Your request has been sent to the Group Owner.</p>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-4 py-2 inline-block">
                  <span className="text-yellow-400 text-sm font-semibold">Status: Pending Approval</span>
                </div>
                <button onClick={onClose} className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-sm font-medium text-white transition-colors">
                  Done
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}