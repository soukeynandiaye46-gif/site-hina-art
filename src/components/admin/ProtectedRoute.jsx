import { useEffect } from 'react'
import { useAuthContext } from '../../context/AuthContext'

export default function ProtectedRoute({ children, onUnauthenticated }) {
  const { isAuthenticated } = useAuthContext()

  useEffect(() => {
    if (!isAuthenticated) onUnauthenticated()
  }, [isAuthenticated, onUnauthenticated])

  return isAuthenticated ? children : null
}
