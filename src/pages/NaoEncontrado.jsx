import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { updateMeta } from '../utils/seo'

export default function NaoEncontrado() {
  useEffect(() => {
    updateMeta({ title: 'Página não encontrada' })
  }, [])

  return (
    <section className="public-page section flex min-h-[60vh] flex-col items-center justify-center text-center" style={{ '--page-image': "url('/imagens-docx/image13.jpeg')" }}>
      <p className="text-8xl font-heading font-bold text-primary-100 mb-4">404</p>
      <h1 className="text-2xl font-heading font-bold text-neutral-800 mb-3">
        Página não encontrada
      </h1>
      <p className="text-neutral-500 mb-8">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Link to="/" className="btn-primary">Voltar ao início</Link>
    </section>
  )
}
