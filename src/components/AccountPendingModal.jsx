import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle } from 'lucide-react';
import BaseModal from './BaseModal';

const DEFAULT_DESCRIPTION =
  "Your account has been submitted for review. Our team will review your registration and approve your access shortly. You'll receive an email notification once approved.";

export default function AccountPendingModal({
  isOpen: isOpenProp,
  onClose,
  onApprove,
  title = 'Account Pending Approval',
  description = DEFAULT_DESCRIPTION,
  status = 'Pending Review',
  estimatedTime = '1-24 hours',
  note = 'This is a demo. Click below to simulate admin approval.',
  approveLabel = 'Simulate Admin Approval',
}) {
  // Controlled (isOpen passed) vs. uncontrolled (self-opens for a registered,
  // not-yet-approved user). Storybook / parents pass isOpen to drive it.
  const isControlled = isOpenProp !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = isControlled ? isOpenProp : internalOpen;

  useEffect(() => {
    if (isControlled) return undefined;
    const isApproved = localStorage.getItem('account_approved');
    const isRegistered = localStorage.getItem('user_registered');
    if (isRegistered === 'true' && isApproved !== 'true') {
      const timer = setTimeout(() => setInternalOpen(true), 1000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isControlled]);

  const handleClose = () => {
    if (isControlled) onClose?.();
    else setInternalOpen(false);
  };

  const handleApprove = () => {
    if (onApprove) {
      onApprove();
      return;
    }
    localStorage.setItem('account_approved', 'true');
    setInternalOpen(false);
    window.location.reload();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      backdrop="bg-black/90 backdrop-blur-sm"
      closeOnBackdrop={false}
      zIndex={10001}
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

            <h2 className="text-2xl font-bold text-white mb-3">{title}</h2>
            <p className="text-white/70 mb-6">{description}</p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-white/60">Status</span>
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-semibold">
                  {status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">Estimated Time</span>
                <span className="text-sm font-semibold text-white">{estimatedTime}</span>
              </div>
            </div>

            {note && <p className="text-xs text-white/50 mb-6">{note}</p>}

            <Button
              onClick={handleApprove}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 text-base transition-all rounded-lg flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              {approveLabel}
            </Button>
          </motion.div>
    </BaseModal>
  );
}
