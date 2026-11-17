import { Link } from 'react-router-dom'
import { assetUrl } from '../../utils/assets'

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#FFFFFF] py-16 text-[#1f2a22] md:py-24">
      <div className="absolute inset-y-0 left-0 hidden w-2/5 bg-cover bg-center opacity-100 md:block" style={{ backgroundImage: `url(${assetUrl('/imagens-docx/image15.jpg')})` }} />
      <div className="container relative">
        <div className="ml-auto w-full md:w-3/5 md:pl-12">
          <p className="eyebrow text-[#f6aa00]">Vamos construir juntos</p>
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-3xl font-heading font-semibold leading-tight sm:text-5xl">
                Tem um projeto, uma exigência ambiental ou uma obra para organizar?
            </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#39443b]">
                Conte brevemente o que você precisa. A equipe da RTA avaliará as informações iniciais e indicará o melhor caminho para o diagnóstico, o orçamento e a definição do escopo.
              </p>
            </div>
            <Link to="/contato" className="btn btn-lg shrink-0 bg-[#f6aa00] text-[#12351f] hover:bg-[#ffc13b]">
              Enviar informações do projeto
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
