import { useTranslation } from 'react-i18next'
import footerLogo from '../assets/images/design-pieces/logo.jpg'
import Divider from './Divider'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto items-center content-center flex flex-col md:flex-row w-[min(calc(100%-40px),1280px)] gap-4 md:gap-8 py-7 md:grid-cols-[1fr_1fr_auto] md:items-center md:py-9">
        <a className="inline-flex w-fit items-center gap-2" href="#top">
          <span className="block h-[112px] w-brand-width bg-ink">
            <img className="block h-[112px] w-brand-width object-contain object-center" src={footerLogo} alt={t('footer.brand')} width="112" height="112" />
          </span>
        </a>
        <p className="m-0 text-[14px] text-accent">{t('footer.note')}</p>
        <div className="flex gap-5 pt-1 text-[13px]">
          <a className="inline-flex min-h-9 items-center" href="https://www.instagram.com/reclaimvintage.bp/" target="_blank" rel="noreferrer">
            {t('footer.instagram')} ↗
          </a>
          <a className="inline-flex min-h-9 items-center" href="https://www.tiktok.com/@reclaimvintage.bp" target="_blank" rel="noreferrer">
            {t('footer.tiktok')} ↗
          </a>
        </div>
      </div>
      <div className="mx-auto w-[min(calc(100%-40px),1280px)]">
        <Divider />
      </div>
      <div className="mx-auto flex min-h-12 w-[min(calc(100%-40px),1280px)] items-center justify-between text-[11px] tracking-[0.08em] text-accent uppercase">
        <span>{t('footer.copyright')}</span>
        <span>{t('nav.code')}</span>
      </div>
    </footer>
  )
}
