import { Injectable } from '@nestjs/common';
import { Pessoa } from '@prisma/client';
import { PrismaService } from 'prisma/prisma/prisma.service';

@Injectable()
export class PessoaService {
  constructor(private prisma: PrismaService) {}
  // Primeiro foi feito os métodos para criar pessoas, listar as pessoas cadastradas
  async criarPessoa(nome: string, idade: number): Promise<Pessoa> {
    return this.prisma.pessoa.create({
      data: { nome, idade },
    });
  }

  async listarPessoas(): Promise<Pessoa[]> {
    return this.prisma.pessoa.findMany();
  }

  //Método para deletar pessoas e suas transações, nesse método primeiro é verificado sse a pessoa existe
  //Depois ela é deletada do banco de dados
  async deletarPessoa(id: number) {
    const pessoa = await this.prisma.pessoa.findUnique({
      where: { id },
      include: { transacoes: true },
    });

    if (!pessoa) {
      throw new Error('Pessoa não encontrada');
    }

    await this.prisma.pessoa.delete({
      where: { id },
    });

    return { message: 'Pessoa deletada com sucesso' };
  }
}
