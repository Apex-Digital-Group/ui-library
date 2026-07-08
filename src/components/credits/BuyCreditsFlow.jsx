import React from "react";
import { motion } from "framer-motion";
import { Sparkles, CreditCard, Bitcoin, ShoppingCart, ArrowLeft, Lock, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";
import CreditPackageCard, { resolvePackageBadge } from "./CreditPackageCard";

export const defaultPricingAnchors = [
  { credits: 9.99, price: 16.99 },
  { credits: 27.99, price: 45.99 },
  { credits: 67.99, price: 106.99 },
  { credits: 157.99, price: 240.99 },
  { credits: 297.99, price: 445.99 },
];

export const defaultPackages = [
  { name: "Starter", credits: 9.99, price: 16.99 },
  { name: "Bronze", credits: 27.99, price: 45.99 },
  { name: "Silver", credits: 67.99, price: 106.99 },
  { name: "Gold", credits: 157.99, price: 240.99, popular: true },
  { name: "Platinum", credits: 297.99, price: 445.99, bestValue: true },
];

export const defaultPaymentMethods = [
  { method: "card", icon: CreditCard, gradient: "from-blue-500 to-blue-600", title: "Pay with Credit Card", sub: "Visa, Mastercard, Amex" },
  { method: "crypto", icon: Bitcoin, gradient: "from-orange-500 to-orange-600", title: "Pay with Crypto", sub: "Bitcoin, Ethereum, USDT" },
  { method: "buycrypto", icon: ShoppingCart, gradient: "from-green-500 to-green-600", title: "Buy Crypto and Pay", sub: "Purchase crypto instantly" },
];

/** Interpolate a price for an arbitrary credit amount off the anchor table. */
export function priceForCredits(credits, anchors = defaultPricingAnchors) {
  const exact = anchors.find((a) => a.credits === credits);
  if (exact) return exact.price;
  let lower = anchors[0];
  let upper = anchors[anchors.length - 1];
  for (let i = 0; i < anchors.length - 1; i++) {
    if (credits > anchors[i].credits && credits < anchors[i + 1].credits) {
      lower = anchors[i]; upper = anchors[i + 1]; break;
    }
  }
  const t = (credits - lower.credits) / (upper.credits - lower.credits);
  return Math.floor(lower.price + t * (upper.price - lower.price)) + 0.99;
}

const RANGE_THUMB_CSS =
  "input[type='range'].bond-buy-range::-webkit-slider-thumb{appearance:none;width:20px;height:20px;border-radius:50%;background:#9333ea;cursor:pointer;border:2px solid white;box-shadow:0 0 6px rgba(147,51,234,0.6)}input[type='range'].bond-buy-range::-moz-range-thumb{width:20px;height:20px;border-radius:50%;background:#9333ea;cursor:pointer;border:2px solid white}";

/**
 * The Buy Credits flow (no page/modal chrome) — package grid + custom-amount
 * slider → payment method → card/crypto forms. Wrapped by BuyCreditsPage (page)
 * and CreditsModal (modal). Tailwind.
 *
 * @param {object} props
 * @param {string} [props.title='Get Credits']
 * @param {Array}  [props.packages] `{ name, credits, price, popular?, bestValue?, badge? }`.
 * @param {string} [props.popularLabel='MOST POPULAR'] @param {string} [props.bestValueLabel='BEST VALUE']
 * @param {Array}  [props.pricingAnchors] @param {Array} [props.paymentMethods]
 * @param {number} [props.sliderMin=10] @param {number} [props.sliderMax=298]
 * @param {number} [props.sliderStep=0.01] @param {number} [props.sliderDefault=27.99]
 * @param {string} [props.creditLabel='credits'] @param {string} [props.currency='$']
 * @param {() => void} [props.onExit] Back at step 1 (page-back / modal-close). No arrow at step 1 if omitted.
 * @param {(pkg:object)=>void} [props.onSelectPackage]
 * @param {(method:string, order:{credits:number, price:number, card?:object})=>void} [props.onPay]
 * @param {React.ReactNode} [props.headerRight] Right-edge header slot (e.g. a modal close ✕).
 * @param {string} [props.className]
 */
export default function BuyCreditsFlow({
  title = "Get Credits",
  packages = defaultPackages,
  popularLabel = "MOST POPULAR",
  bestValueLabel = "BEST VALUE",
  pricingAnchors = defaultPricingAnchors,
  paymentMethods = defaultPaymentMethods,
  sliderMin = 10,
  sliderMax = 298,
  sliderStep = 0.01,
  sliderDefault = 27.99,
  creditLabel = "credits",
  currency = "$",
  onExit,
  onSelectPackage,
  onPay,
  headerRight,
  className = "",
}) {
  const [selected, setSelected] = React.useState(null);
  const [method, setMethod] = React.useState(null);
  const [slider, setSlider] = React.useState(sliderDefault);
  const [card, setCard] = React.useState({ number: "", name: "", expiry: "", cvv: "" });

  const sliderPrice = priceForCredits(slider, pricingAnchors);
  const sliderPercent = ((slider - sliderMin) / (sliderMax - sliderMin)) * 100;
  const money = (n) => `${currency}${Number(n).toFixed(2)}`;

  const choose = (pkg) => { setSelected(pkg); onSelectPackage?.(pkg); };
  const back = () => {
    if (method) setMethod(null);
    else if (selected) setSelected(null);
    else onExit?.();
  };
  const pay = () => onPay?.(method, { credits: selected.credits, price: selected.price, card: method === "card" ? card : undefined });

  const heading = method === "card" ? "Card Payment" : method ? "Crypto Payment" : selected ? "Select Payment Method" : title;
  const sub = method ? "Complete your purchase securely" : selected ? "Choose how you want to pay" : `1 credit = ${currency}1 of platform value`;
  const showBack = Boolean(selected || method || onExit);
  const fieldCls = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500";

  return (
    <div className={cn("w-full text-white", className)}>
      <style>{RANGE_THUMB_CSS}</style>

      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#2E2249]/95 backdrop-blur border-b border-white/10 px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <button type="button" onClick={back} aria-label="Back" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
          )}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
              {heading}
            </h2>
            <p className="text-xs sm:text-sm text-white/50 mt-0.5">{sub}</p>
          </div>
        </div>
        {headerRight}
      </div>

      <div className="p-4 sm:p-6">
        {/* STEP 1 — packages + slider */}
        {!selected && (
          <div className="space-y-8">
            <div>
              <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">Choose a package</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {packages.map((pkg) => (
                  <CreditPackageCard
                    key={pkg.name || pkg.credits}
                    name={pkg.name}
                    credits={pkg.credits}
                    price={pkg.price}
                    badge={resolvePackageBadge(pkg, { popularLabel, bestValueLabel })}
                    currency={currency}
                    creditLabel={creditLabel}
                    onClick={() => choose(pkg)}
                  />
                ))}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
              <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-5">Or choose your own amount</p>
              <div className="flex items-end justify-between mb-5">
                <div>
                  <div className="text-5xl font-bold text-white leading-none">{slider.toFixed(2)}</div>
                  <div className="text-sm text-white/50 mt-1">{creditLabel}</div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-purple-300 leading-none">{money(sliderPrice)}</div>
                  <div className="text-xs text-white/40 mt-1">{money(sliderPrice / slider)} per credit</div>
                </div>
              </div>
              {slider >= 50 && (
                <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                  className="mb-4 flex items-center gap-2 text-xs text-green-400 bg-green-400/10 border border-green-400/20 rounded-lg px-3 py-2">
                  <Sparkles className="w-3 h-3 flex-shrink-0" />
                  Better value unlocked — save more per credit at this tier!
                </motion.div>
              )}
              <input type="range" min={sliderMin} max={sliderMax} step={sliderStep} value={slider}
                onChange={(e) => setSlider(Number(e.target.value))} aria-label="Credit amount"
                className="bond-buy-range w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ background: `linear-gradient(to right, #9333ea ${sliderPercent}%, rgba(255,255,255,0.1) ${sliderPercent}%)` }} />
              <div className="flex justify-between text-xs text-white/25 mt-2">
                <span>{sliderMin} {creditLabel}</span>
                <span>{sliderMax} {creditLabel}</span>
              </div>
              <button type="button" onClick={() => choose({ credits: slider, price: sliderPrice })}
                className="mt-5 w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-white font-bold transition-all">
                Continue with {slider.toFixed(2)} {creditLabel} — {money(sliderPrice)}
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 — payment method */}
        {selected && !method && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6 text-center mb-2">
              <div className="text-5xl font-bold text-white mb-1">{selected.credits}</div>
              <div className="text-white/60 mb-3">{creditLabel}</div>
              <div className="text-3xl font-bold text-white">{money(selected.price)}</div>
              <div className="text-xs text-white/40 mt-1">{money(selected.price / selected.credits)} per credit</div>
            </div>
            {paymentMethods.map(({ method: m, icon: Icon, gradient, title: t, sub: s }) => (
              <button key={m} type="button" onClick={() => setMethod(m)}
                className="w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 rounded-xl transition-all flex items-center gap-4">
                <div className={cn("w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center flex-shrink-0", gradient || "from-blue-500 to-blue-600")}>
                  {Icon ? <Icon className="w-6 h-6 text-white" /> : null}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-white">{t}</div>
                  <div className="text-sm text-white/50">{s}</div>
                </div>
                <ChevronRight className="w-5 h-5 text-white/30" />
              </button>
            ))}
          </div>
        )}

        {/* STEP 3 — card */}
        {method === "card" && selected && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-4 flex items-center justify-between mb-2">
              <div>
                <div className="text-xs text-white/60">You'll receive</div>
                <div className="text-xl font-bold text-white">{selected.credits} {creditLabel}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-white/60">Total</div>
                <div className="text-2xl font-bold text-white">{money(selected.price)}</div>
              </div>
            </div>
            <label className="block">
              <span className="block text-sm font-medium text-white mb-2">Card Number</span>
              <input inputMode="numeric" placeholder="1234 5678 9012 3456" maxLength={19}
                value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} className={fieldCls} />
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-white mb-2">Cardholder Name</span>
              <input placeholder="John Doe" value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} className={fieldCls} />
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="block text-sm font-medium text-white mb-2">Expiry Date</span>
                <input placeholder="MM/YY" maxLength={5} value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value })} className={fieldCls} />
              </label>
              <label className="block">
                <span className="block text-sm font-medium text-white mb-2">CVV</span>
                <input inputMode="numeric" placeholder="123" maxLength={4} value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value })} className={fieldCls} />
              </label>
            </div>
            <div className="flex items-center gap-2 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <Lock className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <p className="text-xs text-white/60">Your payment information is secure and encrypted</p>
            </div>
            <button type="button" onClick={pay}
              className="w-full py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 rounded-xl text-white font-bold text-lg transition-all flex items-center justify-center gap-2">
              <Lock className="w-5 h-5" />
              Pay {money(selected.price)}
            </button>
          </div>
        )}

        {/* STEP 3 — crypto */}
        {method === "crypto" && selected && (
          <div className="bg-gradient-to-br from-orange-600/20 to-orange-600/10 border border-orange-500/30 rounded-xl p-6 text-center">
            <Bitcoin className="w-14 h-14 text-orange-400 mx-auto mb-4" />
            <div className="text-2xl font-bold text-white mb-2">Pay with Cryptocurrency</div>
            <div className="text-white/60 mb-5">Select your preferred cryptocurrency</div>
            <div className="grid grid-cols-3 gap-3 mb-5">
              {["Bitcoin", "Ethereum", "USDT"].map((c) => (
                <button key={c} type="button" className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/50 rounded-lg transition-all font-semibold text-white text-sm">{c}</button>
              ))}
            </div>
            <button type="button" onClick={pay}
              className="w-full py-4 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 rounded-xl text-white font-bold text-lg transition-all">
              Continue to Crypto Payment
            </button>
          </div>
        )}

        {/* STEP 3 — buy crypto */}
        {method === "buycrypto" && selected && (
          <div className="bg-gradient-to-br from-green-600/20 to-green-600/10 border border-green-500/30 rounded-xl p-6 text-center">
            <ShoppingCart className="w-14 h-14 text-green-400 mx-auto mb-4" />
            <div className="text-2xl font-bold text-white mb-2">Buy Crypto Instantly</div>
            <div className="text-white/60 mb-6">Purchase cryptocurrency with your card and pay in one step</div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4 text-left space-y-2">
              <div className="flex justify-between"><span className="text-white/60 text-sm">You pay</span><span className="text-white font-semibold">{money(selected.price)}</span></div>
              <div className="flex justify-between"><span className="text-white/60 text-sm">You receive</span><span className="text-white font-semibold">~0.00034 BTC</span></div>
            </div>
            <button type="button" onClick={pay}
              className="w-full py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 rounded-xl text-white font-bold text-lg transition-all">
              Buy Crypto &amp; Complete Payment
            </button>
            <p className="text-xs text-white/40 mt-4">Powered by trusted crypto payment providers</p>
          </div>
        )}
      </div>
    </div>
  );
}
