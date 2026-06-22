import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UserSquare2 } from 'lucide-react';
import BaseModal from './BaseModal';

const DEFAULT_FIELDS = [
  { type: 'text', placeholder: 'Full Name (simulation)' },
  { type: 'email', placeholder: 'Email Address (simulation)' },
];

export default function KycModal({
  isOpen: isOpenProp,
  onClose,
  onVerify,
  onComplete,
  logoSrc = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/b248bfd91_gemini_logo_white.png',
  title = 'Secure Age Verification',
  description = 'Please verify your identity to continue. This is a demo simulation.',
  fields = DEFAULT_FIELDS,
  uploadLabel = 'Simulated ID Upload Frame',
  uploadImageSrc = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/fc6e5695e_1f76584d5bcc5f95f5fe078d407416f1_erotic_576x324.jpeg',
  verifyLabel = 'KYC Pass',
}) {
  const isControlled = isOpenProp !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = isControlled ? isOpenProp : internalOpen;

  useEffect(() => {
    if (isControlled) return;
    const isVerified = localStorage.getItem('kyc_verified');
    if (isVerified !== 'true') {
      // Use a short delay to allow the main page to render first
      const timer = setTimeout(() => {
        setInternalOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isControlled]);

  const handleClose = () => {
    if (isControlled) {
      onClose?.();
    } else {
      setInternalOpen(false);
    }
  };

  const handlePassKyc = () => {
    if (onVerify || onComplete) {
      onVerify?.();
      onComplete?.();
      return;
    }
    localStorage.setItem('kyc_verified', 'true');
    setInternalOpen(false);
  };

  return (
    <BaseModal isOpen={isOpen} onClose={handleClose} closeOnBackdrop={false} backdrop="bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="bg-white text-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-auto p-6 md:p-8 text-center"
          >
            <div className="flex justify-center mb-4">
              <img
                src={logoSrc}
                alt="LiveGemini Logo"
                className="w-12 h-12 object-contain flex-shrink-0 p-2 bg-[#1a0e2e] rounded-full"
              />
            </div>
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-gray-600 mb-6">
              {description}
            </p>

            <div className="space-y-4 text-left">
              {fields.map((field, i) => (
                <Input key={i} type={field.type} placeholder={field.placeholder} className="bg-gray-100" />
              ))}
            </div>

            <div className="my-6 p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 relative h-32 flex flex-col items-center justify-center overflow-hidden">
                <UserSquare2 className="w-8 h-8 text-gray-400 mb-2 z-10" />
                <span className="text-gray-500 font-medium z-10">{uploadLabel}</span>
                <img
                    src={uploadImageSrc}
                    alt="Blurred ID"
                    className="absolute inset-0 w-full h-full object-cover blur-md opacity-30"
                />
            </div>

            <Button
              onClick={handlePassKyc}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 text-base transition-all rounded-lg"
            >
              {verifyLabel}
            </Button>
          </motion.div>
    </BaseModal>
  );
}