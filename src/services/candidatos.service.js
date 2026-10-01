import api from './api'

export const candidatosService = {
  /** Envia candidatura com currículo */
  async enviar(formData) {
    const { data } = await api.post('/candidatos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  },

  /** Lista candidatos (admin) */
  async listar(params = {}) {
    const { data } = await api.get('/admin/candidatos', { params })
    return data
  },

  /** Retorna detalhes de um candidato */
  async obter(id) {
    const { data } = await api.get(`/admin/candidatos/${id}`)
    return data
  },

  /** Atualiza status do candidato */
  async atualizarStatus(id, status) {
    const { data } = await api.patch(`/admin/candidatos/${id}/status`, { status })
    return data
  },
}
