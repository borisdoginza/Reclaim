import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Nav from '../components/Nav'

export default function MainLayout() {
  return (
    <div className="overflow-hidden bg-paper text-ink">
      <Nav />
      <main id="top">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
