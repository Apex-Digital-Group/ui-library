/**
 * Library-side stub for `@/api/base44Client`.
 *
 * The real client (in livegemini-updated) wraps the @base44/sdk runtime, which
 * the library does not ship. Consumers that need live calls should replace
 * this module via a Vite alias:
 *
 *   resolve: { alias: { '@/api/base44Client': '/src/api/base44Client.real.js' } }
 *
 * The stub keeps the surface so components render in Storybook + tests without
 * a runtime dependency.
 */
const notWired = (name) => (..._args) => {
  throw new Error(
    `[bond/lib] base44.${name}() called but no client is wired. ` +
      `Override the '@/api/base44Client' module in the host app.`,
  )
}

export const base44 = {
  auth: {
    me: notWired('auth.me'),
    login: notWired('auth.login'),
    logout: notWired('auth.logout'),
    register: notWired('auth.register'),
  },
  entities: new Proxy(
    {},
    {
      get: (_t, entity) =>
        new Proxy(
          {},
          { get: (_t2, method) => notWired(`entities.${String(entity)}.${String(method)}`) },
        ),
    },
  ),
  functions: new Proxy(
    {},
    { get: (_t, fn) => notWired(`functions.${String(fn)}`) },
  ),
}
