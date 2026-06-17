import * as React from 'react'

export default {
  title: 'Foundations/Colors',
  parameters: { layout: 'fullscreen' },
}

function Swatch({ name, value, fg = 'text-white' }) {
  return (
    <div className="flex flex-col">
      <div
        className={`h-24 rounded-lg flex items-end p-3 ${fg}`}
        style={{ background: value }}
      >
        <span className="text-xs font-medium opacity-90">{value}</span>
      </div>
      <p className="t-label-md mt-2">{name}</p>
    </div>
  )
}

export const Brand = () => (
  <div className="p-10">
    <p className="t-eyebrow mb-2">Foundations</p>
    <h1 className="t-display-lg mb-2">Brand palette</h1>
    <p className="t-body-md mb-8 text-muted-foreground max-w-2xl">
      The LiveGemini dark-purple palette extracted from base44. Use the named
      Tailwind tokens (<code className="t-code">bg-brand</code>,{' '}
      <code className="t-code">bg-brand-card</code>, …) instead of arbitrary
      hex values for new code; existing <code className="t-code">bg-[#…]</code>{' '}
      usages still resolve to the same colour.
    </p>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
      <Swatch name="brand"        value="#1a0e2e" />
      <Swatch name="brand-card"   value="#2E2249" />
      <Swatch name="brand-card-muted"  value="#251a3a" />
      <Swatch name="brand-card-raised" value="#3a2d58" />
      <Swatch name="brand-pink"   value="#ec4899" />
      <Swatch name="brand-purple" value="#a855f7" />
    </div>

    <h2 className="t-display-sm mb-2">Semantic (shadcn)</h2>
    <p className="t-body-md mb-6 text-muted-foreground max-w-2xl">
      HSL CSS variables shared with the shadcn primitives. Flip{' '}
      <code className="t-code">.dark</code> on{' '}
      <code className="t-code">&lt;html&gt;</code> to swap them.
    </p>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <Swatch name="background" value="hsl(var(--background))" fg="text-foreground" />
      <Swatch name="foreground" value="hsl(var(--foreground))" />
      <Swatch name="primary"    value="hsl(var(--primary))" />
      <Swatch name="secondary"  value="hsl(var(--secondary))" fg="text-foreground" />
      <Swatch name="muted"      value="hsl(var(--muted))" fg="text-foreground" />
      <Swatch name="accent"     value="hsl(var(--accent))" fg="text-foreground" />
      <Swatch name="destructive" value="hsl(var(--destructive))" />
      <Swatch name="border"     value="hsl(var(--border))" fg="text-foreground" />
    </div>
  </div>
)
