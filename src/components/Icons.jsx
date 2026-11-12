function Svg({ children, className = 'h-5 w-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  )
}

export function IconInstagram({ className }) {
  return (
    <Svg className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.3" cy="6.7" r="0.7" fill="currentColor" stroke="none" />
    </Svg>
  )
}

export function IconPinterest({ className }) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M11.2 17.5c.3-1.3.7-2.6.9-3.9.1-.5.2-1 .1-1.5-.2.1-.5.1-.8.1-1.4 0-2.5-1.2-2.5-2.8 0-1.1.8-2.2 2-2.2 1 0 1.6.7 1.6 1.7 0 1.3-.6 2.3-.6 2.3l1.2 5.1" />
    </Svg>
  )
}

export function IconFacebook({ className }) {
  return (
    <Svg className={className}>
      <path d="M14.2 8.2H16V5.6h-1.8c-2.2 0-3.4 1.4-3.4 3.5v1.5H8.8V13h2v5.4h2.4V13h2l.4-2.4h-2.4V9.4c0-.7.3-1.2 1-1.2Z" />
      <circle cx="12" cy="12" r="8.5" />
    </Svg>
  )
}

const iconByLabel = {
  Instagram: IconInstagram,
  Pinterest: IconPinterest,
  Facebook: IconFacebook,
}

export function SocialIcon({ label, className }) {
  const Icon = iconByLabel[label] ?? IconInstagram
  return <Icon className={className} />
}

export function IconArrow({ direction = 'left', className = 'h-5 w-5' }) {
  const path = direction === 'left' ? 'M15 5 8 12l7 7' : 'M9 5l7 7-7 7'
  return (
    <Svg className={className}>
      <path d={path} />
    </Svg>
  )
}

export function IconBag({ className = 'h-5 w-5' }) {
  return (
    <Svg className={className}>
      <path d="M5 8h14l1 12H4L5 8Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </Svg>
  )
}
