import React from "react";

// Corner → fixed-position styles. Inline (not Tailwind) so the stack positions
// correctly in ANY host app, including ones without Tailwind (Bootstrap/AntD).
const POSITIONS = {
  "top-right": { top: 0, right: 0, alignItems: "flex-end", flexDirection: "column" },
  "top-left": { top: 0, left: 0, alignItems: "flex-start", flexDirection: "column" },
  "top-center": { top: 0, left: "50%", transform: "translateX(-50%)", alignItems: "center", flexDirection: "column" },
  "bottom-right": { bottom: 0, right: 0, alignItems: "flex-end", flexDirection: "column-reverse" },
  "bottom-left": { bottom: 0, left: 0, alignItems: "flex-start", flexDirection: "column-reverse" },
  "bottom-center": { bottom: 0, left: "50%", transform: "translateX(-50%)", alignItems: "center", flexDirection: "column-reverse" },
};

/**
 * Fixed, position-aware container that stacks Toasts. Newest sits at the screen
 * edge (top stacks down, bottom stacks up). Self-contained inline styles.
 *
 * @param {object} props
 * @param {('top-right'|'top-center'|'top-left'|'bottom-right'|'bottom-center'|'bottom-left')} [props.position='top-right']
 * @param {number} [props.gap=12] Gap between toasts (px).
 * @param {number} [props.zIndex=100000]
 * @param {React.ReactNode} props.children Toast elements.
 */
export default function ToastStack({ position = "top-right", gap = 12, zIndex = 100000, children }) {
  return (
    <div
      style={{
        position: "fixed",
        zIndex,
        display: "flex",
        gap,
        padding: 22,
        pointerEvents: "none",
        maxWidth: "min(94vw, 420px)",
        ...(POSITIONS[position] || POSITIONS["top-right"]),
      }}
    >
      {React.Children.map(children, (c) => (c ? (
        <div style={{ pointerEvents: "auto", width: "100%", maxWidth: 384 }}>{c}</div>
      ) : null))}
    </div>
  );
}
