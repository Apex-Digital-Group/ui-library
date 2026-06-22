import React from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles, CreditCard, Bitcoin, ShoppingCart, ArrowLeft, Lock, ChevronRight } from 'lucide-react';
import BaseModal from './BaseModal';

const pricingAnchors = [
  { credits: 5,   price: 6.99,   ppc: 1.40 },
  { credits: 20,  price: 24.99,  ppc: 1.25 },
  { credits: 50,  price: 59.99,  ppc: 1.20 },
  { credits: 100, price: 114.99, ppc: 1.15 },
  { credits: 200, price: 209.99, ppc: 1.05 },
  { credits: 500, price: 499.99, ppc: 1.00 },
];

function calculatePrice(credits) {
  const exact = pricingAnchors.find(a => a.credits === credits);
  if (exact) return exact.price;

  let lower = pricingAnchors[0];
  let upper = pricingAnchors[pricingAnchors.length - 1];

  for (let i = 0; i < pricingAnchors.length - 1; i++) {
    if (credits > pricingAnchors[i].credits && credits < pricingAnchors[i + 1].credits) {
      lower = pricingAnchors[i];
      upper = pricingAnchors[i + 1];
      break;
    }
  }

  const t = (credits - lower.credits) / (upper.credits - lower.credits);
  const rawPrice = lower.price + t * (upper.price - lower.price);
  return Math.floor(rawPrice) + 0.99;
}

const PACKAGES = [
  { credits: 20,  price: 24.99  },
  { credits: 50,  price: 59.99  },
  { credits: 100, price: 114.99, popular: true },
  { credits: 200, price: 209.99 },
  { credits: 500, price: 499.99 },
];

export default function CreditsModal({ isOpen, onClose }) {
  const [selectedAmount, setSelectedAmount] = React.useState(null);
  const [paymentMethod, setPaymentMethod] = React.useState(null);
  const [sliderValue, setSliderValue] = React.useState(20);
  const [cardDetails, setCardDetails] = React.useState({ number: '', name: '', expiry: '', cvv: '' });

  const sliderPrice = calculatePrice(sliderValue);
  const sliderPricePerCredit = (sliderPrice / sliderValue).toFixed(2);
  const sliderPercent = ((sliderValue - 5) / (500 - 5)) * 100;
  const showBetterValue = sliderValue >= 50;

  React.useEffect(() => {
    if (!isOpen) {
      setSelectedAmount(null);
      setPaymentMethod(null);
      setCardDetails({ number: '', name: '', expiry: '', cvv: '' });
    }
  }, [isOpen]);

  const handleBack = () => {
    if (paymentMethod) setPaymentMethod(null);
    else setSelectedAmount(null);
  };

  const handlePayment = () => {
    alert('Payment successful! Credits added to your account.');
    onClose();
  };

  const getTitle = () => {
    if (paymentMethod === 'card') return 'Card Payment';
    if (paymentMethod) return 'Crypto Payment';
    if (selectedAmount) return 'Select Payment Method';
    return 'Get Credits';
  };

  const getSubtitle = () => {
    if (paymentMethod) return 'Complete your purchase securely';
    if (selectedAmount) return 'Choose how you want to pay';
    return '1 credit = $1 of platform value';
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} lockScroll backdrop="bg-black/70 backdrop-blur-sm">
      <style>{`
        input[type='range']::-webkit-slider-thumb { appearance: none; width: 20px; height: 20px; border-radius: 50%; background: #9333ea; cursor: pointer; border: 2px solid white; box-shadow: 0 0 6px rgba(147,51,234,0.6); }
        input[type='range']::-moz-range-thumb { width: 20px; height: 20px; border-radius: 50%; background: #9333ea; cursor: pointer; border: 2px solid white; }
      `}</style>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-[#2E2249] to-[#1a0e2e] rounded-2xl shadow-2xl overflow-hidden border border-white/20"
        >
          {/* Header */}
          <div className="sticky top-0 bg-[#2E2249]/95 backdrop-blur border-b border-white/10 px-4 sm:px-6 py-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              {(selectedAmount || paymentMethod) && (
                <button onClick={handleBack} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
              )}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                  {getTitle()}
                </h2>
                <p className="text-xs sm:text-sm text-white/50 mt-0.5">{getSubtitle()}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
          </div>

          <div className="overflow-y-auto max-h-[calc(90vh-100px)] p-4 sm:p-6">

            {/* ── PACKAGE SELECTION ── */}
            {!selectedAmount && (
              <div className="space-y-8">

                {/* Fixed Packages */}
                <div>
                  <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">Choose a package</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {PACKAGES.map((pkg) => (
                      <button
                        key={pkg.credits}
                        onClick={() => setSelectedAmount(pkg)}
                        className={`relative flex flex-col items-center justify-center pt-6 pb-4 px-3 rounded-xl border-2 transition-all duration-200 hover:scale-[1.03]
                          ${pkg.popular
                            ? 'border-purple-500 bg-purple-500/10 hover:bg-purple-500/20 shadow-lg shadow-purple-500/20'
                            : 'border-white/10 bg-white/5 hover:border-purple-400/60 hover:bg-white/10'
                          }`}
                      >
                        {pkg.popular && (
                          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap shadow-lg">
                            MOST POPULAR
                          </span>
                        )}
                        <div className={`text-3xl font-bold mb-0.5 ${pkg.popular ? 'text-purple-300' : 'text-white'}`}>
                          {pkg.credits}
                        </div>
                        <div className="text-[11px] text-white/50 mb-3">credits</div>
                        <div className={`text-lg font-bold ${pkg.popular ? 'text-white' : 'text-white/90'}`}>
                          ${pkg.price.toFixed(2)}
                        </div>
                        <div className="text-[10px] text-white/35 mt-1">
                          ${(pkg.price / pkg.credits).toFixed(2)}/credit
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slider */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
                  <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-5">Or choose your own amount</p>

                  <div className="flex items-end justify-between mb-5">
                    <div>
                      <div className="text-5xl font-bold text-white leading-none">{sliderValue}</div>
                      <div className="text-sm text-white/50 mt-1">credits</div>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-purple-300 leading-none">${sliderPrice.toFixed(2)}</div>
                      <div className="text-xs text-white/40 mt-1">${sliderPricePerCredit} per credit</div>
                    </div>
                  </div>

                  {showBetterValue && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 flex items-center gap-2 text-xs text-green-400 bg-green-400/10 border border-green-400/20 rounded-lg px-3 py-2"
                    >
                      <Sparkles className="w-3 h-3 flex-shrink-0" />
                      Better value unlocked — save more per credit at this tier!
                    </motion.div>
                  )}

                  <input
                    type="range"
                    min="5"
                    max="500"
                    value={sliderValue}
                    onChange={(e) => setSliderValue(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #9333ea ${sliderPercent}%, rgba(255,255,255,0.1) ${sliderPercent}%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-white/25 mt-2">
                    <span>5 credits</span>
                    <span>500 credits</span>
                  </div>

                  <button
                    onClick={() => setSelectedAmount({ credits: sliderValue, price: sliderPrice })}
                    className="mt-5 w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-white font-bold transition-all"
                  >
                    Continue with {sliderValue} credits — ${sliderPrice.toFixed(2)}
                  </button>
                </div>

                {/* Info note */}
                <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10 text-xs text-white/50">
                  <Sparkles className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <p>
                    <span className="text-white font-semibold">How Credits Work: </span>
                    1 credit = $1 of platform value. Use credits to unlock content, tip models, access live cams, and more. The more you buy, the better the rate.
                  </p>
                </div>
              </div>
            )}

            {/* ── PAYMENT METHOD SELECTION ── */}
            {selectedAmount && !paymentMethod && (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6 text-center mb-2">
                  <div className="text-5xl font-bold text-white mb-1">{selectedAmount.credits}</div>
                  <div className="text-white/60 mb-3">credits</div>
                  <div className="text-3xl font-bold text-white">${selectedAmount.price.toFixed(2)}</div>
                  <div className="text-xs text-white/40 mt-1">${(selectedAmount.price / selectedAmount.credits).toFixed(2)} per credit</div>
                </div>

                {[
                  { method: 'card',      icon: CreditCard,  color: 'from-blue-500 to-blue-600',   title: 'Pay with Credit Card',  sub: 'Visa, Mastercard, Amex' },
                  { method: 'crypto',    icon: Bitcoin,     color: 'from-orange-500 to-orange-600', title: 'Pay with Crypto',       sub: 'Bitcoin, Ethereum, USDT' },
                  { method: 'buycrypto',icon: ShoppingCart, color: 'from-green-500 to-green-600',  title: 'Buy Crypto and Pay',    sub: 'Purchase crypto instantly' },
                ].map(({ method, icon: Icon, color, title, sub }) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className="w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 rounded-xl transition-all flex items-center gap-4"
                  >
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-white">{title}</div>
                      <div className="text-sm text-white/50">{sub}</div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/30" />
                  </button>
                ))}
              </div>
            )}

            {/* ── CARD PAYMENT ── */}
            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-4 flex items-center justify-between mb-2">
                  <div>
                    <div className="text-xs text-white/60">You'll receive</div>
                    <div className="text-xl font-bold text-white">{selectedAmount.credits} credits</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-white/60">Total</div>
                    <div className="text-2xl font-bold text-white">${selectedAmount.price.toFixed(2)}</div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Card Number</label>
                  <input type="text" placeholder="1234 5678 9012 3456" maxLength="19" value={cardDetails.number} onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Cardholder Name</label>
                  <input type="text" placeholder="John Doe" value={cardDetails.name} onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Expiry Date</label>
                    <input type="text" placeholder="MM/YY" maxLength="5" value={cardDetails.expiry} onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">CVV</label>
                    <input type="text" placeholder="123" maxLength="4" value={cardDetails.cvv} onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500" />
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <Lock className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <p className="text-xs text-white/60">Your payment information is secure and encrypted</p>
                </div>
                <button onClick={handlePayment} className="w-full py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 rounded-xl text-white font-bold text-lg transition-all flex items-center justify-center gap-2">
                  <Lock className="w-5 h-5" />
                  Pay ${selectedAmount.price.toFixed(2)}
                </button>
              </div>
            )}

            {/* ── CRYPTO PAYMENT ── */}
            {paymentMethod === 'crypto' && (
              <div>
                <div className="bg-gradient-to-br from-orange-600/20 to-orange-600/10 border border-orange-500/30 rounded-xl p-6 text-center">
                  <Bitcoin className="w-14 h-14 text-orange-400 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-white mb-2">Pay with Cryptocurrency</div>
                  <div className="text-white/60 mb-5">Select your preferred cryptocurrency</div>
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {['Bitcoin', 'Ethereum', 'USDT'].map(coin => (
                      <button key={coin} className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/50 rounded-lg transition-all">
                        <div className="font-semibold text-white text-sm">{coin}</div>
                      </button>
                    ))}
                  </div>
                  <button onClick={handlePayment} className="w-full py-4 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 rounded-xl text-white font-bold text-lg transition-all">
                    Continue to Crypto Payment
                  </button>
                </div>
              </div>
            )}

            {/* ── BUY CRYPTO AND PAY ── */}
            {paymentMethod === 'buycrypto' && (
              <div>
                <div className="bg-gradient-to-br from-green-600/20 to-green-600/10 border border-green-500/30 rounded-xl p-6 text-center">
                  <ShoppingCart className="w-14 h-14 text-green-400 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-white mb-2">Buy Crypto Instantly</div>
                  <div className="text-white/60 mb-6">Purchase cryptocurrency with your card and pay in one step</div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4 text-left space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white/60 text-sm">You pay</span>
                      <span className="text-white font-semibold">${selectedAmount.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60 text-sm">You receive</span>
                      <span className="text-white font-semibold">~0.00034 BTC</span>
                    </div>
                  </div>
                  <button onClick={handlePayment} className="w-full py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 rounded-xl text-white font-bold text-lg transition-all">
                    Buy Crypto & Complete Payment
                  </button>
                  <p className="text-xs text-white/40 mt-4">Powered by trusted crypto payment providers</p>
                </div>
              </div>
            )}

          </div>
        </motion.div>
    </BaseModal>
  );
}