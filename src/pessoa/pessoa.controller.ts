import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { PessoaService } from './pessoa.service';

@Controller('pessoas')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  @Post()
  async criar(@Body() data: { nome: string; idade: number }) {
    return this.pessoaService.criarPessoa(data.nome, data.idade);
  }

  @Get()
  async listar() {
    return this.pessoaService.listarPessoas();
  }

 
}
