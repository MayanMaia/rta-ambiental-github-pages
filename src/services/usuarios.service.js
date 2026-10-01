import api from './api'

export const usuariosService = {
  async listar() {
    const { data } = await api.get('/admin/usuarios')
    return data
  },

  async criar(payload) {
    const { data } = await api.post('/admin/usuarios', payload)
    return data
  },

  async atualizar(id, payload) {
    const { data } = await api.put(`/admin/usuarios/${id}`, payload)
    return data
  },

  async excluir(id) {
    await api.delete(`/admin/usuarios/${id}`)
  },
}
