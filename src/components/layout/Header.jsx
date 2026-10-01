import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const logoRta = import.meta.env.BASE_URL + 'imagens-docx/image1.png'

const NAV_LINKS = [
  { to: '/',          label: 'Home'         },
  { to: '/sobre',     label: 'Sobre'        },
  { to: '/tecnologia',label: 'Tecnologia'   },
  { to: '/consultoria',label:'Consultoria' },
  { to: '/news',      label: 'News'         },
  { to: '/contato',   label: 'Fale Conosco' },
]

export default function Header() {
  const [open,      setOpen]      = useState(false)
  const [scrolled,  setScrolled]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 bg-[#071128] text-white transition-shadow duration-300 ${scrolled ? 'shadow-2xl' : 'shadow-none'}`}>
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-18">

          {/* Logo */}
          <Link to="/" className="block w-[220px] transition-opacity duration-300 hover:opacity-80 sm:w-[270px]" aria-label="RTA Ambiental - voltar para o início">
            <img src={logoRta} alt="RTA Ambiental" className="h-auto w-full" />
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `relative px-3 py-5 text-sm font-medium transition-colors after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:origin-left after:scale-x-0 after:bg-[#36ad55] after:transition-transform hover:text-white hover:after:scale-x-100
                   ${isActive
                     ? 'text-white after:scale-x-100'
                     : 'text-white/60'}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Hamburger mobile */}
          <button
            className="rounded-lg p-2 text-white hover:bg-white/10 md:hidden"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="animate-fade-in border-t border-white/10 bg-[#071128] md:hidden">
          <nav className="container py-4 flex flex-col gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-medium transition-colors
                   ${isActive
                     ? 'bg-white/10 text-white'
                     : 'text-white/70 hover:bg-white/10'}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
