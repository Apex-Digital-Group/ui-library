import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function TreatModal({ isOpen, onClose, modelName, modelImage, modelVideo, userBalance = 10.00 }) {
  const [selectedAmount, setSelectedAmount] = useState('1');
  const [customAmount, setCustomAmount] = useState('');
  const [message, setMessage] = useState('');

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSendTreat = () => {
    const amount = selectedAmount === 'other' ? customAmount : selectedAmount;
    console.log('Sending treat:', { amount, message, to: modelName });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[10000] flex items-center justify-center p-4"
        style={{ margin: 0 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
          style={{ position: 'relative' }}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-xl"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="relative h-64 bg-gradient-to-br from-purple-900 via-pink-900 to-purple-800 overflow-hidden">
            {modelVideo && (
              <video
                src={modelVideo}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-2xl mb-4">
                <img src={modelImage} alt={modelName} className="w-full h-full object-cover" />
              </div>
              <h2 className="text-3xl font-bold text-white text-center drop-shadow-lg">
                Send a Treat to {modelName}
              </h2>
            </div>
          </div>

          <div className="p-8 bg-gradient-to-br from-[#1a0e2e] to-[#2E2249]">

            <div className="mb-6">
              <label className="block text-lg font-semibold text-white mb-4">Select Amount</label>
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => setSelectedAmount('1')}
                  className={`py-4 px-4 rounded-xl border-2 font-semibold transition-all ${
                    selectedAmount === '1'
                      ? 'border-purple-500 bg-purple-500/20 text-white shadow-lg shadow-purple-500/50'
                      : 'border-white/20 bg-white/5 text-white/80 hover:border-purple-400 hover:bg-white/10'
                  }`}
                >
                  1 Credit
                </button>
                <button
                  onClick={() => setSelectedAmount('5')}
                  className={`py-4 px-4 rounded-xl border-2 font-semibold transition-all ${
                    selectedAmount === '5'
                      ? 'border-purple-500 bg-purple-500/20 text-white shadow-lg shadow-purple-500/50'
                      : 'border-white/20 bg-white/5 text-white/80 hover:border-purple-400 hover:bg-white/10'
                  }`}
                >
                  5 Credits
                </button>
                <button
                  onClick={() => setSelectedAmount('other')}
                  className={`py-4 px-4 rounded-xl border-2 font-semibold transition-all ${
                    selectedAmount === 'other'
                      ? 'border-purple-500 bg-purple-500/20 text-white shadow-lg shadow-purple-500/50'
                      : 'border-white/20 bg-white/5 text-white/80 hover:border-purple-400 hover:bg-white/10'
                  }`}
                >
                  Other
                </button>
              </div>
              {selectedAmount === 'other' && (
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Enter amount..."
                  className="mt-4 w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder:text-white/50 focus:border-purple-500 focus:outline-none transition-all"
                />
              )}
            </div>

            <div className="mb-8">
              <label className="block text-lg font-semibold text-white mb-4">Leave a Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Say something nice..."
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder:text-white/50 focus:border-purple-500 focus:outline-none resize-none transition-all"
              />
            </div>

            <div className="text-center mb-8">
              <p className="text-lg text-white/80">
                Your balance is: <span className="font-bold text-white text-xl">{userBalance.toFixed(2)} Credits</span>
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={onClose}
                className="px-10 py-3.5 bg-white/10 hover:bg-white/20 border-2 border-white/20 text-white font-semibold rounded-full transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSendTreat}
                className="px-10 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-full shadow-lg shadow-purple-500/50 transition-all"
              >
                Treat Me!
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}