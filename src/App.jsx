import { ArtProvider } from './context/ArtContext'
import { AuthProvider } from './context/AuthContext'
import AppRouter from './AppRouter'

export default function App() {
  return (
    <AuthProvider>
      <ArtProvider>
        <AppRouter />
      </ArtProvider>
    </AuthProvider>
  )
}
