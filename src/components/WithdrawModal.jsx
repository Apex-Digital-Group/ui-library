import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Zap, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WithdrawModal({ isOpen, onClose, amount }) {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const options = [
    {
      id: 'standard',
      title: 'Not in a hurry?',
      subtitle: 'Seven working days',
      fee: 'FREE',
      feePercent: 0,
      color: 'bg-gray-500 hover:bg-gray-600',
      icon: Clock
    },
    {
      id: 'express',
      title: 'Payment next working day.',
      subtitle: 'Next working day payment',
      fee: '5%',
      feePercent: 5,
      color: 'bg-amber-500 hover:bg-amber-600',
      icon: Zap
    },
    {
      id: 'instant',
      title: 'Payment within 30 minutes.',
      subtitle: 'Premier Payment',
      fee: '10%',
      feePercent: 10,
      color: 'bg-emerald-500 hover:bg-emerald-600',
      icon: Rocket
    }
  ];

  const handleProceed = () => {
    if (selectedOption) {
      // Handle withdrawal logic here
      console.log('Processing withdrawal with option:', selectedOption);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[10000] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-[#2E2249] rounded-2xl w-full max-w-md p-6 relative border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#1a0e2e] hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Title */}
            <h2 className="text-2xl font-bold text-white mb-6 pr-8">
              How quickly can I get paid?
            </h2>

            {/* Amount Display */}
            {amount && (
              <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
                <p className="text-sm text-white/60">Withdrawal Amount</p>
                <p className="text-xl font-bold text-green-400">{amount} Credits</p>
              </div>
            )}

            {/* Options */}
            <div className="space-y-3 mb-6">
              {options.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    onClick={() => setSelectedOption(option.id)}
                    className={`w-full ${option.color} rounded-xl p-5 text-center transition-all transform hover:scale-[1.02] ${
                      selectedOption === option.id ? 'ring-2 ring-white ring-offset-2 ring-offset-[#2E2249]' : ''
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Icon className="w-5 h-5 text-white" />
                      <h3 className="text-xl font-bold text-white">{option.title}</h3>
                    </div>
                    <p className="text-sm text-white/80 mb-2">{option.subtitle}</p>
                    <p className="text-2xl font-bold text-white">{option.fee}</p>
                  </button>
                );
              })}
            </div>

            {/* Proceed Button */}
            <div className="flex justify-end">
              <Button
                onClick={handleProceed}
                disabled={!selectedOption}
                className="bg-[#1a0e2e] hover:bg-[#251a3a] text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}