const STORAGE_KEY = 'rta.mock.site-content.v1'
const DRAFT_STORAGE_KEY = 'rta.mock.site-content.draft.v1'
const VERSIONS_STORAGE_KEY = 'rta.mock.site-content.versions.v1'

export const defaultPageBuilder = {
  layout: [
    {
      id: 'hero-1',
      type: 'hero',
      eyebrow: 'Soluções ambientais e de engenharia',
      title: 'Do planejamento à execução, soluções para o seu projeto.',
      titles: [
        'Do planejamento à execução, soluções para o seu projeto.',
        'Engenharia e gestão que transformam projetos em resultados.',
        'Consultoria ambiental com visão de futuro.',
      ],
      description:
        'Soluções ambientais e de engenharia para cuidar dos recursos que sustentam o seu negócio.',
      ctaPrimaryText: 'Conheça nossas soluções',
      ctaPrimaryLink: '/tecnologia',
      ctaSecondaryText: 'Fale com a nossa equipe',
      ctaSecondaryLink: '/contato',
      backgroundImage: '/imagens-docx/image15.jpg',
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
      backgroundColor: '#f7f8f5',
      textColor: '#1f2a22',
    },
    {
      id: 'areas-1',
      type: 'cards',
      title: 'Áreas de atuação',
      description: 'Serviços integrados para apoiar o seu projeto do diagnóstico à entrega.',
      items: [
        { title: 'Ambiental', text: 'Resíduos, licenciamento, estudos e conformidade ambiental.' },
        { title: 'Engenharia', text: 'Obras, infraestrutura, topografia e acompanhamento técnico.' },
        { title: 'Gestão de obras', text: 'Planejamento, controle de campo e documentação.' },
        { title: 'Gestão ambiental e documental', text: 'Licenças, condicionantes, registros e evidências.' },
        { title: 'Paisagismo', text: 'Soluções compatíveis com o ambiente e a manutenção futura.' },
      ],
      backgroundColor: '#f7f8f5',
      textColor: '#1f2a22',
    },
    {
      id: 'pratica-1',
      type: 'gallery',
      title: 'Atuação na prática',
      description: 'Conheça alguns registros de atividades e recursos utilizados pela equipe.',
      items: [
        { title: 'Levantamento e campo', image: '/imagens-docx/image15.jpg' },
        { title: 'Acompanhamento de atividades', image: '/imagens-docx/image12.jpg' },
        { title: 'Soluções ambientais', image: '/imagens-docx/image6.JPG' },
        { title: 'Equipe e infraestrutura', image: '/imagens-docx/image10.jpg' },
      ],
      backgroundColor: '#f7f8f5',
      textColor: '#1f2a22',
    },
    {
      id: 'cta-1',
      type: 'cta',
      title: 'Seu próximo projeto pode deixar uma marca positiva.',
      description: 'Vamos construir soluções ambientais que geram valor para sua operação e para a comunidade.',
      buttonText: 'Iniciar conversa',
      buttonLink: '/contato',
      backgroundColor: '#1f2a22',
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
      text: 'Atuar nas áreas Ambiental e de Engenharia, com qualidade, produtividade e respeito à legislação, visando garantir a satisfação de seus clientes e demais partes interessadas através da melhoria contínua dos seus processos e serviços.',
      imageUrl: '/imagens-docx/image7.png',
      backgroundColor: '#ffffff',
      textColor: '#1f2a22',
      borderColor: '#36ad55',
    },
    {
      id: 'sobre-card-visao',
      type: 'card',
      title: 'Visão',
      text: 'Ser referência na prestação de serviços ambientais e de engenharia através da marca sempre presente de empresa competitiva, compromissada, parceira, atualizada e com excelência na qualidade dos seus serviços.',
      imageUrl: '/imagens-docx/image8.jpg',
      backgroundColor: '#ffffff',
      textColor: '#1f2a22',
      borderColor: '#36ad55',
    },
    {
      id: 'sobre-card-valores',
      type: 'card',
      title: 'Valores',
      text: 'Na busca do sucesso e do alto desempenho, sustentados pelos princípios de ética, sustentabilidade, criatividade, entusiasmo e harmonia.',
      imageUrl: '/imagens-docx/image10.jpg',
      backgroundColor: '#ffffff',
      textColor: '#1f2a22',
      borderColor: '#36ad55',
    },
  ],
}

export const defaultSiteContent = {
  home: {
    eyebrow: 'Soluções ambientais e de engenharia',
    title: 'Do planejamento à execução, soluções para o seu projeto.',
    description:
      'Soluções ambientais e de engenharia para cuidar dos recursos que sustentam o seu negócio.',
  },
  sobre: {
    title: 'A Empresa',
    subtitle: 'Conheça nossa história e o que nos move a cuidar do meio ambiente.',
    mission: 'Atuar nas áreas Ambiental e de Engenharia, com qualidade, produtividade e respeito à legislação, visando garantir a satisfação de seus clientes e demais partes interessadas através da melhoria contínua dos seus processos e serviços.',
    vision: 'Ser referência na prestação de serviços ambientais e de engenharia através da marca sempre presente de empresa competitiva, compromissada, parceira, atualizada e com excelência na qualidade dos seus serviços.',
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
    const savedHome = parsed.home || {}
    const savedLayout = Array.isArray(parsed.pageBuilder?.layout) ? parsed.pageBuilder.layout : defaultPageBuilder.layout
    const migratedHome = {
      ...savedHome,
      ...(savedHome.title?.includes('20 anos') ? { title: defaultSiteContent.home.title } : {}),
      ...(savedHome.eyebrow === 'Engenharia ambiental desde 2004' ? { eyebrow: defaultSiteContent.home.eyebrow } : {}),
    }
    const migratedLayout = savedLayout.map((block) => ({
      ...block,
      ...(['text-1', 'areas-1'].includes(block.id) && block.backgroundColor === '#ffffff'
        ? { backgroundColor: '#f7f8f5' }
        : {}),
      ...(block.backgroundColor === '#1f2a22' ? { backgroundColor: '#1f2a22' } : {}),
      ...(block.textColor === '#1f2a22' ? { textColor: '#1f2a22' } : {}),
      ...(block.accentColor === '#0161c4' ? { accentColor: '#f6aa00' } : {}),
      ...(block.title?.includes('20 anos') ? { title: defaultPageBuilder.layout[0].title } : {}),
      ...(Array.isArray(block.titles) ? {
        titles: block.titles.map((title) => {
          if (title.includes('20 anos')) return defaultPageBuilder.layout[0].titles[0]
          if (title === 'Tecnologia que devolve valor ao negócio.') return defaultPageBuilder.layout[0].titles[1]
          return title
        }),
      } : {}),
      ...(block.description === 'Tecnologia, consultoria e engenharia para cuidar dos recursos que sustentam o seu negócio.'
        ? { description: defaultPageBuilder.layout[0].description }
        : {}),
      ...(block.eyebrow === 'Engenharia ambiental desde 2004' ? { eyebrow: defaultPageBuilder.layout[0].eyebrow } : {}),
    }))
    const layoutWithCurrentSections = [
      ...migratedLayout,
      ...defaultPageBuilder.layout.filter((block) => !migratedLayout.some((savedBlock) => savedBlock.id === block.id)),
    ]

    return {
      home: { ...defaultSiteContent.home, ...migratedHome },
      sobre: { ...defaultSiteContent.sobre, ...(parsed.sobre || {}) },
      pageBuilder: {
        layout: Array.isArray(parsed.pageBuilder?.layout)
          ? layoutWithCurrentSections
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
