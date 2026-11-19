function getLocalDemoCredentials() {
  return {
    email: import.meta.env.VITE_ADMIN_EMAIL || 'admin@hina-art.local',
    password: import.meta.env.VITE_ADMIN_PASSWORD || 'atelier-demo-2026',
  }
}

export const demoCredentials = import.meta.env.DEV
  ? getLocalDemoCredentials()
  : null

export async function authenticateAdmin(email, password) {
  if (!import.meta.env.DEV) {
    // Replace this guard with a Supabase or Firebase sign-in call; VITE_* values are public.
    throw new Error('Le service d’authentification de production n’est pas encore configuré.')
  }

  const { email: demoEmail, password: demoPassword } = getLocalDemoCredentials()
  if (
    email.trim().toLowerCase() !== demoEmail.trim().toLowerCase()
    || password !== demoPassword
  ) {
    throw new Error('Adresse e-mail ou mot de passe incorrect.')
  }

  return { provider: 'local-demo', authenticated: true }
}

export async function revokeAdminSession(session) {
  if (session?.provider === 'supabase') {
    // Replace with supabase.auth.signOut() when the hosted provider is configured.
    return
  }
  if (session?.provider === 'firebase') {
    // Replace with signOut(auth) when the hosted provider is configured.
  }
}
