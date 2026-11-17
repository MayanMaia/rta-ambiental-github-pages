import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { updateMeta } from '../utils/seo'
import { contatoService } from '../services/contato.service'
import { validators } from '../utils/validators'
import { sanitizeObject } from '../utils/sanitize'

export default function Contato() {
  const [enviado, setEnviado] = useState(false)
  const [erro,    setErro]    = useState(null)

  useEffect(() => {
    updateMeta({
      title: 'Contato',
      description: 'Entre em contato com a RTA Ambiental.',
      canonical: 'https://www.rtaambiental.com.br/contato',
    })
  }, [])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm()

  const objetivo = watch('objetivo')

  const onSubmit = async (raw) => {
    setErro(null)
    if (raw.website) return
    try {
      const dados = sanitizeObject({
        nome: raw.nome,
        empresa: raw.empresa,
        municipio: raw.municipio,
        email: raw.email,
        telefone: raw.telefone,
        servico: raw.servico,
        objetivo: raw.objetivo,
        mensagem: raw.mensagem,
        website: raw.website,
        destinatario: raw.objetivo === 'orcamento'
          ? 'consultoria@rtaambiental.com.br'
          : 'faleconosco@rtaambiental.com.br',
      })
      const formData = new FormData()
      Object.entries(dados).forEach(([campo, valor]) => formData.append(campo, valor ?? ''))
      if (raw.arquivo?.[0]) formData.append('arquivo', raw.arquivo[0])

      await contatoService.enviar(formData)
      setEnviado(true)
      reset()
    } catch {
      setErro('Ocorreu um erro ao enviar a mensagem. Tente novamente.')
    }
  }

  return (
    <section className="public-page contact-page section" style={{ '--page-image': "url('/imagens-docx/image12.jpg')" }}>
      <div className="container">
        <div className="contact-page__intro">
          <div>
            <p className="eyebrow">Vamos conversar</p>
            <h1 className="section-title">Contato</h1>
            <p className="section-subtitle">
              Envie as informações iniciais da sua demanda. A equipe da RTA analisará o assunto, identificará a área mais adequada e retornará com os próximos passos para avaliação, orçamento ou definição de escopo.
            </p>
          </div>
        </div>

        <div className="contact-page__layout">
          <div className="contact-page__form-panel">
            {enviado ? (
              <div className="contact-page__success">
                <span className="contact-page__success-mark">&#10003;</span>
                <p className="text-lg font-semibold">Recebemos sua mensagem.</p>
                <p>Obrigado pelo contato. Nossa equipe avaliará as informações e retornará pelos canais informados.</p>
                <button onClick={() => setEnviado(false)} className="btn-primary mt-6">
                  Enviar nova mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="contact-page__form-heading">
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input id="website" tabIndex="-1" autoComplete="off" {...register('website')} />
                  </div>

                  <div>
                    <p className="contact-page__kicker">Seu projeto</p>
                    <h2>Como podemos ajudar?</h2>
                  </div>
                  <span className="contact-page__required">* campos obrigatórios</span>
                </div>

                <div className="contact-page__fields">
            <div className="contact-page__field-grid">
            <div>
              <label className="label" htmlFor="nome">Nome do contato *</label>
              <input
                id="nome"
                className={`input ${errors.nome ? 'input-error' : ''}`}
                placeholder="Seu nome completo"
                {...register('nome', { required: 'Nome é obrigatório', minLength: { value: 2, message: 'Mínimo 2 caracteres' } })}
              />
              {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome.message}</p>}
            </div>

            <div>
              <label className="label" htmlFor="empresa">Empresa *</label>
              <input
                id="empresa"
                className={`input ${errors.empresa ? 'input-error' : ''}`}
                placeholder="Nome da empresa"
                {...register('empresa', { required: 'Empresa é obrigatória' })}
              />
              {errors.empresa && <p className="text-red-500 text-xs mt-1">{errors.empresa.message}</p>}
            </div>

            <div>
              <label className="label" htmlFor="municipio">Município *</label>
              <input
                id="municipio"
                className={`input ${errors.municipio ? 'input-error' : ''}`}
                placeholder="Onde o projeto está localizado?"
                {...register('municipio', { required: 'Município é obrigatório' })}
              />
              {errors.municipio && <p className="text-red-500 text-xs mt-1">{errors.municipio.message}</p>}
            </div>

            <div>
              <label className="label" htmlFor="email">E-mail *</label>
              <input
                id="email"
                type="email"
                className={`input ${errors.email ? 'input-error' : ''}`}
                placeholder="seu@email.com"
                {...register('email', validators.email)}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="label" htmlFor="telefone">Telefone *</label>
              <input
                id="telefone"
                type="tel"
                className={`input ${errors.telefone ? 'input-error' : ''}`}
                placeholder="(00) 00000-0000"
                {...register('telefone', { required: 'Telefone é obrigatório', ...validators.telefone })}
              />
              {errors.telefone && <p className="text-red-500 text-xs mt-1">{errors.telefone.message}</p>}
            </div>
            </div>

            <div>
              <label className="label" htmlFor="servico">O que você precisa resolver? *</label>
              <select
                id="servico"
                className={`input ${errors.servico ? 'input-error' : ''}`}
                {...register('servico', { required: 'Selecione um serviço de interesse' })}
              >
                <option value="">Selecione uma opção</option>
                <option value="ambiental">Ambiental</option>
                <option value="engenharia">Engenharia</option>
                <option value="gestao-de-obras">Gestão de obras</option>
                <option value="gestao-ambiental-documental">Gestão ambiental e documental</option>
                <option value="paisagismo">Paisagismo</option>
                <option value="consultoria">Consultoria</option>
                <option value="outros">Outro</option>
              </select>
              {errors.servico && <p className="text-red-500 text-xs mt-1">{errors.servico.message}</p>}
            </div>

            <div>
              <label className="label" htmlFor="objetivo">Objetivo do contato *</label>
              <select
                id="objetivo"
                className={`input ${errors.objetivo ? 'input-error' : ''}`}
                {...register('objetivo', { required: 'Selecione o objetivo do contato' })}
              >
                <option value="">Selecione uma opção</option>
                <option value="orcamento">Orçamento</option>
                <option value="curriculo">Currículo</option>
                <option value="outros">Outros</option>
              </select>
              {errors.objetivo && <p className="text-red-500 text-xs mt-1">{errors.objetivo.message}</p>}
            </div>

            <div>
              <label className="label" htmlFor="mensagem">Mensagem *</label>
              <textarea
                id="mensagem"
                rows={5}
                className={`input resize-none ${errors.mensagem ? 'input-error' : ''}`}
                placeholder="Descreva como podemos ajudar..."
                {...register('mensagem', { required: 'Mensagem é obrigatória', minLength: { value: 10, message: 'Mínimo 10 caracteres' } })}
              />
              {errors.mensagem && <p className="text-red-500 text-xs mt-1">{errors.mensagem.message}</p>}
            </div>

            <div>
              <label className="label" htmlFor="arquivo">
                Anexo {objetivo === 'curriculo' ? '*' : '(opcional)'}
              </label>
              <input
                id="arquivo"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                className={`contact-page__file ${errors.arquivo ? 'contact-page__file--error' : ''}`}
                {...register('arquivo', {
                  validate: (files) => {
                    if (!files?.[0]) return true
                    if (files[0].size > 10 * 1_024 * 1_024) return 'Arquivo deve ter no máximo 10MB'
                    const tiposAceitos = ['application/pdf', 'image/jpeg', 'image/png']
                    return tiposAceitos.includes(files[0].type) || 'Formato inválido. Envie PDF, JPG ou PNG'
                  },
                })}
              />
              <p className="contact-page__file-help">PDF, JPG ou PNG. Máximo de 10MB.</p>
              {errors.arquivo && <p className="text-red-500 text-xs mt-1">{errors.arquivo.message}</p>}
            </div>

            {erro && <p className="text-red-600 text-sm">{erro}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary contact-page__submit"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar mensagem'} <ArrowUpRight size={17} />
            </button>

            <p className="text-xs text-neutral-400 text-center">
              Ao enviar, você concorda com nossa{' '}
              <Link to="/politica-de-privacidade" className="underline hover:text-neutral-600">
                Política de Privacidade
              </Link>.
            </p>
                </div>
              </form>
            )}
          </div>
          <aside className="rounded-2xl border border-[#dce8df] bg-white p-6 shadow-card">
            <h2 className="text-2xl font-heading font-bold text-[#1f2a22]">Para agilizar a avaliação, informe:</h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-neutral-700">
              <li>tipo de projeto ou empreendimento;</li>
              <li>cidade e estado;</li>
              <li>serviço desejado;</li>
              <li>estágio atual da obra ou processo;</li>
              <li>principais prazos e dificuldades;</li>
              <li>documentos ou imagens que ajudem a entender a demanda.</li>
            </ul>
            <div className="mt-8 border-t border-neutral-200 pt-6">
              <h3 className="font-heading font-semibold text-[#1f2a22]">Canais oficiais</h3>
              <a className="mt-3 block text-sm text-[#20823b] hover:underline" href="mailto:faleconosco@rtaambiental.com.br">faleconosco@rtaambiental.com.br</a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
