import { updateMeta } from '../utils/seo'
import { useEffect } from 'react'
import FinalCTA from '../components/common/FinalCTA'

const SERVICES = [
  ['Topografia e levantamento com drones', 'Levantamentos de campo, mapeamento e apoio ao planejamento de obras com recursos de posicionamento de precisão.'],
  ['RTK e drones', 'Uso de recursos de posicionamento e drones conforme a necessidade e o escopo técnico de cada projeto.'],
  ['Obras de construção civil', 'Apoio e execução de serviços relacionados a obras civis, conforme o escopo contratado e a responsabilidade técnica aplicável.'],
  ['Terraplanagem', 'Preparação, movimentação e regularização do terreno para implantação de obras e infraestrutura.'],
  ['Drenagem', 'Soluções para condução e controle de águas pluviais, reduzindo riscos de erosão, alagamento e danos à infraestrutura.'],
  ['Água e esgoto', 'Acompanhamento de instalações, redes e sistemas de abastecimento e esgotamento sanitário.'],
  ['Pavimentação', 'Preparação de base, execução e acompanhamento de pavimentos e acessos, conforme projeto e especificações técnicas.'],
  ['Acompanhamento e fiscalização de obras', 'Monitoramento de serviços, prazos, qualidade, medições, não conformidades e documentação de campo.'],
  ['Gestão de obras', 'Organização de cronograma, equipes, fornecedores, documentação, custos e comunicação entre os envolvidos.'],
  ['Gestão ambiental e documental', 'Controle de licenças, condicionantes, registros, evidências e documentos ambientais relacionados ao empreendimento.'],
  ['Paisagismo', 'Soluções compatíveis com o ambiente, o projeto e a manutenção futura.'],
]

export default function Engenharia() {
  useEffect(() => {
    updateMeta({
      title: 'Engenharia',
      description: 'Engenharia, obras e infraestrutura com acompanhamento técnico.',
      canonical: 'https://www.rtaambiental.com.br/engenharia',
    })
  }, [])

  return (
    <>
    <section className="section engineering-page">
      <div className="container">
        <div className="max-w-3xl">
          <p className="eyebrow">Engenharia e infraestrutura</p>
          <h1 className="section-title">Engenharia, obras e infraestrutura com acompanhamento técnico</h1>
          <p className="section-subtitle">
            A RTA apoia obras e empreendimentos desde os levantamentos iniciais até o acompanhamento das etapas executadas.
            Integramos dados de campo, planejamento, controle de serviços e documentação para facilitar decisões relacionadas ao terreno, ao cronograma, à infraestrutura e às exigências ambientais.
          </p>
          <p className="mt-4 max-w-3xl text-neutral-600">
            O escopo é definido conforme o projeto, a habilitação profissional disponível e a responsabilidade assumida em contrato.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(([title, description], index) => (
            <article id={{
              'Gestão de obras': 'gestao-de-obras',
              'Gestão ambiental e documental': 'gestao-ambiental-e-documental',
              Paisagismo: 'paisagismo',
            }[title]} key={title} className="engineering-card">
              <span className="engineering-card__number">{String(index + 1).padStart(2, '0')}</span>
              <h2>{title}</h2>
              <p>{description}</p>
            </article>
          ))}
        </div>

      </div>
    </section>
    <FinalCTA />
    </>
  )
}
