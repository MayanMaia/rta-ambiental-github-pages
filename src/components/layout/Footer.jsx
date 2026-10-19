import { Link } from 'react-router-dom'

const logoRta = '/imagens-docx/image1.png'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#071128] text-white/70">
      <div className="container grid grid-cols-1 gap-10 py-14 md:grid-cols-3 lg:grid-cols-4">

        {/* Marca */}
        <div>
          <Link to="/" className="mb-3 block w-[250px] transition-opacity duration-300 hover:opacity-80" aria-label="RTA Ambiental - voltar para o início">
            <img src={logoRta} alt="RTA Ambiental" className="h-auto w-full" />
          </Link>
          <p className="text-sm leading-relaxed text-white/50 max-w-xs">
            Soluções ambientais e de engenharia para empresas e projetos que buscam segurança, sustentabilidade e conformidade.
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
              { to: '/tecnologia', label: 'Ambiental'     },
              { to: '/engenharia', label: 'Engenharia'   },
              { to: '/engenharia#paisagismo', label: 'Paisagismo' },
              { to: '/consultoria',label:'Consultoria' },
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

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-500">Atuação</p>
          <ul className="space-y-2 text-sm">
            <li>Ambiental</li>
            <li>Engenharia e infraestrutura</li>
            <li>Gestão de obras</li>
            <li>Gestão ambiental e documental</li>
            <li>Paisagismo</li>
          </ul>
        </div>

        {/* Contato */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-4">
            Contato
          </p>
          <ul className="space-y-2 text-sm">
            <li><a href="mailto:faleconosco@rtaambiental.com.br" className="hover:text-white transition-colors">faleconosco@rtaambiental.com.br</a></li>
            <li><a href="/contato" className="hover:text-white transition-colors">Formulário de contato</a></li>
            <li className="pt-2 text-xs text-white/45">Filiais e telefones: consulte a equipe pelo formulário.</li>
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
