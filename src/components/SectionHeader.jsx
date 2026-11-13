export default function SectionHeader({ title, inverted = false }) {
  return (
    <header className="mx-auto mb-12 flex w-full max-w-7xl justify-center">
      <h2 className={`w-full text-center font-serif text-4xl font-medium md:text-5xl ${inverted ? 'text-neutral-100' : 'text-neutral-900'}`}>
        {title}
      </h2>
    </header>
  )
}
