import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'SUPER_ADMIN' | 'CREATOR'
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, userRole, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    // You might want to show a loading spinner here
    return <div>Loading...</div>
  }

  if (!user) {
    // Redirect to login page but save the attempted url
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requiredRole && userRole !== requiredRole) {
    // Redirect to appropriate dashboard based on role
    return <Navigate 
      to={userRole === 'SUPER_ADMIN' ? '/super-admin/dashboard' : '/creator/dashboard'} 
      replace 
    />
  }

  return <>{children}</>
}