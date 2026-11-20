import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // Stored in state/localStorage until wired to backend JWT/session cookie
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('jobshield_user')
    return saved ? JSON.parse(saved) : null
  })

  function loginAsDemo(role = 'user') {
    const mockUser =
      role === 'admin'
        ? {
            id: 'adm_01',
            name: 'Salonik (Admin)',
            email: 'admin@jobshield.app',
            role: 'admin',
            plan: 'admin'
          }
        : {
            id: 'usr_01',
            name: 'Alex Morgan',
            email: 'alex@example.com',
            role: 'user',
            plan: 'free', // 'free' | 'pass_30d'
            scansUsedThisMonth: 2,
            scanLimit: 3,
            passDaysRemaining: 0
          }

    localStorage.setItem('jobshield_user', JSON.stringify(mockUser))
    setUser(mockUser)
  }

  function logout() {
    localStorage.removeItem('jobshield_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loginAsDemo, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}