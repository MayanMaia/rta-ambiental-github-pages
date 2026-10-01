import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { updateMeta } from '../utils/seo'
import { candidatosService } from '../services/candidatos.service'
import { validators } from '../utils/validators'
import { sanitizeObject } from '../utils/sanitize'

export default function TrabalheConosco() {
  const [enviado, setEnviado] = useState(false)
  const [erro,    setErro]    = useState(null)

  useEffect(() => {
    updateMeta({
      title: 'Trabalhe Conosco',
      description: 'Faça parte da equipe RTA Ambiental. Envie seu currículo para nosso Banco de Talentos.',
      canonical: 'https://www.rtaambiental.com.br/trabalhe-conosco',
    })
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm()

  const onSubmit = async (raw) => {
    setErro(null)
    try {
      const formData = new FormData()
      const campos   = sanitizeObject({
        nome:      raw.nome,
        email:     raw.email,
        telefone:  raw.telefone ?? '',
        area:      raw.area,
        mensagem:  raw.mensagem ?? '',
      })
      Object.entries(campos).forEach(([k, v]) => formData.append(k, v))
      if (raw.curriculo?.[0]) formData.append('curriculo', raw.curriculo[0])

      await candidatosService.enviar(formData)
      setEnviado(true)
      reset()
    } catch {
      setErro('Ocorreu um erro ao enviar sua candidatura. Tente novamente.')
    }
  }

  return (
    <section className="public-page section" style={{ '--page-image': "url('/imagens-docx/image11.jpeg')" }}>
      <div className="container max-w-2xl mx-auto">
        <h1 className="section-title">Banco de Talentos</h1>
        <p className="section-subtitle mb-10">
          Interessado em fazer parte da nossa equipe? Envie seu currículo e manteremos
          seu cadastro em nosso banco de talentos.
        </p>

        {enviado ? (
          <div className="card border border-green-200 bg-green-50 text-center py-12">
            <p className="text-green-700 font-semibold text-lg mb-2">Candidatura recebida!</p>
            <p className="text-green-600 text-sm">
              Obrigado pelo interesse. Você receberá um e-mail de confirmação em breve.
            </p>
            <button onClick={() => setEnviado(false)} className="btn-primary mt-6">
              Nova candidatura
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            <div>
              <label className="label" htmlFor="nome">Nome completo *</label>
              <input
                id="nome"
                className={`input ${errors.nome ? 'input-error' : ''}`}
                placeholder="Seu nome completo"
                {...register('nome', { required: 'Nome é obrigatório' })}
              />
              {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome.message}</p>}
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
              <label className="label" htmlFor="telefone">Telefone</label>
              <input
                id="telefone"
                type="tel"
                className="input"
                placeholder="(00) 00000-0000"
                {...register('telefone', validators.telefone)}
              />
            </div>

            <div>
              <label className="label" htmlFor="area">Área de interesse *</label>
              <select
                id="area"
                className={`input ${errors.area ? 'input-error' : ''}`}
                {...register('area', { required: 'Selecione uma área' })}
              >
                <option value="">Selecione...</option>
                <option value="ambiental">Consultoria Ambiental</option>
                <option value="campo">Trabalho de Campo</option>
                <option value="administrativo">Administrativo</option>
                <option value="tecnico">Técnico</option>
                <option value="outro">Outro</option>
              </select>
              {errors.area && <p className="text-red-500 text-xs mt-1">{errors.area.message}</p>}
            </div>

            <div>
              <label className="label" htmlFor="curriculo">
                Currículo (PDF, máx. 5MB)
              </label>
              <input
                id="curriculo"
                type="file"
                accept=".pdf,application/pdf"
                className="block w-full text-sm text-neutral-600
                           file:mr-4 file:py-2 file:px-4 file:rounded-lg
                           file:border-0 file:text-sm file:font-medium
                           file:bg-primary-50 file:text-primary-700
                           hover:file:bg-primary-100 cursor-pointer"
                {...register('curriculo', {
                  ...validators.fileSize(5),
                  ...validators.fileType(['application/pdf']),
                })}
              />
              {errors.curriculo && <p className="text-red-500 text-xs mt-1">{errors.curriculo.message}</p>}
            </div>

            <div>
              <label className="label" htmlFor="mensagem">Mensagem (opcional)</label>
              <textarea
                id="mensagem"
                rows={4}
                className="input resize-none"
                placeholder="Conte um pouco sobre você..."
                {...register('mensagem')}
              />
            </div>

            {erro && <p className="text-red-600 text-sm">{erro}</p>}

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
              {isSubmitting ? 'Enviando...' : 'Enviar candidatura'}
            </button>

            <p className="text-xs text-neutral-400 text-center">
              Seus dados serão tratados conforme nossa{' '}
              <a href="/politica-de-privacidade" className="underline">Política de Privacidade</a>.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
