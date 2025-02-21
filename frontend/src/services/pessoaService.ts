import { api } from './api'
import { Pessoa } from '../types'
// serviço responsável por interagir com a API criada para operações relacionadas a "pessoa"
export const pessoaService = {
  criar: async (nome: string, idade: number): Promise<Pessoa> => {
    const response = await api.post<Pessoa>('/pessoas', { nome, idade })
    return response.data
  },
//Lista das pessoas cadastradas na API
  listar: async (): Promise<Pessoa[]> => {
    const response = await api.get<Pessoa[]>('/pessoas')
    return response.data
  },
//consulta do totais de pessoas cadastradas na API
  consultarTotais: async () => {
    const response = await api.get('/pessoas/totais')
    return response.data
  },
  //Deleta uma pessoa baseado no ID fornecido 
  async deletar(data: { id: number }) {
    try {
      await api.delete('/pessoas/delete', { data }) 
    } catch (error) {
      throw new Error('Erro ao deletar pessoa')
    }
  },
} 