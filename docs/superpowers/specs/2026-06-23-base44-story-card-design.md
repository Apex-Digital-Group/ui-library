# base44 StoryCard — design spec

Date: 2026-06-23

## Goal

Replace interactive-twin's feed story row (big rectangular gradient media
tiles) with base44's circular-avatar story card. Build the card once in the
`@bond/lib` UI library, validate in Storybook, then consume it in
interactive-twin's feed.

## Source of truth (base44)

`~/base44/src/pages/Feed.jsx:539` renders each story as:

- `flex flex-col items-center gap-1 cursor-pointer`
- ring: `w-16 h-16 rounded-full p-[2px]`, gradient
  `bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600` when
  `hasNew`, else `bg-gray-600`
- gap: `w-full h-full rounded-full p-[2px] bg-[#1a0e2e]`
- image: `w-full h-full rounded-full object-cover`
- label: `text-xs text-white/80 truncate w-16 text-center`

## Component (lib)

Self-contained so it renders in any host regardless of the host's Tailwind
version (lib is Tailwind v3, interactive-twin is Tailwind v4). No `@/` alias,
no `cn`/radix deps, co-located scoped CSS.

- `lib/src/components/story/StoryCard.jsx`
- `lib/src/components/story/StoryCard.css` — `.bond-story-card*` classes
- `lib/src/components/story/StoryCard.stories.jsx`
- export from `lib/src/index.js` + a `package.json` subpath export

### Props

| prop | type | default | purpose |
|---|---|---|---|
| `variant` | `'story' \| 'add'` | `'story'` | normal vs "+ Add Story" bubble |
| `image` | string | — | avatar URL (required for story) |
| `username` | string | — | label under avatar |
| `hasNew` | boolean | `false` | gradient ring vs gray |
| `onClick` | fn | — | story→open viewer, add→open recorder |
| `size` | number | `64` | ring diameter (px) |
| `gapColor` | string | `'#1a0e2e'` | ring-gap color (host bg) |
| `className` | string | — | passthrough |

## Integration (interactive-twin) — feed row only

- Vite alias `@bond/lib → ../lib/src` in `vite.config.mjs`.
- `StoryTray.jsx` feed branch (`layoutContext !== "explore"`): render
  `<StoryCard>` instead of the rectangular `story-preview-card`.
  - story card: `image=user.picture`, `username=user.unique_id`,
    `hasNew=hasUnviewedItems(group)`, `onClick=handleOpenStoryViewer(i)`
  - add card: `variant="add"`, `onClick=handleAddStoryClick`
- Explore/profile rails untouched. No change to story fetch, viewer modal, or
  recorder.

## Out of scope

- Explore/profile story layouts.
- Story data model, viewer modal, recorder modal.
- Prod packaging/publish of `@bond/lib` (dev consumption via Vite alias).
