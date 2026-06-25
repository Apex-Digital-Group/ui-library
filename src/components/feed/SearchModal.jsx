import React, { useEffect, useRef } from "react";
import "./SearchModal.css";

/**
 * Search modal — a centered overlay dialog (same interaction model as the
 * create-post modal) with a search field and a live results list. Opened from
 * the left-nav "Search" item.
 *
 * Presentational and host-agnostic (scoped CSS, no Tailwind): the host owns the
 * query state and supplies results. Each result: `{ id, name, username, image, href }`.
 *
 * @param {object} props
 * @param {boolean} props.open Whether the modal is shown.
 * @param {() => void} props.onClose Close handler (overlay click / Esc / button).
 * @param {string} [props.query] Controlled input value.
 * @param {(value: string) => void} [props.onQueryChange] Input change handler.
 * @param {Array} [props.results=[]] Result rows.
 * @param {boolean} [props.loading=false] Show a loading line.
 * @param {(result: object) => void} [props.onResultClick] Click handler for a result row.
 * @param {string} [props.placeholder='Search people…']
 * @param {string} [props.title='Search']
 * @param {string} [props.emptyText='No results'] Shown when a query yields nothing.
 * @param {string} [props.hintText='Start typing to search'] Shown when the query is empty.
 */
export default function SearchModal({
  open,
  onClose,
  query = "",
  onQueryChange,
  results = [],
  loading = false,
  onResultClick,
  placeholder = "Search people…",
  title = "Search",
  emptyText = "No results",
  hintText = "Start typing to search",
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      cancelAnimationFrame(id);
    };
  }, [open, onClose]);

  if (!open) return null;

  const trimmed = query.trim();

  return (
    <div className="bond-search-modal" role="dialog" aria-modal="true" aria-label={title}>
      <div className="bond-search-modal__overlay" onClick={onClose} />
      <div className="bond-search-modal__panel">
        <div className="bond-search-modal__header">
          <svg className="bond-search-modal__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            className="bond-search-modal__input"
            type="text"
            value={query}
            placeholder={placeholder}
            onChange={(e) => onQueryChange?.(e.target.value)}
            aria-label={placeholder}
          />
          <button type="button" className="bond-search-modal__close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="bond-search-modal__body">
          {loading ? (
            <p className="bond-search-modal__status">Searching…</p>
          ) : !trimmed ? (
            <p className="bond-search-modal__status">{hintText}</p>
          ) : results.length === 0 ? (
            <p className="bond-search-modal__status">{emptyText}</p>
          ) : (
            <ul className="bond-search-modal__list">
              {results.map((r) => {
                const initial = (r.name || r.username || "?").charAt(0).toUpperCase();
                const Row = (
                  <>
                    <span className="bond-search-modal__avatar">
                      {r.image ? (
                        <img src={r.image} alt={r.name || r.username || ""} loading="lazy" />
                      ) : (
                        <span className="bond-search-modal__avatar-fallback">{initial}</span>
                      )}
                    </span>
                    <span className="bond-search-modal__meta">
                      <span className="bond-search-modal__name">{r.username || r.name}</span>
                      {r.name && r.username ? (
                        <span className="bond-search-modal__sub">{r.name}</span>
                      ) : null}
                    </span>
                  </>
                );
                return (
                  <li key={r.id ?? r.username}>
                    <a
                      className="bond-search-modal__result"
                      href={r.href || undefined}
                      onClick={(e) => {
                        if (onResultClick) {
                          e.preventDefault();
                          onResultClick(r);
                        }
                      }}
                    >
                      {Row}
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
