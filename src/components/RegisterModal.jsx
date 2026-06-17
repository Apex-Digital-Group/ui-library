import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Mail, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';

export default function RegisterModal({ isOpen, onClose, userType = 'member' }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    referralCode: ''
  });
  const [step, setStep] = useState('form'); // 'form' or 'confirm'

  React.useEffect(() => {
    if (!isOpen) {
      setStep('form');
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem('user_registered', 'true');
    
    // Send email notification to admin
    try {
      await base44.integrations.Core.SendEmail({
        to: 'am@bondmedia.co.uk',
        subject: 'New Account Pending Approval - Live Gemini',
        body: `A new ${userType === 'creator' ? 'Content Creator' : 'Member'} account has been created and requires approval.\n\nUsername: ${formData.username}\nEmail: ${formData.email}\nType: ${userType === 'creator' ? 'Content Creator' : 'Member'}\n\nPlease review and approve this account in the admin panel.`
      });
    } catch (error) {
      console.error('Failed to send email notification:', error);
    }
    
    setStep('confirm');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[10000]"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="bg-gradient-to-br from-[#3a2d58] to-[#2E2249] rounded-3xl shadow-2xl w-full max-w-2xl mx-auto border-2 border-purple-500/30 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {step === 'confirm' ? (
              <>
                <div className="relative bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-white/10 px-8 py-6 rounded-t-3xl">
                  <h2 className="text-3xl font-bold text-center text-white tracking-wider">CHECK YOUR EMAIL</h2>
                  <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-white/60 hover:text-white" />
                  </button>
                </div>
                <div className="px-8 py-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                    <Mail className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Confirm Your Account
                  </h3>
                  <p className="text-white/60 text-sm mb-6">
                    We've sent a confirmation email to your inbox. Please click the link in the email to verify your account and complete your registration as a {userType === 'creator' ? 'Content Creator' : 'Member'}.
                  </p>
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-center gap-2 text-purple-400">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">Email sent successfully</span>
                    </div>
                  </div>
                  <Button
                    onClick={onClose}
                    className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-pink-400 hover:from-purple-600 hover:via-pink-600 hover:to-pink-500 text-white font-bold py-4 text-lg rounded-xl h-auto transition-all shadow-lg shadow-purple-500/30"
                  >
                    GOT IT
                  </Button>
                  <button className="mt-3 text-pink-400 hover:text-pink-300 text-sm transition-colors">
                    Resend Email
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Header */}
                <div className="relative bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-white/10 px-8 py-6 rounded-t-3xl">
                  <h2 className="text-3xl font-bold text-center text-white tracking-wider">REGISTER</h2>
                  <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-white/60 hover:text-white" />
                  </button>
                </div>

                {/* Content */}
                <div className="px-8 py-8">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {userType === 'creator' ? 'Hey There creator,' : 'Hey There viewer,'}
                    </h3>
                    <p className="text-white/70 text-base">
                      {userType === 'creator' 
                        ? 'Control Your Streaming with Subscriptions. Set your own prices with VOD, set your prices for private or public viewing.'
                        : 'Register and support your favorite Streamer with monthly membership.'}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      type="text"
                      placeholder="Username"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-14 rounded-xl text-base focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                      required
                    />

                    <Input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-14 rounded-xl text-base focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                      required
                    />

                    <Input
                      type="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-14 rounded-xl text-base focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                      required
                    />

                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-14 rounded-xl text-base focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                      required
                    />

                    <Input
                      type="text"
                      placeholder="Referral code (Optional)"
                      value={formData.referralCode}
                      onChange={(e) => setFormData({ ...formData, referralCode: e.target.value })}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-14 rounded-xl text-base focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    />

                    <p className="text-white/60 text-sm pt-2">
                      By clicking Sign Up or Continue, I agree to Live Gemini{' '}
                      <a href="#" className="text-pink-400 hover:text-pink-300 transition-colors">
                        Terms and Conditions
                      </a>
                      {' '}and{' '}
                      <a href="#" className="text-pink-400 hover:text-pink-300 transition-colors">
                        Privacy Policy
                      </a>
                    </p>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-pink-400 hover:from-purple-600 hover:via-pink-600 hover:to-pink-500 text-white font-bold py-4 text-lg rounded-xl h-auto transition-all shadow-lg shadow-purple-500/30"
                    >
                      REGISTER
                    </Button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}