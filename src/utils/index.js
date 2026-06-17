/**
 * App-router helper. Mirrors base44's signature so library components import it
 * unchanged; consumers can re-bind via Vite alias if they need a richer impl.
 */
export function createPageUrl(pageName) {
  return '/' + String(pageName ?? '').replace(/ /g, '-')
}
