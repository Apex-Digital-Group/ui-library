import React from "react";
import { Heart, Play, Images, Lock, Bookmark, BadgeCheck, MessageCircle } from "lucide-react";
import ReactionStack, { REACTION_EMOJI } from "../feed/ReactionStack";
import "./Favourites.css";

/**
 * Favourites page building blocks (saved-items redesign).
 *
 * Presentational only — every piece of data and every action arrives via
 * props; no API calls, no router, no storage access. The host groups its
 * bookmarks by type and composes:
 *
 *   <FavTabs>            count pills incl. "All"
 *   <FavSectionHeader>   "Profiles · 3"
 *   <FavProfileCard> / <FavAlbumCard> / <FavVideoCard> / <FavPostCard>
 *   <FavEmptyState>      nothing-saved-yet CTA
 *
 * Peer deps: react, lucide-react. Styling scoped via bond-fav-* classes.
 */

export function FavTabs({ items = [], active, onChange }) {
  return (
    <div className="bond-fav-tabs" role="tablist">
      {items.map((tab) => (
        <button
          key={tab.key}
          type="button"
          role="tab"
          aria-selected={active === tab.key}
          className={`bond-fav-tab ${active === tab.key ? "bond-fav-tab--active" : ""}`}
          onClick={() => onChange && onChange(tab.key)}
        >
          <span>{tab.label}</span>
          {typeof tab.count === "number" ? (
            <span className="bond-fav-tab__count">{tab.count}</span>
          ) : null}
        </button>
      ))}
    </div>
  );
}

export function FavSectionHeader({ title, count }) {
  return (
    <div className="bond-fav-section-header">
      <h3 className="bond-fav-section-header__title">{title}</h3>
      {typeof count === "number" ? (
        <span className="bond-fav-section-header__count">{count}</span>
      ) : null}
      <span className="bond-fav-section-header__rule" />
    </div>
  );
}

function RemoveButton({ onRemove, label = "Remove from favourites" }) {
  if (!onRemove) return null;
  return (
    <button type="button" className="bond-fav-remove" aria-label={label} title={label}
      onClick={(e) => { e.stopPropagation(); onRemove(); }}>
      <Heart size={17} fill="currentColor" />
    </button>
  );
}

export function FavProfileCard({
  name,
  avatarUrl,
  coverUrl,
  isLive = false,
  verified = false,
  subscribersText,
  onView,
  onMessage,
  onRemove,
}) {
  return (
    <div className="bond-fav-card bond-fav-profile">
      {/* Tall portrait media with the identity row overlaid on a bottom
          scrim, LIVE pill top-left, remove heart top-right — per the mock. */}
      <div className="bond-fav-profile__media" onClick={onView} role={onView ? "button" : undefined}>
        {coverUrl || avatarUrl ? (
          <img src={coverUrl || avatarUrl} alt={name || "profile"} loading="lazy" />
        ) : (
          <div className="bond-fav-media-fallback" />
        )}
        {isLive ? (
          <span className="bond-fav-live">
            <span className="bond-fav-live__dot" /> LIVE
          </span>
        ) : null}
        <div className="bond-fav-media-remove">
          <RemoveButton onRemove={onRemove} />
        </div>
        <div className="bond-fav-profile__scrim">
          {avatarUrl ? (
            <img className="bond-fav-avatar bond-fav-avatar--md" src={avatarUrl} alt="" />
          ) : (
            <span className="bond-fav-avatar bond-fav-avatar--md bond-fav-avatar--fallback">
              {(name || "?").charAt(0).toUpperCase()}
            </span>
          )}
          <div className="bond-fav-profile__names">
            <span className="bond-fav-card__title">
              {name}
              {verified ? <BadgeCheck size={15} className="bond-fav-verified" /> : null}
            </span>
            {subscribersText ? (
              <span className="bond-fav-card__meta">{subscribersText}</span>
            ) : null}
          </div>
        </div>
      </div>
      <div className="bond-fav-profile__actions">
        <button type="button" className="bond-fav-btn-primary" onClick={onView}>
          View profile
        </button>
        {onMessage ? (
          <button type="button" className="bond-fav-icon-btn" aria-label="Message"
            onClick={(e) => { e.stopPropagation(); onMessage(); }}>
            <MessageCircle size={17} />
          </button>
        ) : null}
      </div>
    </div>
  );
}

export function FavAlbumCard({
  title,
  coverUrl,
  photoCountText,
  premium = false,
  authorName,
  authorAvatarUrl,
  savedAtText,
  onOpen,
  onRemove,
}) {
  return (
    <div className="bond-fav-card bond-fav-album">
      <div className="bond-fav-album__media" onClick={onOpen} role={onOpen ? "button" : undefined}>
        {coverUrl ? <img src={coverUrl} alt={title || "album"} loading="lazy" /> : <div className="bond-fav-media-fallback" />}
        {photoCountText ? (
          <span className="bond-fav-pill bond-fav-pill--bottom-left">
            <Images size={13} /> {photoCountText}
          </span>
        ) : null}
        {premium ? (
          <span className="bond-fav-pill bond-fav-pill--top-left bond-fav-pill--premium">
            <Lock size={12} /> Premium
          </span>
        ) : null}
        <div className="bond-fav-media-remove">
          <RemoveButton onRemove={onRemove} />
        </div>
      </div>
      <div className="bond-fav-card__body">
        <span className="bond-fav-card__title">{title}</span>
        <div className="bond-fav-card__meta-row">
          {authorAvatarUrl ? <img className="bond-fav-avatar bond-fav-avatar--sm" src={authorAvatarUrl} alt="" /> : null}
          {authorName ? <span className="bond-fav-card__meta">{authorName}</span> : null}
          {savedAtText ? <span className="bond-fav-card__meta bond-fav-card__meta--dim bond-fav-card__meta--right">{savedAtText}</span> : null}
        </div>
      </div>
    </div>
  );
}

export function FavVideoCard({
  title,
  thumbUrl,
  durationText,
  priceText,
  authorName,
  authorAvatarUrl,
  onOpen,
  onRemove,
}) {
  return (
    <div className="bond-fav-card bond-fav-video">
      <div className="bond-fav-video__media" onClick={onOpen} role={onOpen ? "button" : undefined}>
        {thumbUrl ? <img src={thumbUrl} alt={title || "video"} loading="lazy" /> : <div className="bond-fav-media-fallback" />}
        <span className="bond-fav-video__play"><Play size={16} fill="currentColor" /></span>
        {durationText ? (
          <span className="bond-fav-duration">{durationText}</span>
        ) : null}
        <div className="bond-fav-media-remove">
          <RemoveButton onRemove={onRemove} />
        </div>
      </div>
      <div className="bond-fav-card__body">
        <span className="bond-fav-card__title">{title}</span>
        <div className="bond-fav-card__meta-row">
          {authorAvatarUrl ? <img className="bond-fav-avatar bond-fav-avatar--sm" src={authorAvatarUrl} alt="" /> : null}
          {authorName ? <span className="bond-fav-card__meta">{authorName}</span> : null}
          <span className="bond-fav-price-pill bond-fav-card__meta--right">{priceText || "Free"}</span>
        </div>
      </div>
    </div>
  );
}

export function FavPostCard({
  authorName,
  authorAvatarUrl,
  timeAgoText,
  body,
  // Post media per the mock: a 4:3 band on top of the card when present
  // ({type: "image"|"video", url}); text-only posts have no media area.
  media = null,
  tags = [],
  reactionCount = 0,
  // Per-reaction counts ({like: 3, haha: 1, ...}) — when provided, the
  // footer shows the ACTUAL top reactions as an emoji stack + total,
  // like the feed, instead of a generic heart.
  reactionCounts = null,
  commentCount = 0,
  onOpen,
  onRemove,
}) {
  const hasMedia = Boolean(media && media.url);
  const reactionEntries = Object.entries(reactionCounts || {})
    .filter(([kind, n]) => REACTION_EMOJI[kind] && n > 0)
    .sort((a, b) => b[1] - a[1]);
  const totalReactions = reactionEntries.length
    ? reactionEntries.reduce((acc, [, n]) => acc + n, 0)
    : reactionCount;
  return (
    <div className="bond-fav-card bond-fav-post">
      {hasMedia ? (
        <div className="bond-fav-post__media" onClick={onOpen} role={onOpen ? "button" : undefined}>
          {media.type === "video" ? (
            <video src={media.url} muted loop playsInline autoPlay />
          ) : (
            <img src={media.url} alt="post media" loading="lazy" />
          )}
          {/* Mock overlays the remove heart on the media, top-right */}
          <div className="bond-fav-post__media-remove">
            <RemoveButton onRemove={onRemove} />
          </div>
        </div>
      ) : null}
      <div className="bond-fav-card__body">
        <div className="bond-fav-post__head">
          {authorAvatarUrl ? <img className="bond-fav-avatar bond-fav-avatar--sm" src={authorAvatarUrl} alt="" /> : null}
          <span className="bond-fav-card__title">{authorName}</span>
          {timeAgoText ? (
            <span className="bond-fav-card__meta bond-fav-card__meta--dim bond-fav-post__time">{timeAgoText}</span>
          ) : null}
          {!hasMedia ? <RemoveButton onRemove={onRemove} /> : null}
        </div>
        {body ? <p className="bond-fav-post__body">{body}</p> : null}
        {tags.length ? (
          <div className="bond-fav-post__tags">
            {tags.map((tag) => (
              <span key={typeof tag === "string" ? tag : tag.id} className="bond-fav-tag">
                {typeof tag === "string" ? tag : tag.name}
              </span>
            ))}
          </div>
        ) : null}
        <div className="bond-fav-post__footer">
          {reactionEntries.length ? (
            <span className="bond-fav-card__meta" title={reactionEntries.map(([k, n]) => `${k}: ${n}`).join(", ")}>
              <ReactionStack counts={reactionCounts} />
              {totalReactions}
            </span>
          ) : (
            <span className="bond-fav-card__meta"><Heart size={14} /> {totalReactions}</span>
          )}
          <span className="bond-fav-card__meta">💬 {commentCount}</span>
          <button type="button" className="bond-fav-open-link" onClick={onOpen}>
            Open post
          </button>
        </div>
      </div>
    </div>
  );
}

export function FavEmptyState({
  title = "Nothing saved here yet",
  message = "Tap the heart on any post, video, album or profile and it will show up on this page.",
  ctaLabel,
  onCta,
}) {
  return (
    <div className="bond-fav-empty">
      <span className="bond-fav-empty__icon"><Bookmark size={26} /></span>
      <span className="bond-fav-empty__title">{title}</span>
      <span className="bond-fav-empty__message">{message}</span>
      {ctaLabel && onCta ? (
        <button type="button" className="bond-fav-btn-primary bond-fav-empty__cta" onClick={onCta}>
          {ctaLabel}
        </button>
      ) : null}
    </div>
  );
}
