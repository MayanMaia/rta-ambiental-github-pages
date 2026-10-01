const STORAGE_KEY = 'rta.mock.site-content.v1'
const DRAFT_STORAGE_KEY = 'rta.mock.site-content.draft.v1'
const VERSIONS_STORAGE_KEY = 'rta.mock.site-content.versions.v1'

export const defaultPageBuilder = {
  layout: [
    {
      id: 'hero-1',
      type: 'hero',
      eyebrow: 'Engenharia ambiental desde 2004',
      title: 'Invista em Experiência: RTA 20 anos!',
      titles: [
        'Invista em Experiência: RTA 20 anos!',
        'Tecnologia que devolve valor ao negócio.',
        'Consultoria ambiental com visão de futuro.',
      ],
      description:
        'Tecnologia, consultoria e engenharia para cuidar dos recursos que sustentam o seu negócio.',
      ctaPrimaryText: 'Conheça nossas soluções',
      ctaPrimaryLink: '/tecnologia',
      ctaSecondaryText: 'Fale com a nossa equipe',
      ctaSecondaryLink: '/contato',
      backgroundImage: import.meta.env.BASE_URL + 'imagens-docx/image15.jpg',
      accentColor: '#f6aa00',
      textColor: '#ffffff',
      align: 'left',
    },
    {
      id: 'text-1',
      type: 'text',
      title: 'Nossa abordagem',
      description:
        'Apoiamos empresas e organizações com estratégias práticas, sustentáveis e alinhadas à legislação.',
      body:
        'Do diagnóstico à execução, atuamos com responsabilidade técnica, foco em resultados e compromisso com a preservação ambiental.',
      backgroundColor: '#ffffff',
      textColor: '#101c43',
    },
    {
      id: 'cta-1',
      type: 'cta',
      title: 'Seu próximo projeto pode deixar uma marca positiva.',
      description: 'Vamos construir soluções ambientais que geram valor para sua operação e para a comunidade.',
      buttonText: 'Iniciar conversa',
      buttonLink: '/contato',
      backgroundColor: '#101c43',
      textColor: '#ffffff',
    },
  ],
}

export const defaultSobreBuilder = {
  layout: [
    {
      id: 'sobre-card-missao',
      type: 'card',
      title: 'Missão',
      text: 'Atuar nas áreas de Tecnologia e Consultoria Ambiental, com qualidade, produtividade e respeito à legislação, visando garantir a satisfação de seus clientes e demais partes interessadas através da melhoria contínua dos seus processos e serviços.',
      imageUrl: import.meta.env.BASE_URL + 'imagens-docx/image7.png',
      backgroundColor: '#ffffff',
      textColor: '#101c43',
      borderColor: '#36ad55',
    },
    {
      id: 'sobre-card-visao',
      type: 'card',
      title: 'Visão',
      text: 'Ser referência na prestação de serviços de tecnologia e consultoria através da marca sempre presente de empresa competitiva, compromissada, parceira, atualizada e com excelência na qualidade dos seus serviços.',
      imageUrl: import.meta.env.BASE_URL + 'imagens-docx/image8.jpg',
      backgroundColor: '#ffffff',
      textColor: '#101c43',
      borderColor: '#36ad55',
    },
    {
      id: 'sobre-card-valores',
      type: 'card',
      title: 'Valores',
      text: 'Na busca do sucesso e do alto desempenho, sustentados pelos princípios de ética, sustentabilidade, criatividade, entusiasmo e harmonia.',
      imageUrl: import.meta.env.BASE_URL + 'imagens-docx/image10.jpg',
      backgroundColor: '#ffffff',
      textColor: '#101c43',
      borderColor: '#36ad55',
    },
  ],
}

export const defaultSiteContent = {
  home: {
    eyebrow: 'Engenharia ambiental desde 2004',
    title: 'Invista em Experiência: RTA 20 anos!',
    description:
      'Tecnologia, consultoria e engenharia para cuidar dos recursos que sustentam o seu negócio.',
  },
  sobre: {
    title: 'A Empresa',
    subtitle: 'Conheça nossa história e o que nos move a cuidar do meio ambiente.',
    mission: 'Atuar nas áreas de Tecnologia e Consultoria Ambiental, com qualidade, produtividade e respeito à legislação, visando garantir a satisfação de seus clientes e demais partes interessadas através da melhoria contínua dos seus processos e serviços.',
    vision: 'Ser referência na prestação de serviços de tecnologia e consultoria através da marca sempre presente de empresa competitiva, compromissada, parceira, atualizada e com excelência na qualidade dos seus serviços.',
    values: 'Na busca do sucesso e do alto desempenho, sustentados pelos princípios de ética, sustentabilidade, criatividade, entusiasmo e harmonia.',
  },
  pageBuilder: defaultPageBuilder,
  sobreBuilder: defaultSobreBuilder,
}

export function getSiteContent() {
  if (typeof window === 'undefined') return defaultSiteContent

  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSiteContent))
      return defaultSiteContent
    }

    const parsed = JSON.parse(saved)
    return {
      home: { ...defaultSiteContent.home, ...(parsed.home || {}) },
      sobre: { ...defaultSiteContent.sobre, ...(parsed.sobre || {}) },
      pageBuilder: {
        layout: Array.isArray(parsed.pageBuilder?.layout)
          ? parsed.pageBuilder.layout
          : defaultPageBuilder.layout,
      },
      sobreBuilder: {
        layout: Array.isArray(parsed.sobreBuilder?.layout)
          ? parsed.sobreBuilder.layout
          : defaultSobreBuilder.layout,
      },
    }
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSiteContent))
    return defaultSiteContent
  }
}

const normaliseContent = (nextContent) => ({
  home: { ...defaultSiteContent.home, ...(nextContent?.home || {}) },
  sobre: { ...defaultSiteContent.sobre, ...(nextContent?.sobre || {}) },
  pageBuilder: {
    layout: Array.isArray(nextContent?.pageBuilder?.layout)
      ? nextContent.pageBuilder.layout
      : defaultPageBuilder.layout,
  },
  sobreBuilder: {
    layout: Array.isArray(nextContent?.sobreBuilder?.layout)
      ? nextContent.sobreBuilder.layout
      : defaultSobreBuilder.layout,
  },
})

export function getSiteDraft() {
  if (typeof window === 'undefined') return defaultSiteContent

  try {
    const saved = localStorage.getItem(DRAFT_STORAGE_KEY)
    return saved ? normaliseContent(JSON.parse(saved)) : getSiteContent()
  } catch {
    return getSiteContent()
  }
}

export function saveSiteDraft(nextContent) {
  const content = normaliseContent(nextContent)
  if (typeof window !== 'undefined') {
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(content))
  }
  return content
}

export function getSiteVersions() {
  if (typeof window === 'undefined') return []

  try {
    return JSON.parse(localStorage.getItem(VERSIONS_STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

export function publishSiteContent(nextContent, user = 'Administrador') {
  const content = normaliseContent(nextContent)
  const version = {
    id: `version-${Date.now()}`,
    createdAt: new Date().toISOString(),
    user,
    content,
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(content))
    localStorage.setItem(VERSIONS_STORAGE_KEY, JSON.stringify([version, ...getSiteVersions()].slice(0, 20)))
    window.dispatchEvent(new Event('rta:content-updated'))
  }

  return version
}

export function saveSiteContent(nextContent) {
  const content = normaliseContent(nextContent)

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
    window.dispatchEvent(new Event('rta:content-updated'))
  }

  return content
}
