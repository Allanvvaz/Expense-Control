import { api } from './api'
import { Transacao, Totais } from '../types'

export const transacaoService = {
  criar: async (transacao: Omit<Transacao, 'id'>): Promise<Transacao> => {
    const response = await api.post<Transacao>('/transacao', transacao)
    return response.data
  },

  listar: async (): Promise<Transacao[]> => {
    const response = await api.get<Transacao[]>('/transacao')
    return response.data
  },

  consultarTotais: async (): Promise<Totais> => {
    const response = await api.get<Totais>('/transacao/totais')
    return response.data
  },
  deletar: async (id: number): Promise<void> => {
    const response = await api.delete(`/transacao/delete${id}`)
    return response.data 
  }
} 