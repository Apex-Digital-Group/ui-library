import React, { useEffect, useRef, useState } from "react";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Lock } from "lucide-react";
import "./PostCard.css";

// 6 reactions, 1:1 with the host (like/love/haha/wow/sad/angry).
const REACTION_EMOJI = { like: "👍", love: "❤️", haha: "😂", wow: "😮", sad: "😢", angry: "😠" };
const REACTION_ORDER = ["like", "love", "haha", "wow", "sad", "angry"];

/**
 * base44 PostCard — Instagram-style feed card matching base44's Feed page:
 * solid card, square media, icon-only action row (heart/comment/send/bookmark),
 * "Liked by … and N others", inline caption, "View all N comments", borderless
 * add-comment. Presentational: all host logic arrives via callbacks/slots.
 *
 * Self-contained styling (scoped CSS). Peer deps: react, lucide-react.
 */
export default function PostCard({
  author = {},
  timeText,
  caption,
  interests = [],
  onInterestClick,
  pinned = false,
  media = [],
  onOpenMedia,
  locked = {},
  liked = false,
  currentReaction = null,
  onToggleLike,
  onReact,
  likesText,
  onOpenLikes,
  comments = {},
  share = {},
  shareSlot,
  saved = false,
  onToggleSave,
  menuItems = [],
  extraContent,
  onAuthorClick,
  onCardClick,
  className = "",
}) {
  const [showPicker, setShowPicker] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mediaIndex, setMediaIndex] = useState(0);
  const menuRef = useRef(null);
  // Hover-intent: keep the reaction picker open while the pointer travels from
  // the like button up to the popup (there's a visual gap between them, so a
  // bare onMouseLeave would close it before the user can pick an emoji).
  const pickerHideTimer = useRef(null);
  useEffect(() => () => clearTimeout(pickerHideTimer.current), []);
  const openPicker = () => { clearTimeout(pickerHideTimer.current); if (onReact) setShowPicker(true); };
  const scheduleClosePicker = () => { pickerHideTimer.current = setTimeout(() => setShowPicker(false), 280); };

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onDoc = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [menuOpen]);

  const isGallery = media.length > 1;
  const item = media[isGallery ? mediaIndex : 0] || media[0];
  const stop = (e) => e.stopPropagation();

  const pickReaction = (name) => { onReact ? onReact(name) : onToggleLike && onToggleLike(); setShowPicker(false); };
  const submit = (e) => { e.preventDefault(); if ((comments.value || "").trim()) comments.onSubmit && comments.onSubmit(); };

  return (
    <article className={`bond-post-card ${className}`} onClick={onCardClick}>
      {/* Header */}
      <div className="bond-post-card__header">
        <div className="bond-post-card__author">
          {author.picture ? (
            <img className="bond-post-card__avatar" src={author.picture} alt={author.name || "user"}
              onClick={(e) => { stop(e); onAuthorClick && onAuthorClick(e); }} />
          ) : null}
          <div className="bond-post-card__name-row">
            <span className="bond-post-card__name" onClick={(e) => { stop(e); onAuthorClick && onAuthorClick(e); }}>
              {author.name}
            </span>
            {author.verified ? (
              <svg className="bond-post-card__verified" viewBox="0 0 24 24" fill="currentColor" aria-label="verified">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            ) : null}
            {author.feeling ? <span className="bond-post-card__feeling">is feeling {author.feeling}</span> : null}
            {timeText ? <span className="bond-post-card__time">• {timeText}</span> : null}
          </div>
        </div>

        {menuItems.length > 0 ? (
          <div className="bond-post-card__menu" ref={menuRef}>
            <button type="button" className="bond-post-card__icon-btn" aria-label="Post menu"
              onClick={(e) => { stop(e); setMenuOpen((v) => !v); }}>
              <MoreHorizontal size={20} />
            </button>
            {menuOpen ? (
              <div className="bond-post-card__menu-list" onClick={stop}>
                {menuItems.map((m) => (
                  <button key={m.key} type="button" className="bond-post-card__menu-item"
                    onClick={(e) => { stop(e); setMenuOpen(false); m.onClick && m.onClick(e); }}>
                    {m.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      {pinned ? <div className="bond-post-card__pinned">📌 Pinned</div> : null}

      {/* Host-rendered exotic blocks (shared content, age-gate) */}
      {extraContent}

      {/* Media (square) */}
      {item ? (
        <div className={`bond-post-card__media ${locked.isLocked ? "bond-post-card__media--blur" : ""}`}>
          {item.type === "video" ? (
            <video src={item.url} autoPlay muted loop playsInline
              onClick={(e) => { stop(e); onOpenMedia && onOpenMedia(isGallery ? mediaIndex : 0); }} />
          ) : (
            <img src={item.url} alt="post media"
              onClick={(e) => { stop(e); onOpenMedia && onOpenMedia(isGallery ? mediaIndex : 0); }} />
          )}

          {locked.isLocked ? (
            <div className="bond-post-card__locked" onClick={(e) => { stop(e); locked.onUnlock && locked.onUnlock(); }}>
              <div className="bond-post-card__lock-icon"><Lock size={32} /></div>
              <span className="bond-post-card__lock-title">Premium Content</span>
              <span className="bond-post-card__lock-sub">Tap to unlock{locked.priceText ? ` • ${locked.priceText}` : ""}</span>
            </div>
          ) : null}

          {isGallery && !locked.isLocked ? (
            <div className="bond-post-card__dots">
              {media.map((_, i) => (
                <button key={i} type="button" aria-label={`Media ${i + 1}`}
                  className={`bond-post-card__dot ${i === mediaIndex ? "bond-post-card__dot--active" : ""}`}
                  onClick={(e) => { stop(e); setMediaIndex(i); }} />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Body */}
      <div className="bond-post-card__body" onClick={stop}>
        <div className="bond-post-card__actions-row">
          <div className="bond-post-card__actions-left">
            <div
              style={{ position: "relative", display: "inline-flex" }}
              onMouseEnter={openPicker}
              onMouseLeave={scheduleClosePicker}
            >
              <button
                type="button"
                aria-label="Like"
                className={`bond-post-card__action-icon ${liked || currentReaction ? "bond-post-card__action-icon--liked" : ""}`}
                onClick={(e) => { stop(e); onToggleLike ? onToggleLike() : pickReaction("like"); }}
              >
                {currentReaction && currentReaction !== "like" ? (
                  <span style={{ fontSize: 22, lineHeight: 1 }}>{REACTION_EMOJI[currentReaction]}</span>
                ) : (
                  <Heart size={24} />
                )}
              </button>
              {showPicker && onReact ? (
                <div className="bond-post-card__picker" onClick={stop}>
                  {REACTION_ORDER.map((name) => (
                    <button key={name} type="button" title={name} className="bond-post-card__picker-btn"
                      onClick={(e) => { stop(e); pickReaction(name); }}>
                      {REACTION_EMOJI[name]}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <button type="button" aria-label="Comment" className="bond-post-card__action-icon"
              onClick={(e) => { stop(e); comments.onToggle && comments.onToggle(); }}>
              <MessageCircle size={24} />
            </button>

            {shareSlot ? (
              <span className="bond-post-card__action-icon">{shareSlot}</span>
            ) : (
              <button type="button" aria-label="Share" className="bond-post-card__action-icon"
                onClick={(e) => { stop(e); share.onShare && share.onShare(e); }}>
                <Send size={24} />
              </button>
            )}
          </div>

          {onToggleSave ? (
            <button type="button" aria-label="Save"
              className={`bond-post-card__action-icon ${saved ? "bond-post-card__action-icon--saved" : ""}`}
              onClick={(e) => { stop(e); onToggleSave(); }}>
              <Bookmark size={24} />
            </button>
          ) : null}
        </div>

        {likesText ? (
          <div className="bond-post-card__likes">
            <button type="button" className="bond-post-card__likes-btn" onClick={(e) => { stop(e); onOpenLikes && onOpenLikes(); }}>
              {likesText}
            </button>
          </div>
        ) : null}

        {interests.length > 0 ? (
          <div className="bond-post-card__interests">
            {interests.map((it) => (
              <span key={it.id} className="bond-post-card__interest"
                onClick={(e) => { stop(e); onInterestClick && onInterestClick(it, e); }}>
                {it.name}
              </span>
            ))}
          </div>
        ) : null}

        {caption ? (
          <div className="bond-post-card__caption">
            {author.name ? <span className="bond-post-card__strong">{author.name} </span> : null}
            <span>{caption}</span>
          </div>
        ) : null}

        {comments.count > 0 || comments.visible ? (
          <button type="button" className="bond-post-card__comments-link"
            onClick={(e) => { stop(e); comments.onToggle && comments.onToggle(); }}>
            {comments.visible ? "Hide comments" : `View all ${comments.count || 0} comments`}
          </button>
        ) : null}

        {comments.visible ? <div className="bond-post-card__comments-list">{comments.listSlot}</div> : null}

        {comments.canComment ? (
          <form className="bond-post-card__comment-form" onSubmit={submit}>
            <input type="text" className="bond-post-card__comment-input" placeholder="Add a comment..."
              value={comments.value || ""} onChange={(e) => comments.onChange && comments.onChange(e.target.value)} />
            {(comments.value || "").trim() ? (
              <button type="submit" className="bond-post-card__comment-post">Post</button>
            ) : null}
          </form>
        ) : null}
      </div>
    </article>
  );
}

export { PostCard };
