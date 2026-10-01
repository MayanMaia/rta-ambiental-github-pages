import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header       from '../components/layout/Header'
import Footer       from '../components/layout/Footer'
import WhatsAppFAB  from '../components/common/WhatsAppFAB'

export default function PublicLayout() {
  const { pathname } = useLocation()

  // Scroll ao topo em cada navegação
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  return (
    <div className="public-site flex min-h-dvh flex-col">
      <Header />
      <main className="public-main flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFAB />
    </div>
  )
}
