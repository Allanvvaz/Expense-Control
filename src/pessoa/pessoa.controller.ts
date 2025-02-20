// Esse código é responsavel por criar endpoints para criar, listar e deletar pessoas
import { Controller, Get, Post, Delete, Body } from '@nestjs/common'
import { PessoaService } from './pessoa.service'

@Controller('pessoas')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  @Post()
  async criar(@Body() data: { nome: string; idade: number }) {
    return this.pessoaService.criarPessoa(data.nome, data.idade)
  }

  @Get()
  async listar() {
    return this.pessoaService.listarPessoas()
  }
  @Delete('delete')
  async deletarTransacao(@Body() body: { id: number }) { //O Endpoint deleta a pessoa pelo ID recebido no Body da requisição
    return this.pessoaService.deletarPessoa(body.id)
  }
 
}
