// Esse código é responsavel por criar endpoints para criar, listar e deletar transações

import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common'
import { TransacaoService } from './transacao.service'

interface CriarTransacaoDto {
  descricao: string
  valor: number
  tipo: 'DESPESA' | 'RECEITA' 
  pessoaId: number
}

@Controller('transacao')
export class TransacaoController {
  constructor(private readonly transacaoService: TransacaoService) {}
//A criação da transação tem que estar associada a uma pessoa de acordo com a descrição do teste
  @Post()
  async criarTransacao(@Body() body: CriarTransacaoDto) {
    return this.transacaoService.criarTransacao(
      body.descricao,
      body.valor,
      body.tipo,
      body.pessoaId,
    )
  }

  @Get()
  async listarTransacoes() {
    return this.transacaoService.listarTransacoes()
  }
  @Get('totais')
  async consultarTotais(){
    return this.transacaoService.consultarTotais()

  }
  //O Endpoint de delete vai ser usado para apagar as transações no momento que o usuário for apagado
  @Delete('delete')
  async deletarTransacao(@Body() body: { id: number }) {
    return this.transacaoService.deletarTransacao(body.id)
  }
}
