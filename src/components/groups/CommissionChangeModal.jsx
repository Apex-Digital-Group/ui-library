import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, AlertTriangle } from 'lucide-react';
import BaseModal from '../BaseModal';

export default function CommissionChangeModal({ creator, onClose }) {
  const [newRate, setNewRate] = useState(creator.commission);
  const [submitted, setSubmitted] = useState(false);

  return (
    <BaseModal isOpen={true} onClose={onClose} backdrop="bg-black/70">
        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }}
          className="w-full max-w-md bg-[#2E2249] border border-white/20 rounded-2xl overflow-hidden"
          onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <h2 className="font-bold text-white">Change Commission</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg"><X className="w-5 h-5" /></button>
          </div>
          <div className="p-6 space-y-5">
            {!submitted ? (
              <>
                <div className="flex items-center gap-3">
                  <img src={creator.avatar} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold text-white">{creator.username}</div>
                    <div className="text-sm text-white/50">{creator.name}</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-white/50">Current Commission</span><span className="text-white font-bold">{creator.commission}%</span></div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">New Commission Percentage</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={newRate}
                      onChange={e => setNewRate(Number(e.target.value))}
                      className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-lg font-bold focus:outline-none focus:border-purple-500"
                    />
                    <span className="text-2xl text-white/50">%</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-xs text-white/60">
                  <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  This will apply to future transactions only. The creator must approve the change.
                </div>
                <div className="flex gap-3">
                  <button onClick={onClose} className="flex-1 py-3 border border-white/20 rounded-xl text-sm text-white/70 hover:bg-white/5 transition-all">Cancel</button>
                  <button onClick={() => setSubmitted(true)} className="flex-1 py-3 bg-yellow-600 hover:bg-yellow-700 rounded-xl text-sm font-bold text-white transition-all">Submit Change Request</button>
                </div>
              </>
            ) : (
              <div className="text-center py-6 space-y-3">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto" />
                <h3 className="text-lg font-bold text-white">Request Sent</h3>
                <p className="text-sm text-white/50">Commission change request sent to <strong className="text-white">{creator.username}</strong> for approval.</p>
                <div className="inline-block bg-yellow-500/20 border border-yellow-500/30 rounded-full px-3 py-1 text-xs text-yellow-400">Pending Approval</div>
                <button onClick={onClose} className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-sm font-medium text-white mt-2 transition-colors">Done</button>
              </div>
            )}
          </div>
        </motion.div>
    </BaseModal>
  );
}