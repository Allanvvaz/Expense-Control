import { api } from './api'
import { Transacao, Totais } from '../types'
// serviço responsável por interagir com a API criada para operações relacionadas a "transacao"
export const transacaoService = {
  criar: async (transacao: Omit<Transacao, 'id'>): Promise<Transacao> => {
    const response = await api.post<Transacao>('/transacao', transacao)
    return response.data
  },
//Lista das transacoes cadastradas na API

  listar: async (): Promise<Transacao[]> => {
    const response = await api.get<Transacao[]>('/transacao')
    return response.data
  },
//consulta do totais de transacoes cadastradas na API

  consultarTotais: async (): Promise<Totais> => {
    const response = await api.get<Totais>('/transacao/totais')
    return response.data
  },
    //Deleta uma transacao no ID fornecido 
  deletar: async (id: number): Promise<void> => {
    const response = await api.delete(`/transacao/delete${id}`)
    return response.data 
  }
} 