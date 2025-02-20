import { Injectable } from '@nestjs/common'
import { Pessoa } from '@prisma/client'
import { PrismaService } from 'prisma/prisma/prisma.service'

@Injectable()
export class PessoaService {
  constructor(private prisma: PrismaService) {}

  async criarPessoa(nome: string, idade: number): Promise<Pessoa> {
    return this.prisma.pessoa.create({
      data: { nome, idade },
    })
  }

  async listarPessoas(): Promise<Pessoa[]> {
    return this.prisma.pessoa.findMany()
  }

  
  
  async consultarTotais() {
    const pessoas = await this.prisma.pessoa.findMany({
      include: {
        transacoes: true, 
      },
    })

    const resultados = pessoas.map((pessoa) => {
      const receitas = pessoa.transacoes.filter((t) => t.tipo === 'RECEITA')
      const despesas = pessoa.transacoes.filter((t) => t.tipo === 'DESPESA')

      const totalReceitas = receitas.reduce((acc, t) => acc + t.valor, 0)
      const totalDespesas = despesas.reduce((acc, t) => acc + t.valor, 0)
      const saldo = totalReceitas - totalDespesas

      return {
        pessoaId: pessoa.id,
        nome: pessoa.nome,
        totalReceitas,
        totalDespesas,
        saldo,
      }
    })

    const totalGeral = {
      totalReceitas: 0,
      totalDespesas: 0,
      saldo: 0,
    }

    for (const pessoa of resultados) {
      totalGeral.totalReceitas += pessoa.totalReceitas
      totalGeral.totalDespesas += pessoa.totalDespesas
      totalGeral.saldo += pessoa.saldo
    }

    return { pessoas: resultados, totalGeral }
  }
  async deletarPessoa(id: number) {
    const pessoa = await this.prisma.pessoa.findUnique({
      where: { id },
      include:{transacoes: true}
    })
  
    if (!pessoa) {
      throw new Error('Pessoa não encontrada')
    }
  
    await this.prisma.pessoa.delete({
      where: { id },
    })
  
    return { message: 'Pessoa deletada com sucesso' }
  }
}

