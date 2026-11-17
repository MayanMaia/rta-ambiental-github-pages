import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { updateMeta } from '../utils/seo'
import { servicosService } from '../services/servicos.service'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { sanitizeHtml } from '../utils/sanitize'
import FinalCTA from '../components/common/FinalCTA'
import { assetUrl } from '../utils/assets'

const environmentalDetails = {
  'Valoração de Resíduos': {
    doing: 'Avaliamos possibilidades de reaproveitamento, reciclagem, recuperação ou uso alternativo de resíduos e subprodutos industriais.',
    forWhom: 'Empresas que buscam reduzir desperdícios, melhorar a destinação de materiais e identificar oportunidades de uso com segurança técnica.',
    result: 'Análise organizada das alternativas disponíveis, com definição de premissas, limitações e próximos passos.',
  },
  'Destinação de Resíduos e Rejeitos': {
    doing: 'Apoiamos a classificação, o controle documental e a definição de caminhos para resíduos líquidos, sólidos e semissólidos, conforme suas características e exigências.',
    forWhom: 'Empresas que precisam organizar a destinação, comprovar procedimentos e reduzir riscos de descarte inadequado.',
    result: 'Mais clareza sobre o fluxo do resíduo, os registros necessários e as responsabilidades envolvidas.',
  },
  'Fornecimento de Produtos': {
    doing: 'Comercializamos materiais ecológicos, industriais e de infraestrutura conforme a disponibilidade, a especificação e a necessidade do projeto.',
    forWhom: 'Empresas e obras que precisam de materiais com suporte técnico e informações claras sobre aplicação.',
    result: 'Maior segurança na escolha do produto e melhor alinhamento entre material, uso previsto e condições do empreendimento.',
  },
}

const consultingSteps = [
  ['Diagnóstico inicial', 'Entendimento do problema, do empreendimento e das informações disponíveis.'],
  ['Análise documental', 'Revisão de licenças, estudos e documentos já existentes.'],
  ['Avaliação técnica', 'Análise das alternativas técnicas aplicáveis ao caso.'],
  ['Plano de ação', 'Prioridades e próximos passos organizados.'],
  ['Acompanhamento', 'Apoio na execução e na organização dos registros.'],
]

export default function Servicos({ categoria = 'tecnologia' }) {
  const [servicos, setServicos] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)
  const [expandedId, setExpandedId] = useState(null)

  const titulo = categoria === 'consultoria' ? 'Consultoria' : 'Ambiental'
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
    <>
    <section className="public-page section">
      <div className="container">
        <div className="mb-10 max-w-3xl">
          <h1 className="section-title">{titulo}</h1>
          <p className="section-subtitle max-w-2xl">
            {categoria === 'consultoria'
              ? 'A consultoria da RTA começa pela compreensão do problema, do empreendimento e das informações disponíveis. A partir dessa avaliação, orientamos prioridades, documentos, estudos, alternativas técnicas e próximos passos.'
              : 'A RTA Ambiental apoia empresas na gestão de resíduos, na avaliação de alternativas de reaproveitamento, na destinação adequada de rejeitos e no fornecimento de materiais e produtos relacionados à infraestrutura. A solução é definida conforme o tipo de material, a origem, a composição, o volume, a destinação pretendida e as exigências aplicáveis.'}
          </p>
          <p className="mt-4 max-w-3xl text-neutral-600">
            {categoria === 'consultoria'
              ? 'O atendimento pode apoiar questões relacionadas a resíduos, licenciamento, estudos ambientais, infraestrutura, regularização, topografia, gestão documental e acompanhamento de obras, sempre de acordo com o escopo aprovado.'
              : 'Nosso objetivo é unir segurança ambiental, viabilidade operacional e responsabilidade documental, sempre respeitando o escopo contratado e os requisitos técnicos do projeto.'}
          </p>
        </div>

        {categoria === 'consultoria' && (
          <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {consultingSteps.map(([title, text], index) => (
              <article key={title} className="rounded-2xl border border-[#36ad55]/20 bg-white p-5 shadow-sm">
                <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#36ad55]/10 text-sm font-bold text-[#20823b]">{index + 1}</span>
                <h2 className="font-heading font-semibold text-[#1f2a22]">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{text}</p>
              </article>
            ))}
          </div>
        )}

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
                    'group relative min-w-0 overflow-hidden rounded-2xl border-2 p-4 text-left transition-all duration-300 ease-out sm:rounded-[28px] sm:border-4 sm:p-6 sm:duration-500',
                    hasImage
                      ? 'border-primary-600 bg-[#173c25] text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)] hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(15,23,42,0.22)]'
                      : 'border-primary-600 bg-[linear-gradient(135deg,#173c25_0%,#245b35_52%,#102a1a_100%)] text-white shadow-[0_20px_45px_rgba(2,6,23,0.16)] hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(2,6,23,0.2)]',
                    'min-h-[210px] sm:min-h-[230px] md:min-h-[290px]',
                  ].join(' ')}
                  style={hasImage ? {
                    backgroundImage: `url(${assetUrl(s.imagem)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  } : undefined}
                >
                  {hasImage && (
                    <span
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(180deg, rgba(3,7,18,0.24), rgba(3,7,18,0.82))' }}
                    />
                  )}
                  {!hasImage && <span className="absolute inset-0 bg-[#102a1a]" />}

                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div>
                      <h2 className="mb-3 line-clamp-2 break-words font-heading text-xl font-bold tracking-tight text-white transition-colors group-hover:text-[#f6aa00] sm:text-2xl">
                        {s.nome}
                      </h2>

                      <p className="line-clamp-3 text-sm leading-6 text-white/95 transition-colors group-hover:text-[#f6aa00]">
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

            return createPortal((
              <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto p-3 sm:items-center sm:p-4 md:p-8">
                <button type="button" aria-label="Fechar serviço" className="absolute inset-0 bg-[#102a1a]/65 backdrop-blur-sm" onClick={() => setExpandedId(null)} />
                <div className="service-modal relative z-10 my-auto max-h-[calc(100dvh-1.5rem)] w-full max-w-5xl animate-[fadeInPopup_0.35s_ease-out] overflow-x-hidden overflow-y-auto rounded-2xl border-2 border-primary-600 bg-[linear-gradient(135deg,#173c25_0%,#245b35_52%,#102a1a_100%)] shadow-[0_30px_90px_rgba(2,6,23,0.5)] sm:max-h-[calc(100dvh-2rem)] sm:rounded-[28px] sm:border-4" style={hasImage ? {
                  backgroundImage: `linear-gradient(180deg, rgba(3,7,18,0.24), rgba(3,7,18,0.82)), url(${assetUrl(s.imagem)})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  minHeight: '72vh',
                } : { background: 'linear-gradient(135deg, rgba(17,33,61,0.96), rgba(13,23,42,0.97))', minHeight: '72vh' }}>
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.68),rgba(2,6,23,0))]" />
                  <div className="sticky top-0 z-20 flex items-center justify-end border-b border-white/10 bg-[#102a1a]/15 px-5 py-4 backdrop-blur-sm md:px-7">
                    <button type="button" onClick={() => setExpandedId(null)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-lg text-white transition hover:bg-white/15">×</button>
                  </div>

                  <div className="relative z-10 flex flex-col gap-6 p-5 md:p-8">
                    <div>
                      <h2 className="mb-3 font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">{s.nome}</h2>
                      <p className="max-w-2xl text-base leading-7 text-white md:text-lg">{s.descricao}</p>
                    </div>

                    <div className="prose prose-invert max-w-none text-sm leading-7 text-white md:text-base">
                      {categoria === 'tecnologia' && environmentalDetails[s.nome] ? (
                        <div className="grid gap-4 md:grid-cols-3">
                          {[
                            ['O que fazemos', environmentalDetails[s.nome].doing],
                            ['Para quem é indicado', environmentalDetails[s.nome].forWhom],
                            ['Resultado esperado', environmentalDetails[s.nome].result],
                          ].map(([label, text]) => <p key={label}><strong>{label}:</strong> {text}</p>)}
                        </div>
                      ) : s.conteudo ? <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(s.conteudo) }} /> : <p>{s.descricao}</p>}
                    </div>
                  </div>

                  {!hasImage && <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(246,170,0,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(54,173,85,0.18),transparent_25%)]" />}
                </div>
              </div>
            ), document.body)
          })()}
        </div>
      </div>
    </section>
    <FinalCTA />
    </>
  )
}
