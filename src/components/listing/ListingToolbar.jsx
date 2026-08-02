import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search as SearchIcon, X, ChevronDown, Image as ImageIcon, LayoutGrid, List } from "lucide-react";
import "./ListingToolbar.css";

/**
 * ListingToolbar — the shared listing-page header (search / glass selects /
 * view toggle / injected extras), designed per
 * docs/2026-08-02-listing-toolbar-review.md.
 *
 * Compound + slots: the shell owns geometry (36px rhythm, gaps, glass
 * tokens), children own behaviour, and ARBITRARY children are legal anywhere
 * — order is render order. Everything is controlled from the consumer except
 * the Search debounce timer and ViewToggle's opt-in `persistKey`.
 *
 *   <ListingToolbar variant="subnav">
 *     <ListingToolbar.Search placeholder="Search Videos" onCommit={apply} />
 *     <ListingToolbar.Spacer />
 *     <ListingToolbar.Select value={sort} options={SORTS} onChange={setSort} />
 *     <ListingToolbar.Button onClick={openUpload}>Upload Video</ListingToolbar.Button>
 *     <ListingToolbar.ViewToggle value={view} onChange={setView} persistKey="vod-list" />
 *   </ListingToolbar>
 */
function ListingToolbar({ variant = "page", sticky = false, className = "", children, ...rest }) {
  const cls = [
    "bond-ltb",
    variant === "subnav" ? "bond-ltb--subnav" : "",
    sticky ? "bond-ltb--sticky" : "",
    className,
  ].filter(Boolean).join(" ");
  return (
    <div className={cls} role="toolbar" {...rest}>
      {children}
    </div>
  );
}

/** Flex spacer — pushes everything after it to the right edge. */
function Spacer() {
  return <div className="bond-ltb__spacer" aria-hidden="true" />;
}

/**
 * Search with an internal debounce (default 350ms). `onCommit(value)` fires
 * debounced while typing, and IMMEDIATELY on Enter or clear — the consumer
 * treats every call the same (apply + refetch).
 */
function Search({ placeholder = "Search", value, defaultValue = "", onCommit, debounceMs = 350, maxWidth = 320, inputProps = {} }) {
  const [text, setText] = useState(value != null ? value : defaultValue);
  const timer = useRef(null);
  // Optional controlled mode: pages that set the search programmatically
  // (URL presets, clear-all-filters) pass `value` and the input follows it.
  useEffect(() => { if (value != null) setText(value); }, [value]);
  const commit = (value) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    if (onCommit) onCommit((value || "").trim());
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => commit(value), debounceMs);
  };
  useEffect(() => () => timer.current && clearTimeout(timer.current), []);
  return (
    <div className="bond-ltb__search" style={{ maxWidth }}>
      <SearchIcon size={14} />
      <input
        type="text"
        value={text}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={(e) => { if (e.key === "Enter") commit(text); }}
        aria-label={placeholder}
        {...inputProps}
      />
      {text ? (
        <button
          type="button"
          className="bond-ltb__search-clear"
          aria-label="Clear search"
          onClick={() => { setText(""); commit(""); }}
        >
          <X size={13} />
        </button>
      ) : null}
    </div>
  );
}

/**
 * Glass dropdown (lib-owned, antd-free). Controlled: `value`, `options`
 * ([{value,label}]), `onChange(value)`. Optional leading `icon` (lucide
 * component). Closes on outside click / Escape / selection.
 */
function Select({ value, options = [], onChange, icon: Icon, ariaLabel = "Filter", minWidth, menuAlign = "left" }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);
  const current = useMemo(() => options.find((o) => o.value === value), [options, value]);
  const openMenu = () => {
    const idx = options.findIndex((o) => o.value === value);
    setActiveIndex(idx >= 0 ? idx : 0);
    setOpen(true);
  };
  const choose = (o) => { setOpen(false); if (onChange) onChange(o.value); };
  // Listbox keyboard pattern on the wrapper: arrows move the highlight,
  // Enter picks it, Home/End jump, Escape closes.
  const onKeyDown = (e) => {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") { e.preventDefault(); openMenu(); }
      return;
    }
    if (e.key === "Escape") { setOpen(false); return; }
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIndex((i) => Math.min(i + 1, options.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Home") { e.preventDefault(); setActiveIndex(0); }
    else if (e.key === "End") { e.preventDefault(); setActiveIndex(options.length - 1); }
    else if (e.key === "Enter") { e.preventDefault(); if (options[activeIndex]) choose(options[activeIndex]); }
  };
  return (
    <div ref={rootRef} className={`bond-ltb__select${open ? " bond-ltb__select--open" : ""}`} onKeyDown={onKeyDown}>
      <button
        type="button"
        className="bond-ltb__select-btn"
        style={minWidth ? { minWidth } : undefined}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => (open ? setOpen(false) : openMenu())}
      >
        {Icon ? <Icon size={14} /> : null}
        <span className="bond-ltb__select-label">{current ? current.label : (value ?? "")}</span>
        <ChevronDown size={14} className="bond-ltb__select-caret" />
      </button>
      {open ? (
        <div
          className={`bond-ltb__select-menu${menuAlign === "right" ? " bond-ltb__select-menu--right" : ""}`}
          role="listbox"
          aria-label={ariaLabel}
        >
          {options.map((o, i) => (
            <button
              key={o.value}
              type="button"
              role="option"
              aria-selected={o.value === value}
              className={
                "bond-ltb__select-item" +
                (o.value === value ? " bond-ltb__select-item--active" : "") +
                (i === activeIndex ? " bond-ltb__select-item--focus" : "")
              }
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => choose(o)}
            >
              {o.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

const DEFAULT_MODES = [
  { key: "compact", icon: ImageIcon, title: "Compact" },
  { key: "standard", icon: LayoutGrid, title: "Grid" },
  { key: "featured", icon: List, title: "Large" },
];

/**
 * View-mode toggle. Controlled via `value`/`onChange`; pass `persistKey` to
 * also remember the choice in localStorage (restored via `onChange` on mount).
 */
function ViewToggle({ modes = DEFAULT_MODES, value, onChange, persistKey, ariaLabel = "Layout" }) {
  useEffect(() => {
    if (!persistKey || !onChange) return;
    try {
      const saved = window.localStorage.getItem(`bond-ltb-view:${persistKey}`);
      if (saved && saved !== value && modes.some((m) => m.key === saved)) onChange(saved);
    } catch { /* private mode etc. — persistence is best-effort */ }
    // mount-only restore
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const pick = (key) => {
    if (persistKey) {
      try { window.localStorage.setItem(`bond-ltb-view:${persistKey}`, key); } catch { /* noop */ }
    }
    if (onChange) onChange(key);
  };
  return (
    <div className="bond-ltb__toggle" role="group" aria-label={ariaLabel}>
      {modes.map(({ key, icon: Icon, title }) => (
        <button
          key={key}
          type="button"
          title={title}
          aria-pressed={value === key}
          onClick={() => pick(key)}
        >
          {Icon ? <Icon size={16} /> : title}
        </button>
      ))}
    </div>
  );
}

/** Site-standard 36px pill. `variant`: "primary" (gradient) | "ghost". */
function Button({ variant = "primary", className = "", children, ...rest }) {
  return (
    <button
      type="button"
      className={`bond-ltb__btn bond-ltb__btn--${variant} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}

/** Quiet square icon trigger (kebab, refresh, …). */
function IconButton({ title, className = "", children, ...rest }) {
  return (
    <button type="button" title={title} aria-label={title} className={`bond-ltb__icon-btn ${className}`.trim()} {...rest}>
      {children}
    </button>
  );
}

/** Escape hatch: any custom node, given the row's height/rhythm, nothing else. */
function Slot({ className = "", children, ...rest }) {
  return (
    <div className={`bond-ltb__slot ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
}

ListingToolbar.Search = Search;
ListingToolbar.Select = Select;
ListingToolbar.ViewToggle = ViewToggle;
ListingToolbar.Button = Button;
ListingToolbar.IconButton = IconButton;
ListingToolbar.Slot = Slot;
ListingToolbar.Spacer = Spacer;

export default ListingToolbar;
