/**
 * Instância base do Axios com interceptors.
 * Todas as chamadas de serviço devem usar este cliente.
 * Quando o modo mock está ativo, usa os dados locais em src/mock.
 */
import axios from 'axios'
import { mockApi } from '../mock/index.js'
import { isMockModeEnabled } from './mockMode'

const resolveIdFromUrl = (url, skip = ['lida', 'status']) => {
  const parts = url.split('/').filter(Boolean)
  const last = parts.at(-1)
  return Number(skip.includes(last) ? parts.at(-2) : last)
}

const createMockApi = () => {
  const request = async (method, url, payload, config = {}) => {
    const normalizedUrl = String(url || '').replace(/^\/+/, '')

    try {
      switch (method) {
        case 'get': {
          if (normalizedUrl === 'servicos' || normalizedUrl === 'admin/servicos') {
            return { data: await mockApi.listarServicos() }
          }
          if (normalizedUrl.startsWith('servicos?')) {
            const params = new URLSearchParams(normalizedUrl.split('?')[1] || '')
            return { data: await mockApi.listarServicos(params.get('categoria') || undefined) }
          }
          if (normalizedUrl === 'admin/mensagens') {
            return { data: await mockApi.listarMensagens() }
          }
          if (normalizedUrl === 'admin/candidatos') {
            return { data: await mockApi.listarCandidatos() }
          }
          if (normalizedUrl === 'admin/usuarios') {
            return { data: await mockApi.listarUsuarios() }
          }
          if (normalizedUrl.startsWith('servicos/')) {
            const slug = normalizedUrl.replace('servicos/', '')
            return { data: await mockApi.obterServicoPorSlug(slug) }
          }
          return { data: null }
        }

        case 'post': {
          if (normalizedUrl === 'auth/login') {
            return { data: await mockApi.login(payload.email, payload.password) }
          }
          if (normalizedUrl === 'contato') {
            const contato = typeof FormData !== 'undefined' && payload instanceof FormData
              ? Object.fromEntries(payload.entries())
              : payload
            return { data: await mockApi.enviarContato(contato) }
          }
          if (normalizedUrl === 'admin/servicos') {
            return { data: await mockApi.criarServico(payload) }
          }
          if (normalizedUrl === 'admin/usuarios') {
            return { data: await mockApi.criarUsuario(payload) }
          }
          if (normalizedUrl === 'candidatos') {
            return { data: await mockApi.enviarCandidatura(payload) }
          }
          return { data: null }
        }

        case 'put': {
          if (normalizedUrl.startsWith('admin/servicos/')) {
            const id = resolveIdFromUrl(normalizedUrl)
            return { data: await mockApi.atualizarServico(id, payload) }
          }
          if (normalizedUrl.startsWith('admin/usuarios/')) {
            const id = resolveIdFromUrl(normalizedUrl)
            return { data: await mockApi.atualizarUsuario(id, payload) }
          }
          return { data: null }
        }

        case 'patch': {
          if (normalizedUrl.startsWith('admin/mensagens/')) {
            const id = resolveIdFromUrl(normalizedUrl)
            return { data: await mockApi.marcarMensagemComoLida(id) }
          }
          if (normalizedUrl.startsWith('admin/candidatos/')) {
            const id = resolveIdFromUrl(normalizedUrl)
            return { data: await mockApi.atualizarStatusCandidato(id, payload.status) }
          }
          return { data: null }
        }

        case 'delete': {
          if (normalizedUrl.startsWith('admin/servicos/')) {
            const id = resolveIdFromUrl(normalizedUrl)
            await mockApi.excluirServico(id)
            return { data: null }
          }
          if (normalizedUrl.startsWith('admin/mensagens/')) {
            const id = resolveIdFromUrl(normalizedUrl)
            await mockApi.excluirMensagem(id)
            return { data: null }
          }
          if (normalizedUrl.startsWith('admin/usuarios/')) {
            const id = resolveIdFromUrl(normalizedUrl)
            await mockApi.excluirUsuario(id)
            return { data: null }
          }
          return { data: null }
        }

        default:
          return { data: null }
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return {
    get: (url, config) => request('get', url, null, config || {}),
    post: (url, data, config) => request('post', url, data, config || {}),
    put: (url, data, config) => request('put', url, data, config || {}),
    patch: (url, data, config) => request('patch', url, data, config || {}),
    delete: (url, config) => request('delete', url, null, config || {}),
    interceptors: {
      request: { use: () => undefined },
      response: { use: () => undefined },
    },
  }
}

const api = isMockModeEnabled() ? createMockApi() : axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api',
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
})

if (!isMockModeEnabled()) {
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('@rta:token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  })

  api.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) {
        localStorage.removeItem('@rta:token')
        localStorage.removeItem('@rta:user')
        window.location.href = '/admin/login'
      }
      return Promise.reject(err)
    },
  )
}

export default api
