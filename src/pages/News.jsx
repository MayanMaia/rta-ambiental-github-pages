import { useEffect } from 'react'
import { updateMeta } from '../utils/seo'

export default function News() {
  useEffect(() => {
    updateMeta({
      title: 'News',
      description: 'Acompanhe os destaques e novidades da RTA Ambiental.',
      canonical: 'https://www.rtaambiental.com.br/news',
    })
  }, [])

  return (
    <section className="public-page section bg-[#f7f8f5]">
      <div className="container max-w-4xl">
        <span className="mb-4 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-700">
          News
        </span>
        <h1 className="section-title text-[#101c43]">Novidades da RTA</h1>
        <p className="section-subtitle max-w-2xl text-neutral-600">
          Em breve, a RTA vai publicar atualizações, insights e notícias sobre meio ambiente, tecnologia e gestão sustentável.
        </p>
      </div>
    </section>
  )
}
