/**
 * Hook de autenticação
 * Gerencia login/logout e estado do usuário autenticado.
 * Integrar com a API real substituindo as funções abaixo.
 */
import { useState, useEffect, createContext, useContext } from 'react'
import { authService } from '../services/auth.service'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar sessão salva
    const savedUser = authService.getStoredUser()
    if (savedUser) setUser(savedUser)
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const userData = await authService.login(email, password)
    setUser(userData)
    return userData
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
