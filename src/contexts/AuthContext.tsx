import React from 'react'
import { supabase } from '../services/supabase/client'
import type { User } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  userRole: 'SUPER_ADMIN' | 'CREATOR' | null
  isLoading: boolean
  signOut: () => Promise<void>
}

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  userRole: null,
  isLoading: true,
  signOut: async () => {}
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)
  const [userRole, setUserRole] = React.useState<'SUPER_ADMIN' | 'CREATOR' | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchUserRole(session.user.id)
      } else {
        setIsLoading(false)
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchUserRole(session.user.id)
      } else {
        setUserRole(null)
        setIsLoading(false)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', userId)
        .single()

      if (error) throw error

      setUserRole(data.role)
    } catch (error) {
      console.error('Error fetching user role:', error)
      setUserRole(null)
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, userRole, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return React.useContext(AuthContext)
}