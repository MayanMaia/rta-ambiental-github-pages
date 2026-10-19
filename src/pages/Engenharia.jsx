import { Link } from 'react-router-dom'
import { updateMeta } from '../utils/seo'
import { useEffect } from 'react'

const SERVICES = [
  ['Topografia e levantamento com drones', 'Levantamentos de campo, mapeamento e apoio ao planejamento de obras com recursos de posicionamento de precisão.'],
  ['RTK e drones', 'Uso de recursos de posicionamento e drones conforme a necessidade e o escopo técnico de cada projeto.'],
  ['Obras de construção civil', 'Apoio e execução de serviços relacionados a obras civis, conforme o escopo contratado e a responsabilidade técnica aplicável.'],
  ['Terraplanagem', 'Preparação, movimentação e regularização do terreno para implantação de obras e infraestrutura.'],
  ['Drenagem', 'Soluções para condução e controle de águas pluviais, reduzindo riscos de erosão, alagamento e danos à infraestrutura.'],
  ['Água e esgoto', 'Implantação e acompanhamento de redes e sistemas de abastecimento de água e esgotamento sanitário.'],
  ['Pavimentação', 'Preparação de base, execução e acompanhamento de pavimentos e acessos, conforme projeto e especificações técnicas.'],
  ['Acompanhamento e fiscalização de obras', 'Monitoramento de serviços, prazos, qualidade, medições, não conformidades e documentação de campo.'],
  ['Gestão de obras', 'Organização de cronograma, equipes, fornecedores, documentação, custos e comunicação entre os envolvidos.'],
  ['Gestão ambiental e documental', 'Controle de licenças, condicionantes, registros, evidências e documentos ambientais relacionados ao empreendimento.'],
  ['Paisagismo', 'Planejamento e implantação de soluções paisagísticas compatíveis com o projeto, o ambiente e a manutenção futura.'],
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
    <section className="section engineering-page">
      <div className="container">
        <div className="max-w-3xl">
          <p className="eyebrow">Engenharia e infraestrutura</p>
          <h1 className="section-title">Engenharia, obras e infraestrutura com acompanhamento técnico</h1>
          <p className="section-subtitle">
            Atuamos no planejamento, na execução e no acompanhamento de obras e serviços de infraestrutura,
            integrando engenharia, controle de campo e responsabilidade ambiental.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(([title, description], index) => (
            <article id={title === 'Paisagismo' ? 'paisagismo' : undefined} key={title} className="engineering-card">
              <span className="engineering-card__number">{String(index + 1).padStart(2, '0')}</span>
              <h2>{title}</h2>
              <p>{description}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-[#071128] p-8 text-white md:p-10">
          <h2 className="font-heading text-2xl font-bold">Vamos avaliar o seu projeto?</h2>
          <p className="mt-3 max-w-2xl text-white/75">
            O escopo final e a responsabilidade técnica de cada serviço são definidos conforme o projeto,
            a habilitação profissional disponível e as condições contratadas.
          </p>
          <Link to="/contato" className="btn btn-lg mt-6 bg-[#f6aa00] text-[#12351f] hover:bg-[#ffc13b]">
            Solicitar avaliação
          </Link>
        </div>
      </div>
    </section>
  )
}
