import { useEffect } from 'react'
import { updateMeta } from '../utils/seo'

export default function Privacidade() {
  useEffect(() => {
    updateMeta({
      title: 'Política de Privacidade',
      description: 'Política de Privacidade da RTA Ambiental.',
      canonical: 'https://www.rtaambiental.com.br/politica-de-privacidade',
    })
  }, [])

  return (
    <section className="public-page section" style={{ '--page-image': `url(${import.meta.env.BASE_URL}imagens-docx/image14.jpeg)` }}>
      <div className="container max-w-3xl mx-auto">
        <h1 className="section-title">Política de Privacidade</h1>
        <p className="text-sm text-neutral-400 mb-8">Última atualização: agosto de 2026</p>

        <div className="prose prose-neutral max-w-none text-neutral-600 space-y-6">
          <p>
            A RTA Ambiental respeita a sua privacidade e está comprometida em proteger os dados pessoais
            que você compartilha conosco. Esta política descreve como coletamos, usamos e protegemos
            suas informações.
          </p>

          <h2 className="text-xl font-heading font-semibold text-neutral-800">Dados coletados</h2>
          <p>
            Coletamos dados como nome, e-mail, telefone e currículo apenas quando você os fornece
            voluntariamente por meio de nossos formulários de contato ou Banco de Talentos.
          </p>

          <h2 className="text-xl font-heading font-semibold text-neutral-800">Uso dos dados</h2>
          <p>
            Seus dados são utilizados exclusivamente para responder às suas solicitações e,
            no caso do Banco de Talentos, para fins de recrutamento.
          </p>

          <h2 className="text-xl font-heading font-semibold text-neutral-800">Compartilhamento</h2>
          <p>
            Não compartilhamos seus dados pessoais com terceiros, exceto quando exigido por lei.
          </p>

          <h2 className="text-xl font-heading font-semibold text-neutral-800">Seus direitos (LGPD)</h2>
          <p>
            Você tem direito de acessar, corrigir ou solicitar a exclusão dos seus dados.
            Entre em contato pelo e-mail{' '}
            <a href="mailto:privacidade@rtaambiental.com.br" className="text-primary-600 hover:underline">
              privacidade@rtaambiental.com.br
            </a>.
          </p>
        </div>
      </div>
    </section>
  )
}
