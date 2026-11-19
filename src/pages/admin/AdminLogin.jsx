import { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { demoCredentials } from '../../services/authService'
import { Icon } from '../../components/admin/AdminPrimitives'

export default function AdminLogin({ onNavigate, returnTo = '/admin' }) {
  const { isAuthenticated, login } = useAuthContext()
  const [email, setEmail] = useState(demoCredentials?.email || '')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (isAuthenticated) onNavigate(returnTo)
  }, [isAuthenticated, onNavigate, returnTo])

  async function submit(event) {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await login(email, password)
      onNavigate(returnTo)
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'La connexion a échoué.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAFAFA] px-5 py-12 text-[#111111]">
      <section className="w-full max-w-md border border-[#E5E5E0] bg-white px-7 py-9 shadow-[0_12px_48px_rgba(17,17,17,0.04)] sm:px-10 sm:py-11">
        <div className="text-center">
          <a href="/" onClick={(event) => {
            event.preventDefault()
            onNavigate('/')
          }} className="font-serif text-4xl tracking-[0.04em]">
            HINA <span className="italic">Art</span>
          </a>
          <p className="mt-3 text-[9px] uppercase tracking-[0.25em] text-[#666660]">Accès privé • Atelier</p>
        </div>

        <div className="my-8 h-px bg-[#E5E5E0]" />
        <h1 className="font-serif text-2xl">Connexion à l’atelier</h1>
        <p className="mt-2 text-xs leading-5 text-[#666660]">Connectez-vous pour gérer la galerie HINA Art.</p>

        <form className="mt-7 space-y-5" onSubmit={submit}>
          <label className="block">
            <span className="mb-2 block text-[9px] uppercase tracking-[0.18em] text-[#666660]">E-mail</span>
            <input
              autoComplete="username"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full border border-[#E5E5E0] bg-white px-3 py-3 text-sm text-[#111111] outline-none transition focus:border-[#C5A059]"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-[9px] uppercase tracking-[0.18em] text-[#666660]">Mot de passe</span>
            <span className="relative block">
              <input
                autoComplete="current-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="w-full border border-[#E5E5E0] bg-white px-3 py-3 pr-12 text-sm text-[#111111] outline-none transition focus:border-[#C5A059]"
              />
              <button
                type="button"
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                aria-pressed={showPassword}
                onClick={() => setShowPassword((visible) => !visible)}
                className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-[#666660] hover:text-[#C5A059]"
              >
                <Icon name={showPassword ? 'eyeOff' : 'eye'} className="h-4 w-4" />
              </button>
            </span>
          </label>

          {error && <p role="alert" className="border border-rose-200 bg-rose-50 px-3 py-2.5 text-xs leading-5 text-rose-800">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#C5A059] px-5 py-3.5 text-[10px] uppercase tracking-[0.16em] text-[#111111] transition hover:brightness-95 disabled:cursor-wait disabled:opacity-70"
          >
            {submitting ? 'Connexion…' : 'Se connecter à l’atelier'}
          </button>
        </form>

        {demoCredentials && (
          <details className="mt-5 border-t border-[#E5E5E0] pt-4 text-[10px] text-[#666660]">
            <summary className="cursor-pointer uppercase tracking-[0.13em] hover:text-[#C5A059]">Accès de démonstration</summary>
            <p className="mt-3 leading-5">
              E-mail : <code>{demoCredentials.email}</code><br />
              Mot de passe : <code>{demoCredentials.password}</code>
            </p>
          </details>
        )}

        {!demoCredentials && (
          <p className="mt-5 text-[10px] leading-5 text-[#666660]">
            La connexion de production doit être reliée à un fournisseur d’authentification serveur.
          </p>
        )}

        <a
          href="/"
          onClick={(event) => {
            event.preventDefault()
            onNavigate('/')
          }}
          className="mt-7 inline-block text-[10px] uppercase tracking-[0.13em] text-[#666660] transition hover:text-[#C5A059]"
        >
          ← Retour à la galerie
        </a>
      </section>
    </main>
  )
}
