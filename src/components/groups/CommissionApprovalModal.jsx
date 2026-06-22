import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import BaseModal from '../BaseModal';

export default function CommissionApprovalModal({ data, groupName, groupOwner, currentNet, onClose }) {
  const [result, setResult] = useState(null);
  const newNet = currentNet - (data.newRate - data.oldRate);

  return (
    <BaseModal isOpen={true} onClose={onClose} backdrop="bg-black/70">
        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }}
          className="w-full max-w-md bg-[#2E2249] border border-white/20 rounded-2xl overflow-hidden"
          onClick={e => e.stopPropagation()}>

          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <h2 className="font-bold text-white">Commission Change Request</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg"><X className="w-5 h-5" /></button>
          </div>

          <div className="p-6 space-y-5">
            {!result ? (
              <>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-white/50">Group</span><span className="text-white">{groupName}</span></div>
                  <div className="flex justify-between"><span className="text-white/50">Group Owner</span><span className="text-purple-400">{groupOwner}</span></div>
                  <div className="flex justify-between"><span className="text-white/50">Current Rate</span><span className="text-white">{data.oldRate}%</span></div>
                  <div className="flex justify-between"><span className="text-white/50">New Rate</span><span className="text-yellow-400 font-bold">{data.newRate}%</span></div>
                  <div className="flex justify-between"><span className="text-white/50">Current Net Earnings</span><span className="text-green-400">{currentNet}%</span></div>
                  <div className="flex justify-between"><span className="text-white/50">New Estimated Net</span><span className={newNet < currentNet ? 'text-red-400' : 'text-green-400'}>{newNet}%</span></div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 flex gap-2 text-xs text-white/60">
                  <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  This will apply to future transactions only. Past earnings are not affected.
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setResult('declined')} className="flex-1 py-3 border border-red-500/40 text-red-400 hover:bg-red-500/10 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all">
                    <XCircle className="w-4 h-4" /> Decline
                  </button>
                  <button onClick={() => setResult('approved')} className="flex-1 py-3 bg-green-600 hover:bg-green-700 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all">
                    <CheckCircle className="w-4 h-4" /> Approve
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-6 space-y-3">
                {result === 'approved' ? (
                  <>
                    <CheckCircle className="w-12 h-12 text-green-400 mx-auto" />
                    <h3 className="text-xl font-bold text-white">Commission Approved</h3>
                    <p className="text-white/50 text-sm">Your new rate of {data.newRate}% is now active.</p>
                  </>
                ) : (
                  <>
                    <XCircle className="w-12 h-12 text-red-400 mx-auto" />
                    <h3 className="text-xl font-bold text-white">Commission Declined</h3>
                    <p className="text-white/50 text-sm">Your current rate of {data.oldRate}% remains unchanged.</p>
                  </>
                )}
                <button onClick={onClose} className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-sm font-medium text-white mt-2 transition-colors">Close</button>
              </div>
            )}
          </div>
        </motion.div>
    </BaseModal>
  );
}