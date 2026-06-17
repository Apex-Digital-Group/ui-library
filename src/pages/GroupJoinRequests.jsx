import React, { useState } from 'react';
import { MessageSquare, CheckCircle, XCircle } from 'lucide-react';
import GroupsLayout from '../components/groups/GroupsLayout';
import StatusBadge from '../components/groups/StatusBadge';
import { mockJoinRequests } from '../lib/groupsMockData';
import { motion, AnimatePresence } from 'framer-motion';

function ApproveModal({ creator, onConfirm, onClose }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 z-[10000] flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }}
        className="w-full max-w-sm bg-[#2E2249] border border-white/20 rounded-2xl p-6 space-y-4"
        onClick={e => e.stopPropagation()}>
        <h3 className="font-bold text-white">Approve Creator?</h3>
        <p className="text-sm text-white/60">Approve <strong className="text-white">{creator.username}</strong> into your group? They will be notified immediately.</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 border border-white/20 rounded-xl text-sm text-white/70 hover:bg-white/5 transition-all">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 rounded-xl text-sm font-bold text-white transition-all">Approve</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function RejectModal({ creator, onConfirm, onClose }) {
  const [reason, setReason] = useState('');
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 z-[10000] flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }}
        className="w-full max-w-sm bg-[#2E2249] border border-white/20 rounded-2xl p-6 space-y-4"
        onClick={e => e.stopPropagation()}>
        <h3 className="font-bold text-white">Reject Request?</h3>
        <p className="text-sm text-white/60">Optionally provide a reason for <strong className="text-white">{creator.username}</strong>:</p>
        <textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="Reason (optional)..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 resize-none focus:outline-none focus:border-purple-500" rows={3} />
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 border border-white/20 rounded-xl text-sm text-white/70 hover:bg-white/5 transition-all">Cancel</button>
          <button onClick={() => onConfirm(reason)} className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 rounded-xl text-sm font-bold text-white transition-all">Reject</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function GroupJoinRequests() {
  const [requests, setRequests] = useState(mockJoinRequests.map(r => ({ ...r, status: 'pending' })));
  const [approveModal, setApproveModal] = useState(null);
  const [rejectModal, setRejectModal] = useState(null);

  const handleApprove = (id) => {
    setRequests(rs => rs.map(r => r.id === id ? { ...r, status: 'approved' } : r));
    setApproveModal(null);
  };
  const handleReject = (id) => {
    setRequests(rs => rs.map(r => r.id === id ? { ...r, status: 'rejected' } : r));
    setRejectModal(null);
  };

  return (
    <GroupsLayout activeNav="requests" role="owner">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Join Requests</h1>
          <p className="text-white/50 mt-1">{requests.filter(r => r.status === 'pending').length} pending requests</p>
        </div>

        <div className="space-y-4">
          {requests.map(r => (
            <div key={r.id} className={`bg-[#2E2249] border rounded-2xl p-5 transition-all
              ${r.status === 'approved' ? 'border-green-500/30' : r.status === 'rejected' ? 'border-red-500/20 opacity-60' : 'border-white/10'}`}>
              <div className="flex flex-wrap gap-4 items-start">
                <img src={r.avatar} className="w-14 h-14 rounded-2xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-bold text-white text-lg">{r.username}</span>
                    <StatusBadge status={r.status === 'pending' ? 'pending' : r.status === 'approved' ? 'approved' : 'rejected'} />
                    <StatusBadge status={r.accountStatus} />
                  </div>
                  <div className="text-xs text-white/40 mt-1">Requested {new Date(r.requestedAt).toLocaleDateString()}</div>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm">
                    <div><span className="text-white/40">Followers</span> <span className="text-white font-medium">{r.followers.toLocaleString()}</span></div>
                    <div><span className="text-white/40">Avg Monthly</span> <span className="text-green-400 font-medium">${r.avgMonthlyEarnings.toLocaleString()}</span></div>
                    <div><span className="text-white/40">Content</span> <span className="text-white">{r.contentTypes.join(', ')}</span></div>
                  </div>
                </div>
                {r.status === 'pending' && (
                  <div className="flex gap-2 flex-shrink-0">
                    <button className="flex items-center gap-1.5 px-3 py-2 border border-white/20 rounded-lg text-xs text-white/60 hover:text-white hover:bg-white/5 transition-all">
                      <MessageSquare className="w-3.5 h-3.5" /> Message
                    </button>
                    <button onClick={() => setRejectModal(r)} className="flex items-center gap-1.5 px-3 py-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-lg text-xs transition-all">
                      <XCircle className="w-3.5 h-3.5" /> Reject
                    </button>
                    <button onClick={() => setApproveModal(r)} className="flex items-center gap-1.5 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium transition-all">
                      <CheckCircle className="w-3.5 h-3.5" /> Approve
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {approveModal && <ApproveModal creator={approveModal} onConfirm={() => handleApprove(approveModal.id)} onClose={() => setApproveModal(null)} />}
        {rejectModal && <RejectModal creator={rejectModal} onConfirm={() => handleReject(rejectModal.id)} onClose={() => setRejectModal(null)} />}
      </AnimatePresence>
    </GroupsLayout>
  );
}