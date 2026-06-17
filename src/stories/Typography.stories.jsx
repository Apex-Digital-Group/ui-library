import * as React from 'react'

const DISPLAY = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs']
const BODY = ['xl', 'lg', 'md', 'sm', 'xs']
const LABEL = ['lg', 'md', 'sm']

function Row({ token, sample }) {
  return (
    <div className="flex items-baseline gap-6 border-b border-border py-4">
      <code className="t-label-sm w-40 shrink-0 text-muted-foreground">{token}</code>
      <span className={token}>{sample}</span>
    </div>
  )
}

export default {
  title: 'Foundations/Typography',
  parameters: { layout: 'fullscreen' },
}

export const Scale = () => (
  <div className="mx-auto max-w-3xl p-10">
    <p className="t-eyebrow mb-2">Foundations</p>
    <h1 className="t-display-xl mb-2">Typography</h1>
    <p className="t-body-lg mb-10 text-muted-foreground">
      Inter, sized from a single scale. Use display sizes for headers, body sizes for prose,
      labels for chrome, and the eyebrow for section kickers.
    </p>

    <p className="t-eyebrow mt-12 mb-3">Display</p>
    {DISPLAY.map((s) => (
      <Row key={s} token={`t-display-${s}`} sample="The quick brown fox jumps" />
    ))}

    <p className="t-eyebrow mt-12 mb-3">Body</p>
    {BODY.map((s) => (
      <Row key={s} token={`t-body-${s}`} sample="The quick brown fox jumps over the lazy dog." />
    ))}

    <p className="t-eyebrow mt-12 mb-3">Label</p>
    {LABEL.map((s) => (
      <Row key={s} token={`t-label-${s}`} sample="LABEL — descriptive caption" />
    ))}

    <p className="t-eyebrow mt-12 mb-3">Special</p>
    <Row token="t-eyebrow" sample="EYEBROW STYLE" />
    <Row token="t-link" sample="An inline link" />
  </div>
)
