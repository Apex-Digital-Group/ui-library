import React, { createContext, useContext, useMemo } from 'react'

/**
 * Library-side AuthContext stub.
 *
 * The base44 auth provider hits @base44/sdk at runtime; the library only needs
 * a context shape so that components can be ported and rendered in Storybook
 * and unit tests. Consumers swap in their real provider in their app shell.
 *
 * Override pattern in a host app:
 *
 *   import { AuthContext } from '@/lib/AuthContext'
 *   <AuthContext.Provider value={realAuthValue}>…</AuthContext.Provider>
 */
const defaultValue = {
  user: null,
  isAuthenticated: false,
  isLoadingAuth: false,
  isLoadingPublicSettings: false,
  authChecked: true,
  authError: null,
  appPublicSettings: null,
  navigateToLogin: () => {},
  checkUserAuth: () => Promise.resolve(),
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  refresh: () => Promise.resolve(),
}

export const AuthContext = createContext(defaultValue)

export function AuthProvider({ value, children }) {
  const merged = useMemo(() => ({ ...defaultValue, ...(value || {}) }), [value])
  return <AuthContext.Provider value={merged}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
