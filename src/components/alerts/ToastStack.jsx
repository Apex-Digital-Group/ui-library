import React from "react";
import { cn } from "../../lib/utils";

const POSITIONS = {
  "top-right": "top-4 right-4 items-end flex-col",
  "top-center": "top-4 left-1/2 -translate-x-1/2 items-center flex-col",
  "top-left": "top-4 left-4 items-start flex-col",
  "bottom-right": "bottom-4 right-4 items-end flex-col-reverse",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center flex-col-reverse",
  "bottom-left": "bottom-4 left-4 items-start flex-col-reverse",
};

/**
 * Fixed, position-aware container that stacks Toasts. Newest sits at the screen
 * edge (top stacks down, bottom stacks up). Tailwind.
 *
 * @param {object} props
 * @param {('top-right'|'top-center'|'top-left'|'bottom-right'|'bottom-center'|'bottom-left')} [props.position='top-right']
 * @param {number} [props.gap=10] Gap between toasts (px).
 * @param {React.ReactNode} props.children Toast elements.
 * @param {string} [props.className]
 */
export default function ToastStack({ position = "top-right", gap = 10, children, className = "" }) {
  return (
    <div
      className={cn("fixed z-[10000] flex pointer-events-none", POSITIONS[position] || POSITIONS["top-right"], className)}
      style={{ gap }}
    >
      {React.Children.map(children, (c) => (c ? <div className="pointer-events-auto w-full max-w-sm">{c}</div> : null))}
    </div>
  );
}
