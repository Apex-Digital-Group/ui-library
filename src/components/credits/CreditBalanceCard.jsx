import React from "react";
import { Sparkles, Plus, TrendingDown, TrendingUp } from "lucide-react";
import "./CreditBalanceCard.css";

const defaultFormat = (n) => Number(n || 0).toFixed(2);

/**
 * Credit balance hero card — the big balance number + a "Buy Credits" CTA and a
 * spent/earned summary pill. Presentational and host-agnostic: all data and the
 * buy action arrive via props; styling is scoped CSS (no Tailwind required).
 *
 * @param {object} props
 * @param {number} [props.balance=0] Current credit balance.
 * @param {string} [props.creditLabel='credits'] Unit label after the number.
 * @param {string} [props.title='Your Credit Balance'] Small heading above the number.
 * @param {number} [props.totalSpent] Total spent — renders a summary pill when set.
 * @param {number} [props.totalPurchased] Optional total topped-up — renders a second pill.
 * @param {string} [props.buyLabel='Buy Credits']
 * @param {() => void} [props.onBuyCredits] Click handler for the CTA (hidden if omitted).
 * @param {(n:number)=>string} [props.formatAmount] Number formatter (default: 2dp).
 * @param {string} [props.spentLabel='Total spent']
 * @param {string} [props.purchasedLabel='Total purchased']
 * @param {string} [props.className] Extra class names on the root.
 */
export default function CreditBalanceCard({
  balance = 0,
  creditLabel = "credits",
  title = "Your Credit Balance",
  totalSpent,
  totalPurchased,
  buyLabel = "Buy Credits",
  onBuyCredits,
  formatAmount = defaultFormat,
  spentLabel = "Total spent",
  purchasedLabel = "Total purchased",
  className = "",
}) {
  return (
    <div className={`bond-credit-balance ${className}`.trim()}>
      <span className="bond-credit-balance__glow bond-credit-balance__glow--a" aria-hidden="true" />
      <span className="bond-credit-balance__glow bond-credit-balance__glow--b" aria-hidden="true" />

      <div className="bond-credit-balance__inner">
        <div className="bond-credit-balance__label">
          <Sparkles className="bond-credit-balance__spark" aria-hidden="true" />
          {title}
        </div>

        <div className="bond-credit-balance__amount">
          <span className="bond-credit-balance__value">{formatAmount(balance)}</span>
          <span className="bond-credit-balance__unit">{creditLabel}</span>
        </div>

        <div className="bond-credit-balance__actions">
          {onBuyCredits && (
            <button type="button" className="bond-credit-balance__buy" onClick={onBuyCredits}>
              <Plus className="bond-credit-balance__buy-icon" aria-hidden="true" />
              {buyLabel}
            </button>
          )}

          {totalPurchased != null && (
            <div className="bond-credit-balance__pill">
              <TrendingUp className="bond-credit-balance__pill-icon bond-credit-balance__pill-icon--up" aria-hidden="true" />
              <span>{purchasedLabel}: <strong>{formatAmount(totalPurchased)} {creditLabel}</strong></span>
            </div>
          )}

          {totalSpent != null && (
            <div className="bond-credit-balance__pill">
              <TrendingDown className="bond-credit-balance__pill-icon bond-credit-balance__pill-icon--down" aria-hidden="true" />
              <span>{spentLabel}: <strong>{formatAmount(totalSpent)} {creditLabel}</strong></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
