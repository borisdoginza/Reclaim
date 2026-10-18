import { useTranslation } from 'react-i18next'

export default function ProductCard({ product }) {
  const { t } = useTranslation()
  const name = t(`products.${product.id}.name`, { defaultValue: product.name })
  const category = t(`products.${product.id}.category`, { defaultValue: product.category })
  const condition = t(`products.${product.id}.condition`, { defaultValue: product.condition })
  const alt = t(`products.${product.id}.alt`, { defaultValue: product.alt })

  return (
    <article className="h-full">
      <a
        className="block overflow-hidden bg-accent"
        href="https://www.instagram.com/reclaimvintage.bp/"
        target="_blank"
        rel="noreferrer"
        aria-label={t('arrivals.askAbout', { name })}
      >
        <img
          className="block aspect-[4/5] w-full object-cover transition-transform duration-250 hover:scale-[1.025]"
          src={product.image}
          alt={alt}
          loading="lazy"
          width="1170"
          height="1460"
        />
      </a>
      <div className="pt-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="mb-[5px] block text-[11px] tracking-[0.1em] text-secondary uppercase">
              {category}
            </span>
            <h3 className="m-0 text-[16px] leading-[1.25] font-medium">{name}</h3>
          </div>
          <span className="shrink-0 text-[14px] font-semibold">{product.price}</span>
        </div>
        <p className="my-2 flex gap-3 text-[12px] text-secondary">
          <span>{t('arrivals.size', { size: product.size })}</span>
          <span>{condition}</span>
        </p>
      </div>
    </article>
  )
}
