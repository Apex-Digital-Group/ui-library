import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle } from 'lucide-react';

export default function AccountPendingModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const isApproved = localStorage.getItem('account_approved');
    const isRegistered = localStorage.getItem('user_registered');
    
    if (isRegistered === 'true' && isApproved !== 'true') {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleApprove = () => {
    localStorage.setItem('account_approved', 'true');
    setIsOpen(false);
    window.location.reload();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-[10001]"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="bg-gradient-to-br from-[#2E2249] to-[#1a0e2e] border border-white/20 rounded-2xl shadow-2xl w-full max-w-md mx-auto p-8 text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Clock className="w-10 h-10 text-yellow-400" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-3">Account Pending Approval</h2>
            <p className="text-white/70 mb-6">
              Your account has been submitted for review. Our team will review your registration and approve your access shortly. You'll receive an email notification once approved.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-white/60">Status</span>
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-semibold">
                  Pending Review
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">Estimated Time</span>
                <span className="text-sm font-semibold text-white">1-24 hours</span>
              </div>
            </div>

            <p className="text-xs text-white/50 mb-6">
              This is a demo. Click below to simulate admin approval.
            </p>

            <Button
              onClick={handleApprove}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 text-base transition-all rounded-lg flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Simulate Admin Approval
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}