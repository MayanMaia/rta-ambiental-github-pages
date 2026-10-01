import api from './api'

export const contatoService = {
  /** Envia mensagem do formulário de contato */
  async enviar(dados) {
    const config = typeof FormData !== 'undefined' && dados instanceof FormData
      ? { headers: { 'Content-Type': 'multipart/form-data' } }
      : undefined
    const { data } = await api.post('/contato', dados, config)
    return data
  },

  /** Lista mensagens (admin) */
  async listar(params = {}) {
    const { data } = await api.get('/admin/mensagens', { params })
    return data
  },

  /** Marca mensagem como lida */
  async marcarLida(id) {
    const { data } = await api.patch(`/admin/mensagens/${id}/lida`)
    return data
  },

  /** Exclui mensagem */
  async excluir(id) {
    await api.delete(`/admin/mensagens/${id}`)
  },
}
