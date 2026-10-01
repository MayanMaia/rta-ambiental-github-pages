import { useEffect, useState } from 'react'
import { updateMeta } from '../utils/seo'
import { servicosService } from '../services/servicos.service'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { sanitizeHtml } from '../utils/sanitize'

export default function Servicos({ categoria = 'tecnologia' }) {
  const [servicos, setServicos] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)
  const [expandedId, setExpandedId] = useState(null)

  const titulo = categoria === 'consultoria' ? 'Consultoria' : 'Tecnologia'
  const caminho = categoria === 'consultoria' ? '/consultoria' : '/tecnologia'

  useEffect(() => {
    updateMeta({
      title: titulo,
      description: `Conheça os serviços de ${titulo.toLowerCase()} da RTA Ambiental.`,
      canonical: `https://www.rtaambiental.com.br${caminho}`,
    })

    servicosService.listar({ categoria })
      .then(setServicos)
      .catch(() => setErro('Não foi possível carregar os serviços.'))
      .finally(() => setLoading(false))
  }, [categoria, caminho, titulo])

  return (
    <section className="public-page section" style={{ backgroundColor: '#1a2332' }}>
      <div className="container">
        <div className="mb-10 max-w-3xl">
          <h1 className="section-title">{titulo}</h1>
          <p className="section-subtitle max-w-2xl text-white/80">
            {categoria === 'consultoria'
              ? 'Estratégias e acompanhamento técnico para desenvolver projetos com segurança, conformidade e resultados concretos.'
              : 'Soluções ambientais completas para atender sua empresa com segurança, eficiência e responsabilidade.'}
          </p>
        </div>

        {loading && <LoadingSpinner fullPage={false} />}
        {erro && <p className="text-red-600">{erro}</p>}

        {!loading && !erro && servicos.length === 0 && (
          <p className="text-white/75">Nenhum serviço encontrado nesta categoria no momento.</p>
        )}

        <div className="relative">
          <div className={expandedId ? 'grid grid-cols-1 gap-6 opacity-30 blur-[1px] transition-all duration-300 md:grid-cols-2 lg:grid-cols-3' : 'grid grid-cols-1 gap-6 transition-all duration-300 md:grid-cols-2 lg:grid-cols-3'}>
            {servicos.map((s) => {
              const hasImage = Boolean(s.imagem)

              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setExpandedId(s.id)}
                  className={[
                    'group relative overflow-hidden rounded-[28px] border-4 p-6 text-left transition-all duration-500 ease-out',
                    hasImage
                      ? 'border-primary-600 bg-slate-900 text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)] hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(15,23,42,0.22)]'
                      : 'border-primary-600 bg-[linear-gradient(135deg,#11213d_0%,#1d3557_52%,#0b172d_100%)] text-white shadow-[0_20px_45px_rgba(2,6,23,0.16)] hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(2,6,23,0.2)]',
                    'min-h-[230px] md:min-h-[290px]',
                  ].join(' ')}
                  style={hasImage ? {
                    backgroundImage: `url(${s.imagem})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  } : undefined}
                >
                  {hasImage && <span className="absolute inset-0 bg-slate-950/85" />}
                  {!hasImage && <span className="absolute inset-0 bg-slate-950" />}

                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div>
                      <h2 className="mb-3 line-clamp-2 font-heading text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-primary-200">
                        {s.nome}
                      </h2>

                      <p className="line-clamp-3 text-sm leading-6 text-white/95">
                        {s.descricao}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between text-sm text-white">
                      <span className="font-semibold">Saiba mais</span>
                      <span aria-hidden="true" className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white">→</span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {expandedId && (() => {
            const s = servicos.find((item) => item.id === expandedId)
            if (!s) return null
            const hasImage = Boolean(s.imagem)

            return (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
                <button type="button" aria-label="Fechar serviço" className="absolute inset-0 bg-slate-950/65 backdrop-blur-sm" onClick={() => setExpandedId(null)} />
                <div className="relative z-10 w-full max-w-5xl animate-[fadeInPopup_0.35s_ease-out] overflow-hidden rounded-[28px] border-4 border-primary-600 bg-[linear-gradient(135deg,#11213d_0%,#1d3557_52%,#0b172d_100%)] shadow-[0_30px_90px_rgba(2,6,23,0.5)]" style={hasImage ? {
                  backgroundImage: `linear-gradient(180deg, rgba(3,7,18,0.24), rgba(3,7,18,0.82)), url(${s.imagem})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  minHeight: '72vh',
                } : { background: 'linear-gradient(135deg, rgba(17,33,61,0.96), rgba(13,23,42,0.97))', minHeight: '72vh' }}>
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.68),rgba(2,6,23,0))]" />
                  <div className="relative z-10 flex items-center justify-end border-b border-white/10 bg-slate-950/15 px-5 py-4 backdrop-blur-sm md:px-7">
                    <button type="button" onClick={() => setExpandedId(null)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-lg text-white transition hover:bg-white/15">×</button>
                  </div>

                  <div className="relative z-10 flex flex-col gap-6 p-5 md:p-8">
                    <div>
                      <h2 className="mb-3 font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">{s.nome}</h2>
                      <p className="max-w-2xl text-base leading-7 text-white md:text-lg">{s.descricao}</p>
                    </div>

                    <div className="prose prose-invert max-w-none text-sm leading-7 text-white md:text-base">
                      {s.conteudo ? <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(s.conteudo) }} /> : <p>{s.descricao}</p>}
                    </div>
                  </div>

                  {!hasImage && <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(246,170,0,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(54,173,85,0.18),transparent_25%)]" />}
                </div>
              </div>
            )
          })()}
        </div>
      </div>
    </section>
  )
}
