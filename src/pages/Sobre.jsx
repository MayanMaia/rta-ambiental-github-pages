import { useEffect, useState } from 'react'
import { updateMeta } from '../utils/seo'
import { getSiteContent } from '../mock/content'

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
    <section className="public-page section" style={{ '--page-image': "url('/imagens-docx/image2.jpeg')" }}>
      <div className="container mx-auto max-w-5xl">
        <h1 className="section-title">{content.sobre.title}</h1>
        <p className="section-subtitle mb-10">{content.sobre.subtitle}</p>

        <div className="sobre-intro-content">
          <div className="prose prose-neutral max-w-none">
            <p className="mb-6 text-justify text-lg leading-relaxed text-neutral-700">
              A RTA Ambiental é uma empresa de prestação de serviços ambientais e de engenharia, voltada à proteção do meio ambiente, com atuação em todo o território brasileiro.
            </p>
            <p className="mb-6 text-justify text-lg leading-relaxed text-neutral-700">
              Dedicada a aplicar soluções de processo para tratamento, recuperação e reciclagem de resíduos industriais, a RTA apoia diferentes etapas de implantação de sistemas de tratamento e disposição de rejeitos líquidos e sólidos.
            </p>
            <p className="mb-6 text-justify text-lg leading-relaxed text-neutral-700">
              A RTA atua no ramo de comércio de minerais e subprodutos, sendo especializada no desenvolvimento de aplicações para escórias, agregados, pós e lamas. No ramo do cimento, possui experiência na utilização de escórias ácidas e alcalinas como aditivo ao clínquer. Este conhecimento, conquistado ao longo dos anos pelos seus profissionais, faz com que a empresa sempre busque alternativas ambiental e economicamente viáveis em suas realizações.
            </p>
            <p className="text-justify text-lg leading-relaxed text-neutral-700">
              Além disso, tem-se especializado na realização de licenciamento e estudos ambientais de toda ordem, desde estudos de investigação de solo e água subterrânea até a recuperação de áreas degradadas. Atua também em serviços especializados, tais como estudos topográficos e regularização de imóveis. Nossos principais serviços são: Tratamento e Destinação de Resíduos, Estudos e laudos ambientais, Licenciamento de empreendimentos, Gerenciamento ambiental e Valoração de Resíduos.
            </p>
          </div>
        </div>

        <div className="my-8 h-px w-full bg-[#36ad55]" />

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
                    <img src={card.imageUrl} alt={card.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110" />
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
  )
}
