import React from "react";
import "./StoryCard.css";

/**
 * base44 story card — a circular avatar with a gradient "new" ring and a
 * truncated username label, plus an "add story" variant.
 *
 * Self-contained: depends only on React and its own CSS, so it renders
 * identically in Storybook and in any host app regardless of the host's
 * Tailwind version.
 *
 * @param {object} props
 * @param {'story'|'add'} [props.variant='story'] Normal story vs "+ Add Story" bubble.
 * @param {string} [props.image] Avatar URL (required for the story variant).
 * @param {string} [props.username] Label shown under the avatar.
 * @param {boolean} [props.hasNew=false] Gradient ring when true, gray when viewed.
 * @param {() => void} [props.onClick] Click/Enter/Space handler.
 * @param {number} [props.size=64] Ring diameter in px.
 * @param {string} [props.gapColor='#1a0e2e'] Ring-gap color (match host background).
 * @param {string} [props.className] Extra class names.
 * @param {string} [props.alt] Image alt text (defaults to username).
 */
export function StoryCard({
  variant = "story",
  image,
  username,
  hasNew = false,
  onClick,
  size = 64,
  gapColor = "#1a0e2e",
  className = "",
  alt,
  ...rest
}) {
  const isAdd = variant === "add";
  const label = isAdd ? "Add Story" : username || "";
  const ariaLabel = isAdd ? "Add story" : `Open story from ${username || "user"}`;

  const classes = [
    "bond-story-card",
    hasNew && !isAdd ? "bond-story-card--new" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={classes}
      style={{ "--bsc-size": `${size}px`, "--bsc-gap": gapColor }}
      onClick={onClick}
      aria-label={ariaLabel}
      title={label}
      {...rest}
    >
      <span className="bond-story-card__ring">
        <span className="bond-story-card__gap">
          {image ? (
            <img
              className="bond-story-card__img"
              src={image}
              alt={alt || username || label}
            />
          ) : (
            <span className="bond-story-card__img bond-story-card__img--placeholder">
              {isAdd ? null : (username || "?").charAt(0).toUpperCase()}
            </span>
          )}
        </span>
        {isAdd ? (
          <span className="bond-story-card__badge" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
        ) : null}
      </span>
      <span className="bond-story-card__label">{label}</span>
    </button>
  );
}

export default StoryCard;
