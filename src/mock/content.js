const STORAGE_KEY = 'rta.mock.site-content.v1'
const DRAFT_STORAGE_KEY = 'rta.mock.site-content.draft.v1'
const VERSIONS_STORAGE_KEY = 'rta.mock.site-content.versions.v1'

export const defaultPageBuilder = {
  layout: [
    {
      id: 'hero-1',
      type: 'hero',
      eyebrow: 'Soluções ambientais e de engenharia',
      title: 'Engenharia e soluções ambientais para projetos mais seguros, eficientes e responsáveis.',
      titles: [
        'Engenharia e soluções ambientais para projetos mais seguros, eficientes e responsáveis.',
      ],
      description:
        'A RTA Ambiental integra planejamento técnico, gestão de campo e responsabilidade ambiental para apoiar empresas e organizações do diagnóstico à execução.',
      ctaPrimaryText: 'Solicitar diagnóstico',
      ctaPrimaryLink: '/contato',
      ctaSecondaryText: 'Conheça nossas áreas de atuação',
      ctaSecondaryLink: '#areas-de-atuacao',
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
        'Uma atuação integrada para resolver problemas com clareza, método e responsabilidade.',
      body:
        'Cada projeto começa com a compreensão do problema, do terreno, das exigências legais e dos objetivos do cliente. A partir desse diagnóstico, organizamos prioridades, definimos as soluções aplicáveis e acompanhamos a execução com registros, controle de campo e documentação.',
      items: [
        { title: 'Diagnóstico e levantamento', text: 'Compreensão do problema, do terreno e das exigências aplicáveis.' },
        { title: 'Planejamento e definição de escopo', text: 'Prioridades e soluções organizadas para a realidade do projeto.' },
        { title: 'Execução, acompanhamento e controle', text: 'Gestão de campo, registros e acompanhamento técnico.' },
        { title: 'Documentação, entrega e próximos passos', text: 'Informações organizadas para apoiar decisões futuras.' },
      ],
      backgroundColor: '#ffffff',
      textColor: '#1f2a22',
    },
    {
      id: 'areas-de-atuacao',
      type: 'cards',
      title: 'Áreas de atuação',
      description: 'Serviços integrados para apoiar o seu projeto do diagnóstico à entrega.',
      items: [
        { title: 'Ambiental', text: 'Gestão de resíduos, licenciamento, estudos e documentação ambiental para reduzir riscos e organizar evidências.', link: '/tecnologia' },
        { title: 'Engenharia', text: 'Topografia, obras, terraplanagem, drenagem e pavimentação com acompanhamento técnico.', link: '/engenharia' },
        { title: 'Gestão de obras', text: 'Cronogramas, equipes, fornecedores, medições e registros de campo organizados.', link: '/engenharia#gestao-de-obras' },
        { title: 'Gestão ambiental e documental', text: 'Licenças, condicionantes, documentos e evidências organizados para auditorias e fiscalizações.', link: '/engenharia#gestao-ambiental-e-documental' },
        { title: 'Paisagismo e recuperação de áreas', text: 'Soluções compatíveis com o ambiente e com a manutenção futura.', link: '/engenharia#paisagismo' },
      ],
      backgroundColor: '#FFFFFF',
      textColor: '#1f2a22',
    },
    {
      id: 'why-rta',
      type: 'cards',
      title: 'Conhecimento técnico para transformar necessidades em caminhos possíveis',
      description: 'A RTA conecta análise técnica com a realidade operacional do cliente, priorizando soluções aplicáveis, comunicação clara e organização documental.',
      items: [
        { title: 'Responsabilidade técnica', text: 'Escopo, prazos e responsabilidade definidos em contrato, conforme a habilitação profissional disponível.' },
        { title: 'Acompanhamento próximo', text: 'Comunicação clara e registros organizados em cada etapa do projeto.' },
        { title: 'Soluções aplicáveis', text: 'Alternativas pensadas para a realidade operacional de cada cliente.' },
      ],
      backgroundColor: '#ffffff',
      textColor: '#1f2a22',
    },
    {
      id: 'pratica-1',
      type: 'gallery',
      title: 'Atuação na prática',
      description: 'Cada imagem representa uma frente de atuação da equipe, do levantamento de campo ao acompanhamento das atividades.',
      items: [
        { title: 'Levantamento topográfico e apoio de campo', text: 'Registros de atividades usadas para compreender o terreno e apoiar o planejamento.', image: '/imagens-docx/image15.jpg' },
        { title: 'Acompanhamento de atividades', text: 'Controle visual e técnico das etapas executadas em campo.', image: '/imagens-docx/image12.jpg' },
        { title: 'Soluções ambientais', text: 'Recursos, materiais e práticas relacionados à gestão e à responsabilidade ambiental.', image: '/imagens-docx/image6.JPG' },
        { title: 'Materiais e infraestrutura', text: 'Recursos, materiais e organização necessários para apoiar cada projeto.', image: '/imagens-docx/image10.jpg' },
      ],
      backgroundColor: '#FFFFFF',
      textColor: '#1f2a22',
    },
    {
      id: 'cta-1',
      type: 'cta',
      title: 'Tem um projeto, uma exigência ambiental ou uma obra para organizar?',
      description: 'Conte brevemente o que você precisa. A equipe da RTA avaliará as informações iniciais e indicará o melhor caminho para o diagnóstico, o orçamento e a definição do escopo.',
      buttonText: 'Enviar informações do projeto',
      buttonLink: '/contato',
      backgroundColor: '#FFFFFF',
      textColor: '#1f2a22',
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
    title: 'Engenharia e soluções ambientais para projetos mais seguros, eficientes e responsáveis.',
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
      ...(block.id === 'text-1' ? { backgroundColor: '#ffffff', textColor: '#1f2a22' } : {}),
      ...(['areas-de-atuacao', 'areas-1'].includes(block.id) ? { backgroundColor: '#FFFFFF', textColor: '#1f2a22' } : {}),
      ...(block.id === 'why-rta' ? { backgroundColor: '#ffffff', textColor: '#1f2a22' } : {}),
      ...(block.id === 'pratica-1' ? { backgroundColor: '#FFFFFF', textColor: '#1f2a22' } : {}),
      ...(block.id === 'cta-1' ? { backgroundColor: '#FFFFFF', textColor: '#1f2a22' } : {}),
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
