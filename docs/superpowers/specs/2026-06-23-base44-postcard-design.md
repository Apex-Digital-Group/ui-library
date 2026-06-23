# base44 PostCard — design spec

Date: 2026-06-23

## Goal

Give interactive-twin's feed posts the base44 PostCard look while preserving
**all** current functionality (full parity with `PostItem.jsx`): 6-type
reactions, threaded comments, share, premium/locked unlock, subscription/buy,
galleries, pin/bookmark/hide/block/report/delete, follow-from-reactions, NSFW
age-gate, shared-content previews, interests, feelings. Build the card in the
`@bond/lib` UI library, validate in Storybook, then consume it in
interactive-twin's feed (feed list only).

## Source material

- **Visual target:** `~/base44/src/components/feed/PostCard.jsx` (247 lines) —
  dark glass card (`bg-[#2E2249]/50 backdrop-blur-xl rounded-2xl border
  border-white/10`), header (avatar+name+time+⋯), content, single/gallery
  media with carousel dots, counts row, 3-button action bar (Like w/ 6-emoji
  hover picker, Comment, Share), collapsible comments + add-comment form.
  All mock (random counts, `alert()` share).
- **Functionality to preserve:** `interactive-twin/src/components/feed/PostItem.jsx`
  (1866 lines). Delegates logic to host components: `ReactionsModal`,
  `ShareDropdown`, `CommentList`, and modals `SubscriptionModal`,
  `VodInvoiceIndex`, gallery `Modal`/`Carousel`, `ReportModal`,
  `SinglePostView`, `ProductDetail`, `UserHoverCard`. API via `api`
  (Environment): `feed/${id}/comment`, `reactions`, `feed/post/${id}`,
  `bookmark_item`, `posts_hide`, `users_block`, `users_follow/unfollow`,
  `feed/post/${id}` delete, etc.

## Architecture — base44 shell in lib + host-owned logic

The lib `PostCard` is **presentational**: it owns the base44 visual shell and
self-contained UI, and exposes **callbacks + render slots** for everything that
needs host services. interactive-twin keeps PostItem's logic in a thin wrapper
(`PostItemBond.jsx`) that reuses the existing handlers and modals and feeds them
into the lib card. No `api`/AntD/i18n enters lib.

Styling: self-contained scoped CSS (`.bond-post-card*`), no Tailwind generation
dependency (same decision as StoryCard, given lib Tailwind v3 vs interactive-twin
v4). Uses `lucide-react` + `framer-motion` (present in both repos) for base44
fidelity.

### lib PostCard props

Presentational data:
- `author` `{ name, picture, uniqueId, feeling?, checkin?, visibility? }`
- `timeText` string
- `content` node (host passes `renderMentions(post.content)` output)
- `pinned` boolean, `interests` `[{id,name}]` + `onInterestClick(i)`
- `media` `[{ type:'image'|'video', url }]`, `extraMediaCount`, `onOpenMedia(index)`

Functional callbacks/slots:
- `reaction` `{ current, totalCount, top:[{name,color,icon}], summaryText,
  onReact(name), onRemoveReaction(), onOpenReactionList() }`
  (6 reactions: like/love/haha/wow/sad/angry — base44's 6-emoji picker maps 1:1)
- `counts` `{ comments, shares }`
- `comments` `{ listSlot, inputVisible, value, onChange, onSubmit, canComment, onToggle }`
  (`listSlot` = host `<CommentList>`; input is base44-styled)
- `share` `{ onShare }` or `shareSlot` (host `<ShareDropdown>` trigger)
- `locked` `{ isLocked, priceText, onUnlock }` — base44 "Tap to unlock" overlay
- `menuItems` `[{ key, label, onClick }]` (⋯ menu; host builds owner/non-owner sets)
- `extraContent` node — host renders exotic blocks (shared-content previews,
  NSFW age-gate) reusing PostItem's existing JSX
- `onCardClick(e)` (open SinglePostView), `className`

### Host wrapper (`PostItemBond.jsx`)

Holds PostItem's state + handlers + modals verbatim; renders `<PostCard>` from
`@bond/lib`, passing the props above. Reaction writes go through the existing
reactions API (the same call `ReactionsModal` makes); comments via
`feed/${id}/comment`; share via the existing `ShareDropdown` (slotted);
premium/subscription/buy/gallery/report/single-post modals rendered by the
wrapper, triggered by lib callbacks.

## Integration — feed list only

`FeedIndex` renders `PostItemBond` instead of `PostItem`. `PostItem.jsx` stays
unchanged (still used by `SinglePostView` and profile feeds).

## Scope boundary (explicit)

- **Base44 restyle covers the common post card**: header, content, own media
  tiles/carousel, counts row, action bar (react/comment/share), comments
  section, locked overlay, ⋯ menu.
- **Exotic branches keep working but reuse current markup via `extraContent`**:
  shared product/video/gallery/user previews and the NSFW age-gate render
  through the host slot (functional parity preserved) and are not fully
  re-skinned to base44 in v1. Flag for a follow-up if full re-skin is wanted.
- Modals (subscription, buy, gallery lightbox, report, single-post) are host
  components, unchanged.

## Files

- lib: rewrite `src/components/feed/PostCard.jsx` (prop-driven base44 shell) +
  `PostCard.css`; update `PostCard.stories.jsx` (locked/gallery/reactions/
  comments states with mock handlers); keep barrel + add `./feed/PostCard`
  subpath export.
- interactive-twin: new `src/components/feed/PostItemBond.jsx`; `FeedIndex`
  swaps `PostItem` → `PostItemBond` (feed list only).

## Out of scope

- SinglePostView / profile-feed adoption.
- Re-skinning the shared-content/product/gallery preview branches to base44.
- Backend/API changes.
