import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Video, User } from 'lucide-react';
import BaseModal from './BaseModal';

export default function SignInModal({ isOpen, onClose }) {
  const [step, setStep] = useState('select'); // 'select' or 'login'
  const [userType, setUserType] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (!isOpen) {
      setStep('select');
      setUserType(null);
      setUsername('');
      setPassword('');
    }
  }, [isOpen]);

  const handleSelectType = (type) => {
    setUserType(type);
    setStep('login');
    if (type === 'creator') {
      setError('Incorrect password. Please try again.');
    } else {
      setError('');
    }
  };

  const handleBack = () => {
    setStep('select');
    setUserType(null);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login:', { userType, username, password });
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} lockScroll backdrop="bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md"
        >
          {step === 'select' ? (
            <div className="bg-gradient-to-b from-[#3a2d58] to-[#2E2249] rounded-2xl border border-purple-500/30 p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Sign In As</h2>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => handleSelectType('creator')}
                  className="w-full p-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 border border-purple-500/30 hover:border-purple-500/50 rounded-xl transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                      <Video className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors">Content Creator</h3>
                      <p className="text-sm text-white/60">Stream, create content & earn</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleSelectType('member')}
                  className="w-full p-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 border border-purple-500/30 hover:border-purple-500/50 rounded-xl transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                      <User className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors">Member</h3>
                      <p className="text-sm text-white/60">Watch, interact & support creators</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-b from-[#3a2d58] to-[#2E2249] rounded-2xl border border-purple-500/30 overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white tracking-wide">LOGIN</h2>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="bg-[#2a1f45] rounded-xl p-6 border border-purple-500/20">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Hey There {userType === 'creator' ? 'creator' : 'member'},
                  </h3>
                  <p className="text-white/60 text-sm mb-6">
                    {userType === 'creator' 
                      ? 'Control Your Streaming with Subscriptions. Set your own prices on your content, set your prices for private or public viewing.'
                      : 'Access exclusive content from your favorite creators. Subscribe, interact, and support the community.'}
                  </p>

                  <form onSubmit={handleLogin} className="space-y-4">
                    {error && (
                      <div className="bg-red-500/20 border border-red-500/50 rounded-lg px-4 py-3 text-red-400 text-sm">
                        {error}
                      </div>
                    )}
                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-3 bg-[#1a0e2e] border border-purple-500/30 rounded-full text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500/60 transition-colors"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full px-4 py-3 bg-[#1a0e2e] border ${error ? 'border-red-500/50' : 'border-purple-500/30'} rounded-full text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500/60 transition-colors`}
                    />
                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 rounded-full text-white font-bold tracking-wider transition-all"
                    >
                      LOGIN
                    </button>
                  </form>

                  <div className="mt-4 flex justify-between items-center">
                    <button
                      onClick={handleBack}
                      className="text-pink-400 hover:text-pink-300 text-sm transition-colors"
                    >
                      ← Back
                    </button>
                    <button className="text-pink-400 hover:text-pink-300 text-sm transition-colors">
                      Forgot Password?
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
    </BaseModal>
  );
}