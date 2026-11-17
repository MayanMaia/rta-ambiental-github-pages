import { useEffect, useState } from 'react'
import { updateMeta } from '../utils/seo'
import { getSiteContent } from '../mock/content'
import FinalCTA from '../components/common/FinalCTA'
import { assetUrl } from '../utils/assets'

export default function Sobre() {
  const [content, setContent] = useState(getSiteContent())

  useEffect(() => {
    updateMeta({
      title: 'Sobre',
      description: 'Conheça a história, missão, visão e valores da RTA Ambiental.',
      canonical: 'https://www.rtaambiental.com.br/sobre',
    })

    const syncContent = () => setContent(getSiteContent())
    window.addEventListener('rta:content-updated', syncContent)
    return () => window.removeEventListener('rta:content-updated', syncContent)
  }, [])

  const sobreCards = Array.isArray(content?.sobreBuilder?.layout) ? content.sobreBuilder.layout : []

  return (
    <>
    <section className="public-page section" style={{ '--page-image': "url('/imagens-docx/image2.jpeg')" }}>
      <div className="container mx-auto max-w-5xl">
        <h1 className="section-title">{content.sobre.title}</h1>
        <p className="section-subtitle mb-10">{content.sobre.subtitle}</p>

        <div className="sobre-intro-content">
          <div className="prose prose-neutral max-w-none">
            <p className="mb-6 text-justify text-lg leading-relaxed text-neutral-700">
              A RTA Ambiental atua na prestação de serviços ambientais e de engenharia, apoiando empresas e organizações em projetos que envolvem resíduos, licenciamento, estudos, infraestrutura, levantamentos e acompanhamento técnico.
            </p>
            <p className="mb-6 text-justify text-lg leading-relaxed text-neutral-700">
              Nosso trabalho parte da realidade de cada empreendimento. Avaliamos as condições do projeto, as exigências aplicáveis e os resultados esperados para propor caminhos tecnicamente adequados e ambientalmente responsáveis.
            </p>
            <h2 className="mb-4 text-2xl font-heading font-bold text-[#1f2a22]">Nossa experiência</h2>
            <p className="mb-6 text-justify text-lg leading-relaxed text-neutral-700">
              A experiência da RTA inclui tratamento, recuperação, reciclagem, destinação e valoração de resíduos industriais, além do desenvolvimento de aplicações para minerais, subprodutos, escórias, agregados, pós e lamas.
            </p>
            <p className="text-justify text-lg leading-relaxed text-neutral-700">
              Também atuamos em estudos ambientais, investigação de solo e água subterrânea, licenciamento, recuperação de áreas degradadas, estudos topográficos e regularização de imóveis.
            </p>
            <ul className="mt-6 grid gap-2 text-base text-neutral-700 sm:grid-cols-2">
              {['Tratamento e destinação de resíduos', 'Estudos e laudos ambientais', 'Licenciamento de empreendimentos', 'Gerenciamento ambiental', 'Valoração de resíduos'].map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </div>
        </div>

        <div className="my-8 h-px w-full bg-[#36ad55]" />

        <section className="mb-12">
          <p className="eyebrow">Como trabalhamos</p>
          <h2 className="section-title text-2xl md:text-3xl">Princípios que orientam cada projeto</h2>
          <p className="max-w-3xl text-neutral-700">
            Qualidade técnica, respeito à legislação, melhoria contínua, ética e sustentabilidade orientam a forma como a RTA se relaciona com clientes, parceiros, equipes e comunidades.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Diagnóstico e levantamento', 'Entendemos o objetivo e as restrições do projeto e levantamos dados técnicos, ambientais e documentais.'],
              ['Planejamento e definição de escopo', 'Definimos prioridades, escopo e próximos passos.'],
              ['Execução, acompanhamento e controle', 'Acompanhamos a execução e organizamos os registros necessários.'],
              ['Documentação, entrega e próximos passos', 'Entregamos informações claras para apoiar a continuidade do empreendimento.'],
            ].map(([title, text], index) => (
              <article key={title} className="rounded-2xl border border-[#36ad55]/20 bg-white p-5 shadow-sm">
                <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#36ad55]/10 text-sm font-bold text-[#20823b]">{index + 1}</span>
                <h3 className="font-heading font-semibold text-[#1f2a22]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <p className="eyebrow">Missão, visão e valores</p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {sobreCards.length > 0 ? (
            sobreCards.map((card) => (
              <div
                key={card.id}
                className="group relative overflow-hidden rounded-[28px] border-4 p-6 text-left transition-all duration-500 ease-out min-h-[260px] hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(15,23,42,0.22)]"
                style={{
                  borderColor: card.borderColor || '#36ad55',
                  backgroundColor: card.backgroundColor || '#ffffff',
                }}
              >
                {card.imageUrl && (
                  <>
                    <img src={assetUrl(card.imageUrl)} alt={card.title} width="800" height="600" className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110" />
                    <span
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(180deg, rgba(3,7,18,0.24), rgba(3,7,18,0.82))' }}
                    />
                  </>
                )}
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div>
                    <h3 className="mb-3 font-heading text-2xl font-bold" style={{ color: card.imageUrl ? '#ffffff' : (card.textColor || '#1f2a22') }}>{card.title}</h3>
                    <p className="text-justify text-sm leading-relaxed" style={{ color: card.imageUrl ? 'rgba(255,255,255,0.92)' : (card.textColor ? `${card.textColor}cc` : '#606060') }}>{card.text}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            [
              { title: 'Missão', text: content.sobre.mission },
              { title: 'Visão', text: content.sobre.vision },
              { title: 'Valores', text: content.sobre.values },
            ].map(({ title, text }) => (
              <div key={title} className="rounded-[28px] border border-[#36ad55]/20 bg-white p-6 text-left shadow-sm">
                <h3 className="mb-3 font-heading text-2xl font-bold text-[#1f2a22]">{title}</h3>
                <p className="text-justify text-sm leading-relaxed text-neutral-700">{text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
    <FinalCTA />
    </>
  )
}
