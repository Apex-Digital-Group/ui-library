import React from "react";
import "./PostCard.css";

// Single source of truth for the 6 platform reactions and their badge
// treatment (white circles ringed in the card colour, overlapping) — used by
// the feed PostCard and the favourites FavPostCard so both surfaces read
// identically.
export const REACTION_EMOJI = { like: "👍", love: "❤️", haha: "😂", wow: "😮", sad: "😢", angry: "😠" };
export const REACTION_ORDER = ["like", "love", "haha", "wow", "sad", "angry"];

/**
 * Overlapping emoji badges for a post's top reactions.
 *
 * Provide EITHER `names` (already-ordered reaction names, the PostCard case)
 * OR `counts` ({like: 3, haha: 1, ...} — ordered here by count desc).
 */
export default function ReactionStack({ names = null, counts = null, max = 3 }) {
  const ordered = names
    ? names.filter((name) => REACTION_EMOJI[name])
    : Object.entries(counts || {})
        .filter(([name, n]) => REACTION_EMOJI[name] && n > 0)
        .sort((a, b) => b[1] - a[1])
        .map(([name]) => name);
  if (!ordered.length) return null;
  return (
    <span className="bond-post-card__react-stack" aria-hidden>
      {ordered.slice(0, max).map((name) => (
        <span key={name} className="bond-post-card__react-emoji" title={name}>
          {REACTION_EMOJI[name]}
        </span>
      ))}
    </span>
  );
}
