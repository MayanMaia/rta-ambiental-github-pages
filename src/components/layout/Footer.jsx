import { Link } from 'react-router-dom'

const logoRta = '/imagens-docx/image1.png'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#071128] text-white/70">
      <div className="container py-14 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">

        {/* Marca */}
        <div className="lg:col-span-2">
          <Link to="/" className="mb-3 block w-[250px] transition-opacity duration-300 hover:opacity-80" aria-label="RTA Ambiental - voltar para o início">
            <img src={logoRta} alt="RTA Ambiental" className="h-auto w-full" />
          </Link>
          <p className="text-sm leading-relaxed text-white/50 max-w-xs">
            Soluções ambientais completas para empresas e projetos que buscam sustentabilidade e conformidade legal.
          </p>
        </div>

        {/* Links */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-4">
            Navegação
          </p>
          <ul className="space-y-2 text-sm">
            {[
              { to: '/',           label: 'Home'         },
              { to: '/sobre',      label: 'Sobre'        },
              { to: '/tecnologia', label: 'Tecnologia'   },
              { to: '/consultoria',label:'Consultoria' },
              { to: '/news',       label: 'News'         },
              { to: '/contato',    label: 'Fale Conosco' },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="hover:text-white transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contato */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-4">
            Contato
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://wa.me/5500000000000"
                className="hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-800">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <p>© {year} RTA Ambiental. Todos os direitos reservados.</p>
          <Link
            to="/politica-de-privacidade"
            className="hover:text-neutral-300 transition-colors"
          >
            Política de Privacidade
          </Link>
        </div>
      </div>
    </footer>
  )
}
