import api from './api'

export const servicosService = {
  async listar({ categoria } = {}) {
    const params = new URLSearchParams()
    if (categoria) params.set('categoria', categoria)
    const query = params.toString() ? `?${params.toString()}` : ''
    const { data } = await api.get(`/servicos${query}`)
    return data
  },

  async obterPorSlug(slug) {
    const { data } = await api.get(`/servicos/${slug}`)
    return data
  },

  async criar(payload) {
    const { data } = await api.post('/admin/servicos', payload)
    return data
  },

  async atualizar(id, payload) {
    const { data } = await api.put(`/admin/servicos/${id}`, payload)
    return data
  },

  async excluir(id) {
    await api.delete(`/admin/servicos/${id}`)
  },
}
