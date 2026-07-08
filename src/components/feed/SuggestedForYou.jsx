import React from "react";
import "./SuggestedForYou.css";

/**
 * base44 "Suggested for you" — Instagram-style follow-suggestions block for the
 * feed sidebar. Replaces the legacy "You Might Like To Follow" card.
 *
 * A compact header row ("Suggested for you" + "See All") over a list of users,
 * each rendered as: small round avatar, username, secondary line, and a text
 * "Follow" action. The follow control reflects host state (Follow / Following,
 * and an "Unfollow" affordance on hover when already following).
 *
 * Presentational and host-agnostic: all data + behavior arrive via props, and
 * styling is scoped CSS (no Tailwind required), so it renders identically in
 * Storybook and in any host app.
 *
 * @param {object} props
 * @param {string} [props.title='Suggested for you'] Section heading.
 * @param {string} [props.seeAllLabel='See All'] Label for the top-right action.
 * @param {() => void} [props.onSeeAll] Click handler for "See All" (hidden if omitted).
 * @param {Array} [props.users=[]] Items: `{ id, username, subtitle, image, isFollowing, busy }`.
 * @param {(user: object) => void} [props.onFollowToggle] Follow/unfollow click.
 * @param {(user: object) => void} [props.onUserClick] Avatar/username click.
 * @param {boolean} [props.loading=false] Show a loading line instead of the list.
 * @param {string} [props.loadingText='Loading…'] Loading copy.
 * @param {string} [props.emptyText='No suggestions right now'] Empty-state copy.
 * @param {string} [props.followLabel='Follow']
 * @param {string} [props.followingLabel='Following']
 * @param {string} [props.unfollowLabel='Unfollow']
 * @param {string} [props.className] Extra class names on the root.
 */
export default function SuggestedForYou({
  title = "Suggested for you",
  seeAllLabel = "See All",
  onSeeAll,
  users = [],
  onFollowToggle,
  onUserClick,
  loading = false,
  loadingText = "Loading…",
  emptyText = "No suggestions right now",
  followLabel = "Follow",
  followingLabel = "Following",
  unfollowLabel = "Unfollow",
  className = "",
}) {
  const classes = ["bond-suggested", className].filter(Boolean).join(" ");

  return (
    <section className={classes} aria-label={title}>
      <div className="bond-suggested__header">
        <span className="bond-suggested__title">{title}</span>
        {onSeeAll ? (
          <button type="button" className="bond-suggested__see-all" onClick={onSeeAll}>
            {seeAllLabel}
          </button>
        ) : null}
      </div>

      {loading ? (
        <p className="bond-suggested__status">{loadingText}</p>
      ) : users.length === 0 ? (
        <p className="bond-suggested__status">{emptyText}</p>
      ) : (
        <ul className="bond-suggested__list">
          {users.map((user) => {
            const initial = (user.username || "?").charAt(0).toUpperCase();
            return (
              <li className="bond-suggested__row" key={user.id ?? user.username}>
                <button
                  type="button"
                  className="bond-suggested__user"
                  onClick={onUserClick ? () => onUserClick(user) : undefined}
                  disabled={!onUserClick}
                >
                  <span className="bond-suggested__avatar">
                    {user.image ? (
                      <img src={user.image} alt={user.username || ""} loading="lazy" />
                    ) : (
                      <span className="bond-suggested__avatar-fallback">{initial}</span>
                    )}
                  </span>
                  <span className="bond-suggested__meta">
                    <span className="bond-suggested__username">{user.username}</span>
                    {user.subtitle ? (
                      <span className="bond-suggested__subtitle">{user.subtitle}</span>
                    ) : null}
                  </span>
                </button>

                <button
                  type="button"
                  className={`bond-suggested__follow${user.isFollowing ? " is-following" : ""}`}
                  onClick={onFollowToggle ? (e) => onFollowToggle(user, e) : undefined}
                  disabled={user.busy || !onFollowToggle}
                  aria-pressed={!!user.isFollowing}
                >
                  {user.isFollowing ? (
                    <>
                      <span className="bond-suggested__follow-idle">{followingLabel}</span>
                      <span className="bond-suggested__follow-hover">{unfollowLabel}</span>
                    </>
                  ) : (
                    followLabel
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
