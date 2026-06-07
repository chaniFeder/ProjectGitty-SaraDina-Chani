import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'

interface Props {
  allowedRole: 'customer' | 'advisor' | 'admin'
}

export function ProtectedRoute({ allowedRole }: Props) {
  const { isAuthenticated, role } = useAuthStore()

  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (role !== allowedRole) return <Navigate to="/login" replace />

  return <Outlet />
}
