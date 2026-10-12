import ProductCard from './ProductCard'
import FlowerMark from './FlowerMark'
import leatherJacketImage from '../assets/images/Leater jacket/It’s leather season again 🤎.jpg'
import velvetBlazerImage from '../assets/images/Velvet blazer/some of our new vintage velvet blazers.jpg'
import missoniKnitImage from '../assets/images/Vintage Missoni top/missoni_top_1.png'
import utilityVestImage from '../assets/images/vest-3/New vintage vests in the store 🎣.jpg'
import sportJacketImage from '../assets/images/zip-1/We are fully prepared for the new season 🍂☁️(1).jpg'
import embroideredVestImage from '../assets/images/shirt-2/Some new pieces & details 🔎(3).jpg'

const products = [
  {
    id: '01',
    name: 'Vintage leather jacket',
    category: 'Jacket',
    size: 'M',
    condition: 'Very good',
    price: '€00',
    image: leatherJacketImage,
    alt: 'Vintage leather jacket worn with dark trousers',
  },
  {
    id: '02',
    name: 'Vintage velvet blazer',
    category: 'Blazer',
    size: 'L',
    condition: 'Very good',
    price: '€00',
    image: velvetBlazerImage,
    alt: 'Vintage velvet blazer photographed on a concrete floor',
  },
  {
    id: '03',
    name: 'Patterned vintage knit',
    category: 'Knitwear',
    size: 'M',
    condition: 'Good',
    price: '€00',
    image: missoniKnitImage,
    alt: 'Colourful patterned vintage knit photographed on a concrete floor',
  },
  {
    id: '04',
    name: 'Vintage utility vest',
    category: 'Vest',
    size: 'L',
    condition: 'Very good',
    price: '€00',
    image: utilityVestImage,
    alt: 'Vintage utility vest with multiple pockets',
  },
  {
    id: '05',
    name: 'Vintage track jacket',
    category: 'Jacket',
    size: 'L',
    condition: 'Good',
    price: '€00',
    image: sportJacketImage,
    alt: 'Vintage colour-block track jacket photographed on a concrete floor',
  },
  {
    id: '06',
    name: 'Embroidered vintage vest',
    category: 'Vest',
    size: 'M',
    condition: 'Very good',
    price: '€00',
    image: embroideredVestImage,
    alt: 'Black vintage vest with light embroidered details',
  },
]

export default function Arrivals() {
  return (
    <section className="border-t border-ink py-10 pb-mobile-section md:py-20 md:pb-24" id="new-arrivals" aria-labelledby="arrivals-title">
      <div className="mx-auto w-[min(calc(100%-40px),1280px)] pb-[18px] md:pb-6">
        <p className="mb-3 text-[12px] font-medium tracking-[0.12em] text-secondary uppercase">
          Fresh from the rails
        </p>
        <div className="flex items-end justify-between gap-3">
          <h2
            className="m-0 max-w-[720px] font-display text-[clamp(40px,12vw,56px)] leading-[0.92] font-normal tracking-[-0.055em] uppercase md:text-[64px]"
            id="arrivals-title"
          >
            Just dropped.
          </h2>
          <FlowerMark className="mb-[3px] h-[30px] w-[30px] shrink-0 fill-current" />
        </div>
        <p className="mt-[18px] mb-0 flex items-center justify-between text-[13px] text-secondary">
          Swipe to browse<span className="text-[18px]" aria-hidden="true">→</span>
        </p>
      </div>
      <ul
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-gutter pb-4 [scroll-padding-inline:20px] [scrollbar-color:var(--color-secondary)_var(--color-accent)] [scrollbar-width:thin] md:gap-5 md:px-[max(32px,calc((100vw-1280px)/2))] md:[scroll-padding-inline:max(32px,calc((100vw-1280px)/2))]"
        aria-label="New vintage pieces"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
      <div className="mx-auto w-[min(calc(100%-40px),1280px)] pt-[18px]">
        <a
          className="inline-flex min-h-12 w-full items-center justify-between gap-7 border border-ink bg-paper px-4 text-[13px] font-semibold tracking-[0.06em] text-ink uppercase transition-colors duration-150 hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper md:w-auto"
          href="https://www.instagram.com/reclaimvintage.bp/"
          target="_blank"
          rel="noreferrer"
        >
          Browse all pieces<span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  )
}
