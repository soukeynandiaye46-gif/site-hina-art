const iconPaths = {
  dashboard: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  artwork: <><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5z" /><circle cx="9" cy="9" r="1.5" /><path d="m20 15-4-4L6 20" /></>,
  orders: <><path d="M4 5h16l-1.5 15h-13z" /><path d="M9 8V5a3 3 0 0 1 6 0v3" /></>,
  inbox: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 13h5l2 3h4l2-3h5" /></>,
  media: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="8.5" cy="9" r="1.5" /><path d="m21 15-5-5L5 20" /></>,
  search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  external: <><path d="M14 4h6v6M20 4l-9 9" /><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" /></>,
  more: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
  trend: <><path d="m3 17 6-6 4 4 8-8" /><path d="M15 7h6v6" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  trash: <><path d="M4 7h16M10 11v6M14 11v6M6 7l1 14h10l1-14M9 7V4h6v3" /></>,
  edit: <><path d="m15 5 4 4M4 20l4-.8L19 8a2.1 2.1 0 0 0-3-3L5 16z" /></>,
  download: <><path d="M12 3v12m-5-5 5 5 5-5M4 20h16" /></>,
  eye: <><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
  eyeOff: <><path d="m3 3 18 18" /><path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" /><path d="M9.9 5.2A10.7 10.7 0 0 1 12 5c6.4 0 10 7 10 7a15.7 15.7 0 0 1-3.1 3.8M6.2 6.2C3.5 8 2 12 2 12s3.6 7 10 7c1 0 2-.2 2.8-.5" /></>,
  logout: <><path d="M10 17l5-5-5-5M15 12H3" /><path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7" /></>,
}

export function Icon({ name, className = 'h-5 w-5' }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      {iconPaths[name] || iconPaths.artwork}
    </svg>
  )
}

export function StatusBadge({ children }) {
  const styles = {
    Disponible: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    Réservée: 'border-amber-200 bg-amber-50 text-amber-800',
    Vendue: 'border-[#E5E5E0] bg-[#F5F5F2] text-[#666660]',
    Livrée: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    Expédiée: 'border-blue-200 bg-blue-50 text-blue-800',
    'En préparation': 'border-amber-200 bg-amber-50 text-amber-800',
    'Emballage caisse d’art': 'border-[#C5A059]/40 bg-[#C5A059]/10 text-[#76591F]',
  }
  return (
    <span className={`inline-flex items-center border px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] ${styles[children] || 'border-[#E5E5E0] bg-[#F5F5F2] text-[#666660]'}`}>
      {children}
    </span>
  )
}

export function PageHeading({ eyebrow, title, description, children }) {
  return (
    <div className="mb-8 flex flex-col gap-5 border-b border-[#E5E5E0] pb-7 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-[10px] uppercase tracking-[0.24em] text-[#C5A059]">{eyebrow}</p>
        <h1 className="mt-2 font-serif text-4xl text-[#111111] sm:text-5xl">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-sm leading-6 text-[#666660]">{description}</p>}
      </div>
      {children && <div className="flex flex-wrap items-center gap-3">{children}</div>}
    </div>
  )
}

export function formatAdminPrice(price) {
  return `${new Intl.NumberFormat('fr-FR').format(Number(price) || 0)} FCFA`
}