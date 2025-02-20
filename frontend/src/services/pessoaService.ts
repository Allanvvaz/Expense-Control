import { api } from './api'
import { Pessoa } from '../types'

export const pessoaService = {
  criar: async (nome: string, idade: number): Promise<Pessoa> => {
    const response = await api.post<Pessoa>('/pessoas', { nome, idade })
    return response.data
  },

  listar: async (): Promise<Pessoa[]> => {
    const response = await api.get<Pessoa[]>('/pessoas')
    return response.data
  },

  consultarTotais: async () => {
    const response = await api.get('/pessoas/totais')
    return response.data
  },
  async deletar(data: { id: number }) {
    try {
      await api.delete('/pessoas/delete', { data }) 
    } catch (error) {
      throw new Error('Erro ao deletar pessoa')
    }
  },
} 