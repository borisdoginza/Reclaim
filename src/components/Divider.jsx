export default function Divider({ className = '' }) {
  return (
    <div
      className={`divider h-divider-thickness w-full bg-secondary ${className}`}
      aria-hidden="true"
    />
  )
}
