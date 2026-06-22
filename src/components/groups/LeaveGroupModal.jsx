import React from 'react';
import { motion } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';
import BaseModal from '../BaseModal';

export default function LeaveGroupModal({ groupName, onConfirm, onClose }) {
  return (
    <BaseModal isOpen={true} onClose={onClose} backdrop="bg-black/70">
        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }}
          className="w-full max-w-md bg-[#2E2249] border border-white/20 rounded-2xl overflow-hidden"
          onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <h2 className="font-bold text-white">Leave Group</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg"><X className="w-5 h-5" /></button>
          </div>
          <div className="p-6 space-y-5">
            <div className="flex gap-3 bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
              <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-white/70">
                <strong className="text-white block mb-1">Not immediate</strong>
                Your request to leave <strong className="text-white">{groupName}</strong> will begin a 24 hour countdown. You will remain a group member during this period and can cancel the request at any time.
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={onClose} className="flex-1 py-3 border border-white/20 hover:border-white/40 rounded-xl text-sm text-white/70 hover:text-white transition-all">Cancel</button>
              <button onClick={onConfirm} className="flex-1 py-3 bg-red-600 hover:bg-red-700 rounded-xl text-sm font-bold text-white transition-all">Start Leave Request</button>
            </div>
          </div>
        </motion.div>
    </BaseModal>
  );
}