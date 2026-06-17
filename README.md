# ui-library

[![Storybook](https://img.shields.io/badge/playbook-storybook%208-ff4785)](http://localhost:6006)
[![Tests](https://img.shields.io/badge/vitest-336%20passing-22c55e)](#tests)
[![Crawler](https://img.shields.io/badge/playwright-179%20stories-2e8fff)](#playwright-story-crawler)

Bond / LiveGemini shared component library — React 18 + Tailwind 3 + shadcn/ui.
Ported one-to-one from the **base44** static design system
([`livegemini-updated`](https://github.com/bondmedia007/livegemini-updated)) and
prepared for incremental adoption by the Bond frontends, starting with
`interactive-twin`.

The goal: any frontend can pull a single primitive (`Button`) or a whole
screen-level component (`CreatorProfile`, `BrowseGridPage`) without forking the
design, and a designer can verify every component in Storybook before it ships.

---

## What's inside

| Layer            | Count | Path                          |
|------------------|------:|-------------------------------|
| shadcn primitives|    49 | `src/components/ui/*`         |
| Domain components|    50 | `src/components/{feed,videos,photos,groups,agency,refer,*}` |
| Pages            |    30 | `src/pages/*`                 |
| Data modules     |     2 | `src/data/*` (creators + browse items) |
| Storybook stories|   179 | `src/**/*.stories.jsx`        |
| Unit tests       |   130 | `src/**/*.test.jsx` (336 assertions) |

### Notable refactors vs the source

- **26 creator-profile pages → 1**: a single `CreatorProfile` template fed by
  `src/data/creators.js`. Storybook arg-select picks any of the 26 creators;
  a gallery story shows them all. Saved ~12k lines of duplicated JSX.
- **`LiveCams` + `Videos` → `BrowseGridPage`**: same shell + filter sidebar,
  pulled into one template fed by `src/data/browseItems.js` (`liveItems` +
  `videoItems`). The two original pages are 5-line wrappers.
- **LiveGemini brand palette** (`#1a0e2e`, `#2E2249`, `#251a3a`, `#3a2d58`,
  `#ec4899`, `#a855f7`) was hardcoded across 200+ arbitrary Tailwind values;
  now exposed as named tokens (`bg-brand`, `bg-brand-card`, …) in the preset.
  Existing `bg-[#…]` usages still resolve.
- **Inter** is loaded once via `typography.css`. The duplicate `@import url`
  inside `Champions.jsx` + `CamHouse.jsx` was removed.

---

## Stack

- **React 18** (JSX, matches the base44 source so files port 1:1)
- **Vite 5** (dev server + Vitest runner)
- **Tailwind 3** with a shared preset (`tailwind.preset.js`)
- **shadcn/ui** — new-york style, neutral base, CSS-variable theming
- **Storybook 8** — visual playbook
- **Vitest + React Testing Library + jsdom** — unit tests
- **Playwright + Chromium** — render-crawler that visits every story in a
  headless browser and reports any failures

---

## Layout

```
ui-library/
├── src/
│   ├── components/         99 components: 49 shadcn primitives + 50 domain
│   │   ├── ui/             button, dialog, dropdown-menu, sidebar, chart, …
│   │   ├── feed/           PostCard
│   │   ├── videos/         VideoCard, PromoCard, FilterSidebar
│   │   ├── photos/         PhotoCard
│   │   ├── groups/         GroupCard, GroupsLayout, StatusBadge, modals
│   │   ├── agency/         9 agency screens / drawers
│   │   ├── refer/          12 refer-a-friend blocks
│   │   └── *.jsx           16 top-level modals (Sign-in, Register, KYC, …)
│   ├── pages/              30 page designs
│   │   ├── CreatorProfile.jsx        ← collapses 26 originals
│   │   ├── BrowseGridPage.jsx        ← collapses LiveCams + Videos
│   │   ├── LiveCams.jsx + Videos.jsx ← thin wrappers
│   │   ├── Feed, Photos, Wallet, Profile, Champions, Agency, ReferAFriend, CamHouse, PinkBlondeLive
│   │   └── Group*.jsx                17 group-management screens
│   ├── data/
│   │   ├── creators.js     26-creator dataset for <CreatorProfile/>
│   │   └── browseItems.js  liveItems + videoItems for <BrowseGridPage/>
│   ├── lib/
│   │   ├── utils.js        cn() helper (clsx + tailwind-merge)
│   │   ├── AuthContext.jsx Stub — host app provides real provider
│   │   ├── query-client.js TanStack Query default instance
│   │   ├── PageNotFound.jsx Carried from base44
│   │   └── groupsMockData.js Shared mock fixtures
│   ├── api/base44Client.js Stub — host app aliases this to the real client
│   ├── utils/index.js      createPageUrl()
│   ├── hooks/use-mobile.jsx
│   ├── stories/            Foundations (Typography, Colors)
│   ├── styles.css          shadcn CSS variables + base layer
│   ├── typography.css      Inter @import + `.t-*` semantic class scale
│   └── index.js            barrel export (151 entries)
├── .storybook/             playbook config (light/dark global)
├── tailwind.preset.js      Inter stack, type scale, color tokens, brand palette
├── tailwind.config.js      applies the preset + scans content
├── postcss.config.js
├── components.json         shadcn config (new-york, neutral)
├── jsconfig.json
├── vite.config.js          @ alias + vitest setup
├── tests/setup.js          RTL + jsdom polyfills
└── scripts/
    ├── generate-stories.mjs    rebuild default stories/tests for every file
    ├── extract-creators.mjs    rebuild src/data/creators.js from base44
    ├── find-duplicates.mjs     pairwise jaccard scan for near-copy files
    └── crawl-stories.mjs       Playwright crawl every story, write report
```

---

## Quick start

```bash
git clone git@github.com:Apex-Digital-Group/ui-library.git
cd ui-library
npm install
npm run storybook    # http://localhost:6006
```

Available scripts (`package.json`):

| Script               | What it does                                              |
|----------------------|-----------------------------------------------------------|
| `npm run storybook`  | Storybook dev server (port 6006)                          |
| `npm run build-storybook` | Static build into `storybook-static/`                |
| `npm test`           | Vitest one-shot                                           |
| `npm run test:watch` | Vitest watch mode                                         |
| `npm run dev`        | Vite dev (rarely needed — Storybook is the entry)         |
| `npm run build`      | Vite library build                                        |

---

## Integrating with a frontend

The library ships **source** (not a pre-built bundle), so consumers wire it
through Vite alias + Tailwind preset and tree-shake on import.

### 1. Add as a dependency

Pick whichever fits your workflow:

```jsonc
// package.json — local sibling checkout (current setup)
"dependencies": {
  "@bond/ui-library": "file:../ui-library"
}
```

```jsonc
// package.json — git ref (no npm publish yet)
"dependencies": {
  "@bond/ui-library": "github:Apex-Digital-Group/ui-library#main"
}
```

### 2. Wire Vite

```js
// vite.config.js (e.g. inside interactive-twin)
import path from 'node:path'

export default {
  resolve: {
    alias: {
      '@bond/ui-library': path.resolve(__dirname, '../ui-library/src'),
      // Optional — swap library stubs for your real implementations:
      '@/api/base44Client': path.resolve(__dirname, './src/api/base44Client.real.js'),
      '@/lib/AuthContext':  path.resolve(__dirname, './src/lib/AuthContext.real.jsx'),
    },
  },
}
```

### 3. Wire Tailwind

```js
// tailwind.config.js
import bondPreset from '../ui-library/tailwind.preset.js'

export default {
  presets: [bondPreset],
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    '../ui-library/src/**/*.{js,jsx}',  // ← Tailwind must see the library's classes
  ],
}
```

### 4. Load the CSS once at the app shell

```jsx
// main.jsx (or App entry)
import '@bond/ui-library/styles.css'       // shadcn theme + base layer
import '@bond/ui-library/typography.css'   // Inter + .t-* classes
```

### 5. Import components

```jsx
import { Button, Card, CardHeader, CardTitle } from '@bond/ui-library'
import { CreatorProfilePage, creators } from '@bond/ui-library'

export function CreatorRoute() {
  return <CreatorProfilePage creator={creators[0]} />
}
```

### 6. (If you use the auth-coupled components) Provide a real auth context

`SignInModal`, `RegisterModal`, `ProfileDropdown`, `GeminiAI`, and
`ProtectedRoute` read from `@/lib/AuthContext`. The library exports
`AuthContext` so you can supply your real value:

```jsx
import { AuthContext } from '@bond/ui-library'

<AuthContext.Provider value={myAuthValue}>
  <App />
</AuthContext.Provider>
```

Alternatively, alias the module path in Vite (option in step 2).

---

## Incremental migration playbook

The library is built for **gradual** adoption — drop in one component, ship,
repeat.

1. **Pick the smallest unit you can swap.** Start with a leaf primitive
   (`Button`, `Card`, `Badge`) where the visual upgrade lands without touching
   page logic. Replace one usage at a time, verify in the running app.
2. **Lift the brand palette.** Either map your existing colour vars to the
   tokens in `tailwind.preset.js`, or run both palettes side-by-side and migrate
   page-by-page.
3. **Swap chrome before content.** Replace a page's header, nav and footer with
   the library version while the body keeps the old layout — that lets you ship
   a partial migration without coordinating with backend.
4. **Cut whole screens to library pages.** Once chrome is shared, swap the
   route element to a library page (`CreatorProfilePage`, `BrowseGridPage`,
   `WalletPage`). Pass live data through the same prop shape used in the demo
   stories.
5. **Decommission the old UI** once the equivalent library surface ships.
   Storybook stories are the spec — diff against them.

---

## Storybook playbook

Every component renders in isolation:

- **Foundations / Typography** — full `t-display / t-body / t-label / t-eyebrow` scale
- **Foundations / Colors** — brand palette + shadcn semantic tokens, light/dark toggle
- **UI / *** — 27 shadcn primitives, each with a working compound example
- **Components / *** — 50 domain components with realistic prop data
- **Pages / *** — 30 page designs, including `CreatorProfile` (arg-select picks
  one of 26 creators) and a `Gallery` story showing all 26 thumbnails

### Light / dark

Toolbar → **Theme** → `light` / `dark`. The decorator flips
`document.documentElement.classList.toggle('dark')` so every shadcn token
switches instantly.

---

## Tests

Two layers, run them both before any PR.

### 1. Vitest (unit)

```bash
npm test
```

- One spec per component asserts the module exports resolve cleanly — catches
  bad imports / refactor breakage / missing deps cheaply.
- Foundational primitives (`Button`, `Badge`, `Card`, `Input`, `Label`,
  `Separator`) ship hand-written DOM + interaction tests.
- `CreatorProfile` has a real render test across all 26 creators + an assertion
  that `suggestionsFor()` never recommends the current creator.

Result: **130 files / 336 assertions, ~25s**.

### 2. Playwright story crawler

```bash
npm run storybook &       # in another shell
STORYBOOK=http://localhost:6006 node scripts/crawl-stories.mjs
```

Visits every entry in `/index.json` via `iframe.html?id=…`, listens for
`pageerror` + console errors, detects empty / portal-only renders, and writes:

- `scripts/.story-report.md` — markdown table of failures
- `scripts/.story-report.json` — raw per-story records

Exits non-zero on any failure — drop-in for CI.

Result: **179 stories, 179 pass**.

---

## Design tokens

### Typography

The scale lives in `tailwind.preset.js` (font-size tokens) and `typography.css`
(semantic classes). Both must be in scope.

| Token                              | Use                       |
|------------------------------------|---------------------------|
| `t-display-2xl / xl / lg / md / sm / xs` | Hero + page headers |
| `t-body-xl / lg / md / sm / xs`    | Prose, descriptions       |
| `t-label-lg / md / sm`             | Form labels, chrome       |
| `t-eyebrow`                        | Section kickers           |
| `t-link`, `t-code`                 | Inline accents            |

See `Foundations / Typography` in Storybook for the live reference.

### Colors

LiveGemini brand palette + shadcn HSL semantic tokens.

| Token                  | Hex / source                | Use                          |
|------------------------|-----------------------------|------------------------------|
| `bg-brand`             | `#1a0e2e`                   | Page background              |
| `bg-brand-card`        | `#2E2249`                   | Primary surface (nav, cards) |
| `bg-brand-card-muted`  | `#251a3a`                   | Secondary band under nav     |
| `bg-brand-card-raised` | `#3a2d58`                   | Hover / popover surface      |
| `text-brand-pink`      | `#ec4899`                   | Gradient accent start        |
| `text-brand-purple`    | `#a855f7`                   | Gradient accent end          |
| `bg-background / foreground / primary / muted / accent / destructive` | shadcn HSL vars | Theme-aware, respect `.dark` |

See `Foundations / Colors` in Storybook for the swatches.

---

## Regeneration scripts

Idempotent — none of them overwrite hand-authored work.

| Script                          | Purpose                                                 |
|---------------------------------|---------------------------------------------------------|
| `scripts/generate-stories.mjs`  | Rebuild default `.stories.jsx` + `.test.jsx` for every  `src/components/**` and `src/pages/**` file that doesn't already have one. |
| `scripts/extract-creators.mjs`  | Re-derive `src/data/creators.js` from the 26 source profile files. Currently unused at runtime — kept for if/when the upstream design changes. |
| `scripts/find-duplicates.mjs`   | Pairwise Jaccard scan that surfaces near-copy components / pages. |
| `scripts/crawl-stories.mjs`     | Playwright render crawl — see [Tests](#tests).          |

---

## What's stubbed (and why)

Four host-app concerns ship as **stubs** so the library renders end-to-end in
Storybook without dragging in the base44 SDK or live infra:

| Module                        | Stub behaviour                                       | Replace via                          |
|-------------------------------|------------------------------------------------------|--------------------------------------|
| `@/api/base44Client`          | Proxy that throws "not wired" on any call            | Vite alias in step 2                 |
| `@/lib/AuthContext`           | Default React context with no-op `checkUserAuth` etc | `<AuthContext.Provider value={...}>` |
| `@/utils/createPageUrl`       | `'/' + name.replace(' ', '-')` — same shape as base44| Override only if richer routing      |
| `@/lib/query-client`          | Real `QueryClient` with the same defaults as base44  | Use as-is or replace                 |

---

## Source provenance

Every component except the foundations was ported from
[`bondmedia007/livegemini-updated`](https://github.com/bondmedia007/livegemini-updated)
(main branch, 2026-06-15). Per-file `git blame` lines up with that source for
the initial commit; subsequent commits are listed in `CHANGELOG.md` once it
lands. The 26 → 1 creator collapse, the `BrowseGridPage` extraction, and the
brand-token promotion are the only structural deviations.

---

## License

Proprietary — © Bond Digital Web Design FZCO. Internal use only.
