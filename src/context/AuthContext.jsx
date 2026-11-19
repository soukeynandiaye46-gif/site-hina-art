import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { authenticateAdmin, revokeAdminSession } from '../services/authService'

const SESSION_KEY = 'hina-art-admin-session'
const AuthContext = createContext(null)

function readSession() {
  if (!import.meta.env.DEV) return null

  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const session = JSON.parse(raw)
    return session?.provider === 'local-demo' && session.authenticated === true ? session : null
  } catch (error) {
    console.error('Impossible de lire la session locale HINA Art.', error)
    return null
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readSession)

  const login = useCallback(async (email, password) => {
    const nextSession = await authenticateAdmin(email, password)
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(nextSession))
    setSession(nextSession)
  }, [])

  const logout = useCallback(async () => {
    await revokeAdminSession(session)
    window.sessionStorage.removeItem(SESSION_KEY)
    setSession(null)
  }, [session])

  const value = useMemo(() => ({
    isAuthenticated: Boolean(session),
    login,
    logout,
  }), [session, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuthContext doit être utilisé dans AuthProvider.')
  return context
}
