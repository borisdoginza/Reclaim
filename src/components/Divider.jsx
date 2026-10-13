export default function Divider({ className = '' }) {
  return (
    <div
      className={`divider h-divider-thickness w-full max-w-divider-width bg-secondary ${className}`}
      aria-hidden="true"
    />
  )
}
