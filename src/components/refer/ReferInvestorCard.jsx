import React, { useState } from 'react';
import { TrendingUp, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function ReferInvestorCard() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', country: '', investorType: '', range: '', message: '' });

  const handleSubmit = () => {
    if (!agreed) return;
    setSubmitted(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => { setSubmitted(false); setAgreed(false); setForm({ name: '', email: '', country: '', investorType: '', range: '', message: '' }); }, 300);
  };

  return (
    <>
      <div className="bg-[#2E2249] border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-12 h-12 bg-purple-500/20 border border-purple-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
          <TrendingUp className="w-6 h-6 text-purple-400" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-white">Interested in Investing?</h3>
          <p className="text-sm text-white/50 mt-1">If you would like to express interest in future opportunities, you can register your details. This is separate from Founders Club and is not an offer to invest.</p>
        </div>
        <button onClick={() => setOpen(true)}
          className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 rounded-xl text-sm font-bold text-white transition-all whitespace-nowrap">
          Register Interest
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-[10000] flex items-center justify-center p-4"
            onClick={handleClose}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg bg-[#2E2249] border border-white/20 rounded-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <h2 className="font-bold text-white text-lg">Register Investor Interest</h2>
                <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-lg"><X className="w-5 h-5 text-white/60" /></button>
              </div>
              <div className="p-6 max-h-[80vh] overflow-y-auto">
                {!submitted ? (
                  <div className="space-y-4">
                    {[
                      { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Your full name' },
                      { label: 'Email Address', key: 'email', type: 'email', placeholder: 'your@email.com' },
                      { label: 'Country', key: 'country', type: 'text', placeholder: 'Your country' },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="block text-sm font-medium text-white mb-1.5">{f.label}</label>
                        <input type={f.type} placeholder={f.placeholder} value={form[f.key]}
                          onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                          className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500 text-sm" />
                      </div>
                    ))}
                    <div>
                      <label className="block text-sm font-medium text-white mb-1.5">Investor Type</label>
                      <select value={form.investorType} onChange={e => setForm(p => ({ ...p, investorType: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 text-sm">
                        <option value="">Select type</option>
                        <option>Individual</option>
                        <option>Angel Investor</option>
                        <option>Venture Capital</option>
                        <option>Family Office</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-1.5">Indicative Investment Range</label>
                      <select value={form.range} onChange={e => setForm(p => ({ ...p, range: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 text-sm">
                        <option value="">Select range</option>
                        <option>Under $10,000</option>
                        <option>$10,000 – $50,000</option>
                        <option>$50,000 – $250,000</option>
                        <option>$250,000 – $1,000,000</option>
                        <option>$1,000,000+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-1.5">Optional Message</label>
                      <textarea rows={3} placeholder="Anything you'd like to add..." value={form.message}
                        onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500 text-sm resize-none" />
                    </div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <div onClick={() => setAgreed(!agreed)}
                        className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors cursor-pointer
                          ${agreed ? 'bg-purple-600 border-purple-600' : 'border-white/30 hover:border-purple-400'}`}>
                        {agreed && <span className="text-white text-xs">✓</span>}
                      </div>
                      <span className="text-xs text-white/60">I understand this is not an offer to invest. I am only expressing interest and would like to be contacted if relevant opportunities become available.</span>
                    </label>
                    <button onClick={handleSubmit} disabled={!agreed}
                      className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 disabled:opacity-40 disabled:cursor-not-allowed hover:from-purple-700 hover:to-pink-700 rounded-xl text-white font-bold transition-all">
                      Submit Interest
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-3xl">✓</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">Thank You</h3>
                    <p className="text-white/60 text-sm">Thank you, your details have been received. If suitable opportunities become available, a member of our team or an authorised partner may contact you.</p>
                    <button onClick={handleClose} className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-white font-bold transition-all">Close</button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}