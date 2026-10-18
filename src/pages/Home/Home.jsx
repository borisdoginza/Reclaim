import Arrivals from '../../components/Arrivals'
import Hero from '../../components/Hero'
import LooksSection from '../../components/LooksSection'
import VisitSection from '../../components/VisitSection'

export default function Home() {
  return (
    <>
      <Hero />
      <Arrivals />
      <div className="flex flex-col gap-8 md:gap-24">
        <LooksSection />
        <VisitSection />
      </div>
    </>
  )
}
