// Per-category chip colours — full literal Tailwind classes so the JIT scanner
// keeps them. Shared by CreditStatCard + TransactionCard.
export const CREDIT_CHIP_COLORS = {
  pink:   { bg: "bg-pink-500/15",   ring: "ring-pink-500/30",   text: "text-pink-400" },
  red:    { bg: "bg-red-500/15",    ring: "ring-red-500/30",    text: "text-red-400" },
  blue:   { bg: "bg-blue-500/15",   ring: "ring-blue-500/30",   text: "text-blue-400" },
  purple: { bg: "bg-purple-500/15", ring: "ring-purple-500/30", text: "text-purple-400" },
  green:  { bg: "bg-green-500/15",  ring: "ring-green-500/30",  text: "text-green-400" },
  yellow: { bg: "bg-yellow-500/15", ring: "ring-yellow-500/30", text: "text-yellow-400" },
};
export const creditChip = (color) => CREDIT_CHIP_COLORS[color] || CREDIT_CHIP_COLORS.purple;
