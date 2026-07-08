import React from "react";
import { Sparkles, CreditCard, Bitcoin, ShoppingCart, ArrowLeft, Lock, ChevronRight } from "lucide-react";
import "./BuyCreditsPage.css";

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
  { method: "card", icon: CreditCard, color: "blue", title: "Pay with Credit Card", sub: "Visa, Mastercard, Amex" },
  { method: "crypto", icon: Bitcoin, color: "orange", title: "Pay with Crypto", sub: "Bitcoin, Ethereum, USDT" },
  { method: "buycrypto", icon: ShoppingCart, color: "green", title: "Buy Crypto and Pay", sub: "Purchase crypto instantly" },
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

/**
 * Full-width "Buy Credits" page — package grid + custom-amount slider (step 1),
 * payment-method choice (step 2), and card / crypto / buy-crypto forms (step 3).
 * Parameterized + host-agnostic (scoped CSS). Replaces the old modal.
 *
 * @param {object} props
 * @param {string} [props.title='Get Credits']
 * @param {Array}  [props.packages] Fixed packages: `{ name, credits, price, popular?, bestValue? }`.
 * @param {Array}  [props.pricingAnchors] Anchor table for the slider price curve.
 * @param {Array}  [props.paymentMethods] `{ method, icon?, color?, title, sub }`.
 * @param {number} [props.sliderMin=10] @param {number} [props.sliderMax=298]
 * @param {number} [props.sliderStep=0.01] @param {number} [props.sliderDefault=27.99]
 * @param {string} [props.creditLabel='credits'] @param {string} [props.currency='$']
 * @param {() => void} [props.onBack] Back handler (top-level → your credits page).
 * @param {(pkg:object)=>void} [props.onSelectPackage] Fires when an amount is chosen.
 * @param {(method:string, order:{credits:number, price:number, card?:object})=>void} [props.onPay]
 *   Called on the final pay action — wire your real payment here.
 * @param {string} [props.className]
 */
export default function BuyCreditsPage({
  title = "Get Credits",
  packages = defaultPackages,
  pricingAnchors = defaultPricingAnchors,
  paymentMethods = defaultPaymentMethods,
  sliderMin = 10,
  sliderMax = 298,
  sliderStep = 0.01,
  sliderDefault = 27.99,
  creditLabel = "credits",
  currency = "$",
  onBack,
  onSelectPackage,
  onPay,
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
    else onBack?.();
  };
  const pay = () => onPay?.(method, { credits: selected.credits, price: selected.price, card: method === "card" ? card : undefined });

  const heading = method === "card" ? "Card Payment"
    : method ? "Crypto Payment"
    : selected ? "Select Payment Method"
    : title;
  const sub = method ? "Complete your purchase securely"
    : selected ? "Choose how you want to pay"
    : `1 credit = ${currency}1 of platform value`;

  const showBack = Boolean(selected || method || onBack);

  return (
    <div className={`bond-buy-credits ${className}`.trim()}>
      <header className="bond-buy-credits__header">
        <div className="bond-buy-credits__header-inner">
          {showBack && (
            <button type="button" className="bond-buy-credits__back" onClick={back} aria-label="Back">
              <ArrowLeft className="bond-buy-credits__icon-20" aria-hidden="true" />
            </button>
          )}
          <div>
            <h1 className="bond-buy-credits__title">
              <Sparkles className="bond-buy-credits__spark" aria-hidden="true" />
              {heading}
            </h1>
            <p className="bond-buy-credits__sub">{sub}</p>
          </div>
        </div>
      </header>

      <main className="bond-buy-credits__main">
        {/* STEP 1 — package + slider */}
        {!selected && (
          <div className="bond-buy-credits__stack">
            <section>
              <p className="bond-buy-credits__eyebrow">Choose a package</p>
              <div className="bond-buy-credits__packages">
                {packages.map((pkg) => (
                  <button
                    key={pkg.name}
                    type="button"
                    onClick={() => choose(pkg)}
                    className={`bond-buy-credits__pkg${pkg.popular ? " is-popular" : ""}${pkg.bestValue ? " is-best" : ""}`}
                  >
                    {pkg.popular && <span className="bond-buy-credits__ribbon is-popular">MOST POPULAR</span>}
                    {pkg.bestValue && <span className="bond-buy-credits__ribbon is-best">BEST VALUE</span>}
                    <div className="bond-buy-credits__pkg-name">{pkg.name}</div>
                    <div className="bond-buy-credits__pkg-credits">{pkg.credits}</div>
                    <div className="bond-buy-credits__pkg-unit">{creditLabel}</div>
                    <div className="bond-buy-credits__pkg-price">{money(pkg.price)}</div>
                    <div className="bond-buy-credits__pkg-ppc">{money(pkg.price / pkg.credits)}/credit</div>
                  </button>
                ))}
              </div>
            </section>

            <section className="bond-buy-credits__slider-card">
              <p className="bond-buy-credits__eyebrow">Or choose your own amount</p>
              <div className="bond-buy-credits__slider-top">
                <div>
                  <div className="bond-buy-credits__slider-credits">{slider.toFixed(2)}</div>
                  <div className="bond-buy-credits__slider-unit">{creditLabel}</div>
                </div>
                <div className="bond-buy-credits__slider-pricewrap">
                  <div className="bond-buy-credits__slider-price">{money(sliderPrice)}</div>
                  <div className="bond-buy-credits__slider-ppc">{money(sliderPrice / slider)} per credit</div>
                </div>
              </div>
              {slider >= 50 && (
                <div className="bond-buy-credits__hint">
                  <Sparkles className="bond-buy-credits__icon-12" aria-hidden="true" />
                  Better value unlocked — save more per credit at this tier!
                </div>
              )}
              <input
                type="range"
                min={sliderMin} max={sliderMax} step={sliderStep} value={slider}
                onChange={(e) => setSlider(Number(e.target.value))}
                className="bond-buy-credits__range"
                aria-label="Credit amount"
                style={{ background: `linear-gradient(to right, #9333ea ${sliderPercent}%, rgba(255,255,255,0.1) ${sliderPercent}%)` }}
              />
              <div className="bond-buy-credits__range-ends">
                <span>{sliderMin} {creditLabel}</span>
                <span>{sliderMax} {creditLabel}</span>
              </div>
              <button
                type="button"
                className="bond-buy-credits__primary"
                onClick={() => choose({ credits: slider, price: sliderPrice })}
              >
                Continue with {slider.toFixed(2)} {creditLabel} — {money(sliderPrice)}
              </button>
            </section>
          </div>
        )}

        {/* STEP 2 — payment method */}
        {selected && !method && (
          <div className="bond-buy-credits__stack">
            <div className="bond-buy-credits__summary">
              <div className="bond-buy-credits__summary-credits">{selected.credits}</div>
              <div className="bond-buy-credits__summary-unit">{creditLabel}</div>
              <div className="bond-buy-credits__summary-price">{money(selected.price)}</div>
              <div className="bond-buy-credits__summary-ppc">{money(selected.price / selected.credits)} per credit</div>
            </div>
            {paymentMethods.map(({ method: m, icon: Icon, color, title: t, sub: s }) => (
              <button key={m} type="button" className="bond-buy-credits__method" onClick={() => setMethod(m)}>
                <span className={`bond-buy-credits__method-icon bond-buy-credits__method-icon--${color || "blue"}`}>
                  {Icon ? <Icon className="bond-buy-credits__icon-24" aria-hidden="true" /> : null}
                </span>
                <span className="bond-buy-credits__method-text">
                  <span className="bond-buy-credits__method-title">{t}</span>
                  <span className="bond-buy-credits__method-sub">{s}</span>
                </span>
                <ChevronRight className="bond-buy-credits__method-chevron" aria-hidden="true" />
              </button>
            ))}
          </div>
        )}

        {/* STEP 3 — card */}
        {method === "card" && selected && (
          <div className="bond-buy-credits__stack">
            <div className="bond-buy-credits__receipt">
              <div>
                <div className="bond-buy-credits__receipt-label">You'll receive</div>
                <div className="bond-buy-credits__receipt-strong">{selected.credits} {creditLabel}</div>
              </div>
              <div className="bond-buy-credits__receipt-right">
                <div className="bond-buy-credits__receipt-label">Total</div>
                <div className="bond-buy-credits__receipt-total">{money(selected.price)}</div>
              </div>
            </div>
            <label className="bond-buy-credits__field">
              <span>Card Number</span>
              <input inputMode="numeric" placeholder="1234 5678 9012 3456" maxLength={19}
                value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} />
            </label>
            <label className="bond-buy-credits__field">
              <span>Cardholder Name</span>
              <input placeholder="John Doe" value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} />
            </label>
            <div className="bond-buy-credits__field-row">
              <label className="bond-buy-credits__field">
                <span>Expiry Date</span>
                <input placeholder="MM/YY" maxLength={5} value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value })} />
              </label>
              <label className="bond-buy-credits__field">
                <span>CVV</span>
                <input inputMode="numeric" placeholder="123" maxLength={4} value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value })} />
              </label>
            </div>
            <div className="bond-buy-credits__secure">
              <Lock className="bond-buy-credits__icon-16" aria-hidden="true" />
              Your payment information is secure and encrypted
            </div>
            <button type="button" className="bond-buy-credits__pay" onClick={pay}>
              <Lock className="bond-buy-credits__icon-20" aria-hidden="true" />
              Pay {money(selected.price)}
            </button>
          </div>
        )}

        {/* STEP 3 — crypto */}
        {method === "crypto" && selected && (
          <div className="bond-buy-credits__panel bond-buy-credits__panel--orange">
            <Bitcoin className="bond-buy-credits__panel-icon bond-buy-credits__panel-icon--orange" aria-hidden="true" />
            <div className="bond-buy-credits__panel-title">Pay with Cryptocurrency</div>
            <div className="bond-buy-credits__panel-sub">Select your preferred cryptocurrency</div>
            <div className="bond-buy-credits__coins">
              {["Bitcoin", "Ethereum", "USDT"].map((c) => (
                <button key={c} type="button" className="bond-buy-credits__coin">{c}</button>
              ))}
            </div>
            <button type="button" className="bond-buy-credits__pay bond-buy-credits__pay--orange" onClick={pay}>
              Continue to Crypto Payment
            </button>
          </div>
        )}

        {/* STEP 3 — buy crypto */}
        {method === "buycrypto" && selected && (
          <div className="bond-buy-credits__panel bond-buy-credits__panel--green">
            <ShoppingCart className="bond-buy-credits__panel-icon bond-buy-credits__panel-icon--green" aria-hidden="true" />
            <div className="bond-buy-credits__panel-title">Buy Crypto Instantly</div>
            <div className="bond-buy-credits__panel-sub">Purchase cryptocurrency with your card and pay in one step</div>
            <div className="bond-buy-credits__quote">
              <div><span>You pay</span><strong>{money(selected.price)}</strong></div>
              <div><span>You receive</span><strong>~0.00034 BTC</strong></div>
            </div>
            <button type="button" className="bond-buy-credits__pay bond-buy-credits__pay--green" onClick={pay}>
              Buy Crypto &amp; Complete Payment
            </button>
            <p className="bond-buy-credits__powered">Powered by trusted crypto payment providers</p>
          </div>
        )}
      </main>
    </div>
  );
}
