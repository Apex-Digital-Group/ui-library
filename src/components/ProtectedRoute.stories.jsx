import * as React from 'react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import { AuthContext } from '../lib/AuthContext'

const makeAuth = (overrides = {}) => ({
  user: null,
  isAuthenticated: false,
  isLoadingAuth: false,
  authChecked: true,
  authError: null,
  appPublicSettings: null,
  navigateToLogin: () => {},
  checkUserAuth: () => Promise.resolve(),
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  refresh: () => Promise.resolve(),
  ...overrides,
})

const Wrap = ({ auth, children }) => (
  <AuthContext.Provider value={auth}>
    <MemoryRouter initialEntries={['/protected']}>
      <Routes>
        <Route path="/protected" element={children} />
      </Routes>
    </MemoryRouter>
  </AuthContext.Provider>
)

const Login = <div className="rounded-md border p-6 text-center text-sm">Please sign in to continue.</div>

export default {
  title: 'Components/ProtectedRoute',
  component: ProtectedRoute,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}

export const SignedOut = {
  render: () => (
    <Wrap auth={makeAuth()}>
      <ProtectedRoute unauthenticatedElement={Login} />
    </Wrap>
  ),
}

export const Loading = {
  render: () => (
    <Wrap auth={makeAuth({ isLoadingAuth: true, authChecked: false })}>
      <ProtectedRoute unauthenticatedElement={Login} />
    </Wrap>
  ),
}

export const SignedIn = {
  render: () => (
    <Wrap auth={makeAuth({ isAuthenticated: true, user: { id: 1, name: 'Fazle' } })}>
      <ProtectedRoute unauthenticatedElement={Login} />
    </Wrap>
  ),
}
