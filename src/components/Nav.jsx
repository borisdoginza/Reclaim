import { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import wordmark from '../assets/images/design-pieces/logo_2.jpg'
import Divider from './Divider'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuAnimationEnabled, setMenuAnimationEnabled] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 768px)')
    const resetMenu = () => {
      setMenuOpen(false)
      setMenuAnimationEnabled(false)
    }

    desktopQuery.addEventListener('change', resetMenu)

    return () => desktopQuery.removeEventListener('change', resetMenu)
  }, [])

  const navigationItems = [
    { href: '#new-arrivals', label: t('nav.arrivals') },
    { href: '#collection', label: t('nav.collection') },
    { href: '#visit', label: t('nav.visit') },
  ]

  function closeMenu() {
    setMenuAnimationEnabled(true)
    setMenuOpen(false)
  }

  function toggleMenu() {
    setMenuAnimationEnabled(true)
    setMenuOpen((isOpen) => !isOpen)
  }

  return (
    <header className="relative z-20 flex min-h-[72px] items-center justify-between bg-ink px-gutter py-3 text-paper md:min-h-[88px] md:px-[max(32px,calc((100vw-1280px)/2))]">
      <a
        className="block h-[42px] w-brand-width overflow-hidden bg-ink"
        href="#top"
        onClick={closeMenu}
        aria-label={t('nav.home')}
      >
        <img
          className="block h-[112px] w-brand-width -translate-y-[35px] object-cover object-center"
          src={wordmark}
          alt={t('nav.brandAlt')}
          width="112"
          height="42"
        />
      </a>
      <button
        className="inline-flex min-h-11 cursor-pointer items-center gap-3 border-0 bg-transparent py-2 pl-3 font-medium text-[14px] tracking-[0.08em] uppercase md:hidden"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="site-navigation"
        onClick={toggleMenu}
      >
        {menuOpen ? t('nav.close') : t('nav.menu')}
        <span className="grid w-menu-width gap-[5px]" aria-hidden="true">
          <span className={`h-0.5 bg-current transition-transform duration-150 ${menuOpen ? 'translate-y-[3.5px] rotate-45' : ''}`} />
          <span className={`h-0.5 bg-current transition-transform duration-150 ${menuOpen ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
        </span>
      </button>
      <nav
        className={`absolute top-full right-0 left-0 grid grid-rows-[0fr] overflow-hidden bg-ink text-paper opacity-0 ${menuAnimationEnabled ? 'transition-[grid-template-rows,opacity,visibility] duration-300 ease-in-out' : 'transition-none'} md:visible md:static md:grid-rows-[1fr] md:overflow-visible md:bg-transparent md:opacity-100 ${menuOpen ? 'visible pointer-events-auto grid-rows-[1fr] opacity-100' : 'invisible pointer-events-none'} md:pointer-events-auto`}
        id="site-navigation"
        aria-label={t('nav.mainLabel')}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="flex flex-col gap-0 px-gutter pt-2 pb-4 md:flex-row md:items-center md:gap-6 md:p-0">
            {navigationItems.map(({ href, label }) => (
              <Fragment key={href}>
                <a
                  className="flex min-h-11 items-center text-[16px] text-accent transition-colors duration-150 hover:text-paper md:min-h-10 md:text-[14px] md:hover:text-accent"
                  href={href}
                  onClick={closeMenu}
                >
                  {label}
                </a>
                <Divider className="md:hidden" />
              </Fragment>
            ))}
            <a
              className="flex min-h-11 items-center text-[16px] text-accent transition-colors duration-150 hover:text-paper md:min-h-10 md:text-[14px] md:hover:text-accent"
              href="https://www.instagram.com/reclaimvintage.bp/"
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
            >
              {t('nav.instagram')}
            </a>
            <Divider className="md:hidden" />
            <a
              className="flex min-h-11 items-center text-[16px] text-accent transition-colors duration-150 hover:text-paper md:min-h-10 md:text-[14px] md:hover:text-accent"
              href="https://www.tiktok.com/@reclaimvintage.bp"
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
            >
              {t('nav.tiktok')}
            </a>
            <Divider className="md:hidden" />
            <span
              className="mt-3 flex min-h-8 w-fit min-w-8 items-center justify-center border border-accent text-[12px] tracking-[0.08em] md:mt-0"
              aria-label={t('nav.language')}
            >
              {t('nav.code')}
            </span>
          </div>
          <div className="mx-auto w-[min(calc(100%-40px),1280px)] md:hidden">
            <Divider className="bg-secondary" />
          </div>
        </div>
      </nav>
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-10">
        <Divider className="!max-w-none !bg-paper" />
      </div>
    </header>
  )
}
