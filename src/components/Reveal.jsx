import { useEffect, useRef, useState } from 'react'

export default function Reveal({ as: Element = 'div', children, className = '', mask = false, ...props }) {
  const element = useRef(null)
  const [revealed, setRevealed] = useState(() => (
    !('IntersectionObserver' in window)
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ))

  useEffect(() => {
    if (!element.current || revealed) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setRevealed(true)
        observer.unobserve(entry.target)
      }
    }, { threshold: 0.15 })
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const showImmediately = () => {
      if (reducedMotion.matches) {
        setRevealed(true)
        observer.disconnect()
      }
    }

    observer.observe(element.current)
    reducedMotion.addEventListener('change', showImmediately)

    return () => {
      observer.disconnect()
      reducedMotion.removeEventListener('change', showImmediately)
    }
  }, [revealed])

  return (
    <Element
      {...props}
      ref={element}
      className={`${mask ? 'overflow-hidden' : `transition-[opacity,transform] duration-[900ms] ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 ${revealed ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} ${className}`}
    >
      {mask
        ? (
            <span className={`block transition-transform duration-[600ms] ease-out motion-reduce:translate-y-0 ${revealed ? 'translate-y-0' : 'translate-y-full'}`}>
              {children}
            </span>
          )
        : children}
    </Element>
  )
}
