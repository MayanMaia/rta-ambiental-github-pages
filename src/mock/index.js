import {
  mockAdminUser,
  mockCandidatos,
  mockMensagens,
  mockServices,
  mockUsuarios,
} from './data.js'

const MOCK_STORAGE_KEY = 'rta.mock.db.v1'
const MOCK_CONTENT_KEY = 'rta.mock.site-content.v1'
const wait = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms))
const clone = (value) => JSON.parse(JSON.stringify(value))
const normalizeServico = (servico) => {
  const nome = servico.nome?.trim() || 'Novo serviço'
  const descricao = servico.descricao?.trim() || 'Entre em contato com a RTA Ambiental para conhecer esta solução.'

  return {
    ...servico,
    nome,
    slug: servico.slug?.trim() || nome.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    descricao,
    conteudo: servico.conteudo?.trim() || `<p>${descricao}</p>`,
    imagem: servico.imagem?.trim?.() || '',
  }
}

export function resetMockData() {
  if (typeof window === 'undefined') return

  const initial = buildDefaultDb()
  localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(initial))
  localStorage.removeItem('rta.mock.site-content.draft.v1')
  localStorage.removeItem('rta.mock.site-content.versions.v1')
  localStorage.setItem(MOCK_CONTENT_KEY, JSON.stringify({
    home: {
      eyebrow: 'Engenharia ambiental desde 2004',
      title: 'Experiência que transforma o futuro.',
      description: 'Tecnologia, consultoria e engenharia para cuidar dos recursos que sustentam o seu negócio.',
    },
    sobre: {
      title: 'Sobre a RTA Ambiental',
      subtitle: 'Conheça nossa história e o que nos move a cuidar do meio ambiente.',
      mission: 'Oferecer soluções ambientais de excelência, contribuindo para um futuro sustentável.',
      vision: 'Ser referência em serviços ambientais, reconhecida pela qualidade e inovação.',
      values: 'Ética, responsabilidade, sustentabilidade, qualidade e comprometimento.',
    },
    sobreBuilder: {
      layout: [
        { id: 'sobre-card-missao', type: 'card', title: 'Missão', text: 'Oferecer soluções ambientais de excelência, contribuindo para um futuro sustentável.', imageUrl: '/imagens-docx/image7.png', backgroundColor: '#ffffff', textColor: '#101c43', borderColor: '#36ad55' },
        { id: 'sobre-card-visao', type: 'card', title: 'Visão', text: 'Ser referência em serviços ambientais, reconhecida pela qualidade e inovação.', imageUrl: '/imagens-docx/image8.jpg', backgroundColor: '#ffffff', textColor: '#101c43', borderColor: '#36ad55' },
        { id: 'sobre-card-valores', type: 'card', title: 'Valores', text: 'Ética, responsabilidade, sustentabilidade, qualidade e comprometimento.', imageUrl: '/imagens-docx/image10.jpg', backgroundColor: '#ffffff', textColor: '#101c43', borderColor: '#36ad55' },
      ],
    },
  }))
  window.dispatchEvent(new Event('rta:content-updated'))
}

const buildError = (message, status) => {
  const error = new Error(message)
  error.response = { status }
  return error
}

const buildDefaultDb = () => ({
  servicos: clone(mockServices),
  mensagens: clone(mockMensagens),
  usuarios: clone(mockUsuarios).map((usuario) => ({
    ...usuario,
    name: usuario.name ?? usuario.nome,
  })),
  candidatos: clone(mockCandidatos),
})

const readMockDb = () => {
  if (typeof window === 'undefined') {
    return buildDefaultDb()
  }

  try {
    const raw = localStorage.getItem(MOCK_STORAGE_KEY)
    if (!raw) {
      const initial = buildDefaultDb()
      localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(initial))
      return initial
    }

    const parsed = JSON.parse(raw)
    const savedServices = parsed.servicos ?? []
    const savedSlugs = new Set(savedServices.map((servico) => servico.slug))
    const servicos = [
      ...savedServices,
      ...clone(mockServices).filter((servico) => !savedSlugs.has(servico.slug)),
    ]

    return {
      servicos: servicos.map(normalizeServico),
      mensagens: parsed.mensagens ?? clone(mockMensagens),
      usuarios: (parsed.usuarios ?? clone(mockUsuarios)).map((usuario) => ({
        ...usuario,
        name: usuario.name ?? usuario.nome,
      })),
      candidatos: parsed.candidatos ?? clone(mockCandidatos),
    }
  } catch {
    const initial = buildDefaultDb()
    localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(initial))
    return initial
  }
}

const writeMockDb = (db) => {
  if (typeof window === 'undefined') return db
  localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(db))
  return db
}

export const mockDb = readMockDb()

export const mockApi = {
  async login(email, password) {
    await wait(300)

    const adminEmail = import.meta.env.VITE_LOCAL_ADMIN_EMAIL ?? 'admin@rta.local'
    const adminPassword = import.meta.env.VITE_LOCAL_ADMIN_PASSWORD ?? 'admin123'

    if (email !== adminEmail || password !== adminPassword) {
      throw buildError('Credenciais inválidas', 401)
    }

    return {
      token: 'mock-demo-token',
      user: { ...mockAdminUser, email, name: 'Administrador Demo' },
    }
  },

  async listarServicos(categoria) {
    await wait()
    const db = readMockDb()
    const servicos = categoria ? db.servicos.filter((item) => item.categoria === categoria) : db.servicos
    return clone(servicos)
  },

  async obterServicoPorSlug(slug) {
    await wait()
    const db = readMockDb()
    const servico = db.servicos.find((item) => item.slug === slug)
    if (!servico) throw buildError('Serviço não encontrado', 404)
    return clone(servico)
  },

  async criarServico(payload) {
    await wait()
    const db = readMockDb()
    const nome = payload.nome?.trim() || 'Novo serviço'
    const descricao = payload.descricao?.trim() || 'Entre em contato com a RTA Ambiental para conhecer esta solução.'
    const conteudo = payload.conteudo?.trim() || `<p>${descricao}</p>`
    const proximo = {
      id: Date.now(),
      nome,
      slug: payload.slug?.trim() || nome.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      categoria: payload.categoria === 'consultoria' ? 'consultoria' : 'tecnologia',
      descricao,
      conteudo,
      imagem: payload.imagem?.trim() || '',
    }
    db.servicos.unshift(proximo)
    writeMockDb(db)
    return clone(proximo)
  },

  async atualizarServico(id, payload) {
    await wait()
    const db = readMockDb()
    const index = db.servicos.findIndex((item) => item.id === Number(id))
    if (index === -1) throw buildError('Serviço não encontrado', 404)

    const nome = payload.nome?.trim() || db.servicos[index].nome || 'Novo serviço'
    const descricao = payload.descricao?.trim() || db.servicos[index].descricao || 'Entre em contato com a RTA Ambiental para conhecer esta solução.'
    const atualizado = {
      ...db.servicos[index],
      ...payload,
      id: Number(id),
      nome,
      descricao,
      conteudo: payload.conteudo?.trim() || `<p>${descricao}</p>`,
      categoria: payload.categoria === 'consultoria' ? 'consultoria' : 'tecnologia',
      imagem: payload.imagem?.trim?.() ?? db.servicos[index].imagem ?? '',
    }

    if (!atualizado.slug && atualizado.nome) {
      atualizado.slug = atualizado.nome.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    }

    db.servicos[index] = atualizado
    writeMockDb(db)
    return clone(atualizado)
  },

  async excluirServico(id) {
    await wait()
    const db = readMockDb()
    db.servicos = db.servicos.filter((item) => item.id !== Number(id))
    writeMockDb(db)
  },

  async enviarContato(dados) {
    await wait(400)
    const db = readMockDb()
    const mensagem = {
      id: Date.now(),
      ...dados,
      lida: false,
      createdAt: new Date().toISOString(),
    }
    db.mensagens.unshift(mensagem)
    writeMockDb(db)
    return { success: true, message: mensagem }
  },

  async listarMensagens() {
    await wait()
    const db = readMockDb()
    return clone(db.mensagens)
  },

  async marcarMensagemComoLida(id) {
    await wait()
    const db = readMockDb()
    const index = db.mensagens.findIndex((item) => item.id === Number(id))
    if (index === -1) throw buildError('Mensagem não encontrada', 404)
    db.mensagens[index].lida = true
    writeMockDb(db)
    return clone(db.mensagens[index])
  },

  async excluirMensagem(id) {
    await wait()
    const db = readMockDb()
    db.mensagens = db.mensagens.filter((item) => item.id !== Number(id))
    writeMockDb(db)
  },

  async enviarCandidatura(formData) {
    await wait(500)
    const db = readMockDb()
    const dados = Object.fromEntries(formData.entries())
    const candidatura = {
      id: Date.now(),
      nome: dados.nome,
      email: dados.email,
      telefone: dados.telefone || '',
      area: dados.area,
      mensagem: dados.mensagem || '',
      status: 'novo',
      curriculoUrl: dados.curriculo || 'https://example.com/curriculo.pdf',
      createdAt: new Date().toISOString(),
    }
    db.candidatos.unshift(candidatura)
    writeMockDb(db)
    return { success: true, candidatura }
  },

  async listarCandidatos() {
    await wait()
    const db = readMockDb()
    return clone(db.candidatos.map((candidato) => ({
      ...candidato,
      curriculoUrl: candidato.curriculoUrl ?? 'https://example.com/curriculo.pdf',
    })))
  },

  async obterCandidato(id) {
    await wait()
    const db = readMockDb()
    const candidato = db.candidatos.find((item) => item.id === Number(id))
    if (!candidato) throw buildError('Candidato não encontrado', 404)
    return clone(candidato)
  },

  async atualizarStatusCandidato(id, status) {
    await wait()
    const db = readMockDb()
    const index = db.candidatos.findIndex((item) => item.id === Number(id))
    if (index === -1) throw buildError('Candidato não encontrado', 404)
    db.candidatos[index].status = status
    writeMockDb(db)
    return clone(db.candidatos[index])
  },

  async listarUsuarios() {
    await wait()
    const db = readMockDb()
    return clone(db.usuarios.map((usuario) => ({
      ...usuario,
      name: usuario.name ?? usuario.nome,
      nome: usuario.nome ?? usuario.name,
    })))
  },

  async criarUsuario(payload) {
    await wait()
    const db = readMockDb()
    const usuario = {
      id: Date.now(),
      nome: payload.nome,
      name: payload.nome,
      email: payload.email,
      role: payload.role || 'editor',
      status: payload.status || 'ativo',
    }
    db.usuarios.unshift(usuario)
    writeMockDb(db)
    return clone(usuario)
  },

  async atualizarUsuario(id, payload) {
    await wait()
    const db = readMockDb()
    const index = db.usuarios.findIndex((item) => item.id === Number(id))
    if (index === -1) throw buildError('Usuário não encontrado', 404)
    db.usuarios[index] = { ...db.usuarios[index], ...payload, id: Number(id) }
    db.usuarios[index].name = db.usuarios[index].name ?? db.usuarios[index].nome
    writeMockDb(db)
    return clone(db.usuarios[index])
  },

  async excluirUsuario(id) {
    await wait()
    const db = readMockDb()
    db.usuarios = db.usuarios.filter((item) => item.id !== Number(id))
    writeMockDb(db)
  },
}
