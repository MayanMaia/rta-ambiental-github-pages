import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ArrowUpRight } from 'lucide-react'
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
    try {
      const dados = sanitizeObject({
        nome: raw.nome,
        municipio: raw.municipio,
        email: raw.email,
        telefone: raw.telefone,
        objetivo: raw.objetivo,
        mensagem: raw.mensagem,
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
              Envie a sua mensagem que entraremos em contato.
            </p>
          </div>
        </div>

        <div className="contact-page__layout">
          <div className="contact-page__form-panel">
            {enviado ? (
              <div className="contact-page__success">
                <span className="contact-page__success-mark">&#10003;</span>
                <p className="text-lg font-semibold">Mensagem enviada!</p>
                <p>Obrigado pelo contato. Responderemos em breve.</p>
                <button onClick={() => setEnviado(false)} className="btn-primary mt-6">
                  Enviar nova mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="contact-page__form-heading">
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
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className={`contact-page__file ${errors.arquivo ? 'contact-page__file--error' : ''}`}
                {...register('arquivo', {
                  validate: (files) => {
                    if (objetivo === 'curriculo' && !files?.[0]) return 'Anexe seu currículo para continuar'
                    if (!files?.[0]) return true
                    if (files[0].size > 5 * 1_024 * 1_024) return 'Arquivo deve ter no máximo 5MB'
                    const tiposAceitos = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
                    return tiposAceitos.includes(files[0].type) || 'Formato inválido. Envie PDF, DOC ou DOCX'
                  },
                })}
              />
              <p className="contact-page__file-help">PDF, DOC ou DOCX. Máximo de 5MB.</p>
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
              <a href="/politica-de-privacidade" className="underline hover:text-neutral-600">
                Política de Privacidade
              </a>.
            </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
