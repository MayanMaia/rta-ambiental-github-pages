import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { updateMeta } from '../utils/seo'
import { servicosService } from '../services/servicos.service'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { sanitizeHtml } from '../utils/sanitize'

export default function ServicoDetalhe({ categoria = 'tecnologia' }) {
  const { slug } = useParams()
  const [s, setS] = useState(null)
  const [err, setErr] = useState(null)
  const [load, setLoad] = useState(true)
  const categoriaAtual = categoria === 'consultoria' ? 'consultoria' : 'tecnologia'
  const urlCategoria = `/${categoriaAtual}`

  useEffect(() => {
    servicosService.obterPorSlug(slug)
      .then((data) => {
        setS(data)
        updateMeta({
          title: data.nome,
          description: data.descricao,
          canonical: `https://www.rtaambiental.com.br${urlCategoria}/${slug}`,
        })
      })
      .catch(() => setErr('Serviço não encontrado.'))
      .finally(() => setLoad(false))
  }, [slug, urlCategoria])

  if (load) return <LoadingSpinner fullPage={false} />
  if (err) return (
    <div className="section container text-center">
      <p className="text-neutral-600 mb-6">{err}</p>
      <Link to={urlCategoria} className="btn-primary">Ver todos os serviços</Link>
    </div>
  )

  return (
    <section className="public-page section" style={{ '--page-image': `url(${import.meta.env.BASE_URL}imagens-docx/image6.JPG)` }}>
      <div className="container max-w-3xl mx-auto">
        <Link to={urlCategoria} className="text-sm text-primary-600 hover:underline mb-6 inline-block">
          ← Voltar para {categoriaAtual === 'consultoria' ? 'Consultoria' : 'Tecnologia'}
        </Link>
        <h1 className="section-title">{s.nome}</h1>
        <div className="prose prose-neutral max-w-none text-neutral-600">
          <p>{s.descricao}</p>
          {s.conteudo && <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(s.conteudo) }} />}
        </div>
        <div className="mt-10">
          <Link to="/contato" className="btn-primary">Solicitar este serviço</Link>
        </div>
      </div>
    </section>
  )
}
