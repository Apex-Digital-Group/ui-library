/**
 * Bond design-system Tailwind preset.
 * Apps consume this via `presets: [require('@bond/lib/tailwind-preset')]`
 * so colors, radii, fonts, and typography scale stay in lockstep with the library.
 */
import tailwindcssAnimate from 'tailwindcss-animate'

const preset = {
  darkMode: ['class'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        display: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display-xl':  ['3.75rem', { lineHeight: '1.07', letterSpacing: '-0.025em', fontWeight: '700' }],
        'display-lg':  ['3rem',    { lineHeight: '1.1',  letterSpacing: '-0.02em',  fontWeight: '700' }],
        'display-md':  ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '700' }],
        'display-sm':  ['1.875rem',{ lineHeight: '1.2',  letterSpacing: '-0.01em',  fontWeight: '600' }],
        'display-xs':  ['1.5rem',  { lineHeight: '1.25', letterSpacing: '-0.005em', fontWeight: '600' }],
        'body-xl':     ['1.25rem', { lineHeight: '1.6',  fontWeight: '400' }],
        'body-lg':     ['1.125rem',{ lineHeight: '1.6',  fontWeight: '400' }],
        'body-md':     ['1rem',    { lineHeight: '1.55', fontWeight: '400' }],
        'body-sm':     ['0.875rem',{ lineHeight: '1.5',  fontWeight: '400' }],
        'body-xs':     ['0.75rem', { lineHeight: '1.5',  fontWeight: '400' }],
        'label-lg':    ['1rem',    { lineHeight: '1.4',  letterSpacing: '0',       fontWeight: '500' }],
        'label-md':    ['0.875rem',{ lineHeight: '1.4',  letterSpacing: '0',       fontWeight: '500' }],
        'label-sm':    ['0.75rem', { lineHeight: '1.4',  letterSpacing: '0.01em',  fontWeight: '500' }],
        'eyebrow':     ['0.75rem', { lineHeight: '1.2',  letterSpacing: '0.12em',  fontWeight: '600' }],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
        /*
         * LiveGemini brand palette. Auditing base44 surfaced these four
         * dark-purple shades used as `bg-[#…]` arbitrary values across 200+
         * call sites. Exposed here as tokens so new code can say
         * `bg-brand` / `bg-brand-card` and existing arbitrary-value usages
         * remain valid (Tailwind keeps both working side-by-side).
         */
        brand: {
          DEFAULT: '#1a0e2e',           // deepest — page background
          card:    '#2E2249',           // primary surface (nav, cards)
          'card-muted': '#251a3a',      // secondary band under nav
          'card-raised': '#3a2d58',     // hover / popover surface
          pink:    '#ec4899',           // accent gradient start
          purple:  '#a855f7',           // accent gradient end
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [tailwindcssAnimate],
}

export default preset
