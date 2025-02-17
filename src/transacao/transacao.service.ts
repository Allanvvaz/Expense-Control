import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma/prisma.service';

@Injectable()
export class TransacaoService {
  constructor(private prisma: PrismaService) {}

  async criarTransacao(
    descricao: string,
    valor: number,
    tipo: 'DESPESA' | 'RECEITA',
    pessoaId: number,
  ) {
    const pessoa = await this.prisma.pessoa.findUnique({
      where: { id: pessoaId },
    });

    if (!pessoa) {
      throw new Error('Pessoa não encontrada');
    }

    if (pessoa.idade < 18 && tipo === 'RECEITA') {
      throw new Error('Menores de idade só podem registrar despesas');
    }

    
    const transacao = await this.prisma.transacao.create({
      data: {
        descricao,
        valor,
        tipo,
        pessoaId,
      },
    });

    return transacao;
  }

  async listarTransacoes() {
    return this.prisma.transacao.findMany({
      include: {
        pessoa: true, 
      },
    });
  }
  async consultarTotais() {
    const pessoas = await this.prisma.pessoa.findMany({
      include: {
        transacoes: true,  
      },
    });

    const totaisPorPessoa = pessoas.map((pessoa) => {
      const { transacoes } = pessoa;
      let totalReceitas = 0;
      let totalDespesas = 0;

      transacoes.forEach((transacao) => {
        if (transacao.tipo === 'RECEITA') {
          totalReceitas += transacao.valor;
        } else if (transacao.tipo === 'DESPESA') {
          totalDespesas += transacao.valor;
        }
      });

      const saldo = totalReceitas - totalDespesas;

      return {
        pessoaId: pessoa.id,
        nome: pessoa.nome,
        totalReceitas,
        totalDespesas,
        saldo,
      };
    });

    let totalGeralReceitas = 0;
    let totalGeralDespesas = 0;

    totaisPorPessoa.forEach((totals) => {
      totalGeralReceitas += totals.totalReceitas;
      totalGeralDespesas += totals.totalDespesas;
    });

    const saldoGeral = totalGeralReceitas - totalGeralDespesas;

    return {
      totaisPorPessoa,
      totalGeralReceitas,
      totalGeralDespesas,
      saldoGeral,
    };
  }
}
