import { Navigate } from 'react-router-dom'
import { useAuth } from '@hooks/index'
import { ROUTES } from '@constants/index'
import type { User } from '@/types'

interface RoleProtectedRouteProps {
  children: React.ReactNode
  allowedRoles: User['role'][]
}

export const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />
  }

  return <>{children}</>
}