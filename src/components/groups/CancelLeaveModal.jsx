import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function CancelLeaveModal({ onConfirm, onClose }) {
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 z-[10000] flex items-center justify-center p-4" onClick={onClose}>
        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }}
          className="w-full max-w-md bg-[#2E2249] border border-white/20 rounded-2xl overflow-hidden"
          onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <h2 className="font-bold text-white">Cancel Leave Request</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg"><X className="w-5 h-5" /></button>
          </div>
          <div className="p-6 space-y-5">
            <p className="text-white/70">Are you sure you want to cancel your leave request? You will remain an active member of the group.</p>
            <div className="flex gap-3">
              <button onClick={onClose} className="flex-1 py-3 border border-white/20 rounded-xl text-sm text-white/70 hover:bg-white/5 transition-all">Keep Leave Request Active</button>
              <button onClick={onConfirm} className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-sm font-bold text-white transition-all">Confirm Cancel</button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}