import React, { useCallback, useEffect, useRef, useState } from "react";
import "./CommentsList.css";

// 6 reactions, 1:1 with PostCard's (like/love/haha/wow/sad/angry) — kept in
// sync intentionally so a comment reacted to with a mix of types shows that
// mix, not just a bare number, same as the post itself.
const REACTION_EMOJI = { like: "👍", love: "❤️", haha: "😂", wow: "😮", sad: "😢", angry: "😠" };
const REACTION_ORDER = ["like", "love", "haha", "wow", "sad", "angry"];

const initials = (name) =>
  (name || "")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function Avatar({ name, src, size = "md", onClick }) {
  return (
    <div
      className={`bond-comments__avatar bond-comments__avatar--${size}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
    >
      {src ? <img src={src} alt="" /> : <span>{initials(name)}</span>}
    </div>
  );
}

function VerifiedBadge() {
  return (
    <svg className="bond-comments__verified" viewBox="0 0 24 24" fill="currentColor" aria-label="verified">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  );
}

function ChevronIcon({ flipped }) {
  return (
    <svg
      className={`bond-comments__chevron ${flipped ? "bond-comments__chevron--flipped" : ""}`}
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ReactionSummary({ counts, myReaction }) {
  const total = Object.values(counts || {}).reduce((sum, c) => sum + c, 0);
  const orderIndex = (name) => REACTION_ORDER.indexOf(name);
  let top = Object.entries(counts || {})
    .filter(([name, c]) => c > 0 && REACTION_EMOJI[name])
    .sort((a, b) => (b[1] - a[1]) || (orderIndex(a[0]) - orderIndex(b[0])))
    .slice(0, 3)
    .map(([name]) => name);
  // Your own reaction should always be represented in the stack, even if it
  // didn't make the top 3 by raw count.
  if (myReaction && REACTION_EMOJI[myReaction] && !top.includes(myReaction)) {
    top = [myReaction, ...top].slice(0, 3);
  }

  if (top.length === 0) return null;

  return (
    <div className="bond-comments__reaction-summary">
      <span className="bond-comments__reaction-stack" aria-hidden="true">
        {top.map((name) => (
          <span key={name} className="bond-comments__reaction-emoji" title={name}>{REACTION_EMOJI[name]}</span>
        ))}
      </span>
      <span className="bond-comments__reaction-count">{total}</span>
    </div>
  );
}

function ReactionPicker({ onPick }) {
  return (
    <div className="bond-comments__picker" onClick={(e) => e.stopPropagation()}>
      {REACTION_ORDER.map((name) => (
        <button key={name} type="button" title={name} className="bond-comments__picker-btn" onClick={() => onPick(name)}>
          {REACTION_EMOJI[name]}
        </button>
      ))}
    </div>
  );
}

function ReplyComposer({ onSubmit, onCancel, placeholder = "Reply…", autoFocus = true }) {
  const [value, setValue] = useState("");
  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setValue("");
  };
  return (
    <div className="bond-comments__composer bond-comments__composer--reply">
      <textarea
        rows={1}
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
          } else if (e.key === "Escape") {
            onCancel && onCancel();
          }
        }}
        autoFocus={autoFocus}
      />
    </div>
  );
}

/**
 * A single comment (or reply) node — presentational except for the four
 * callbacks (onReact/onSubmitReply/onAuthorClick/onRequireAuth), which carry
 * real API calls / navigation / auth-gating the host owns. Hover-picker,
 * replies-visible toggle, and the reply composer's open/closed state are
 * pure UI state kept local, same as the reference design.
 */
function CommentNode({
  comment,
  nested = false,
  hasAuthSession,
  onRequireAuth,
  onReact,
  onAuthorClick,
  onSubmitReply,
  currentUserAvatarUrl,
  repliesLabel = (n) => (n === 1 ? "Reply" : "Replies"),
}) {
  const [showReplies, setShowReplies] = useState(false);
  const [replying, setReplying] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const pickerCloseTimer = useRef(null);
  const threadComposerRef = useRef(null);
  useEffect(() => () => clearTimeout(pickerCloseTimer.current), []);

  const openPicker = useCallback(() => {
    clearTimeout(pickerCloseTimer.current);
    setShowPicker(true);
  }, []);
  const scheduleClosePicker = useCallback(() => {
    pickerCloseTimer.current = setTimeout(() => setShowPicker(false), 300);
  }, []);

  const myReaction = comment.myReaction || null;
  const likeLabel = myReaction ? myReaction.charAt(0).toUpperCase() + myReaction.slice(1) : "Like";
  const replies = comment.replies || [];
  const hasReplies = replies.length > 0;

  // Reply on a threaded comment routes to the composer pinned at the
  // thread's end — once the thread is open, focus that composer so the
  // click visibly "opens the reply box" instead of silently expanding.
  useEffect(() => {
    if (!(replying && hasReplies && showReplies)) return;
    const node = threadComposerRef.current;
    if (node) {
      const ta = node.querySelector("textarea");
      if (ta) ta.focus();
      node.scrollIntoView({ block: "nearest" });
    }
    setReplying(false);
  }, [replying, hasReplies, showReplies]);

  const requireAuth = () => {
    if (hasAuthSession) return true;
    onRequireAuth && onRequireAuth();
    return false;
  };

  const react = (name) => {
    if (!requireAuth()) return;
    onReact && onReact(comment, name);
    setShowPicker(false);
  };

  const startReply = () => {
    if (!requireAuth()) return;
    // A comment with an open-able thread replies through the composer pinned
    // at the thread's end (design behavior); leaf comments get the transient
    // inline composer. `replying` doubles as the focus-intent flag the
    // effect above consumes once the thread composer is mounted.
    if (hasReplies) {
      setShowReplies(true);
      setReplying(true);
    } else {
      setReplying((v) => !v);
    }
  };

  return (
    <article className={`bond-comments__item ${nested ? "bond-comments__item--nested" : ""}`}>
      <div className="bond-comments__item-row">
        <Avatar
          name={comment.author?.name}
          src={comment.author?.pictureUrl}
          size={nested ? "sm" : "md"}
          onClick={() => onAuthorClick && onAuthorClick(comment)}
        />

        <div className="bond-comments__item-body">
          <div className="bond-comments__bubble">
            <span className="bond-comments__author" onClick={() => onAuthorClick && onAuthorClick(comment)}>
              {comment.author?.name}
            </span>
            {comment.author?.verified && <VerifiedBadge />}
            <time className="bond-comments__time">{comment.createdAt}</time>
            <p className="bond-comments__message">{comment.message}</p>
          </div>

          <ReactionSummary counts={comment.reactionCounts} myReaction={myReaction} />

          <div className="bond-comments__actions">
            <div
              className="bond-comments__reaction-anchor"
              onMouseEnter={openPicker}
              onMouseLeave={scheduleClosePicker}
            >
              <button
                type="button"
                className={`bond-comments__action-btn ${myReaction ? "bond-comments__action-btn--active" : ""}`}
                onClick={() => react(myReaction || "like")}
              >
                {myReaction ? (
                  <span className="bond-comments__own-reaction-emoji">{REACTION_EMOJI[myReaction]}</span>
                ) : null}
                {likeLabel}
              </button>
              {showPicker && <ReactionPicker onPick={react} />}
            </div>

            <button type="button" className="bond-comments__action-btn" onClick={startReply}>
              Reply
            </button>

            {hasReplies && (
              <button
                type="button"
                className="bond-comments__action-btn bond-comments__action-btn--muted"
                onClick={() => setShowReplies((v) => !v)}
              >
                {`${replies.length} ${repliesLabel(replies.length)}`}
                <ChevronIcon flipped={showReplies} />
              </button>
            )}
          </div>

          {replying && !hasReplies && (
            <ReplyComposer
              onCancel={() => setReplying(false)}
              onSubmit={(text) => {
                onSubmitReply && onSubmitReply(comment, text);
                setReplying(false);
                setShowReplies(true);
              }}
            />
          )}
        </div>
      </div>

      {showReplies && hasReplies && (
        <>
          <div className="bond-comments__thread">
            {replies.map((reply) => (
              <CommentNode
                key={reply.id}
                comment={reply}
                nested
                hasAuthSession={hasAuthSession}
                onRequireAuth={onRequireAuth}
                onReact={onReact}
                onAuthorClick={onAuthorClick}
                onSubmitReply={onSubmitReply}
                currentUserAvatarUrl={currentUserAvatarUrl}
                repliesLabel={repliesLabel}
              />
            ))}

            {hasAuthSession && (
              <div className="bond-comments__thread-composer" ref={threadComposerRef}>
                <Avatar name="You" src={currentUserAvatarUrl} size="sm" />
                <ReplyComposer
                  autoFocus={false}
                  placeholder="Add a reply…"
                  onSubmit={(text) => onSubmitReply && onSubmitReply(comment, text)}
                />
              </div>
            )}
          </div>

          <button
            type="button"
            className="bond-comments__action-btn bond-comments__action-btn--muted bond-comments__hide-replies"
            onClick={() => setShowReplies(false)}
          >
            Hide replies
            <ChevronIcon flipped />
          </button>
        </>
      )}
    </article>
  );
}

/**
 * Recursive comment list — this is the piece meant to be embedded inside an
 * existing card (PostCard's comments.listSlot, a gallery/video card, etc.),
 * not a standalone section. For a full standalone block with its own header,
 * sort control, and top-level composer, see CommentsSection.
 */
export default function CommentsList({
  comments = [],
  hasAuthSession = true,
  onRequireAuth,
  onReact,
  onAuthorClick,
  onSubmitReply,
  currentUserAvatarUrl,
  initialVisibleCount = 1,
  loadMoreStep = 10,
  loadMoreLabel = "View more comments",
  repliesLabel,
  className = "",
  // Optional header (title + total count + sort control), off by default so
  // existing embedded usages (PostCard's comments.listSlot, etc.) are
  // unaffected. Pass `title` to turn it on.
  title,
  totalCount,
  sortable = false,
  sortValue = "recent",
  onSortChange,
}) {
  const [visibleCount, setVisibleCount] = useState(Math.min(initialVisibleCount, comments.length) || comments.length);

  useEffect(() => {
    setVisibleCount((prev) => Math.min(Math.max(prev, Math.min(initialVisibleCount, comments.length)), Math.max(comments.length, 1)));
  }, [comments.length, initialVisibleCount]);

  const visible = comments.slice(0, visibleCount);
  const hasMore = visibleCount < comments.length;

  return (
    <div className={`bond-comments-list ${className}`}>
      {title ? (
        <div className="bond-comments__header">
          <h3 className="bond-comments__header-title">
            {title} <span className="bond-comments__header-count">({totalCount ?? comments.length})</span>
          </h3>
          {sortable ? (
            <label className="bond-comments__sort">
              <span className="bond-comments__sr-only">Sort comments</span>
              <select value={sortValue} onChange={(e) => onSortChange && onSortChange(e.target.value)}>
                <option value="recent">Most recent</option>
                <option value="top">Most popular</option>
              </select>
              <ChevronDownIcon />
            </label>
          ) : null}
        </div>
      ) : null}
      {visible.map((comment) => (
        <CommentNode
          key={comment.id}
          comment={comment}
          hasAuthSession={hasAuthSession}
          onRequireAuth={onRequireAuth}
          onReact={onReact}
          onAuthorClick={onAuthorClick}
          onSubmitReply={onSubmitReply}
          currentUserAvatarUrl={currentUserAvatarUrl}
          repliesLabel={repliesLabel}
        />
      ))}
      {hasMore && (
        <button
          type="button"
          className="bond-comments__load-more"
          onClick={() => setVisibleCount((c) => (comments.length - c <= loadMoreStep ? comments.length : c + loadMoreStep))}
        >
          {loadMoreLabel}
        </button>
      )}
    </div>
  );
}
