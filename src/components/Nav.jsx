import { useState } from 'react'
import wordmark from '../assets/images/design-pieces/logo_2.jpg'

const navigationItems = [
  { href: '#new-arrivals', label: 'New arrivals' },
  { href: '#collection', label: 'The collection' },
  { href: '#visit', label: 'Visit' },
]

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="relative z-20 flex min-h-[72px] items-center justify-between border-b border-ink px-gutter py-3 md:min-h-[88px] md:px-[max(32px,calc((100vw-1280px)/2))]">
      <a
        className="block h-[42px] w-brand-width overflow-hidden bg-ink"
        href="#top"
        onClick={closeMenu}
        aria-label="ReClaim Vintage Shop home"
      >
        <img
          className="block h-[112px] w-brand-width -translate-y-[35px] object-cover object-center"
          src={wordmark}
          alt="ReClaim Vintage Shop"
          width="112"
          height="42"
        />
      </a>
      <button
        className="inline-flex min-h-11 cursor-pointer items-center gap-3 border-0 bg-transparent py-2 pl-3 font-medium text-[14px] tracking-[0.08em] uppercase md:hidden"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="site-navigation"
        onClick={() => setMenuOpen((isOpen) => !isOpen)}
      >
        {menuOpen ? 'Close' : 'Menu'}
        <span className="grid w-menu-width gap-[5px]" aria-hidden="true">
          <span className={`h-0.5 bg-current transition-transform duration-150 ${menuOpen ? 'translate-y-[3.5px] rotate-45' : ''}`} />
          <span className={`h-0.5 bg-current transition-transform duration-150 ${menuOpen ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
        </span>
      </button>
      <nav
        className={`${menuOpen ? 'flex' : 'hidden'} absolute top-[calc(100%+1px)] right-0 left-0 flex-col gap-0 border-b border-ink bg-paper px-gutter pt-2 pb-4 md:static md:flex md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0`}
        id="site-navigation"
        aria-label="Main navigation"
      >
        {navigationItems.map(({ href, label }) => (
          <a
            className="flex min-h-11 items-center border-b border-accent text-[16px] text-secondary md:min-h-10 md:border-0 md:text-[14px]"
            href={href}
            key={href}
            onClick={closeMenu}
          >
            {label}
          </a>
        ))}
        <a
          className="flex min-h-11 items-center border-b border-accent text-[16px] text-secondary md:min-h-10 md:border-0 md:text-[14px]"
          href="https://www.instagram.com/reclaimvintage.bp/"
          target="_blank"
          rel="noreferrer"
          onClick={closeMenu}
        >
          Instagram
        </a>
        <a
          className="flex min-h-11 items-center border-b border-accent text-[16px] text-secondary md:min-h-10 md:border-0 md:text-[14px]"
          href="https://www.tiktok.com/@reclaimvintage.bp"
          target="_blank"
          rel="noreferrer"
          onClick={closeMenu}
        >
          TikTok
        </a>
        <span
          className="mt-3 flex min-h-8 w-fit min-w-8 items-center justify-center border border-secondary text-[12px] tracking-[0.08em] md:mt-0"
          aria-label="Current language: English"
        >
          EN
        </span>
      </nav>
    </header>
  )
}
