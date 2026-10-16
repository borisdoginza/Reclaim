export default function Label({ as: Element = 'p', tone = 'light', className = '', children, ...props }) {
  const colorClass = tone === 'dark' ? 'text-accent' : 'text-secondary'

  return (
    <Element
      className={`m-0 text-[12px] leading-[1.4] font-medium tracking-[0.1em] ${colorClass} uppercase ${className}`}
      {...props}
    >
      {children}
    </Element>
  )
}
