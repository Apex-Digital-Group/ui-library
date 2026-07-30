import React, { useMemo, useState } from "react";
import CommentsList from "./CommentsList";
import "./CommentsSection.css";

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function initials(name) {
  return (name || "")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * Standalone comments block: header (title + count + sort), the comment
 * list, and a top-level composer. Use this for a dedicated comments page or
 * a Storybook demo. When embedding comments inside an existing card (a post,
 * a gallery, a video), use CommentsList directly instead — the host card
 * already supplies its own header/composer (see PostCard's comments slot).
 */
export default function CommentsSection({
  title = "Comments",
  comments = [],
  currentUserAvatarUrl,
  hasAuthSession = true,
  onRequireAuth,
  onSubmit,
  onReact,
  onAuthorClick,
  onSubmitReply,
  sortable = true,
}) {
  const [message, setMessage] = useState("");
  const [sort, setSort] = useState("recent");

  const rootComments = useMemo(() => {
    const items = comments.filter((c) => !c.parent);
    if (sort === "popular") {
      return [...items].sort((a, b) => {
        const totalA = Object.values(a.reactionCounts || {}).reduce((s, c) => s + c, 0);
        const totalB = Object.values(b.reactionCounts || {}).reduce((s, c) => s + c, 0);
        return totalB - totalA;
      });
    }
    return items;
  }, [comments, sort]);

  const submitComment = () => {
    const trimmed = message.trim();
    if (!trimmed) return;
    onSubmit && onSubmit(trimmed);
    setMessage("");
  };

  return (
    <section className="bond-comments-section">
      <div className="bond-comments-section__header">
        <h2 className="bond-comments-section__title">
          {title} <span className="bond-comments-section__count">({comments.length})</span>
        </h2>

        {sortable && (
          <label className="bond-comments-section__sort">
            <span className="bond-comments-section__sr-only">Sort comments</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="recent">Most recent</option>
              <option value="popular">Most popular</option>
            </select>
            <ChevronDownIcon />
          </label>
        )}
      </div>

      <div className="bond-comments-section__body">
        <CommentsList
          comments={rootComments}
          hasAuthSession={hasAuthSession}
          onRequireAuth={onRequireAuth}
          onReact={onReact}
          onAuthorClick={onAuthorClick}
          onSubmitReply={onSubmitReply}
          initialVisibleCount={rootComments.length}
        />

        {rootComments.length === 0 && (
          <div className="bond-comments-section__empty">
            <p>No comments yet</p>
            <p>Be the first to start the conversation.</p>
          </div>
        )}
      </div>

      <div className="bond-comments-section__composer">
        <div className="bond-comments-section__composer-avatar">
          {currentUserAvatarUrl ? <img src={currentUserAvatarUrl} alt="" /> : <span>{initials("You")}</span>}
        </div>

        <div className="bond-comments-section__composer-input">
          <textarea
            rows={3}
            value={message}
            placeholder="Write a comment…"
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") submitComment();
            }}
          />
          <div className="bond-comments-section__composer-footer">
            <span>Ctrl/⌘ + Enter to post</span>
            <button type="button" disabled={!message.trim()} onClick={submitComment}>
              Post
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
