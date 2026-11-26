import * as React from "react";
import "./StoryRing.css";

const STATES = new Set(["none", "new", "seen"]);

/**
 * StoryRing — the live-story ring around a round avatar.
 *
 *  - `new`:  brand gradient ring (unseen story items).
 *  - `seen`: muted grey ring (every live item already viewed).
 *  - `none`: no ring (no live story) — renders just the child.
 *
 * The ring is drawn OUTSIDE the child (thickness + a transparent gap), on a
 * pseudo-element that never takes pointer events, so the child's size, layout
 * and click handling are unchanged. The wrapper adds no role or label — the
 * consumer owns the accessible control (e.g. a "View story, new" button).
 *
 * Styled with its own CSS (bond-story-ring*) like every lib component —
 * consumers don't run Tailwind over lib sources.
 *
 *   <StoryRing state="new"><div className="avatar" /></StoryRing>
 */
export function StoryRing({ state = "none", thickness = 3, gap = 3, className = "", style, children, ...rest }) {
  const safeState = STATES.has(state) ? state : "none";
  return (
    <span
      {...rest}
      className={`bond-story-ring ${className}`.trim()}
      data-state={safeState}
      style={{ ...style, "--bsr-thickness": `${thickness}px`, "--bsr-gap": `${gap}px` }}
    >
      {children}
    </span>
  );
}

export default StoryRing;
