import { useTranslation } from 'react-i18next'

export default function ProductCard({ product }) {
  const { t } = useTranslation()

  return (
    <article className="h-full">
      <a
        className="block overflow-hidden bg-accent"
        href="https://www.instagram.com/reclaimvintage.bp/"
        target="_blank"
        rel="noreferrer"
        aria-label={t('arrivals.askAbout', { name: product.name })}
      >
        <img
          className="block aspect-[4/5] w-full object-cover transition-transform duration-250 hover:scale-[1.025]"
          src={product.image}
          alt={product.alt}
          loading="lazy"
          width="1170"
          height="1460"
        />
      </a>
      <div className="pt-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="mb-[5px] block text-[11px] tracking-[0.1em] text-secondary uppercase">
              {product.category}
            </span>
            <h3 className="m-0 text-[16px] leading-[1.25] font-medium">{product.name}</h3>
          </div>
          <span className="shrink-0 text-[14px] font-semibold">{product.price}</span>
        </div>
        <p className="my-2 flex gap-3 text-[12px] text-secondary">
          <span>{t('arrivals.size', { size: product.size })}</span>
          <span>{product.condition}</span>
        </p>
        <div className="flex items-center gap-[7px] text-[11px] tracking-[0.08em] text-secondary uppercase">
          <span className="h-[7px] w-[7px] rounded-full bg-secondary" aria-hidden="true" />
          <span>{product.sold ? t('arrivals.sold') : t('arrivals.inStock')}</span>
        </div>
      </div>
    </article>
  )
}
