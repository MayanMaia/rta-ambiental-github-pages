/**
 * Utilitário para manipulação de meta tags de SEO.
 * Uso: updateMeta({ title: 'Serviços', description: '...' })
 */

const BASE_TITLE = 'RTA Ambiental'

export function updateMeta({ title, description, canonical } = {}) {
  // Title
  document.title = title ? `${title} | ${BASE_TITLE}` : BASE_TITLE

  // Description
  const descTag = document.querySelector('meta[name="description"]')
  if (descTag && description) descTag.setAttribute('content', description)

  // Canonical
  let canonicalTag = document.querySelector('link[rel="canonical"]')
  if (canonical) {
    if (!canonicalTag) {
      canonicalTag = document.createElement('link')
      canonicalTag.rel = 'canonical'
      document.head.appendChild(canonicalTag)
    }
    canonicalTag.href = canonical
  }

  // OG
  const ogTitle = document.querySelector('meta[property="og:title"]')
  const ogDesc  = document.querySelector('meta[property="og:description"]')
  if (ogTitle && title)       ogTitle.setAttribute('content', `${title} | ${BASE_TITLE}`)
  if (ogDesc  && description) ogDesc.setAttribute('content', description)
}
