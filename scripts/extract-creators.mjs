#!/usr/bin/env node
/**
 * Best-effort extraction of per-creator data from the 26 *profile.jsx files
 * that base44 ships. Each file is the same template with name/tagline/bio/
 * imagery/stats baked in as JSX literals. We pull what we can with regex and
 * fall back to sensible defaults derived from the filename when a field is
 * missing or formatted in a way the regex can't catch.
 *
 * Writes lib/src/data/creators.js — a single source of truth that the new
 * <CreatorProfile creator={...}/> template consumes.
 */
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const PAGES = path.join(ROOT, 'src', 'pages')
const OUT = path.join(ROOT, 'src', 'data', 'creators.js')

const FILES = [
  'ahriprofile', 'angelaphroditeprofile', 'bellabombshellprofile', 'candycrushprofile',
  'chloecharmprofile', 'divadiamondprofile', 'evaeleganceprofile', 'fionafireprofile',
  'giagemstonprofile', 'gingerspiceprofile', 'heidihoneyprofile', 'ivyvenomprofile',
  'jasminejewelprofile', 'kikicurvesprofile', 'lolalollipopprofile', 'lunaluxeprofile',
  'mistymischiefprofile', 'naughtynatashaprofile', 'ninanightfallprofile', 'oliviaopalprofile',
  'peachesparadiseprofile', 'rubyravishprofile', 'sassysarahprofile', 'scarlettsinprofile',
  'vixenvictoriaprofile', 'zoezenithprofile',
]

const DEFAULT_SCHEDULE = {
  Monday:    [30, 25, 85, 20, 15, 10, 55, 40],
  Tuesday:   [35, 30, 90, 25, 20, 15, 70, 50],
  Wednesday: [25, 20, 75, 15, 10, 25, 80, 45],
  Thursday:  [40, 35, 95, 30, 25, 20, 65, 55],
  Friday:    [45, 40, 80, 35, 30, 70, 90, 75],
  Saturday:  [50, 45, 70, 40, 85, 90, 95, 80],
  Sunday:    [35, 30, 65, 25, 75, 85, 70, 60],
}

const splitName = (slug) => {
  const base = slug.replace(/profile$/, '')
  // crude word-splitter: rely on the curated mapping below; fall back to capitalized whole
  const map = {
    ahri: ['Ahri'],
    angelaphrodite: ['Angela', 'Phrodite'],
    bellabombshell: ['Bella', 'Bombshell'],
    candycrush: ['Candy', 'Crush'],
    chloecharm: ['Chloe', 'Charm'],
    divadiamond: ['Diva', 'Diamond'],
    evaelegance: ['Eva', 'Elegance'],
    fionafire: ['Fiona', 'Fire'],
    giagemston: ['Gia', 'Gemston'],
    gingerspice: ['Ginger', 'Spice'],
    heidihoney: ['Heidi', 'Honey'],
    ivyvenom: ['Ivy', 'Venom'],
    jasminejewel: ['Jasmine', 'Jewel'],
    kikicurves: ['Kiki', 'Curves'],
    lolalollipop: ['Lola', 'Lollipop'],
    lunaluxe: ['Luna', 'Luxe'],
    mistymischief: ['Misty', 'Mischief'],
    naughtynatasha: ['Naughty', 'Natasha'],
    ninanightfall: ['Nina', 'Nightfall'],
    oliviaopal: ['Olivia', 'Opal'],
    peachesparadise: ['Peaches', 'Paradise'],
    rubyravish: ['Ruby', 'Ravish'],
    sassysarah: ['Sassy', 'Sarah'],
    scarlettsin: ['Scarlett', 'Sin'],
    vixenvictoria: ['Vixen', 'Victoria'],
    zoezenith: ['Zoe', 'Zenith'],
  }
  return map[base] || [base[0].toUpperCase() + base.slice(1)]
}

const matchFirst = (src, re) => {
  const m = re.exec(src)
  return m ? m[1].trim() : null
}

async function extract(file) {
  const slug = path.basename(file, '.jsx')
  const fullSrc = await fs.readFile(path.join(PAGES, file), 'utf8')
  const nameParts = splitName(slug)
  const displayName = nameParts.join(' ')
  const handle = '@' + slug.replace(/profile$/, '')

  // Scope to the hero block: from the first `<main` to the end of `Follow/Following`
  // button. Excludes the header/navbar where the gemini logo + branding lives.
  const heroStart = fullSrc.search(/<main\b/)
  const heroEndCandidate = fullSrc.indexOf('Follow', heroStart > 0 ? heroStart : 0)
  const hero = heroStart > 0
    ? fullSrc.slice(heroStart, heroEndCandidate > heroStart ? heroEndCandidate + 200 : fullSrc.length)
    : fullSrc
  const src = fullSrc // bio + details may live below the hero; keep the full file too

  // Tagline: the <p> directly under the <h2>NAME</h2> in the hero.
  const tagline =
    matchFirst(hero, /<h2[^>]*>\s*[^<]+<\/h2>\s*<p[^>]*>([^<]+)<\/p>/) ||
    `Featured creator — ${displayName}`

  // Bio: first long paragraph (>= 60 chars) in the page body.
  const bio =
    matchFirst(src, /<p[^>]*line-clamp-[34][^>]*>\s*([^<]{60,})\s*<\/p>/) ||
    matchFirst(src, /<p[^>]*text-white\/90[^>]*>\s*([^<]{80,})\s*<\/p>/) ||
    `${displayName} is one of LiveGemini's featured creators.`

  // Imagery — only consider the hero block, and reject obvious branding assets.
  const isLogo = (u) => /gemini_logo|icra|rta-logo|asacp/i.test(u)
  const isVideo = (u) => /\.mp4$/i.test(u)
  const heroImages = [...hero.matchAll(/src="(https?:\/\/[^"]+\.(?:jpe?g|png|webp|mp4))"/g)]
    .map((m) => m[1])
    .filter((u) => !isLogo(u))
  const bannerCandidate = heroImages.find((u) => isVideo(u)) || heroImages[0] || ''
  const avatarCandidate = heroImages.find((u) => u !== bannerCandidate && !isVideo(u)) || bannerCandidate

  // Stats — three `font-bold text-lg` spans inside the hero only.
  const statValues = [...hero.matchAll(/font-bold[^>]*text-lg[^>]*>([^<]+)</g)]
    .map((m) => m[1].trim())
    .filter((v) => /^[\d.,KkMm]/.test(v))
  const stats = {
    followers: statValues[0] || '12.5K',
    following: statValues[1] || '328',
    posts: statValues[2] || '1.2K',
    ratings: matchFirst(src, />(\d+)\s+ratings</) || '1286',
  }

  // Personal details — six grid stats in the "Bottom Row".
  const ages = matchFirst(src, />\s*(\d{2})\s*<\/p>\s*<p[^>]*>Age</)
  const breast = matchFirst(src, />\s*([A-Za-z][A-Za-z ]+?)\s*<\/p>\s*<p[^>]*>Breast size</)
  const gender = matchFirst(src, />\s*(Female|Male|Non-binary)\s*<\/p>\s*<p[^>]*>Gender</) || 'Female'
  const heightCm = matchFirst(src, />\s*(\d{2,3})<span[^>]*>cm<\/span>\s*<\/p>\s*<p[^>]*>Height</)
  const butt = matchFirst(src, />\s*([A-Za-z][A-Za-z ]+?)\s*<\/p>\s*<p[^>]*>Butt size</)
  const build = matchFirst(src, />\s*([A-Za-z][A-Za-z ]+?)\s*<\/p>\s*<p[^>]*>Build</)

  return {
    slug,
    name: displayName,
    handle,
    tagline,
    bio,
    bannerImage: bannerCandidate || '',
    avatarImage: avatarCandidate || '',
    bannerIsVideo: bannerCandidate ? isVideo(bannerCandidate) : false,
    stats,
    details: {
      age: ages ? Number(ages) : 26,
      breast: breast || 'Medium',
      gender,
      height: heightCm ? Number(heightCm) : 170,
      butt: butt || 'Curvy',
      build: build || 'Athletic',
    },
    schedule: DEFAULT_SCHEDULE,
  }
}

async function main() {
  const creators = await Promise.all(FILES.map((s) => extract(`${s}.jsx`)))
  await fs.mkdir(path.dirname(OUT), { recursive: true })
  const literal = `/**
 * Static creator-profile data for the 26 demo creators bundled with base44.
 * Generated by scripts/extract-creators.mjs — rerun if the source profile
 * pages change. Consumed by <CreatorProfile creator={...}/> and its Storybook.
 */
export const creators = ${JSON.stringify(creators, null, 2)}

export const creatorBySlug = Object.fromEntries(creators.map((c) => [c.slug, c]))

export function suggestionsFor(slug, count = 4) {
  return creators
    .filter((c) => c.slug !== slug)
    .slice(0, count)
    .map((c) => ({ name: c.name, handle: c.handle, image: c.avatarImage }))
}
`
  await fs.writeFile(OUT, literal)
  console.log(`wrote ${OUT} (${creators.length} creators)`)
}

main().catch((e) => { console.error(e); process.exit(1) })
